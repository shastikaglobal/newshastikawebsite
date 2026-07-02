/**
 * Site-wide ambient container ship silhouette.
 * Fixed, behind everything, 3% opacity, blue glow, slow horizontal drift.
 */
export default function ShipBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity: 0.03 }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          width: "180vw",
          left: "-40vw",
          animation: "ship-drift 90s linear infinite",
          filter:
            "drop-shadow(0 0 40px #2B8CFF) drop-shadow(0 0 120px #0A4DFF)",
        }}
      >
        <svg
          viewBox="0 0 1600 360"
          className="w-full h-auto"
          fill="#2B8CFF"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hull */}
          <path d="M60 240 L1540 240 L1460 320 L160 320 Z" />
          {/* Bow detail */}
          <path d="M1540 240 L1580 250 L1540 270 Z" />
          {/* Bridge / superstructure */}
          <rect x="200" y="170" width="120" height="70" />
          <rect x="220" y="140" width="80" height="30" />
          <rect x="245" y="110" width="30" height="30" />
          {/* Funnel */}
          <rect x="285" y="120" width="18" height="50" />
          {/* Container stacks */}
          {Array.from({ length: 22 }).map((_, i) => {
            const x = 360 + i * 50;
            const h = 30 + ((i * 17) % 4) * 12;
            return <rect key={`c1-${i}`} x={x} y={240 - h} width={46} height={h} />;
          })}
          {Array.from({ length: 22 }).map((_, i) => {
            const x = 360 + i * 50 + 4;
            const h = 18 + ((i * 11) % 3) * 14;
            return <rect key={`c2-${i}`} x={x} y={240 - h - 32} width={38} height={h} />;
          })}
          {Array.from({ length: 18 }).map((_, i) => {
            const x = 380 + i * 50 + 6;
            const h = 14 + ((i * 7) % 3) * 12;
            return <rect key={`c3-${i}`} x={x} y={240 - h - 60} width={32} height={h} />;
          })}
          {/* Mast */}
          <rect x="305" y="60" width="3" height="80" />
          {/* Antenna */}
          <rect x="260" y="80" width="2" height="30" />
        </svg>
      </div>
    </div>
  );
}
