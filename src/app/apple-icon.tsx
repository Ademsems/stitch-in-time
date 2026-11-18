import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** App icon: the spool brandmark (white) on burgundy. */
export default function AppleIcon() {
  const svg = readFileSync(join(process.cwd(), "public", "branding", "stitch-in-time-icon-white.svg"));
  const icon = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#561B26",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} width={118} height={83} alt="" />
      </div>
    ),
    size
  );
}
