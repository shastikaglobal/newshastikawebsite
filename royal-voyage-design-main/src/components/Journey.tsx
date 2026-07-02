import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Package, Leaf, Sparkles, Warehouse, Ship, Globe2, ShieldCheck, Boxes, Truck, MapPin, Route, Anchor, Snowflake, Apple, Carrot, Banana, ChevronDown, ChevronUp } from "lucide-react";

type Card = { icon: React.ComponentType<{ className?: string }>; title: string; desc: string };
type Scene = {
  id: string;
  num: string;
  title: string;
  heading: string;
  desc: string;
  cards: [Card, Card, Card];
  render: (p: number) => React.ReactNode;
};

const Glow = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 ${className}`}>
    <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,120,255,0.35),transparent_60%)] blur-3xl" />
  </div>
);

const Particles = ({ count = 28 }: { count?: number }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => {
      const left = (i * 37) % 100;
      const top = (i * 53) % 100;
      const dur = 6 + (i % 7);
      return (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-sky-300/70 shadow-[0_0_8px_2px_rgba(120,170,255,0.7)]"
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: dur, repeat: Infinity, delay: (i % 5) * 0.4, ease: "easeInOut" }}
        />
      );
    })}
  </div>
);

const Smoke = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute -bottom-20 h-[60%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(80,140,255,0.35),transparent_70%)] blur-3xl"
        style={{ left: `${10 + i * 25}%` }}
        animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ---------- Scene Renderers ----------
const SceneCrate = (p: number) => (
  <div className="relative h-full w-full">
    <Glow />
    <Smoke />
    <Particles />
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ rotate: p * 360, scale: 0.9 + p * 0.2 }}
    >
      <div className="relative h-56 w-56 [transform-style:preserve-3d]" style={{ transform: `rotateX(25deg) rotateY(${p * 180}deg)` }}>
        {[
          { t: "translateZ(112px)" },
          { t: "translateZ(-112px) rotateY(180deg)" },
          { t: "rotateY(90deg) translateZ(112px)" },
          { t: "rotateY(-90deg) translateZ(112px)" },
          { t: "rotateX(90deg) translateZ(112px)" },
          { t: "rotateX(-90deg) translateZ(112px)" },
        ].map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 border-2 border-amber-200/40 bg-gradient-to-br from-amber-900/80 via-amber-800/70 to-amber-950/90 shadow-[inset_0_0_40px_rgba(0,0,0,0.6),0_0_60px_rgba(56,120,255,0.5)]"
            style={{ transform: f.t }}
          >
            <div className="absolute inset-2 border border-amber-300/20" />
            <div className="absolute inset-x-3 top-1/2 h-1 bg-amber-300/20" />
          </div>
        ))}
      </div>
    </motion.div>
    <div className="absolute inset-x-0 bottom-6 text-center text-xs uppercase tracking-[0.4em] text-sky-200/60">
      Origin · Handcrafted Crate
    </div>
  </div>
);

const SceneWalk = (p: number) => {
  const items = [Apple, Carrot, Banana, Leaf];
  return (
    <div className="relative h-full w-full">
      <Glow />
      <Particles count={20} />
      <div className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
      {items.map((Icon, i) => {
        const x = -20 + ((p * 100 + i * 22) % 120);
        return (
          <motion.div
            key={i}
            className="absolute bottom-[33%]"
            style={{ left: `${x}%` }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          >
            <div className="grid h-14 w-14 -translate-y-7 place-items-center rounded-full border border-sky-300/40 bg-sky-500/10 backdrop-blur-xl shadow-[0_0_30px_rgba(80,150,255,0.5)]">
              <Icon className="h-6 w-6 text-sky-100" />
            </div>
          </motion.div>
        );
      })}
      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <Package className="h-24 w-24 text-amber-200/80 drop-shadow-[0_0_30px_rgba(56,120,255,0.6)]" />
      </div>
    </div>
  );
};

const ScenePack = (p: number) => (
  <div className="relative h-full w-full">
    <Glow />
    <Smoke />
    <Particles count={40} />
    <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ scale: 1 + p * 0.1 }}>
      <Package className="h-40 w-40 text-amber-200/90 drop-shadow-[0_0_60px_rgba(56,120,255,0.9)]" />
    </motion.div>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i / 6) * Math.PI * 2 + p * Math.PI * 2;
      const r = 120 * (1 - p);
      return (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/30 backdrop-blur-xl ring-1 ring-sky-200/40"
          style={{ x: Math.cos(angle) * r, y: Math.sin(angle) * r, opacity: 1 - p }}
        />
      );
    })}
    <div className="absolute inset-x-0 bottom-6 text-center text-xs uppercase tracking-[0.4em] text-sky-200/60">
      Precision Packing · QC Verified
    </div>
  </div>
);

const SceneWarehouse = (p: number) => (
  <div className="relative h-full w-full overflow-hidden">
    <Glow />
    <Particles count={18} />
    <div className="absolute inset-x-0 bottom-0 h-2/3 [perspective:800px]">
      <div className="absolute inset-0" style={{ transform: "rotateX(55deg)", transformOrigin: "bottom" }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(80,150,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(80,150,255,0.25)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
    </div>
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="absolute bottom-[28%] h-20 w-24 rounded-md border border-amber-200/40 bg-gradient-to-b from-amber-800/80 to-amber-950/90 shadow-[0_0_30px_rgba(56,120,255,0.5)]"
        style={{ left: `${10 + i * 18}%` }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
    <motion.div className="absolute bottom-[28%]" style={{ left: `${10 + p * 70}%` }}>
      <Truck className="h-12 w-12 text-sky-200 drop-shadow-[0_0_20px_rgba(80,150,255,0.9)]" />
    </motion.div>
  </div>
);

const SceneShip = (p: number) => (
  <div className="relative h-full w-full overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900" />
    <Glow />
    <div className="absolute inset-x-0 bottom-0 h-1/3">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-x-0 h-px bg-sky-300/40"
          style={{ bottom: `${i * 25}%` }}
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
    <motion.div className="absolute bottom-[35%]" style={{ left: `${-20 + p * 100}%` }}>
      <Ship className="h-32 w-32 text-sky-100 drop-shadow-[0_0_40px_rgba(80,150,255,0.9)]" />
    </motion.div>
    <Particles count={14} />
  </div>
);

const SceneGlobe = (p: number) => (
  <div className="relative h-full w-full overflow-hidden">
    <Glow />
    <Particles count={30} />
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ rotate: p * 180 }}
    >
      <div className="relative h-72 w-72 rounded-full border-2 border-sky-300/40 bg-[radial-gradient(circle_at_30%_30%,rgba(56,120,255,0.4),rgba(10,20,40,0.95)_70%)] shadow-[0_0_80px_rgba(56,120,255,0.7),inset_0_0_60px_rgba(56,120,255,0.4)]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-sky-300/20"
            style={{ transform: `rotateY(${i * 36}deg) rotateX(20deg)` }}
          />
        ))}
        {[20, 50, 70, 30, 60].map((y, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_12px_4px_rgba(255,200,80,0.8)]"
            style={{ left: `${15 + i * 18}%`, top: `${y}%` }}
            animate={{ scale: [1, 1.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);

const SCENES: Scene[] = [
  {
    id: "01", num: "01", title: "Origin",
    heading: "It begins with a crate.",
    desc: "A handcrafted wooden vessel — the first chapter of a global journey from Indian soil.",
    cards: [
      { icon: Package, title: "Handcrafted Crate", desc: "Built for the sea." },
      { icon: Sparkles, title: "Export Ready", desc: "Tested. Certified." },
      { icon: Leaf, title: "Farm Fresh", desc: "Picked at sunrise." },
    ],
    render: SceneCrate,
  },
  {
    id: "02", num: "02", title: "Harvest",
    heading: "Nature, on the move.",
    desc: "Coconuts, tomatoes, bananas — every product walks its way toward the export crate.",
    cards: [
      { icon: Apple, title: "Coconut", desc: "Coastal Tamil Nadu." },
      { icon: Carrot, title: "Tomato", desc: "Vine-ripened. Hand-picked." },
      { icon: Banana, title: "Banana", desc: "Premium Cavendish." },
    ],
    render: SceneWalk,
  },
  {
    id: "03", num: "03", title: "Packing",
    heading: "Precision in every fold.",
    desc: "Quality inspection, climate-aware packing, and export-grade sealing — all under one roof.",
    cards: [
      { icon: ShieldCheck, title: "Quality Inspection", desc: "Triple-checked." },
      { icon: Boxes, title: "Precision Packing", desc: "Climate-grade." },
      { icon: Sparkles, title: "Export Standards", desc: "APEDA · HACCP." },
    ],
    render: ScenePack,
  },
  {
    id: "04", num: "04", title: "Warehouse",
    heading: "Stored like treasure.",
    desc: "Temperature-controlled warehouses keep every shipment in pristine condition.",
    cards: [
      { icon: Warehouse, title: "Warehouse", desc: "200,000 sq ft." },
      { icon: Snowflake, title: "Cold Storage", desc: "2°C to 8°C." },
      { icon: Truck, title: "Logistics", desc: "Fleet on demand." },
    ],
    render: SceneWarehouse,
  },
  {
    id: "05", num: "05", title: "Voyage",
    heading: "Across oceans, on time.",
    desc: "Sealed containers board cargo vessels bound for ports across three continents.",
    cards: [
      { icon: Ship, title: "Cargo Ship", desc: "Reefer containers." },
      { icon: Anchor, title: "Global Shipping", desc: "40+ ports." },
      { icon: ShieldCheck, title: "Secure Delivery", desc: "Insured. Tracked." },
    ],
    render: SceneShip,
  },
  {
    id: "06", num: "06", title: "Global",
    heading: "From India to the world.",
    desc: "A holographic network connecting India to ten premium export destinations.",
    cards: [
      { icon: MapPin, title: "India Hub", desc: "Chennai · Tuticorin." },
      { icon: Globe2, title: "Global Markets", desc: "GCC · EU · APAC." },
      { icon: Route, title: "Export Routes", desc: "10 active corridors." },
    ],
    render: SceneGlobe,
  },
];

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);
  // Refs to avoid stale closure in event handlers
  const activeRef = useRef(0);
  const isAnimating = useRef(false);
  const isLockedRef = useRef(false);

  const scene = SCENES[active];

  // Animate localProgress 0→1 on each scene change for scene renderers
  useEffect(() => {
    setLocalProgress(0);
    const start = performance.now();
    const DURATION = 900;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setLocalProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Scroll-jack: intercept wheel events while the section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Lock/unlock when section occupies the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isLockedRef.current = entry.intersectionRatio >= 0.85;
      },
      { threshold: [0, 0.85, 1] }
    );
    observer.observe(section);

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isLockedRef.current) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 30) return; // ignore tiny swipes
      handleDirectionChange(deltaY > 0);
    };

    const handleDirectionChange = (goingDown: boolean) => {
      if (isAnimating.current) return;
      const curr = activeRef.current;

      if (goingDown && curr < SCENES.length - 1) {
        // Advance scene — prevent page scroll
        isAnimating.current = true;
        const next = curr + 1;
        activeRef.current = next;
        setActive(next);
        setTimeout(() => { isAnimating.current = false; }, 750);
        return true;
      } else if (!goingDown && curr > 0) {
        // Go back a scene — prevent page scroll
        isAnimating.current = true;
        const prev = curr - 1;
        activeRef.current = prev;
        setActive(prev);
        setTimeout(() => { isAnimating.current = false; }, 750);
        return true;
      }
      return false; // at boundary → let page scroll
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isLockedRef.current) return;
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      const goingDown = e.deltaY > 0;
      const prevented = handleDirectionChange(goingDown);
      if (prevented) e.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const isFirst = active === 0;
  const isLast = active === SCENES.length - 1;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#0b1a3a_0%,#05070f_60%,#02030a_100%)]"
    >
      {/* Ambient ship silhouette */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-0 flex items-center opacity-[0.03]"
        animate={{ x: ["-10%", "110%"] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <Ship className="h-[60vh] w-[60vh] text-sky-200 drop-shadow-[0_0_80px_rgba(80,150,255,0.5)]" />
      </motion.div>

      {/* Main grid */}
      <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-[40%_60%]">
        {/* LEFT: typography */}
        <div className="flex flex-col justify-center gap-8 px-10 py-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-sky-300/80">
                Scene {scene.num} · {scene.title}
              </div>
              <h2 className="font-serif text-5xl leading-[1.05] tracking-tight text-white lg:text-7xl">
                {scene.heading.split(" ").map((w, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent"> {w}</span>
                  ) : (
                    <span key={i}>{i > 0 ? " " : ""}{w}</span>
                  )
                )}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300/90">{scene.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="mt-4 flex items-center gap-3">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  if (!isAnimating.current) {
                    activeRef.current = i;
                    setActive(i);
                  }
                }}
                className="flex items-center gap-2"
                aria-label={`Go to scene ${s.num}`}
              >
                <div className={`relative h-1 overflow-hidden rounded-full transition-all duration-300 ${i === active ? "w-16 bg-sky-500/20" : "w-6 bg-slate-700/60"}`}>
                  {i === active && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-300 to-blue-500 shadow-[0_0_10px_rgba(80,150,255,0.9)]"
                      style={{ width: `${localProgress * 100}%` }}
                    />
                  )}
                  {i < active && <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-blue-500" />}
                </div>
                <span className={`text-[10px] font-medium tracking-widest ${i === active ? "text-sky-300" : "text-slate-500"}`}>{s.num}</span>
              </button>
            ))}
          </div>

          {/* Scroll hint arrows */}
          <div className="flex items-center gap-3 mt-2">
            {!isFirst && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-sky-400/60"
              >
                <ChevronUp className="h-3 w-3" /> Scroll up
              </motion.div>
            )}
            {!isLast && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-sky-400/60"
              >
                <ChevronDown className="h-3 w-3" /> Scroll down
              </motion.div>
            )}
            {isLast && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-emerald-400/70"
              >
                <ChevronDown className="h-3 w-3" /> Continue scrolling
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT: scene panel + cards */}
        <div className="grid h-full grid-rows-[1fr_auto] gap-4 p-4 lg:p-8">
          {/* Scene visual */}
          <div className="relative overflow-hidden rounded-3xl border border-sky-300/20 bg-gradient-to-br from-slate-950/80 via-blue-950/40 to-slate-950/80 shadow-[0_0_60px_rgba(56,120,255,0.25),inset_0_0_60px_rgba(56,120,255,0.1)] backdrop-blur-xl">
            <AnimatePresence mode="sync">
              <motion.div
                key={scene.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {scene.render(localProgress)}
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
          </div>

          {/* Bottom 3 cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-3 gap-3 lg:gap-5"
            >
              {scene.cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={i}
                    variants={{
                      initial: { opacity: 0, y: 30, scale: 0.95 },
                      animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, y: -20, scale: 0.97, transition: { duration: 0.3 } }
                    }}
                    whileHover={{ y: -6, boxShadow: "0 0 40px rgba(80,150,255,0.5)" }}
                    className="group relative overflow-hidden rounded-2xl border border-sky-300/20 bg-white/[0.04] p-5 backdrop-blur-2xl transition-shadow"
                  >
                    <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-sky-400/0 via-transparent to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500/30 to-blue-700/30 ring-1 ring-sky-300/40 shadow-[0_0_20px_rgba(80,150,255,0.4)]">
                      <Icon className="h-5 w-5 text-sky-100" />
                    </div>
                    <div className="text-sm font-semibold text-white">{c.title}</div>
                    <div className="mt-1 text-xs text-slate-400">{c.desc}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
