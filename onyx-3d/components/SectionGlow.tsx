/**
 * A soft amber ambient glow behind a section's content — the same kind of
 * shimmer the Hero gets from its 3D scene, for sections that have no
 * lighting effect of their own. Used sparingly: alternating "glowing" and
 * flat near-black sections down the page reads as rhythm, glow on every
 * section would just read as noise.
 */
export default function SectionGlow({
  position = "top",
}: {
  position?: "top" | "bottom" | "center";
}) {
  const posStyle: React.CSSProperties =
    position === "top"
      ? { top: -260, left: "50%", transform: "translateX(-50%)" }
      : position === "bottom"
        ? { bottom: -260, left: "50%", transform: "translateX(-50%)" }
        : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  return (
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        width: 760,
        height: 760,
        maxWidth: "90vw",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(200,204,210,0.12) 0%, rgba(200,204,210,0) 70%)",
        ...posStyle,
      }}
    />
  );
}
