import imgCoconutBrown  from "@/assets/kawaii_coconut_brown_transparent.png";
import imgCoconutGreen  from "@/assets/kawaii_coconut_green_transparent.png";
import imgBanana        from "@/assets/kawaii_banana_transparent.png";
import imgCucumber      from "@/assets/kawaii_cucumber_transparent.png";
import imgPumpkin       from "@/assets/kawaii_pumpkin_transparent.png";
import imgTomatoKawaii  from "@/assets/kawaii_tomato_transparent.png";

/* ─────────────────────────────────────────────────────
   WALKING PRODUCTS
   Each character marches LEFT → RIGHT across the strip.
   Legs are single-segment pendulums that swing clearly
   forward so the walking direction is unambiguous.
───────────────────────────────────────────────────── */

const WALKERS = [
  {
    id: "coconut_brown",
    src: imgCoconutBrown,
    alt: "Husked Coconut",
    size: 80,
    borderRadius: "0",
    stepDur: 0.55,
    travelDur: 14,
    startDelay: -6.9,
    legColor: "#8b5e3c",
    labelColor: "#d4a96a",
    label: "Husked Coconut",
  },
  {
    id: "coconut_green",
    src: imgCoconutGreen,
    alt: "Green Coconut",
    size: 80,
    borderRadius: "0",
    stepDur: 0.50,
    travelDur: 14,
    startDelay: -4.6,
    legColor: "#27ae60",
    labelColor: "#52e887",
    label: "Green Coconut",
  },
  {
    id: "banana",
    src: imgBanana,
    alt: "Banana",
    size: 80,
    borderRadius: "0",
    stepDur: 0.65,
    travelDur: 14,
    startDelay: -11.5,
    legColor: "#d4ac0d",
    labelColor: "#ffe066",
    label: "Banana",
  },
  {
    id: "cucumber",
    src: imgCucumber,
    alt: "Cucumber",
    size: 80,
    borderRadius: "0",
    stepDur: 0.48,
    travelDur: 14,
    startDelay: -9.2,
    legColor: "#1e8449",
    labelColor: "#48c774",
    label: "Cucumber",
  },
  {
    id: "pumpkin",
    src: imgPumpkin,
    alt: "Pumpkin",
    size: 80,
    borderRadius: "0",
    stepDur: 0.62,
    travelDur: 14,
    startDelay: -2.3,
    legColor: "#d35400",
    labelColor: "#ff9f40",
    label: "Pumpkin",
  },
  {
    id: "tomato",
    src: imgTomatoKawaii,
    alt: "Tomato",
    size: 80,
    borderRadius: "0",
    stepDur: 0.45,
    travelDur: 14,
    startDelay: -0,
    legColor: "#c0392b",
    labelColor: "#ff6b6b",
    label: "Tomato",
  },
];

/* ── Single walker character ── */
function Walker({ w }: { w: (typeof WALKERS)[0] }) {
  const { src, alt, size, borderRadius, stepDur: d, travelDur, startDelay, legColor, labelColor, label } = w;

  const legH  = Math.round(size * 0.50);
  const legW  = Math.round(size * 0.11);
  const footW = Math.round(legW * 2.6);
  const footH = Math.round(legW * 0.85);

  const legStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "relative",
    width: legW,
    height: legH,
    transformOrigin: "top center",
    animation: `step-fwd ${d}s ease-in-out ${side === "right" ? -(d / 2) : 0}s infinite`,
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        animation: `walk-across ${travelDur}s linear ${startDelay}s infinite`,
        willChange: "transform",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Body — bounces up/down with each step */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: `body-bob ${d}s ease-in-out infinite`,
        }}
      >
        {/* Product image */}
        <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
          <img
            src={src}
            alt={alt}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
              background: "transparent",
              userSelect: "none",
            } as React.CSSProperties}
          />
        </div>

        {/* ── Legs ── */}
        <div
          style={{
            display: "flex",
            gap: size * 0.20,
            marginTop: -3,
            alignItems: "flex-start",
          }}
        >
          {/* LEFT leg */}
          <div style={legStyle("left")}>
            <div
              style={{
                width: legW,
                height: legH - footH,
                background: `linear-gradient(180deg, ${legColor} 0%, ${legColor}cc 100%)`,
                borderRadius: `${legW}px ${legW}px ${legW * 0.4}px ${legW * 0.4}px`,
              }}
            />
            {/* Foot — points RIGHT (direction of travel) */}
            <div
              style={{
                width: footW,
                height: footH,
                marginLeft: -(footW - legW) / 2 + legW * 0.6,
                background: legColor,
                borderRadius: `${footH * 0.3}px ${footH * 0.8}px ${footH * 0.8}px ${footH * 0.3}px`,
              }}
            />
          </div>

          {/* RIGHT leg (opposite phase) */}
          <div style={legStyle("right")}>
            <div
              style={{
                width: legW,
                height: legH - footH,
                background: `linear-gradient(180deg, ${legColor} 0%, ${legColor}cc 100%)`,
                borderRadius: `${legW}px ${legW}px ${legW * 0.4}px ${legW * 0.4}px`,
              }}
            />
            <div
              style={{
                width: footW,
                height: footH,
                marginLeft: -(footW - legW) / 2 + legW * 0.6,
                background: legColor,
                borderRadius: `${footH * 0.3}px ${footH * 0.8}px ${footH * 0.8}px ${footH * 0.3}px`,
              }}
            />
          </div>
        </div>

        {/* Ground shadow */}
        <div
          style={{
            width: size * 0.6,
            height: 6,
            marginTop: 2,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.38) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(3px)",
            animation: `shadow-breathe ${d}s ease-in-out infinite`,
          }}
        />

        {/* Label */}
        <div
          style={{
            marginTop: 6,
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: labelColor,
            fontWeight: 700,
            opacity: 0.9,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   WALKING PRODUCTS STRIP
───────────────────────────────────────────────────── */
export default function WalkingProducts() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        padding: "2rem 0 1rem",
        position: "relative",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(43,140,255,0.8)",
            marginBottom: "0.5rem",
          }}
        >
          Fresh · Farm · Export
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            color: "rgba(217,228,245,0.4)",
            textTransform: "uppercase",
          }}
        >
          Meet our premium produce
        </div>
      </div>

      {/* Stage */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(180px, 24vw, 260px)",
          overflow: "hidden",
        }}
      >
        {WALKERS.map((w) => (
          <Walker key={w.id} w={w} />
        ))}
      </div>

      {/* Ground line */}
      <div
        style={{
          width: "100%",
          height: 1,
          marginTop: "1.5rem",
          background:
            "linear-gradient(to right, transparent, rgba(43,140,255,0.2) 20%, rgba(43,140,255,0.35) 50%, rgba(43,140,255,0.2) 80%, transparent)",
        }}
      />
    </div>
  );
}
