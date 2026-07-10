import { ImageResponse } from "next/og";

export const alt =
  "Arshita Misra — product designer working at the intersection of UX, user research, and AI systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * OG image in the site's pastel style. Colors mirror the design tokens
 * (pink-50 bg, pink-200/300 cloud, ink text) — kept in sync by hand since
 * CSS variables don't reach ImageResponse.
 */

const CLOUD = ["..XXXX..", ".XXXXXX.", "XXXXXXXX", "XXXXXXXX", ".XXXXXX."];
const PX = 18;

function Cloud() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {CLOUD.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.split("").map((cell, c) => {
            const filled = cell === "X";
            const edge =
              filled &&
              (r === 0 ||
                r === CLOUD.length - 1 ||
                CLOUD[r][c - 1] !== "X" ||
                CLOUD[r][c + 1] !== "X" ||
                CLOUD[r - 1]?.[c] !== "X" ||
                CLOUD[r + 1]?.[c] !== "X");
            return (
              <div
                key={c}
                style={{
                  width: PX,
                  height: PX,
                  backgroundColor: filled ? (edge ? "#EFA6B4" : "#F6C6CF") : "transparent",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: "#FDF8F7",
          backgroundImage: "linear-gradient(135deg, #FDF8F7 55%, #FAEEEC 100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#96455C",
              fontWeight: 600,
            }}
          >
            Portfolio
          </div>
          <Cloud />
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 92,
            fontWeight: 700,
            color: "#2B2230",
            lineHeight: 1.05,
          }}
        >
          Arshita Misra
        </div>
        <div style={{ marginTop: 28, fontSize: 36, color: "#6E5B6F", maxWidth: 900 }}>
          Product designer at the intersection of UX, research, and AI systems.
        </div>
      </div>
    ),
    { ...size }
  );
}
