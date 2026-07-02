import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Sparkles, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

import CrateScene3D from "@/components/CrateScene3D";
import Warehouse3D from "@/components/Warehouse3D";

import pCoconut from "@/assets/product-coconut.jpg";
import pTomato from "@/assets/product-tomato.jpg";
import pCucumber from "@/assets/product-cucumber.jpg";
import pWatermelon from "@/assets/product-watermelon.jpg";
import pPumpkin from "@/assets/product-pumpkin.jpg";
import pBanana from "@/assets/product-banana.jpg";
import worldMap from "@/assets/world-map.jpg";

/* ============================================================
   SCENE 01 — THE ORIGIN
   Single luxury crate, royal blue spotlight, slow camera orbit
   ============================================================ */
function OriginScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.4, 4.8], fov: 42 }} gl={{ antialias: true, alpha: true }} className="!h-full !w-full">
      <color attach="background" args={["#04081a"]} />
      <fog attach="fog" args={["#04081a", 4, 14]} />
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 6, 2]} angle={0.45} penumbra={0.8} intensity={4} color="#2B8CFF" castShadow />
      <pointLight position={[-3, 1, 2]} intensity={1.5} color="#0A4DFF" distance={10} />
      <Suspense fallback={null}>
        <OriginCrate />
        <SmokeStack />
        <Sparkles count={120} scale={8} size={2.5} speed={0.3} color="#7fb3ff" />
        <Environment preset="city" />
      </Suspense>
      <OrbitRig radius={4.8} height={1.6} speed={0.18} />
    </Canvas>
  );
}
function OriginCrate() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, dt) => { if (group.current) group.current.rotation.y += dt * 0.1; });
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3a2a1a"), roughness: 0.8, metalness: 0.1,
    emissive: new THREE.Color("#0a1a3a"), emissiveIntensity: 0.18,
  }), []);
  const W = 2.4, H = 1.6, D = 2.0, T = 0.08;
  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <mesh material={mat} position={[0, -H / 2, 0]}><boxGeometry args={[W, T, D]} /></mesh>
      <mesh material={mat} position={[-W / 2, 0, 0]}><boxGeometry args={[T, H, D]} /></mesh>
      <mesh material={mat} position={[W / 2, 0, 0]}><boxGeometry args={[T, H, D]} /></mesh>
      <mesh material={mat} position={[0, 0, -D / 2]}><boxGeometry args={[W, H, T]} /></mesh>
      <mesh material={mat} position={[0, 0, D / 2]}><boxGeometry args={[W, H, T]} /></mesh>
      <mesh position={[0, H / 2, 0]}>
        <torusGeometry args={[1.45, 0.025, 8, 64]} />
        <meshBasicMaterial color="#2B8CFF" toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ============================================================
   SCENE 02 — FRESH ARRIVAL
   Produce "walking" toward the crate with bouncing/swaying
   ============================================================ */
function FreshArrivalScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.6, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }} className="!h-full !w-full">
      <color attach="background" args={["#04081a"]} />
      <fog attach="fog" args={["#04081a", 5, 16]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 6, 4]} intensity={1.2} color="#bcd6ff" />
      <pointLight position={[0, 2, 2]} intensity={2.4} color="#2B8CFF" distance={10} />
      <Suspense fallback={null}>
        <OriginCrate />
        <WalkingProducts />
        <Ground />
        <Sparkles count={100} scale={10} size={2.2} speed={0.3} color="#7fb3ff" />
        <Environment preset="sunset" />
      </Suspense>
      <OrbitRig radius={5.5} height={1.8} speed={0.1} />
    </Canvas>
  );
}
function WalkingProducts() {
  const textures = useLoader(TextureLoader, [pCoconut, pTomato, pCucumber, pWatermelon, pPumpkin, pBanana]);
  textures.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace));
  const styles = [
    { size: 0.4, bounce: 0.15, rollSpeed: 1.2 },  // coconut
    { size: 0.3, bounce: 0.35, rollSpeed: 1.6 },  // tomato bounces
    { size: 0.32, bounce: 0.08, sway: 0.4 },      // cucumber sways
    { size: 0.5, bounce: 0.1, rollSpeed: 2.0 },   // watermelon rolls
    { size: 0.42, bounce: 0.05, heavy: true },    // pumpkin heavy
    { size: 0.32, bounce: 0.1, sway: 0.6 },       // banana swings
  ];
  return (
    <>
      {textures.map((tex, i) => (
        <WalkingProduct key={i} texture={tex} index={i} total={textures.length} {...styles[i]} />
      ))}
    </>
  );
}
function WalkingProduct({ texture, index, total, size = 0.35, bounce = 0.15, rollSpeed = 0, sway = 0, heavy = false }: {
  texture: THREE.Texture; index: number; total: number;
  size?: number; bounce?: number; rollSpeed?: number; sway?: number; heavy?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = index / total;
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const local = (t * 0.18 + phase) % 1;
    // walk in a line approaching the crate from radial direction
    const angle = phase * Math.PI * 2;
    const startR = 5.5;
    const r = startR * (1 - local * 0.85);
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const stepFreq = heavy ? 3 : 8;
    const y = -0.9 + Math.abs(Math.sin(t * stepFreq + phase * 4)) * bounce + size;
    const m = ref.current;
    if (m) {
      m.position.set(x, y, z);
      if (rollSpeed) m.rotation.x += rollSpeed * 0.04;
      if (sway) m.rotation.z = Math.sin(t * 4 + phase * 3) * sway;
      const fade = local > 0.93 ? (1 - local) / 0.07 : 1;
      (m.material as THREE.MeshStandardMaterial).opacity = fade;
    }
  });
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} transparent roughness={0.45} metalness={0.08}
        emissive={new THREE.Color("#0A4DFF")} emissiveIntensity={0.1} />
    </mesh>
  );
}
function Ground() {
  return (
    <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#060b1a" roughness={0.95} metalness={0.2} />
    </mesh>
  );
}

/* ============================================================
   SCENE 05 — SHIPPING (Cargo ship + waves + crane + sunset fog)
   ============================================================ */
function ShippingScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.4, 8]} } gl={{ antialias: true, alpha: true }} className="!h-full !w-full">
      <color attach="background" args={["#0a0f24"]} />
      <fog attach="fog" args={["#0a0f24", 6, 24]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={1.4} color="#ffb98a" />
      <pointLight position={[-4, 3, 2]} intensity={2.2} color="#2B8CFF" distance={16} />
      <Suspense fallback={null}>
        <CargoShip />
        <Ocean />
        <Crane />
        <Sparkles count={140} scale={20} size={2.5} speed={0.25} color="#7fb3ff" />
        <Environment preset="sunset" />
      </Suspense>
      <OrbitRig radius={9} height={2.6} speed={0.08} />
    </Canvas>
  );
}
function CargoShip() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.y = -0.6 + Math.sin(t * 0.5) * 0.08;
      ref.current.rotation.z = Math.sin(t * 0.3) * 0.02;
    }
  });
  const hull = new THREE.MeshStandardMaterial({ color: "#0b1f4a", roughness: 0.5, metalness: 0.6 });
  const tower = new THREE.MeshStandardMaterial({ color: "#e8eefc", roughness: 0.6, metalness: 0.2 });
  const colors = ["#0A4DFF", "#143a8a", "#2B8CFF", "#1f2a44", "#3b4f7a"];
  const containers: { p: [number, number, number]; c: string }[] = [];
  let idx = 0;
  for (let x = -2; x <= 2; x++) for (let y = 0; y < 3; y++) for (let z = -1; z <= 1; z++) {
    containers.push({ p: [x * 0.62, 0.55 + y * 0.4, z * 0.85], c: colors[idx++ % colors.length] });
  }
  return (
    <group ref={ref} position={[0, -0.6, 0]}>
      {/* hull */}
      <mesh material={hull} position={[0, 0, 0]}>
        <boxGeometry args={[5.4, 0.8, 2.2]} />
      </mesh>
      <mesh material={hull} position={[2.9, -0.05, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.9, 0.7, 2.2]} />
      </mesh>
      {/* containers */}
      {containers.map((c, i) => (
        <mesh key={i} position={c.p}>
          <boxGeometry args={[0.58, 0.38, 0.8]} />
          <meshStandardMaterial color={c.c} metalness={0.45} roughness={0.5} emissive="#0A4DFF" emissiveIntensity={0.1} />
        </mesh>
      ))}
      {/* bridge tower */}
      <mesh material={tower} position={[-2.2, 1.0, 0]}>
        <boxGeometry args={[0.7, 1.4, 1.4]} />
      </mesh>
      <mesh position={[-2.2, 1.9, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.6]} />
        <meshStandardMaterial color="#2B8CFF" emissive="#2B8CFF" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}
