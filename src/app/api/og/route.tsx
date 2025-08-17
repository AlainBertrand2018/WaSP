/* app/api/og/route.tsx */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";

// Default canvas
const WIDTH = 1200;
const HEIGHT = 630;

// Brand palette (tweak if you like)
const BRAND = {
  bgStart: "#0b1a2b",   // deep navy
  bgEnd:   "#0e3d47",   // teal-blue
  card:    "rgba(255,255,255,0.06)",
  text:    "#eaf3f6",
  accent:  "#4ad6d9",   // aqua accent
  hair:    "rgba(255,255,255,0.12)",
};

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);

  const title =
    searchParams.get("title") ??
    "BusinessStudio AI";
  const subtitle =
    searchParams.get("subtitle") ??
    "Validate ideas, model finances, and create investor-ready plans";
  const w = Number(searchParams.get("w") || WIDTH);
  const h = Number(searchParams.get("h") || HEIGHT);

  // Optional overrides via query: ?bgStart=#112233&bgEnd=#445566
  const bgStart = searchParams.get("bgStart") ?? BRAND.bgStart;
  const bgEnd   = searchParams.get("bgEnd")   ?? BRAND.bgEnd;

  // Logo handling: use absolute path to your public file, or pass ?logo=https://...
  const logoParam = searchParams.get("logo");
  const logoUrl =
    logoParam && /^https?:\/\//i.test(logoParam)
      ? logoParam
      : `${origin}${logoParam || "/og/bsai-logo.png"}`;

  // If the logo path 404s, <img> will simply not render; that’s OK.
  // (No external font fetches to keep this endpoint zero-dependency and fast.)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundImage: `linear-gradient(135deg, ${bgStart}, ${bgEnd})`,
          color: BRAND.text,
          letterSpacing: "-0.01em",
        }}
      >
        {/* Subtle grid / hairlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1000px 600px at 80% -10%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(800px 500px at -10% 110%, rgba(74,214,217,0.18), transparent 60%)",
          }}
        />

        {/* Border hairline */}
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: 24,
            border: `1px solid ${BRAND.hair}`,
          }}
        />

        {/* Header row */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 52,
            right: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* If the logo exists it will render; if not, the wordmark still shows */}
            <img
              alt="BusinessStudio AI logo"
              src={logoUrl}
              width={88}
              height={88}
              style={{
                display: "block",
                objectFit: "contain",
                borderRadius: 16,
                background: "rgba(255,255,255,0.06)",
                padding: 12,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                BusinessStudio AI
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 20,
                  opacity: 0.8,
                }}
              >
                Mauritius • Webapps-as-Software (WaSP)
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 18px",
              borderRadius: 999,
              background: BRAND.card,
              fontSize: 18,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: BRAND.accent,
                boxShadow: `0 0 12px ${BRAND.accent}`,
              }}
            />
            <span>AI-powered tools for SMEs</span>
          </div>
        </div>

        {/* Main card */}
        <div
          style={{
            position: "absolute",
            left: 52,
            right: 52,
            top: 160,
            bottom: 52,
            borderRadius: 28,
            background: BRAND.card,
            display: "flex",
            padding: 56,
            gap: 42,
          }}
        >
          {/* Decorative bars */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              background:
                "linear-gradient(90deg, rgba(74,214,217,0.0), rgba(74,214,217,0.8), rgba(74,214,217,0.0))",
            }}
          />

          {/* Left: headline */}
          <div style={{ flex: 1.4, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.08,
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 28,
                lineHeight: 1.35,
                opacity: 0.9,
                maxWidth: 820,
              }}
            >
              {subtitle}
            </div>

            {/* CTA line */}
            <div
              style={{
                marginTop: 36,
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 22,
                opacity: 0.9,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: BRAND.accent,
                  boxShadow: `0 0 14px ${BRAND.accent}`,
                }}
              />
              <span>From Idea to Investor-Ready</span>
            </div>
          </div>

          {/* Right: abstract device card */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 420,
                height: 270,
                borderRadius: 24,
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                padding: 20,
                boxShadow: "0 10px 40px rgba(0,0,0,0.25) inset",
                border: `1px solid ${BRAND.hair}`,
                gap: 10,
              }}
            >
              <div
                style={{
                  height: 26,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.16)",
                }}
              />
              <div
                style={{
                  height: 26,
                  width: "72%",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.12)",
                }}
              />
              <div
                style={{
                  flex: 1,
                  marginTop: 6,
                  borderRadius: 16,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                  border: `1px dashed ${BRAND.hair}`,
                }}
              />
              <div
                style={{
                  height: 14,
                  width: "38%",
                  borderRadius: 8,
                  background: BRAND.accent,
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: 52,
            right: 52,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            opacity: 0.85,
          }}
        >
          <div>business-studio-ai.online</div>
          <div>© {new Date().getFullYear()} BusinessStudio AI</div>
        </div>
      </div>
    ),
    {
      width: w,
      height: h,
    }
  );
}
