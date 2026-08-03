"use client";

/**
 * Sits above the card stack before the user has started scrolling through
 * it — tells them a) to keep scrolling and b) what they're about to see,
 * since the fly-out only reveals one card's payoff at a time and the point
 * (there are several problems/solutions/differences, not just one) would
 * otherwise be lost until they're already scrolling.
 */
export function CardStackScrollHint({ text }: { text: string }) {
  return (
    <p
      className="mx-auto text-center"
      style={{
        fontFamily: "var(--font-archivo), sans-serif",
        fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)",
        fontWeight: 800,
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
        color: "#ffffff",
        maxWidth: "26ch",
        marginBottom: 28,
      }}
    >
      {text}
    </p>
  );
}

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

/**
 * "Problem 1 von 4" / "Lösung 1 von 6" — makes the one-at-a-time order
 * explicit (not just the abstract dots), so it's clear this is a counted
 * sequence and more are coming.
 */
export function CardStackCounter({
  label,
  index,
  count,
}: {
  label: string;
  index: number;
  count: number;
}) {
  return (
    <div
      className="absolute left-1/2 mono"
      style={{
        top: "calc(100% + 54px)",
        transform: "translateX(-50%)",
        fontSize: 12.5,
        letterSpacing: "0.04em",
        color: "var(--warm-grey-faint)",
        whiteSpace: "nowrap",
      }}
    >
      {label} <span style={{ color: "var(--amber)" }}>{index + 1}</span> von {count}
    </div>
  );
}

/**
 * All cards are visible from the start, fanned in a shallow cascade
 * (cards further back sit slightly down-right and rotated) so the visitor
 * sees at a glance that there's more than one — then, one at a time as the
 * user scrolls, the frontmost remaining card flies out to the right and
 * the next one becomes the new front. `continuousIndex` is fractional
 * (from `useScrollStack`), so each card's own exit is a smooth 0→1 scrub
 * tied 1:1 to scroll position, not a stepped swap — cards fly strictly in
 * order because each owns an exclusive slice of the scroll range.
 */
export function getFlyStackSlotStyle(
  i: number,
  continuousIndex: number,
  count: number
): React.CSSProperties {
  const localExit = Math.min(1, Math.max(0, continuousIndex - i));
  const depth = Math.min(i, 3); // caps the fan so far-back cards don't drift too far
  const idleX = depth * 11;
  const idleY = depth * 9;
  const idleRotate = depth * 1.6;
  const idleScale = 1 - depth * 0.018;

  const flyPercent = localExit * 150; // own-width %, clears the viewport regardless of card size
  const flyRotate = localExit * 10;
  // Stays fully legible for most of its flight, only fades in the last stretch
  // as it leaves — so the card reads as "sliding away", not "dissolving".
  const opacity = localExit <= 0.6 ? 1 : Math.max(0, 1 - (localExit - 0.6) / 0.4);

  return {
    transform: `translate(${idleX}px, ${idleY}px) translateX(${flyPercent}%) rotate(${idleRotate + flyRotate}deg) scale(${idleScale})`,
    opacity,
    zIndex: count - i,
    pointerEvents: localExit >= 1 ? "none" : "auto",
    transition: "none", // tight 1:1 scroll-coupling, no lag/easing fighting the scrub
  };
}
