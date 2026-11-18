import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Stitch In Time — expert clothing alterations in Dubai and Abu Dhabi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand OG image: white logo on burgundy with the stripe band. Generated at build time. */
export default function OpengraphImage() {
  const svg = readFileSync(
    join(process.cwd(), "public", "branding", "stitch-in-time-logo-white.svg")
  );
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#561B26",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={780} height={117} alt="" />
        <div style={{ display: "flex", flexDirection: "column", width: 780, marginTop: 64 }}>
          <div style={{ height: 14, background: "#9DB4CE" }} />
          <div style={{ height: 4, background: "#FFFEFA", marginTop: 6 }} />
          <div style={{ height: 14, background: "#9DB4CE", marginTop: 6 }} />
        </div>
      </div>
    ),
    size
  );
}
