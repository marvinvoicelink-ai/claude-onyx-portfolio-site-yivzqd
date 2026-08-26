"use client";

import { useEffect, useState } from "react";
import HeroForeground from "./HeroForeground";
import LogoMarquee from "./LogoMarquee";

/**
 * Real rendered footage of the module cluster assembling — same shot the
 * static fallback/3D scene were approximating, now used directly as the
 * hero background for every viewport. Reduced-motion visitors get the
 * still poster frame (the video's last frame) instead of playback.
 */
export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
  }, []);

  return (
    <section className="relative on-dark" style={{ background: "var(--near-black)" }}>
      <div className="relative flex overflow-hidden" style={{ paddingTop: 28, paddingBottom: "5vh" }}>
        <div className="absolute inset-0">
          {reducedMotion ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/assets/hero-assemble-poster.jpg"
              alt=""
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover", objectPosition: "70% 50%" }}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/hero-assemble-poster.jpg"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover", objectPosition: "70% 50%" }}
            >
              <source src="/assets/hero-assemble.mp4" type="video/mp4" />
            </video>
          )}
          {/* Flat darkening so the video reads a touch dimmer everywhere,
              plus the same directional gradients the previous hero used to
              keep the text block fully legible against the brighter cluster. */}
          <div aria-hidden className="absolute inset-0" style={{ background: "rgba(17,17,17,0.4)" }} />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.85) 42%, rgba(17,17,17,0.45) 72%, rgba(17,17,17,0.15) 100%), linear-gradient(0deg, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0) 35%)",
            }}
          />
        </div>
        <HeroForeground />
      </div>

      {/* Direkt im Anschluss, ohne Section-Umbruch: der Text unter der
          Headline, CTA und der Logo-Slide — alles ein zusammenhaengender
          Block statt zwei getrennter Sections. */}
      <LogoMarquee />
    </section>
  );
}
