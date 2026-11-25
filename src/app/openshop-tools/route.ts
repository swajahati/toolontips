const script = `(() => {
  const customTools = new Set([
    "marquee-row", "marquee-column", "slice", "slice-select", "color-sampler", "patch",
    "content-aware-move", "red-eye", "pattern-stamp", "history-brush", "art-history-brush",
    "background-eraser", "magic-eraser", "blur", "sharpen", "freeform-pen", "add-anchor",
    "delete-anchor", "convert-point", "vertical-text", "horizontal-text-mask",
    "vertical-text-mask", "rotate-view", "zoom", "horizontal-type-mask", "vertical-type-mask",
    "history-brush-horizontal"
  ]);
  let started = false;
  let viewAngle = 0;
  let drag = null;
  const snapshots = new WeakMap();

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rgbFromHex = (hex) => {
    const value = String(hex || "#000000").replace("#", "");
    const full = value.length === 3 ? value.split("").map(char => char + char).join("") : value;
    return [
      parseInt(full.slice(0, 2), 16) || 0,
      parseInt(full.slice(2, 4), 16) || 0,
      parseInt(full.slice(4, 6), 16) || 0
    ];
  };

  const enableButtons = () => {
    document.querySelectorAll(".tool-btn[data-tool]").forEach(button => {
      if (!customTools.has(button.dataset.tool)) return;
      if (button.disabled) button.disabled = false;
      if (button.hasAttribute("aria-disabled")) button.removeAttribute("aria-disabled");
      if (button.hasAttribute("data-unimplemented")) button.removeAttribute("data-unimplemented");
    });
    document.querySelectorAll(".audit-tool-face[data-tool]").forEach(button => {
      if (!customTools.has(button.dataset.tool)) return;
      if (button.disabled) button.disabled = false;
      if (button.hasAttribute("aria-disabled")) button.removeAttribute("aria-disabled");
    });
  };

  function markActive(tool) {
    document.querySelectorAll(".tool-btn").forEach(button => {
      const active = button.dataset.tool === tool;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.querySelectorAll(".audit-tool-group").forEach(group => {
      const face = group.querySelector(":scope > .audit-tool-face");
      const flyout = [...document.querySelectorAll(".audit-tool-flyout")].find(item => item._parentGroup === group) || group.querySelector(":scope > .audit-tool-flyout");
      const member = flyout && [...flyout.querySelectorAll(".tool-btn")].find(button => button.dataset.tool === tool);
      if (!face || !member) return;
      if (typeof this._syncRegistryToolFace === "function") this._syncRegistryToolFace(face, member, group.dataset.family);
      face.classList.toggle("active", true);
      face.setAttribute("aria-pressed", "true");
    });
  }

  const selectImage = (owner, event) => {
    let image = null;
    try {
      const target = owner.canvas.findTarget?.(event.e, false);
      if (target && target.type === "image") image = target;
    } catch (error) {
      image = null;
    }
    if (!image) {
      const active = owner.canvas.getActiveObject();
      if (active && active.type === "image") image = active;
    }
    if (!image) {
      image = owner.canvas.getObjects().find(object => object.type === "image" && object.visible !== false) || null;
    }
    if (!image) {
      owner.toast("Open an image first", "info");
      return null;
    }
    if (owner.canvas.getActiveObject() !== image) {
      owner.canvas.setActiveObject(image);
      owner.canvas.renderAll();
    }
    return image;
  };

  const imagePoint = (info, point) => ({
    x: clamp(Math.round((point.x - info.active.left) * info.canvas.width / (info.active.width || 1)), 0, info.canvas.width - 1),
    y: clamp(Math.round((point.y - info.active.top) * info.canvas.height / (info.active.height || 1)), 0, info.canvas.height - 1)
  });

  const pixelIndex = (info, x, y) => (clamp(y, 0, info.height - 1) * info.width + clamp(x, 0, info.width - 1)) * 4;

  const distance = (data, index, color) => Math.abs(data[index] - color[0]) + Math.abs(data[index + 1] - color[1]) + Math.abs(data[index + 2] - color[2]);

  const withImageEdit = (owner, event, name, fn) => {
    if (!selectImage(owner, event)) {
      owner.toast("Select an image first", "info");
      return null;
    }
    const info = owner._getActiveImageData();
    if (!info) return null;
    info.width = info.canvas.width;
    info.height = info.canvas.height;
    fn(info, imagePoint(info, owner.canvas.getScenePoint(event.e)));
    void owner._commitImageData(info, name, { success: name + " applied" });
    return info;
  };

  const sampleColor = (owner, point) => {
    const ctx = owner.canvas.getContext("2d");
    const vpt = owner.canvas.viewportTransform || [1,0,0,1,0,0];
    const retina = owner.canvas.getRetinaScaling?.() || 1;
    const sx = Math.round((point.x * vpt[0] + vpt[4]) * retina);
    const sy = Math.round((point.y * vpt[3] + vpt[5]) * retina);
    const pixel = ctx.getImageData(clamp(sx, 0, ctx.canvas.width - 1), clamp(sy, 0, ctx.canvas.height - 1), 1, 1).data;
    const hex = "#" + [pixel[0], pixel[1], pixel[2]].map(value => value.toString(16).padStart(2, "0")).join("");
    owner.setFgColor(hex);
    owner.toast("Picked " + hex, "info");
  };

  const setLineSelection = (owner, tool, point) => {
    owner.canvas.getObjects().filter(object => object._wandOverlay).forEach(object => owner.canvas.remove(object));
    const w = Math.max(1, Math.round(owner.canvasW || 1));
    const h = Math.max(1, Math.round(owner.canvasH || 1));
    const x = clamp(Math.round(point.x), 0, w - 1);
    const y = clamp(Math.round(point.y), 0, h - 1);
    owner._selectionMask = null;
    owner._selectionBounds = tool === "marquee-row" ? { x:0, y, w, h:1 } : { x, y:0, w:1, h };
    owner._placeSelectionBox?.({ borderRadius:"0" });
    const mask = owner._maskFromMarqueeBounds?.();
    if (mask) {
      owner._selectionMask = mask;
      owner._showMaskOverlay?.(mask);
    }
    owner.canvas.renderAll();
    owner.toast(tool === "marquee-row" ? "1-pixel row selected" : "1-pixel column selected", "success");
  };

  const rotateCanvasView = (owner) => {
    viewAngle = (viewAngle + 90) % 360;
    const area = document.getElementById("canvas-area");
    if (!area) return;
    area.style.transformOrigin = "center center";
    area.style.transform = "rotate(" + viewAngle + "deg)";
    owner.toast("View rotated " + viewAngle + "°", "info");
  };

  const redEye = (info, point) => {
    const data = info.imgData.data;
    const radius = 12;
    for (let y = point.y - radius; y <= point.y + radius; y += 1) {
      for (let x = point.x - radius; x <= point.x + radius; x += 1) {
        if (Math.hypot(x - point.x, y - point.y) > radius) continue;
        const index = pixelIndex(info, x, y);
        const r = data[index], g = data[index + 1], b = data[index + 2];
        if (r > 80 && r > g * 1.25 && r > b * 1.15) {
          const neutral = (g + b) / 2;
          data[index] = clamp(neutral * 0.72, 0, 255);
          data[index + 1] = clamp(neutral * 0.78, 0, 255);
          data[index + 2] = clamp(neutral * 0.86, 0, 255);
        }
      }
    }
  };

  const eraseSimilar = (contiguous) => (info, point) => {
    const data = info.imgData.data;
    const start = pixelIndex(info, point.x, point.y);
    const target = [data[start], data[start + 1], data[start + 2]];
    const tolerance = 48;
    const radius = contiguous ? 110 : 36;
    const visited = new Uint8Array(info.width * info.height);
    const stack = [[point.x, point.y]];
    let limit = 60000;
    let cleared = 0;
    while (stack.length && limit > 0) {
      const [x, y] = stack.pop();
      if (x < 0 || y < 0 || x >= info.width || y >= info.height) continue;
      if (Math.hypot(x - point.x, y - point.y) > radius) continue;
      const key = y * info.width + x;
      if (visited[key]) continue;
      visited[key] = 1;
      const index = key * 4;
      if (distance(data, index, target) > tolerance) continue;
      data[index + 3] = 0;
      cleared += 1;
      limit -= 1;
      if (contiguous) {
        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
    }
    if (cleared < 12) {
      const brushRadius = contiguous ? 18 : 24;
      for (let y = -brushRadius; y <= brushRadius; y += 1) {
        for (let x = -brushRadius; x <= brushRadius; x += 1) {
          if (Math.hypot(x, y) > brushRadius) continue;
          const index = pixelIndex(info, point.x + x, point.y + y);
          data[index + 3] = 0;
        }
      }
    }
  };

  const copyRegion = (owner, event, fillSource) => {
    if (!drag?.start) return;
    withImageEdit(owner, event, fillSource ? "Content-aware move" : "Patch", (info, destination) => {
      const data = info.imgData.data;
      const copy = new Uint8ClampedArray(data);
      const radius = fillSource ? 18 : 14;
      const source = drag.start;
      for (let y = -radius; y <= radius; y += 1) {
        for (let x = -radius; x <= radius; x += 1) {
          const sx = source.x + x, sy = source.y + y;
          const dx = destination.x + x, dy = destination.y + y;
          if (sx < 0 || sy < 0 || sx >= info.width || sy >= info.height) continue;
          if (dx < 0 || dy < 0 || dx >= info.width || dy >= info.height) continue;
          const from = pixelIndex(info, sx, sy), to = pixelIndex(info, dx, dy);
          for (let channel = 0; channel < 4; channel += 1) data[to + channel] = copy[from + channel];
        }
      }
      if (fillSource) {
        let r = 0, g = 0, b = 0, count = 0;
        for (let y = -radius - 4; y <= radius + 4; y += 4) {
          for (let x = -radius - 4; x <= radius + 4; x += 4) {
            if (Math.abs(x) < radius || Math.abs(y) < radius) continue;
            const index = pixelIndex(info, source.x + x, source.y + y);
            r += data[index]; g += data[index + 1]; b += data[index + 2]; count += 1;
          }
        }
        const fill = [r / Math.max(1, count), g / Math.max(1, count), b / Math.max(1, count)];
        for (let y = -radius; y <= radius; y += 1) {
          for (let x = -radius; x <= radius; x += 1) {
            const index = pixelIndex(info, source.x + x, source.y + y);
            data[index] = fill[0]; data[index + 1] = fill[1]; data[index + 2] = fill[2]; data[index + 3] = 255;
          }
        }
      }
    });
  };

  const captureImageSnapshot = (owner, image) => {
    if (!image || image.type !== "image" || snapshots.has(image)) return;
    const element = image.getElement();
    const canvas = document.createElement("canvas");
    canvas.width = element.naturalWidth || element.width || 1;
    canvas.height = element.naturalHeight || element.height || 1;
    canvas.getContext("2d").drawImage(element, 0, 0);
    snapshots.set(image, {
      id: owner._ensureObjectId(image),
      width:canvas.width,
      height:canvas.height,
      data:canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data
    });
  };

  const snapshotFor = (owner, info) => {
    const id = owner._ensureObjectId(info.active);
    let snapshot = snapshots.get(info.active);
    if (!snapshot || snapshot.id !== id) {
      snapshot = { id, width:info.width, height:info.height, data:new Uint8ClampedArray(info.imgData.data) };
      snapshots.set(info.active, snapshot);
    }
    return snapshot;
  };

  const stampPixels = (owner, event) => {
    if (!drag?.start) return;
    const tool = drag.tool;
    withImageEdit(owner, event, tool.includes("history") ? "History brush" : "Pattern stamp", (info, destination) => {
      const data = info.imgData.data;
      const sourceData = tool.includes("history") ? snapshotFor(owner, info).data : null;
      const source = drag.source || destination;
      const color = rgbFromHex(owner.state.fgColor);
      const radius = 12;
      for (let y = -radius; y <= radius; y += 1) {
        for (let x = -radius; x <= radius; x += 1) {
          if (Math.hypot(x, y) > radius) continue;
          const to = pixelIndex(info, destination.x + x, destination.y + y);
          if (sourceData) {
            const sx = clamp(source.x + x, 0, info.width - 1), sy = clamp(source.y + y, 0, info.height - 1);
            const from = (sy * info.width + sx) * 4;
            for (let channel = 0; channel < 4; channel += 1) data[to + channel] = sourceData[from + channel];
          } else {
            data[to] = color[0]; data[to + 1] = color[1]; data[to + 2] = color[2]; data[to + 3] = 255;
          }
        }
      }
    });
  };

  const addSlice = (owner, point) => {
    const rect = new fabric.Rect({ left:point.x, top:point.y, width:1, height:1, fill:"transparent", stroke:"#1d4ed8", strokeWidth:1, strokeDashArray:[5,4], selectable:false, evented:false, name:"Slice Guide" });
    rect._sliceGuide = true;
    owner.canvas.add(rect);
    owner.canvas.renderAll();
    return rect;
  };

  const selectSlice = (owner, point) => {
    const guide = owner.canvas.getObjects().find(object => object._sliceGuide && point.x >= object.left && point.x <= object.left + object.width && point.y >= object.top && point.y <= object.top + object.height);
    if (!guide) {
      owner.toast("No slice guide at that point", "info");
      return;
    }
    guide.set({ selectable:true, evented:true });
    owner.canvas.setActiveObject(guide);
    owner.canvas.renderAll();
    owner.toast("Slice guide selected", "success");
  };

  const activePath = (owner) => {
    let path = owner.canvas.getActiveObject();
    if (!path || path.type !== "path") {
      path = owner.canvas.getObjects().find(object => object.type === "path" && object.visible !== false);
      if (path) owner.canvas.setActiveObject(path);
    }
    if (!path || path.type !== "path") {
      owner.toast("Create a path with the Pen tool first", "info");
      return null;
    }
    owner.canvas.renderAll();
    return path;
  };

  const localPathPoint = (owner, path, point) => fabric.util.transformPoint(point, fabric.util.invertTransform(path.calcTransformMatrix()));

  const nearestAnchor = (owner, path, point) => {
    const local = localPathPoint(owner, path, point);
    const entries = owner._pathHandleEntries?.(path) || [];
    let best = null;
    let bestDistance = Infinity;
    entries.filter(entry => !entry.control).forEach(entry => {
      const x = Number(path.path[entry.commandIndex][entry.xIndex]) || 0;
      const y = Number(path.path[entry.commandIndex][entry.yIndex]) || 0;
      const value = Math.hypot(x - local.x, y - local.y);
      if (value < bestDistance) { bestDistance = value; best = entry; }
    });
    return best;
  };

  const commitPath = (owner, path, label) => {
    path.dirty = true;
    path.setCoords?.();
    owner.canvas.renderAll();
    owner._renderPathEditOverlay?.();
    owner.saveHistory(label);
    owner.toast(label, "success");
  };

  const addAnchor = (owner, point) => {
    const path = activePath(owner);
    if (!path) return;
    const local = localPathPoint(owner, path, point);
    path.path.splice(1, 0, ["L", local.x, local.y]);
    commitPath(owner, path, "Anchor point added");
  };

  const deleteAnchor = (owner, point) => {
    const path = activePath(owner);
    if (!path) return;
    const entry = nearestAnchor(owner, path, point);
    if (!entry) { owner.toast("No anchor point found", "info"); return; }
    path.path.splice(entry.commandIndex, 1);
    if (path.path.length && String(path.path[0][0]).toUpperCase() !== "M") path.path[0][0] = "M";
    commitPath(owner, path, "Anchor point deleted");
  };

  const convertPoint = (owner, point) => {
    const path = activePath(owner);
    if (!path) return;
    const entry = nearestAnchor(owner, path, point);
    if (!entry) { owner.toast("No anchor point found", "info"); return; }
    const command = path.path[entry.commandIndex];
    const x = Number(command[entry.xIndex]) || 0;
    const y = Number(command[entry.yIndex]) || 0;
    path.path[entry.commandIndex] = ["C", x - 18, y - 18, x + 18, y + 18, x, y];
    commitPath(owner, path, "Anchor converted to curve");
  };

  const addText = (owner, point, tool) => {
    const vertical = tool === "vertical-text" || tool === "vertical-type-mask" || tool === "vertical-text-mask";
    const mask = tool.includes("mask");
    const text = new fabric.IText("Type here", {
      left:point.x,
      top:point.y,
      angle:vertical ? 90 : 0,
      fontFamily:owner.state.textFont,
      fontSize:owner.state.textSize,
      fill:mask ? "transparent" : owner.state.textColor,
      stroke:mask ? owner.state.fgColor : "transparent",
      strokeWidth:mask ? 1 : 0,
      editable:true,
      fontWeight:owner.state.textBold ? "bold" : "normal",
      fontStyle:owner.state.textItalic ? "italic" : "normal",
      ...owner._textDecorationProps?.()
    });
    owner._addObjectAsLayer(text, owner._objectLayerName(text, mask ? "Type Mask" : "Text"));
    owner.canvas.setActiveObject(text);
    text.enterEditing();
    owner.saveHistory(mask ? "Add Type Mask" : "Add Text");
    owner.updateLayersPanel();
  };

  const install = () => {
    if (started || typeof OS === "undefined") return;
    started = true;
    enableButtons();
    const buttonObserver = new MutationObserver(() => enableButtons());
    buttonObserver.observe(document.body, { childList:true, subtree:true });

    const baseAddDecodedImage = OS._addDecodedImageToCanvas.bind(OS);
    OS._addDecodedImageToCanvas = async function(image, options) {
      const opened = await baseAddDecodedImage(image, options);
      if (opened && options?.mode === "open") {
        const imageObject = this.canvas.getObjects().find(object => object.type === "image" && object.visible !== false);
        captureImageSnapshot(this, imageObject);
      }
      return opened;
    };

    const baseSetTool = OS.setTool.bind(OS);
    OS.setTool = function(tool) {
      if (!customTools.has(tool)) return baseSetTool(tool);
      drag = null;
      this.state.tool = tool;
      markActive.call(this, tool);
      this._applyToolOptions?.(tool);
      this.canvas.isDrawingMode = false;
      this.canvas.selection = false;
      this.canvas.defaultCursor = "crosshair";
      this.canvas.hoverCursor = "crosshair";
      this.canvas.forEachObject(object => { object.selectable = false; object.evented = false; });
      return true;
    };

    const baseMouseDown = OS.onMouseDown.bind(OS);
    OS.onMouseDown = function(event) {
      const tool = this.state.tool;
      if (!customTools.has(tool)) return baseMouseDown(event);
      const point = this.canvas.getScenePoint(event.e);
      if (tool === "marquee-row" || tool === "marquee-column") { setLineSelection(this, tool, point); return; }
      if (tool === "color-sampler") { sampleColor(this, point); return; }
      if (tool === "zoom") { event.e.altKey ? this.zoomOut?.() : this.zoomIn?.(); this.toast(event.e.altKey ? "Zoomed out" : "Zoomed in", "info"); return; }
      if (tool === "rotate-view") { rotateCanvasView(this); return; }
      if (tool === "blur") {
        if (selectImage(this, event)) this.showFilterDialog("Blur");
        return;
      }
      if (tool === "sharpen") { if (selectImage(this, event)) void this.applyFilterDirect("Sharpen"); return; }
      if (tool === "red-eye") { withImageEdit(this, event, "Red-eye reduction", redEye); return; }
      if (tool === "background-eraser") { withImageEdit(this, event, "Background eraser", eraseSimilar(false)); return; }
      if (tool === "magic-eraser") { withImageEdit(this, event, "Magic eraser", eraseSimilar(true)); return; }
      if (tool === "slice") { drag = { tool, rect:addSlice(this, point), start:point }; return; }
      if (tool === "slice-select") { selectSlice(this, point); return; }
      if (tool === "freeform-pen") { this._penClick(point, event.e); return; }
      if (tool === "add-anchor") { addAnchor(this, point); return; }
      if (tool === "delete-anchor") { deleteAnchor(this, point); return; }
      if (tool === "convert-point") { convertPoint(this, point); return; }
      if (["vertical-text", "horizontal-text-mask", "vertical-text-mask", "horizontal-type-mask", "vertical-type-mask"].includes(tool)) { addText(this, point, tool); return; }
      if (["patch", "content-aware-move", "pattern-stamp", "history-brush", "art-history-brush", "history-brush-horizontal"].includes(tool)) {
        drag = { tool, start:imageSourcePoint(this, event), source:event.e.altKey ? imageSourcePoint(this, event) : undefined };
        return;
      }
      return baseMouseDown(event);
    };

    const baseMouseMove = OS.onMouseMove.bind(OS);
    OS.onMouseMove = function(event) {
      if (!drag || !customTools.has(this.state.tool)) return baseMouseMove(event);
      const point = this.canvas.getScenePoint(event.e);
      if (drag.rect) {
        drag.rect.set({ left:Math.min(drag.start.x, point.x), top:Math.min(drag.start.y, point.y), width:Math.max(1, Math.abs(point.x - drag.start.x)), height:Math.max(1, Math.abs(point.y - drag.start.y)) });
        this.canvas.renderAll();
        return;
      }
      if (["pattern-stamp", "history-brush", "art-history-brush", "history-brush-horizontal"].includes(drag.tool)) stampPixels(this, event);
    };

    const baseMouseUp = OS.onMouseUp.bind(OS);
    OS.onMouseUp = function(event) {
      if (!drag || !customTools.has(this.state.tool)) return baseMouseUp(event);
      if (drag.rect) {
        this.toast("Slice guide added", "success");
        drag = null;
        return;
      }
      if (["patch", "content-aware-move"].includes(drag.tool)) copyRegion(this, event, drag.tool === "content-aware-move");
      if (["pattern-stamp", "history-brush", "art-history-brush", "history-brush-horizontal"].includes(drag.tool)) stampPixels(this, event);
      drag = null;
    };

    const imageSourcePoint = (owner, event) => {
      const active = selectImage(owner, event);
      if (!active) return { x:0, y:0 };
      const info = { active, canvas:{ width:active.width || 1, height:active.height || 1 } };
      return imagePoint(info, owner.canvas.getScenePoint(event.e));
    };
  };

  const bootObserver = new MutationObserver(() => {
    if (document.documentElement.dataset.osBoot === "ready") { install(); bootObserver.disconnect(); }
  });
  bootObserver.observe(document.documentElement, { attributes:true, attributeFilter:["data-os-boot"] });
  if (document.documentElement.dataset.osBoot === "ready") { install(); bootObserver.disconnect(); }
})();`;

export async function GET() {
  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0",
    },
  });
}
