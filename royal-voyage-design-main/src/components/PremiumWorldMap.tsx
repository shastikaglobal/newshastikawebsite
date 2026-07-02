import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────
   PREMIUM WORLD MAP — Blue-themed 3D interactive map
   India as export hub, animated shipping routes to
   UAE, Saudi Arabia, Qatar, Kuwait, Oman, UK, Germany,
   Netherlands, Singapore, Malaysia.
   Uses inline SVG world paths + CSS animation.
───────────────────────────────────────────────────── */

const HUB = { name: "India", cx: 71.6, cy: 41 };

const DESTINATIONS = [
  { name: "UAE",         cx: 65.0, cy: 39.5, icon: "✈" },
  { name: "Saudi Arabia",cx: 62.5, cy: 40.0, icon: "🚢" },
  { name: "Qatar",       cx: 64.2, cy: 39.2, icon: "✈" },
  { name: "Kuwait",      cx: 63.0, cy: 37.5, icon: "🚢" },
  { name: "Oman",        cx: 65.6, cy: 41.0, icon: "✈" },
  { name: "UK",          cx: 49.4, cy: 24.0, icon: "✈" },
  { name: "Germany",     cx: 52.7, cy: 26.0, icon: "🚢" },
  { name: "Netherlands", cx: 51.4, cy: 25.0, icon: "✈" },
  { name: "Singapore",   cx: 78.6, cy: 52.5, icon: "🚢" },
  { name: "Malaysia",    cx: 78.3, cy: 51.0, icon: "✈" },
];

/* Build quadratic bezier arc path between hub and destination */
function buildArc(h: typeof HUB, d: (typeof DESTINATIONS)[0]) {
  const mx = (h.cx + d.cx) / 2;
  const lift = 14 + Math.abs(h.cx - d.cx) * 0.28;
  const my = Math.min(h.cy, d.cy) - lift;
  return `M ${h.cx} ${h.cy} Q ${mx} ${my}, ${d.cx} ${d.cy}`;
}

