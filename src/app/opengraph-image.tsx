import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n/translations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.name;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1120",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
          padding: 60,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 28, color: "#93c5fd", letterSpacing: 2 }}>
          {siteConfig.domain.toUpperCase()}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24 }}>{t("og.title")}</div>
        <div style={{ fontSize: 30, color: "#a8b6cc", marginTop: 24 }}>{t("og.subtitle")}</div>
      </div>
    ),
    size,
  );
}
