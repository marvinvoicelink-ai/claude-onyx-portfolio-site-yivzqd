"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type ProgressRef = { current: number };

const MODULE_COUNT = 9;

// Scattered start positions (disassembled) -> assembled 3x3 grid (the "system" coming together).
function buildModules() {
  const grid: { x: number; y: number; z: number }[] = [];
  const cols = 3;
  const spacing = 1.15;
  for (let i = 0; i < MODULE_COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    grid.push({
      x: (col - 1) * spacing,
      y: (1 - row) * spacing,
      z: 0,
    });
  }

  const scattered = grid.map(() => ({
    x: (Math.random() - 0.5) * 7,
    y: (Math.random() - 0.5) * 6,
    z: (Math.random() - 0.5) * 6 - 2,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI,
  }));

  return { grid, scattered };
}

function hexShape(radius: number) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function Modules({ progressRef }: { progressRef: ProgressRef }) {
  const { grid, scattered } = useMemo(() => buildModules(), []);
  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(hexShape(0.58), { depth: 0.16, bevelEnabled: false }),
    []
  );
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const p = progressRef.current; // 0 = scattered, 1 = assembled
    const eased = 1 - Math.pow(1 - p, 3);

    refs.current.forEach((group, i) => {
      if (!group) return;
      const from = scattered[i];
      const to = grid[i];
      group.position.x = THREE.MathUtils.lerp(from.x, to.x, eased);
      group.position.y = THREE.MathUtils.lerp(from.y, to.y, eased);
      group.position.z = THREE.MathUtils.lerp(from.z, to.z, eased);
      group.rotation.x = THREE.MathUtils.lerp(from.rx, 0, eased);
      group.rotation.y = THREE.MathUtils.lerp(from.ry, 0, eased);
      group.rotation.z = THREE.MathUtils.lerp(from.rz, 0, eased);
    });

    if (groupRef.current) {
      // Gentle idle rotation, settles as modules assemble.
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08 * (1 - eased * 0.7);
    }
  });

  return (
    <group ref={groupRef} scale={0.58}>
      {grid.map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <mesh geometry={geometry}>
            <meshStandardMaterial
              color="#1c1a16"
              emissive="#e8a33d"
              emissiveIntensity={0.5}
              roughness={0.3}
              metalness={0.5}
              transparent
              opacity={0.42}
            />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color="#e8a33d" transparent opacity={0.6} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

export default function HeroScene({ progressRef }: { progressRef: ProgressRef }) {
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
