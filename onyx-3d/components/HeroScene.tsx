"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type ScrollProgressRef = { current: number };

const MODULE_COUNT = 9;

// Scattered start positions (disassembled) -> assembled 3x3 grid (the "system")
function buildModules() {
  const grid: { x: number; y: number; z: number }[] = [];
  const cols = 3;
  const spacing = 1.15;
  for (let i = 0; i < MODULE_COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    grid.push({
      x: (col - 1) * spacing + 2.6,
      y: (1 - row) * spacing,
      z: 0,
    });
  }

  const scattered = grid.map(() => ({
    x: 2.6 + (Math.random() - 0.5) * 7,
    y: (Math.random() - 0.5) * 6,
    z: (Math.random() - 0.5) * 6 - 2,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI,
  }));

  return { grid, scattered };
}

function Modules({ progressRef }: { progressRef: ScrollProgressRef }) {
  const { grid, scattered } = useMemo(() => buildModules(), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const p = progressRef.current; // 0 = scattered, 1 = assembled
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const from = scattered[i];
      const to = grid[i];
      mesh.position.x = THREE.MathUtils.lerp(from.x, to.x, eased);
      mesh.position.y = THREE.MathUtils.lerp(from.y, to.y, eased);
      mesh.position.z = THREE.MathUtils.lerp(from.z, to.z, eased);
      mesh.rotation.x = THREE.MathUtils.lerp(from.rx, 0, eased);
      mesh.rotation.y = THREE.MathUtils.lerp(from.ry, 0, eased);
      mesh.rotation.z = THREE.MathUtils.lerp(from.rz, 0, eased);
    });

    if (groupRef.current) {
      // Gentle idle rotation, settles as modules assemble
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.08 * (1 - eased * 0.7);
    }
  });

  return (
    <group ref={groupRef}>
      {grid.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <boxGeometry args={[0.95, 0.95, 0.16]} />
          <meshStandardMaterial
            color="#1c1a16"
            emissive="#e8a33d"
            emissiveIntensity={0.55}
            roughness={0.3}
            metalness={0.5}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.95, 0.95, 0.16)]} />
            <lineBasicMaterial color="#e8a33d" transparent opacity={0.8} />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({
  progressRef,
}: {
  progressRef: ScrollProgressRef;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={40} color="#e8a33d" />
      <pointLight position={[-4, -2, 3]} intensity={12} color="#f5f2ec" />
      <Modules progressRef={progressRef} />
    </Canvas>
  );
}