function Ocean() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geo = ref.current?.geometry as THREE.PlaneGeometry | undefined;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const z = Math.sin(x * 0.5 + t) * 0.12 + Math.cos(y * 0.6 + t * 1.3) * 0.1;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });
  return (
    <mesh ref={ref} position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshStandardMaterial color="#061233" roughness={0.3} metalness={0.7} emissive="#0A4DFF" emissiveIntensity={0.12} />
    </mesh>
  );
}
function Crane() {
  return (
    <group position={[4.5, -1.2, -1.5]}>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#e94e3b" emissive="#aa1f1f" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-1.4, 2.9, 0]}>
        <boxGeometry args={[3, 0.18, 0.18]} />
        <meshStandardMaterial color="#e94e3b" emissive="#aa1f1f" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-2.2, 2.4, 0]}>
        <boxGeometry args={[0.05, 0.9, 0.05]} />
        <meshStandardMaterial color="#aac4ff" />
      </mesh>
      <mesh position={[-2.2, 1.95, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.6]} />
        <meshStandardMaterial color="#2B8CFF" metalness={0.6} emissive="#0A4DFF" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

/* ============================================================
   SCENE 06 — GLOBAL NETWORK (Holographic world map sphere)
   ============================================================ */
function NetworkScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 5.2], fov: 42 }} gl={{ antialias: true, alpha: true }} className="!h-full !w-full">
      <color attach="background" args={["#03061a"]} />
      <fog attach="fog" args={["#03061a", 5, 18]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 5]} intensity={2.5} color="#2B8CFF" distance={20} />
      <pointLight position={[-4, -2, 2]} intensity={1.6} color="#0A4DFF" distance={20} />
      <Suspense fallback={null}>
        <Stars radius={40} depth={40} count={1500} factor={3} fade speed={0.5} />
        <Globe />
        <OrbitingIcons />
        <Sparkles count={200} scale={12} size={2.2} speed={0.4} color="#7fb3ff" />
      </Suspense>
      <OrbitRig radius={5.2} height={0.6} speed={0.12} />
    </Canvas>
  );
}
function Globe() {
  const ref = useRef<THREE.Mesh>(null!);
  const wire = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, worldMap);
  useEffect(() => { texture.colorSpace = THREE.SRGBColorSpace; }, [texture]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.08;
    if (wire.current) wire.current.rotation.y += dt * 0.08;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.85}
          emissive="#0A4DFF"
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      <mesh ref={wire} scale={1.005}>
        <sphereGeometry args={[2, 48, 24]} />
        <meshBasicMaterial color="#2B8CFF" wireframe transparent opacity={0.18} />
      </mesh>
      {/* outer halo */}
      <mesh>
        <sphereGeometry args={[2.15, 48, 48]} />
        <meshBasicMaterial color="#2B8CFF" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
function OrbitingIcons() {
  // Ships + planes circling the globe
  const items = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
    radius: 2.4 + (i % 3) * 0.12,
    speed: 0.2 + (i % 4) * 0.05,
    tilt: (i / 10) * Math.PI,
    phase: (i / 10) * Math.PI * 2,
    isPlane: i % 2 === 0,
  })), []);
  return (
    <>
      {items.map((it, i) => <OrbitIcon key={i} {...it} />)}
    </>
  );
}
function OrbitIcon({ radius, speed, tilt, phase, isPlane }: { radius: number; speed: number; tilt: number; phase: number; isPlane: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(tilt) * radius * 0.3;
    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.lookAt(0, 0, 0);
      ref.current.rotateY(Math.PI / 2);
    }
  });
  return (
    <mesh ref={ref}>
      {isPlane
        ? <coneGeometry args={[0.05, 0.18, 8]} />
        : <boxGeometry args={[0.16, 0.06, 0.08]} />}
      <meshStandardMaterial color="#7fb3ff" emissive="#2B8CFF" emissiveIntensity={1.2} toneMapped={false} />
    </mesh>
  );
}

/* ============================================================
   Shared utilities
   ============================================================ */
function OrbitRig({ radius, height, speed }: { radius: number; height: number; speed: number }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    state.camera.position.x = Math.sin(t) * radius;
    state.camera.position.z = Math.cos(t) * radius;
    state.camera.position.y = height + Math.sin(t * 0.5) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}
