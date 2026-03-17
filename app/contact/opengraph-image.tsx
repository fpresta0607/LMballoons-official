import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Book LM Designs & Balloons Co.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#3D3230",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#F7EDEA",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              fontFamily: "serif",
            }}
          >
            LM Designs &amp; Balloons Co.
          </div>
          <div
            style={{
              width: "120px",
              height: "2px",
              backgroundColor: "#E8D5CC",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              color: "#E8D5CC",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
            }}
          >
            Book Your Event
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#6B5B59",
              marginTop: "12px",
            }}
          >
            Custom Balloon Decor · Chicagoland
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
