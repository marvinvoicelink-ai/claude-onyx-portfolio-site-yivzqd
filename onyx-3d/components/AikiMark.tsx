/**
 * Hexagonal circuit-trace mark — the icon half of the AIKI Performance
 * logo lockup, paired with the existing text wordmark in Nav.tsx. Built as
 * SVG (not a raster asset) so it stays crisp at any size and can pick up
 * the site's amber accent via currentColor.
 */
export default function AikiMark({ size = 34 }: { size?: number }) {
  const armAngles = [0, 60, 120, 180, 240, 300];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ flexShrink: 0, filter: "drop-shadow(0 0 5px rgba(232,163,61,0.5))" }}
      aria-hidden
    >
      <polygon
        points="50,8 86.37,29 86.37,71 50,92 13.63,71 13.63,29"
        fill="none"
        stroke="var(--amber)"
        strokeWidth={2.5}
        opacity={0.55}
      />
      {armAngles.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="36" x2="50" y2="22" stroke="var(--amber)" strokeWidth={3} strokeLinecap="round" />
          <line x1="50" y1="24" x2="40" y2="16" stroke="var(--amber)" strokeWidth={2.5} strokeLinecap="round" />
          <line x1="50" y1="24" x2="60" y2="16" stroke="var(--amber)" strokeWidth={2.5} strokeLinecap="round" />
          <circle cx="50" cy="24" r="2.6" fill="var(--near-black)" stroke="var(--amber)" strokeWidth={2} />
          <circle cx="40" cy="16" r="2.2" fill="var(--amber)" />
          <circle cx="60" cy="16" r="2.2" fill="var(--amber)" />
        </g>
      ))}
      <polygon
        points="50,36 62.12,43 62.12,57 50,64 37.88,57 37.88,43"
        fill="var(--near-black)"
        stroke="var(--amber)"
        strokeWidth={3}
      />
      <polygon
        points="50,44 56,47.5 56,52.5 50,56 44,52.5 44,47.5"
        fill="var(--amber)"
      />
    </svg>
  );
}