export default function PremiumWorldMap() {
  const arcs = DESTINATIONS.map((d, i) => ({
    ...d,
    path: buildArc(HUB, d),
    delay: i * 0.28,
    shipDur: 7 + (i % 4) * 1.5,
  }));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: "linear-gradient(180deg, #020814 0%, #050b18 60%, #020a1a 100%)",
        boxShadow:
          "0 0 0 1px rgba(43,140,255,0.18), 0 0 80px -20px rgba(43,140,255,0.35), 0 40px 120px -40px rgba(10,77,255,0.4)",
      }}
    >
      {/* ── Volumetric glow centred on India ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 45% 40% at ${HUB.cx}% ${HUB.cy}%,
              rgba(10,77,255,0.22) 0%,
              rgba(43,140,255,0.08) 40%,
              transparent 70%)
          `,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* ── Top vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(2,8,20,0.75) 0%, transparent 30%, rgba(2,8,20,0.55) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ── SVG: world outline + routes ── */}
      <svg
        viewBox="0 0 100 56.25"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Route gradient */}
          <linearGradient id="routeBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#0A4DFF" stopOpacity="0.05" />
            <stop offset="40%"  stopColor="#2B8CFF" stopOpacity="0.9" />
            <stop offset="70%"  stopColor="#7FB6FF" stopOpacity="1"   />
            <stop offset="100%" stopColor="#0A4DFF" stopOpacity="0.05" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="routeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* India pulse glow */}
          <filter id="hubGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dot glow */}
          <filter id="dotGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="0.35" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Grid pattern */}
          <pattern id="mapGrid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(43,140,255,0.06)" strokeWidth="0.15"/>
          </pattern>

          {/* Particle filter */}
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="0.15" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Grid background */}
        <rect width="100" height="56.25" fill="url(#mapGrid)" />

        {/* Simplified world continent fills — just enough shape to read as a map */}
        {/* North America */}
        <path d="M14 12 L22 10 L26 14 L24 20 L20 26 L16 28 L12 22 L10 16 Z"
          fill="rgba(43,140,255,0.07)" stroke="rgba(43,140,255,0.22)" strokeWidth="0.2"/>
        {/* South America */}
        <path d="M22 30 L28 28 L30 36 L28 46 L24 50 L20 44 L18 36 Z"
          fill="rgba(43,140,255,0.07)" stroke="rgba(43,140,255,0.22)" strokeWidth="0.2"/>
        {/* Europe */}
        <path d="M46 20 L56 18 L58 24 L54 28 L48 28 L44 24 Z"
          fill="rgba(43,140,255,0.09)" stroke="rgba(43,140,255,0.25)" strokeWidth="0.2"/>
        {/* Africa */}
        <path d="M48 30 L58 28 L62 36 L60 46 L54 52 L48 48 L44 38 Z"
          fill="rgba(43,140,255,0.07)" stroke="rgba(43,140,255,0.22)" strokeWidth="0.2"/>
        {/* Middle East */}
        <path d="M58 32 L68 30 L70 36 L66 40 L60 40 Z"
          fill="rgba(43,140,255,0.1)" stroke="rgba(43,140,255,0.28)" strokeWidth="0.2"/>
        {/* Russia/Central Asia */}
        <path d="M56 10 L80 8 L84 16 L80 20 L68 22 L58 20 L52 16 Z"
          fill="rgba(43,140,255,0.06)" stroke="rgba(43,140,255,0.2)" strokeWidth="0.2"/>
        {/* India — highlighted */}
        <path d="M68 30 L76 30 L78 38 L74 46 L70 44 L66 36 Z"
          fill="rgba(43,140,255,0.2)" stroke="rgba(43,140,255,0.5)" strokeWidth="0.3"/>
        {/* Southeast Asia */}
        <path d="M76 34 L84 32 L86 40 L82 44 L76 42 Z"
          fill="rgba(43,140,255,0.08)" stroke="rgba(43,140,255,0.22)" strokeWidth="0.2"/>
        {/* China/East Asia */}
        <path d="M76 14 L90 12 L92 22 L86 28 L78 28 L74 20 Z"
          fill="rgba(43,140,255,0.07)" stroke="rgba(43,140,255,0.2)" strokeWidth="0.2"/>
        {/* Australia */}
        <path d="M78 44 L88 42 L90 50 L86 54 L78 52 Z"
          fill="rgba(43,140,255,0.07)" stroke="rgba(43,140,255,0.2)" strokeWidth="0.2"/>

        {/* ── Shipping route arcs ── */}
        {arcs.map((arc, i) => (
          <g key={arc.name}>
            {/* Base faint line */}
            <path
              d={arc.path}
              fill="none"
              stroke="rgba(43,140,255,0.18)"
              strokeWidth="0.22"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated glow dash */}
            <path
              d={arc.path}
              fill="none"
              stroke="url(#routeBlue)"
              strokeWidth="0.38"
              strokeLinecap="round"
              strokeDasharray="4 7"
              filter="url(#routeGlow)"
              vectorEffect="non-scaling-stroke"
              style={{
                animation: `map-dash-flow 3.5s linear ${arc.delay}s infinite`,
              }}
            />
            {/* Traveling vessel dot */}
            <circle r="0.55" fill="#ffffff" filter="url(#dotGlow)">
              <animateMotion
                dur={`${arc.shipDur}s`}
                begin={`${arc.delay}s`}
                repeatCount="indefinite"
                path={arc.path}
              />
            </circle>
            {/* Second vessel (offset) */}
            <circle r="0.32" fill="#7FB6FF" filter="url(#dotGlow)" opacity="0.8">
              <animateMotion
                dur={`${arc.shipDur * 1.4}s`}
                begin={`${arc.delay + arc.shipDur * 0.5}s`}
                repeatCount="indefinite"
                path={arc.path}
              />
            </circle>
          </g>
        ))}

        {/* ── Destination pins ── */}
        {DESTINATIONS.map((d, i) => (
          <g key={d.name}>
            {/* Pulse ring */}
            <circle cx={d.cx} cy={d.cy} r="0.9" fill="none" stroke="rgba(43,140,255,0.5)" strokeWidth="0.25"
              style={{ animation: `map-pin-pulse 2.4s ease-out ${i * 0.22}s infinite` }} />
            {/* Core dot */}
            <circle cx={d.cx} cy={d.cy} r="0.45" fill="#7FB6FF" filter="url(#dotGlow)" />
          </g>
        ))}

        {/* ── India hub ── */}
        <g>
          {/* Outer glow ring 1 */}
          <circle cx={HUB.cx} cy={HUB.cy} r="2.4" fill="none"
            stroke="rgba(43,140,255,0.22)" strokeWidth="0.3"
            style={{ animation: "map-hub-ring 2.4s ease-out 0s infinite" }} />
          {/* Outer glow ring 2 */}
          <circle cx={HUB.cx} cy={HUB.cy} r="1.6" fill="none"
            stroke="rgba(43,140,255,0.4)" strokeWidth="0.3"
            style={{ animation: "map-hub-ring 2.4s ease-out 0.8s infinite" }} />
          {/* Core */}
          <circle cx={HUB.cx} cy={HUB.cy} r="0.7"
            fill="#2B8CFF" filter="url(#hubGlow)" />
          {/* Center dot */}
          <circle cx={HUB.cx} cy={HUB.cy} r="0.3" fill="#ffffff" />
        </g>

        {/* ── Ambient blue particles ── */}
        {Array.from({ length: 18 }).map((_, i) => {
          const px = 10 + (i * 73 % 80);
          const py = 8 + (i * 47 % 40);
          const sz = 0.12 + (i % 4) * 0.08;
          return (
            <circle
              key={i}
              cx={px} cy={py} r={sz}
              fill="#7FB6FF"
              filter="url(#particleGlow)"
              opacity={0.3 + (i % 3) * 0.15}
              style={{
                animation: `map-particle-float ${5 + (i % 4)}s ease-in-out ${(i * 0.4) % 4}s infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* ── Glassmorphism HUD overlays ── */}
      {/* Live network badge */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.4rem 0.85rem",
          borderRadius: "999px",
          background: "linear-gradient(135deg, rgba(10,77,255,0.14), rgba(255,255,255,0.05))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(43,140,255,0.25)",
          fontSize: "0.6rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#7FB6FF",
          boxShadow: "0 4px 20px rgba(10,77,255,0.2)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#2B8CFF",
            boxShadow: "0 0 8px #2B8CFF",
            animation: "blink 1.6s ease-in-out infinite",
          }}
        />
        Live Network
      </div>

      {/* Active lanes badge */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 10,
          padding: "0.4rem 0.85rem",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.6rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(217,228,245,0.6)",
        }}
      >
        10 Active Lanes
      </div>

      {/* India label */}
      <div
        style={{
          position: "absolute",
          left: `${HUB.cx}%`,
          top: `${HUB.cy + 6}%`,
          transform: "translateX(-50%)",
          zIndex: 10,
          padding: "0.3rem 0.7rem",
          borderRadius: "999px",
          background: "rgba(10,77,255,0.18)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(43,140,255,0.3)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#fff",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 12px rgba(43,140,255,0.25)",
        }}
      >
        India · Origin Hub
      </div>

      {/* Bottom stat strip */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "1.5rem",
          padding: "0.5rem 1.5rem",
          borderRadius: "999px",
          background: "rgba(5,11,24,0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(43,140,255,0.15)",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          color: "rgba(217,228,245,0.6)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {["Middle East", "Europe", "Asia-Pacific"].map((r) => (
          <span key={r} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2B8CFF" }} />
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
