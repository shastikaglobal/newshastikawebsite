import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* Stacked shipping containers */
function ContainerStack() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05;
  });

  const colors = ["#0A4DFF", "#143a8a", "#1f2a44", "#2B8CFF", "#0b2150", "#3b4f7a"];
  const W = 2.4, H = 1.0, D = 1.1;

  const containers = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string }[] = [];
    let idx = 0;
    for (let x = -2; x <= 2; x += 1) {
      const stackH = 2 + ((x + 2) % 3);
      for (let y = 0; y < stackH; y++) {
        arr.push({
          pos: [x * (W + 0.15), -1.4 + y * (H + 0.05) + H / 2, -1.5],
          color: colors[idx++ % colors.length],
        });
      }
    }
    // front row
    for (let x = -2; x <= 2; x += 1) {
      const stackH = 1 + ((x + 3) % 2);
      for (let y = 0; y < stackH; y++) {
        arr.push({
          pos: [x * (W + 0.15), -1.4 + y * (H + 0.05) + H / 2, 0.2],
          color: colors[idx++ % colors.length],
        });
      }
    }
    return arr;
  }, []);

  return (
    <group ref={group}>
      {containers.map((c, i) => (
        <mesh key={i} position={c.pos} castShadow receiveShadow>
          <boxGeometry args={[W, H, D]} />
          <meshStandardMaterial
            color={c.color}
            roughness={0.55}
            metalness={0.45}
            emissive={new THREE.Color("#0A4DFF")}
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}
      {/* floor */}
      <mesh position={[0, -1.42, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#070d1f" roughness={0.9} metalness={0.2} />
      </mesh>
      {/* grid glow */}
      <gridHelper args={[20, 20, "#2B8CFF", "#143a8a"]} position={[0, -1.41, 0]} />
    </group>
  );
}

/* Forklift moving back and forth */
function Forklift() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4;
    if (ref.current) {
      ref.current.position.x = Math.sin(t) * 3;
      ref.current.rotation.y = Math.cos(t) > 0 ? 0 : Math.PI;
    }
  });
  return (
    <group ref={ref} position={[0, -1.1, 2]}>
      {/* body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.7, 0.5, 1.0]} />
        <meshStandardMaterial color="#2B8CFF" roughness={0.4} metalness={0.6} emissive="#0A4DFF" emissiveIntensity={0.3} />
      </mesh>
      {/* cabin */}
      <mesh position={[0, 0.65, -0.1]}>
        <boxGeometry args={[0.5, 0.45, 0.5]} />
        <meshStandardMaterial color="#0a1a3a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* mast */}
      <mesh position={[0, 0.4, 0.55]}>
        <boxGeometry args={[0.45, 1.2, 0.05]} />
        <meshStandardMaterial color="#1f2a44" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* forks */}
      <mesh position={[-0.15, -0.15, 0.85]}>
        <boxGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#aac4ff" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, -0.15, 0.85]}>
        <boxGeometry args={[0.06, 0.05, 0.6]} />
        <meshStandardMaterial color="#aac4ff" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* wheels */}
      {[-0.3, 0.3].map((x) =>
        [-0.4, 0.4].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.15, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#050a14" roughness={0.9} />
          </mesh>
        ))
      )}
      {/* headlight glow */}
      <pointLight position={[0, 0.3, 0.9]} intensity={1.2} color="#7fb3ff" distance={3} />
    </group>
  );
}

/* Robot arm with rotating segments */
function RobotArm() {
  const base = useRef<THREE.Group>(null!);
  const upper = useRef<THREE.Group>(null!);
  const fore = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (base.current) base.current.rotation.y = Math.sin(t * 0.5) * 0.8;
    if (upper.current) upper.current.rotation.x = Math.sin(t * 0.7) * 0.5 - 0.3;
    if (fore.current) fore.current.rotation.x = Math.cos(t * 0.6) * 0.6 + 0.4;
  });
  const mat = (
    <meshStandardMaterial color="#1f2a44" metalness={0.85} roughness={0.25} emissive="#0A4DFF" emissiveIntensity={0.15} />
  );
  return (
    <group position={[3.5, -1.4, 1.2]} scale={0.9}>
      {/* base plate */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.2, 24]} />
        {mat}
      </mesh>
      <group ref={base} position={[0, 0.2, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.6, 16]} />
          {mat}
        </mesh>
        <group ref={upper} position={[0, 0.6, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.25, 1.2, 0.25]} />
            {mat}
          </mesh>
          <group ref={fore} position={[0, 1.0, 0]}>
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.2, 1.0, 0.2]} />
              {mat}
            </mesh>
            {/* gripper */}
            <mesh position={[0, 0.95, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.3]} />
              <meshStandardMaterial color="#2B8CFF" emissive="#2B8CFF" emissiveIntensity={0.6} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12;
    state.camera.position.x = Math.sin(t) * 7;
    state.camera.position.z = 6 + Math.cos(t) * 2;
    state.camera.position.y = 2.2;
    state.camera.lookAt(0, -0.3, 0);
  });
  return null;
}

export default function Warehouse3D() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute -inset-10 -z-10 rounded-[2rem] bg-royal/25 blur-3xl" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.2, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
      >
        <color attach="background" args={["#040912"]} />
        <fog attach="fog" args={["#040912", 8, 22]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 4]} intensity={1.1} color="#bcd6ff" />
        <pointLight position={[0, 5, 0]} intensity={2.2} color="#2B8CFF" distance={14} />
        <pointLight position={[-6, 2, -3]} intensity={1.4} color="#0A4DFF" distance={16} />
        <pointLight position={[6, 2, -3]} intensity={1.4} color="#0A4DFF" distance={16} />

        <Suspense fallback={null}>
          <ContainerStack />
          <Forklift />
          <RobotArm />
          <Sparkles count={120} scale={14} size={2.5} speed={0.3} color="#7fb3ff" />
          <Environment preset="warehouse" />
        </Suspense>

        <Rig />
      </Canvas>
      {/* HUD */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-electric">
        Live · Smart Warehouse
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-electric">
        Automated · 24/7
      </div>
    </div>
  );
}
