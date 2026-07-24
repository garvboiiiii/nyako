const DOC_POSITIONS = [
  { top: "12%", left: "8%", size: 34, rotate: -12, delay: "0s", duration: "8s" },
  { top: "68%", left: "6%", size: 26, rotate: 8, delay: "1.2s", duration: "10s" },
  { top: "20%", left: "90%", size: 30, rotate: 15, delay: "0.6s", duration: "9s" },
  { top: "72%", left: "92%", size: 24, rotate: -10, delay: "1.8s", duration: "7.5s" },
  { top: "42%", left: "3%", size: 20, rotate: 20, delay: "2.4s", duration: "11s" },
  { top: "48%", left: "95%", size: 22, rotate: -18, delay: "0.9s", duration: "8.5s" },
];

function DocIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 24 28" fill="none" aria-hidden="true">
      <path
        d="M4 2h11l5 5v19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        fill="var(--color-primary)"
        opacity="0.08"
        stroke="var(--color-primary)"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <path d="M15 2v5h5" fill="none" stroke="var(--color-primary)" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="7" y1="14" x2="17" y2="14" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="7" y1="18" x2="17" y2="18" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="7" y1="22" x2="13" y2="22" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* soft mesh gradient blobs */}
      <div
        className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)", opacity: 0.14 }}
      />
      <div
        className="absolute -top-24 right-[-160px] w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)", opacity: 0.1 }}
      />
      <div
        className="absolute bottom-[-200px] left-1/3 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)", opacity: 0.08 }}
      />

      {/* floating document shapes */}
      {DOC_POSITIONS.map((d, i) => (
        <div
          key={i}
          className="absolute animate-float-slow"
          style={{
            top: d.top,
            left: d.left,
            transform: `rotate(${d.rotate}deg)`,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        >
          <DocIcon size={d.size} />
        </div>
      ))}
    </div>
  );
}
