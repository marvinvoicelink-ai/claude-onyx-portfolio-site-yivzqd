"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pieceLayout from "@/public/generated/hero-pieces/piece-layout.json";

gsap.registerPlugin(ScrollTrigger);

// Formation reads from the real photo's own layout (piece-layout.json —
// normalized image-space centers from the same segmentation that produced
// the cutout textures), mapped into 3D space so the assembled look echoes
// the original composition. cx≈0.7 is the photo's own crop focus
// (objectPosition 70% 50% in the flat fallback), so it's used as the
// world-space origin.
const SCALE_X = 6;
const SCALE_Y = 4.1;
const FOCUS_X = 0.7;
const FOCUS_Y = 0.5;
const BASE_PANEL_HEIGHT = 1.25;

type PanelSpec = {
  url: string;
  aspect: number;
  formation: THREE.Vector3;
  dispersed: THREE.Vector3;
  dispersedRotation: THREE.Euler;
  floatPhase: number;
  floatSpeed: number;
  depth: number;
};

function buildPanels(): PanelSpec[] {
  return pieceLayout.map((p) => {
    const worldX = (p.cx - FOCUS_X) * SCALE_X;
    const worldY = -(p.cy - FOCUS_Y) * SCALE_Y;
    const depth = (Math.random() - 0.5) * 3.2; // z jitter for parallax
    const formation = new THREE.Vector3(worldX, worldY, depth);

    // Disperse outward along the vector from the cluster's rough center,
    // nearer panels (larger depth) travel further/faster — simple parallax.
    const dir = new THREE.Vector2(worldX - (0.86 - FOCUS_X) * SCALE_X, worldY + (0.6 - FOCUS_Y) * SCALE_Y);
    if (dir.lengthSq() < 0.0001) dir.set(Math.random() - 0.5, Math.random() - 0.5);
    dir.normalize();
    const depthFactor = (depth + 1.6) / 3.2; // 0 (far) .. 1 (near)
    const travel = 4.5 + depthFactor * 7.5;
    const dispersed = new THREE.Vector3(
      worldX + dir.x * travel,
      worldY + dir.y * travel + 1.5 + depthFactor * 2,
      depth + depthFactor * 3.5
    );

    return {
      url: `/generated/hero-pieces/piece-${p.i}.png`,
      aspect: p.aspect,
      formation,
      dispersed,
      dispersedRotation: new THREE.Euler(
        (Math.random() - 0.5) * 1.1,
        (Math.random() - 0.5) * 1.1,
        (Math.random() - 0.5) * 0.9
      ),
      floatPhase: Math.random() * Math.PI * 2,
      floatSpeed: 0.35 + Math.random() * 0.25,
      depth,
    };
  });
}

function Panel({ spec, disperseRef }: { spec: PanelSpec; disperseRef: { current: number } }) {
  const texture = useTexture(spec.url);
  const meshRef = useRef<THREE.Mesh>(null);
  const height = BASE_PANEL_HEIGHT;
  const width = height * spec.aspect;

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const d = disperseRef.current;
    const t = state.clock.elapsedTime;
    const floatX = Math.sin(t * spec.floatSpeed + spec.floatPhase) * 0.06;
    const floatY = Math.cos(t * spec.floatSpeed * 0.8 + spec.floatPhase) * 0.05;

    mesh.position.set(
      THREE.MathUtils.lerp(spec.formation.x, spec.dispersed.x, d) + floatX,
      THREE.MathUtils.lerp(spec.formation.y, spec.dispersed.y, d) + floatY,
      THREE.MathUtils.lerp(spec.formation.z, spec.dispersed.z, d)
    );
    mesh.rotation.set(
      THREE.MathUtils.lerp(0, spec.dispersedRotation.x, d) + Math.sin(t * 0.3 + spec.floatPhase) * 0.03,
      THREE.MathUtils.lerp(0, spec.dispersedRotation.y, d),
      THREE.MathUtils.lerp(0, spec.dispersedRotation.z, d) + Math.cos(t * 0.25 + spec.floatPhase) * 0.02
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

function Scene({ sectionEl }: { sectionEl: HTMLElement }) {
  const panels = useMemo(() => buildPanels(), []);
  const disperseRef = useRef(0);
  const entranceRef = useRef(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    // Time-based entrance (assemble from scattered), independent of scroll.
    const obj = { t: 0 };
    const introTween = gsap.to(obj, {
      t: 1,
      duration: 1.9,
      ease: "power3.out",
      onUpdate: () => {
        entranceRef.current = obj.t;
      },
    });

    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      },
    });

    return () => {
      introTween.kill();
      st.kill();
    };
  }, [sectionEl]);

  useFrame(() => {
    // Blend: entrance owns the disperse amount early on, scroll takes over
    // once the intro finishes — no jump, since scroll progress is 0 at the
    // top of the page where the intro also lands on 0.
    disperseRef.current = THREE.MathUtils.lerp(1, scrollRef.current, entranceRef.current);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 5]} intensity={35} color="#e8a33d" />
      {panels.map((spec, i) => (
        <Panel key={i} spec={spec} disperseRef={disperseRef} />
      ))}
    </>
  );
}

export default function HeroScene3D({ sectionEl }: { sectionEl: HTMLElement | null }) {
  if (!sectionEl) return null;
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene sectionEl={sectionEl} />
    </Canvas>
  );
}
