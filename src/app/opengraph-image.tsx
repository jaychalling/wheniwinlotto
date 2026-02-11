import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WhenIWinLotto - 감성 로또 다이어리";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const ballNumbers = [7, 14, 21, 33, 42, 45];
  const ballColors = ["#fbc400", "#69c8f2", "#ff7272", "#aaa", "#b0d840", "#b0d840"];

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
          background: "linear-gradient(135deg, #c9a84c 0%, #7c6dab 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Lotto balls */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
          {ballNumbers.map((num, i) => (
            <div
              key={num}
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${ballColors[i]}ee, ${ballColors[i]}88)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 700,
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                border: "3px solid rgba(255,255,255,0.4)",
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "16px",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          오늘의 행운을 기록하세요
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "26px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          WhenIWinLotto - 감성 로또 다이어리
        </div>
      </div>
    ),
    { ...size },
  );
}
