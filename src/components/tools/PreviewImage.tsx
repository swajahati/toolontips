"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { toArrayBuffer } from "@/lib/buffer";

export function PreviewImage({
  bytes,
  mime,
  alt,
  width,
  height,
}: {
  bytes: Uint8Array;
  mime: "image/jpeg" | "image/png";
  alt: string;
  width: number;
  height: number;
}) {
  const url = useMemo(
    () => URL.createObjectURL(new Blob([toArrayBuffer(bytes)], { type: mime })),
    [bytes, mime],
  );

  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return (
    <Image
      unoptimized
      src={url}
      alt={alt}
      width={width}
      height={height}
      className="h-auto max-h-72 w-auto rounded-lg border border-border object-contain"
    />
  );
}
