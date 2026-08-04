"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import HeroForeground from "./HeroForeground";
import HeroFallback from "./HeroFallback";
import { useSkipHeavyMotion } from "@/hooks/useSkipHeavyMotion";

const HeroScene3D = dynamic(() => import("./HeroScene3D"), { ssr: false });

/**
 * Desktop/motion-ok visitors get the 3D "formieren & zerstreuen" scene;
 * mobile and prefers-reduced-motion get HeroFallback verbatim (the
 * previous CSS/GSAP hero, kept unmodified as the safety fallback).
 */
export default function Hero() {
  const { skip } = useSkipHeavyMotion();
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  if (skip) return <HeroFallback />;

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (el && el !== sectionEl) setSectionEl(el);
      }}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100vh", background: "var(--near-black)" }}
    >
      {/* Same inpainted backdrop HeroFallback sits on (the extracted panel
          regions softened out), at the same cover/position — the 3D panels
          are reprojected with the identical math, so at rest they land
          exactly on top of where the real photo shows them. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/generated/hero-alive-bg-base.png)",
          backgroundSize: "cover",
          backgroundPosition: "70% 50%",
        }}
      />
      <HeroScene3D sectionEl={sectionEl} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.8) 42%, rgba(17,17,17,0.35) 72%, rgba(17,17,17,0.08) 100%), linear-gradient(0deg, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0) 35%)",
        }}
      />
      <HeroForeground />
    </section>
  );
}
