import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

import pCoconut from "@/assets/product-coconut.jpg";
import pTomato from "@/assets/product-tomato.jpg";
import pCucumber from "@/assets/product-cucumber.jpg";
import pWatermelon from "@/assets/product-watermelon.jpg";
import pPumpkin from "@/assets/product-pumpkin.jpg";
import pBanana from "@/assets/product-banana.jpg";

/* Wooden crate (open-top) */
function Crate() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.15;
  });

  const plankMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3a2a1a"),
        roughness: 0.85,
        metalness: 0.05,
        emissive: new THREE.Color("#0a1a3a"),
        emissiveIntensity: 0.15,
      }),
    []
  );

  const W = 2.4, H = 1.6, D = 2.0, T = 0.08;

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      {/* bottom */}
      <mesh material={plankMat} position={[0, -H / 2, 0]}>
        <boxGeometry args={[W, T, D]} />
      </mesh>
      {/* sides */}
      <mesh material={plankMat} position={[-W / 2, 0, 0]}>
        <boxGeometry args={[T, H, D]} />
      </mesh>
      <mesh material={plankMat} position={[W / 2, 0, 0]}>
        <boxGeometry args={[T, H, D]} />
      </mesh>
      <mesh material={plankMat} position={[0, 0, -D / 2]}>
        <boxGeometry args={[W, H, T]} />
      </mesh>
      <mesh material={plankMat} position={[0, 0, D / 2]}>
        <boxGeometry args={[W, H, T]} />
      </mesh>
      {/* rim glow */}
      <mesh position={[0, H / 2, 0]}>
        <torusGeometry args={[1.45, 0.02, 8, 64]} />
        <meshBasicMaterial color="#2B8CFF" toneMapped={false} />
      </mesh>
    </group>
  );
}

/* A product sphere that falls/loops into the crate */
function Product({
  texture, phase, radius = 1.6, size = 0.32,
}: {
  texture: THREE.Texture; phase: number; radius?: number; size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = (state.clock.elapsedTime * 0.35 + phase) % 1;
    const angle = phase * Math.PI * 2;
    // Spiral: starts wide & high, ends inside crate
    const r = radius * (1 - t * 0.85);
    const x = Math.cos(angle + t * 4) * r;
    const z = Math.sin(angle + t * 4) * r;
    const y = 2.2 - t * 3.2;
    const m = ref.current;
    if (m) {
      m.position.set(x, y, z);
      m.rotation.x += 0.02;
      m.rotation.y += 0.03;
      const fade = t > 0.92 ? (1 - t) / 0.08 : 1;
      (m.material as THREE.MeshStandardMaterial).opacity = fade;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.45}
        metalness={0.1}
        emissive={new THREE.Color("#0A4DFF")}
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function Products() {
  const textures = useLoader(TextureLoader, [
    pCoconut, pTomato, pCucumber, pWatermelon, pPumpkin, pBanana,
  ]);
  textures.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace));
  return (
    <>
      {textures.map((tex, i) => (
        <Product key={i} texture={tex} phase={i / textures.length} />
      ))}
    </>
  );
}

/* Volumetric-ish blue smoke using stacked translucent planes */
function Smoke() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.08;
  });
  const planes = Array.from({ length: 14 });
  return (
    <group ref={ref} position={[0, -0.4, 0]}>
      {planes.map((_, i) => {
        const y = -1.1 + i * 0.07;
        const s = 2.6 + Math.sin(i) * 0.3;
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, i]}>
            <planeGeometry args={[s, s]} />
            <meshBasicMaterial
              color={i % 2 ? "#0A4DFF" : "#2B8CFF"}
              transparent
              opacity={0.04 + (i / planes.length) * 0.05}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.2;
    state.camera.position.x = Math.sin(t) * 4.5;
    state.camera.position.z = Math.cos(t) * 4.5;
    state.camera.position.y = 1.8 + Math.sin(t * 0.5) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CrateScene3D() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute -inset-10 -z-10 rounded-[2rem] bg-royal/25 blur-3xl" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.8, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
      >
        <color attach="background" args={["#050B18"]} />
        <fog attach="fog" args={["#050B18", 5, 14]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 6, 4]} intensity={1.2} color="#bcd6ff" />
        <pointLight position={[0, 2, 0]} intensity={2.4} color="#2B8CFF" distance={8} />
        <pointLight position={[-3, -1, -2]} intensity={1.6} color="#0A4DFF" distance={10} />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
            <Crate />
          </Float>
          <Products />
          <Smoke />
          <Sparkles count={80} scale={6} size={3} speed={0.4} color="#7fb3ff" />
          <Environment preset="city" />
        </Suspense>

        <Rig />
      </Canvas>
      {/* HUD */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-electric">
        Live · 3D Export Crate
      </div>
    </div>
  );
}
