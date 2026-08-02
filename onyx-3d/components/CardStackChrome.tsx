"use client";

export function CardStackDots({ count, index }: { count: number; index: number }) {
  return (
    <div
      className="absolute left-1/2 flex items-center gap-2"
      style={{ top: "calc(100% + 22px)", transform: "translateX(-50%)" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`card-stack-dot ${i === index ? "is-active" : ""}`} />
      ))}
    </div>
  );
}

export function CardStackHint({ done }: { done: boolean }) {
  return (
    <div
      className="card-stack-hint absolute left-1/2 mono flex flex-col items-center gap-1.5"
      style={{
        top: "calc(100% + 46px)",
        transform: "translateX(-50%)",
        opacity: done ? 0 : 1,
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--warm-grey-faint)",
      }}
      aria-hidden={done}
    >
      <span>Scroll für mehr</span>
      <svg
        className="card-stack-hint-arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        width={16}
        height={16}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

/**
 * Only the current card is ever visible — no partial "peek" of neighboring
 * cards, so there's never overlapping, half-legible text at rest. Hidden
 * cards sit at opacity 0 with a slight scale, so the incoming card still
 * settles in gently without ever competing for legibility with the outgoing
 * one (a brief crossfade blend mid-transition is the only overlap).
 */
export function getStackSlotStyle(offset: number): React.CSSProperties {
  if (offset === 0) {
    // No inline `transform` here: this lets .hover-lift-home:hover's CSS
    // transform win, since an inline style would otherwise always beat it.
    return { opacity: 1, zIndex: 1, pointerEvents: "auto" };
  }
  return { opacity: 0, transform: "scale(0.98)", zIndex: 0, pointerEvents: "none" };
}
