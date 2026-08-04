"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pieceLayout from "@/public/generated/hero-pieces/piece-layout.json";

gsap.registerPlugin(ScrollTrigger);

// Same source photo the flat fallback uses (background-size: cover,
// background-position: 70% 50%). To make the assembled formation land
// EXACTLY where each piece sits in that photo — not an eyeballed
// approximation — we replicate the CSS cover/position math ourselves and
// project each piece's real pixel position + size into world units at
// z=0, where R3F's viewport (world units visible at the origin plane)
// already matches the canvas's actual aspect ratio.
const IMAGE_W = 1584;
const IMAGE_H = 672;
const IMAGE_AR = IMAGE_W / IMAGE_H;
const FOCUS_X = 0.7;
const FOCUS_Y = 0.5;

function exactPlacement(cx: number, cy: number, wPx: number, hPx: number, viewportW: number, viewportH: number) {
  const containerAR = viewportW / viewportH;
  let dispW: number, dispH: number, offsetX: number, offsetY: number;
  if (containerAR < IMAGE_AR) {
    dispH = viewportH;
    dispW = dispH * IMAGE_AR;
    offsetX = (dispW - viewportW) * FOCUS_X;
    offsetY = 0;
  } else {
    dispW = viewportW;
    dispH = dispW / IMAGE_AR;
    offsetX = 0;
    offsetY = (dispH - viewportH) * FOCUS_Y;
  }
  const scale = dispW / IMAGE_W;
  return {
    x: cx * dispW - offsetX - viewportW / 2,
    y: viewportH / 2 - (cy * dispH - offsetY),
    width: wPx * scale,
    height: hPx * scale,
  };
}

type PanelSpec = {
  url: string;
  formation: THREE.Vector3;
  width: number;
  height: number;
  dispersed: THREE.Vector3;
  dispersedRotation: THREE.Euler;
  floatPhase: number;
  floatSpeed: number;
};

function buildPanels(viewportW: number, viewportH: number): PanelSpec[] {
  return pieceLayout.map((p) => {
    const { x, y, width, height } = exactPlacement(p.cx, p.cy, p.w, p.h, viewportW, viewportH);
    // Formation stays essentially flat (tiny z jitter only) so the exact
    // 2D placement above isn't thrown off by perspective at depth — the
    // dispersed state is where real depth separation happens.
    const z = (Math.random() - 0.5) * 0.25;
    const formation = new THREE.Vector3(x, y, z);

    const dir = new THREE.Vector2(x, y);
    if (dir.lengthSq() < 0.0001) dir.set(Math.random() - 0.5, Math.random() - 0.5);
    dir.normalize();
    const depthFactor = Math.random(); // 0 (far/slow) .. 1 (near/fast)
    const travel = 3.5 + depthFactor * 6.5;
    const dispersed = new THREE.Vector3(
      x + dir.x * travel,
      y + dir.y * travel + 1 + depthFactor * 1.8,
      z + depthFactor * 4.5
    );

    return {
      url: `/generated/hero-pieces/piece-${p.i}.png`,
      formation,
      width,
      height,
      dispersed,
      dispersedRotation: new THREE.Euler(
        (Math.random() - 0.5) * 1.1,
        (Math.random() - 0.5) * 1.1,
        (Math.random() - 0.5) * 0.9
      ),
      floatPhase: Math.random() * Math.PI * 2,
      floatSpeed: 0.35 + Math.random() * 0.25,
    };
  });
}

function Panel({ spec, disperseRef }: { spec: PanelSpec; disperseRef: { current: number } }) {
  const texture = useTexture(spec.url);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const d = disperseRef.current;
    const t = state.clock.elapsedTime;
    // Idle float fades out as pieces reassemble, so the assembled state
    // holds exactly still (matching the flat photo) rather than jittering.
    const floatX = Math.sin(t * spec.floatSpeed + spec.floatPhase) * 0.05 * d;
    const floatY = Math.cos(t * spec.floatSpeed * 0.8 + spec.floatPhase) * 0.04 * d;

    mesh.position.set(
      THREE.MathUtils.lerp(spec.formation.x, spec.dispersed.x, d) + floatX,
      THREE.MathUtils.lerp(spec.formation.y, spec.dispersed.y, d) + floatY,
      THREE.MathUtils.lerp(spec.formation.z, spec.dispersed.z, d)
    );
    mesh.rotation.set(
      THREE.MathUtils.lerp(0, spec.dispersedRotation.x, d),
      THREE.MathUtils.lerp(0, spec.dispersedRotation.y, d),
      THREE.MathUtils.lerp(0, spec.dispersedRotation.z, d)
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[spec.width, spec.height]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

function Scene({ sectionEl }: { sectionEl: HTMLElement }) {
  const { viewport } = useThree();
  const panels = useMemo(
    () => buildPanels(viewport.width, viewport.height),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewport.width, viewport.height]
  );
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
      <ambientLight intensity={0.5} />
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