function SmokeStack() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.08; });
  const planes = Array.from({ length: 14 });
  return (
    <group ref={ref} position={[0, -0.4, 0]}>
      {planes.map((_, i) => {
        const y = -1.1 + i * 0.07;
        const s = 2.6 + Math.sin(i) * 0.3;
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, i]}>
            <planeGeometry args={[s, s]} />
            <meshBasicMaterial color={i % 2 ? "#0A4DFF" : "#2B8CFF"} transparent
              opacity={0.04 + (i / planes.length) * 0.05} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ============================================================
   STORY DRIVER
   ============================================================ */
type SceneDef = {
  eyebrow: string;
  title: string;
  body: string;
  render: () => React.ReactElement;
};

const SCENES: SceneDef[] = [
  {
    eyebrow: "Scene 01 · The Origin",
    title: "Every global journey begins with a single crate.",
    body: "Every premium export starts with carefully selected produce. The journey begins with a handcrafted wooden export crate under royal blue light.",
    render: () => <OriginScene />,
  },
  {
    eyebrow: "Scene 02 · Fresh Arrival",
    title: "Fresh from the farm.",
    body: "Coconuts, tomatoes, cucumbers, pumpkins, bananas and watermelons arrive — one by one — under cinematic light, ready to be packed.",
    render: () => <FreshArrivalScene />,
  },
  {
    eyebrow: "Scene 03 · Precision Packing",
    title: "Packed with global standards.",
    body: "Every product is inspected and carefully placed inside the crate. Volumetric blue light spills out as the lid slowly opens.",
    render: () => <CrateScene3D />,
  },
  {
    eyebrow: "Scene 04 · Warehouse",
    title: "Prepared for global logistics.",
    body: "Containers stacked, forklifts moving, robotic arms sorting. Climate-controlled bays under intelligent blue ambient light.",
    render: () => <Warehouse3D />,
  },
  {
    eyebrow: "Scene 05 · Shipping",
    title: "Across oceans.",
    body: "Containers transported to ports and loaded onto cargo ships. Cranes lift, waves roll, the horizon glows blue at dusk.",
    render: () => <ShippingScene />,
  },
  {
    eyebrow: "Scene 06 · Global Network",
    title: "Connecting India to the world.",
    body: "Holographic shipping lanes link India with the UAE, Saudi Arabia, Qatar, Oman, Germany, UK, Netherlands, Singapore and Malaysia.",
    render: () => <NetworkScene />,
  },
];

export default function StoryJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(SCENES.length - 1, Math.max(0, Math.floor(v * SCENES.length)));
    if (idx !== active) setActive(idx);
  });

  return (
    <section id="journey" ref={ref} className="relative" style={{ height: `${SCENES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(10,77,255,0.18),transparent_65%)]" />
        <div className="absolute inset-0 grid-bg opacity-25" />

        {/* Right side — 3D scenes (crossfade) */}
        <div className="absolute inset-y-0 right-0 z-10 h-full w-full lg:w-1/2">
          {SCENES.map((s, i) => {
            const isActive = i === active;
            const isNeighbor = Math.abs(i - active) <= 1;
            return (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                aria-hidden={!isActive}
              >
                {isNeighbor ? s.render() : null}
              </div>
            );
          })}
          {/* Cinematic vignette on the 3D side */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-midnight/80 lg:to-midnight/95" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,8,26,0.75)_100%)]" />
        </div>

        {/* Left side — typography crossfade */}
        <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-10">
          <div className="w-full lg:w-1/2">
            <div className="relative h-[60vh] max-h-[640px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="text-[11px] uppercase tracking-[0.45em] text-electric">
                    {SCENES[active].eyebrow}
                  </div>
                  <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="text-gradient-royal">{SCENES[active].title}</span>
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-silver/75 sm:text-lg">
                    {SCENES[active].body}
                  </p>

                  {/* Scene progress dots */}
                  <div className="mt-10 flex items-center gap-3">
                    {SCENES.map((_, i) => (
                      <span
                        key={i}
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: i === active ? 36 : 14,
                          background: i === active ? "var(--electric)" : "rgba(255,255,255,0.18)",
                          boxShadow: i === active ? "0 0 14px var(--electric)" : "none",
                        }}
                      />
                    ))}
                    <span className="ml-3 text-[10px] uppercase tracking-[0.3em] text-silver/50">
                      {String(active + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* HUD chip */}
        <div className="pointer-events-none absolute right-6 top-6 z-30 hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-electric lg:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
          Cinematic Export Journey
        </div>
      </div>
    </section>
  );
}
