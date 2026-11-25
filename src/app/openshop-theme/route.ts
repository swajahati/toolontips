const styles = `
:root,
:root.theme-light,
:root:not([data-os-theme]) {
  --bg-depth-0:#f8fafc;
  --bg-depth-1:#ffffff;
  --bg-depth-2:#f8fafc;
  --bg-depth-3:#f1f5f9;
  --bg-depth-4:#e2e8f0;
  --border:#e2e8f0;
  --border-active:#cbd5e1;
  --text-primary:#0f172a;
  --text-secondary:#475569;
  --text-muted:#64748b;
  --accent:#1d4ed8;
  --accent-hover:#1e40af;
  --accent-alt:#2563eb;
  --accent-dim:rgba(29,78,216,.12);
  --accent-shadow:rgba(29,78,216,.2);
  --accent-contrast-bg:#1d4ed8;
  --success:#047857;
  --warning:#b45309;
  --danger:#dc2626;
  --canvas-bg:#f1f5f9;
  --glass:rgba(255,255,255,.96);
  --glass-border:rgba(29,78,216,.2);
  --checker-a:#e2e8f0;
  --checker-b:#f8fafc;
  --guide:#0891b2;
  --smart-guide:#db2777;
  --theme-color:#ffffff;
  --on-accent:#ffffff;
  --chrome-black:#0f172a;
  --chrome-checker-base:#f8fafc;
  --chrome-checker-alt:#e2e8f0;
  --note-text:#0f172a;
  --chrome-shadow:rgba(15,23,42,.12);
  --chrome-shadow-soft:rgba(15,23,42,.08);
  --font-ui:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --radius-sm:6px;
  --radius-md:8px;
  --radius-lg:12px;
}

:root.dark,
:root.theme-midnight,
:root.theme-oled,
:root[data-os-theme="midnight"],
:root[data-os-theme="oled"] {
  --bg-depth-0:#0b1120;
  --bg-depth-1:#111c31;
  --bg-depth-2:#0f192c;
  --bg-depth-3:#16243d;
  --bg-depth-4:#24344f;
  --border:#24344f;
  --border-active:#334966;
  --text-primary:#e2e8f0;
  --text-secondary:#a8b6cc;
  --text-muted:#8fa1bb;
  --accent:#60a5fa;
  --accent-hover:#93c5fd;
  --accent-alt:#60a5fa;
  --accent-dim:rgba(96,165,250,.16);
  --accent-shadow:rgba(96,165,250,.24);
  --accent-contrast-bg:#60a5fa;
  --success:#34d399;
  --warning:#fbbf24;
  --danger:#f87171;
  --canvas-bg:#0b1120;
  --glass:rgba(17,28,49,.96);
  --glass-border:rgba(96,165,250,.24);
  --checker-a:#111c31;
  --checker-b:#0f192c;
  --guide:#22d3ee;
  --smart-guide:#f472b6;
  --theme-color:#0b1120;
  --on-accent:#081225;
  --chrome-black:#e2e8f0;
  --chrome-checker-base:#111c31;
  --chrome-checker-alt:#0f192c;
  --note-text:#e2e8f0;
  --chrome-shadow:rgba(0,0,0,.5);
  --chrome-shadow-soft:rgba(0,0,0,.35);
}

html,
body {
  font-family:var(--font-ui);
  font-size:13px;
}

#topbar,
#toolbar,
#tool-options,
#panels,
#bottom-tabs,
#statusbar {
  background:var(--bg-depth-1);
  border-color:var(--border);
  box-shadow:none;
}

#topbar {
  border-bottom:1px solid var(--border);
}

#tool-options {
  border:1px solid var(--border);
  border-radius:var(--radius-md);
  box-shadow:0 1px 2px var(--chrome-shadow-soft);
}

#panels {
  border-left:1px solid var(--border);
}

#canvas-area {
  border:1px solid var(--border);
  border-radius:var(--radius-md);
}

.panel-tab-group,
.panel-tabs,
.panel-actions {
  background:var(--bg-depth-2);
  border-color:var(--border);
}

.panel-tab,
.btn,
.menu-bar .dd-item {
  border-radius:var(--radius-md);
  font-family:var(--font-ui);
}

.btn {
  border:1px solid var(--border);
  background:var(--bg-depth-1);
  color:var(--text-primary);
  padding:7px 12px;
}

.btn:hover {
  background:var(--bg-depth-3);
  border-color:var(--border-active);
}

.btn-primary {
  background:var(--accent);
  border-color:var(--accent);
  color:var(--on-accent);
}

.btn-primary:hover {
  background:var(--accent-hover);
  border-color:var(--accent-hover);
}

.btn-danger {
  background:var(--bg-depth-1);
  border-color:var(--danger);
  color:var(--danger);
}

.tool-btn {
  border-radius:var(--radius-md);
}

.tool-btn.active {
  background:var(--accent-dim);
  color:var(--accent);
  box-shadow:inset 0 0 0 1px var(--border-active);
}

#flyout-host > .tool-flyout.show,
#flyout-host > .tool-flyout[popover-open] {
  flex-direction:column;
  flex-wrap:nowrap;
}

#flyout-host > .tool-flyout {
  min-width:232px;
  max-width:min(280px,calc(100vw - 16px));
  max-height:calc(100vh - 16px);
  padding:8px;
  gap:4px;
  overflow:auto;
  overscroll-behavior:contain;
  background:var(--bg-depth-1);
  border:1px solid var(--border);
  border-radius:var(--radius-lg);
  box-shadow:0 16px 40px var(--chrome-shadow),0 0 0 1px var(--chrome-shadow-soft) inset;
  backdrop-filter:none;
}

#flyout-host > .tool-flyout .tool-btn {
  width:100%;
  min-width:216px;
  height:36px;
  flex:0 0 auto;
  justify-content:flex-start;
  align-items:center;
  gap:10px;
  padding:6px 10px;
  border-radius:var(--radius-md);
  white-space:nowrap;
}

#flyout-host > .tool-flyout .tool-name,
#flyout-host > .tool-flyout .tool-shortcut {
  white-space:nowrap;
  overflow:visible;
  text-overflow:clip;
  font-size:12px;
  line-height:1.2;
}

#flyout-host > .tool-flyout .tool-name {
  color:var(--text-secondary);
}

#flyout-host > .tool-flyout .tool-member-icon,
#flyout-host > .tool-flyout .tool-member-glyph {
  width:16px;
  height:16px;
  flex:0 0 16px;
  color:var(--text-muted);
}

#flyout-host > .tool-flyout .tool-shortcut {
  margin-inline-start:auto;
  color:var(--text-muted);
  font-family:var(--font-ui);
}

#flyout-host > .tool-flyout .tool-btn:hover,
#flyout-host > .tool-flyout .tool-btn.active {
  background:var(--accent-dim);
}

#flyout-host > .tool-flyout .tool-btn:hover .tool-name,
#flyout-host > .tool-flyout .tool-btn.active .tool-name,
#flyout-host > .tool-flyout .tool-btn:hover .tool-member-icon,
#flyout-host > .tool-flyout .tool-btn.active .tool-member-icon {
  color:var(--accent);
}

#flyout-host > .tool-flyout .tool-btn:disabled,
#flyout-host > .tool-flyout .tool-btn[aria-disabled="true"] {
  opacity:.42;
  cursor:not-allowed;
}

#flyout-host > .tool-flyout .tool-btn:disabled .tool-name::after,
#flyout-host > .tool-flyout .tool-btn[aria-disabled="true"] .tool-name::after {
  content:" · unavailable";
  color:var(--text-muted);
  font-size:10px;
}

#toolbar .tool-btn:disabled {
  opacity:.42;
  cursor:not-allowed;
}

.tool-btn[data-tip]::after {
  background:var(--bg-depth-1);
  color:var(--text-primary);
  border:1px solid var(--border);
  box-shadow:0 8px 20px var(--chrome-shadow);
}

.modal-overlay {
  background:rgba(15,23,42,.42);
  backdrop-filter:blur(2px);
}

.modal {
  background:var(--bg-depth-1);
  border:1px solid var(--border);
  border-radius:var(--radius-lg);
  box-shadow:0 24px 60px var(--chrome-shadow);
}

@media (max-width:720px) {
  #flyout-host > .tool-flyout {
    min-width:min(264px,calc(100vw - 16px));
    max-width:calc(100vw - 16px);
  }

  #flyout-host > .tool-flyout .tool-btn {
    min-width:0;
  }
}

@media (max-width:767px) {
  #toolbar {
    justify-content:flex-start !important;
  }
}

html[data-os-workspace="mobile"] #toolbar {
  justify-content:flex-start !important;
}
`;

export async function GET() {
  return new Response(styles, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Cache-Control": "public, max-age=0",
    },
  });
}
