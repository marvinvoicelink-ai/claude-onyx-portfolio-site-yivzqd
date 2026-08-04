/**
 * Hexagonal circuit-frame "AP" monogram — the icon half of the logo
 * lockup, paired with the existing text wordmark in Nav.tsx. Built as SVG
 * (not a raster asset) so it stays crisp at any size and picks up the
 * site's amber accent via the CSS variable.
 */
export default function AikiMark({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ flexShrink: 0 }} aria-hidden>
      <defs>
        <radialGradient id="aiki-mark-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill="url(#aiki-mark-glow)" />

      <g style={{ filter: "drop-shadow(0 0 4px rgba(232,163,61,0.6))" }}>
        {/* Hexagon outline, drawn as circuit trace segments */}
        <polygon
          points="50,8 86,29 86,71 50,92 14,71 14,29"
          fill="none"
          stroke="var(--amber)"
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
        {/* Via nodes at each hex vertex */}
        {[
          [50, 8],
          [86, 29],
          [86, 71],
          [50, 92],
          [14, 71],
          [14, 29],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill="var(--near-black)" stroke="var(--amber)" strokeWidth={2.2} />
        ))}

        {/* Small branch nodes along the two upper edges */}
        <circle cx="64.4" cy="16.4" r="2.4" fill="var(--amber)" />
        <line x1="64.4" y1="16.4" x2="72" y2="12" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" />
        <circle cx="35.6" cy="16.4" r="2.4" fill="var(--amber)" />
        <line x1="35.6" y1="16.4" x2="28" y2="12" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" />
      </g>

      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-archivo), sans-serif"
        fontWeight={800}
        fontSize="34"
        fill="var(--amber)"
        style={{ filter: "drop-shadow(0 0 5px rgba(232,163,61,0.55))" }}
      >
        AP
      </text>
    </svg>
  );
}
