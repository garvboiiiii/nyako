export type MascotState = "idle" | "thinking" | "searching" | "happy" | "loading" | "error" | "empty";

interface NyakoMascotProps {
  state?: MascotState;
  className?: string;
  size?: number;
}

export default function NyakoMascot({ state = "idle", className = "", size = 96 }: NyakoMascotProps) {
  return (
    <svg
      viewBox="0 0 220 200"
      width={size}
      height={size}
      className={`${state === "idle" ? "animate-bob" : ""} ${className}`}
      aria-hidden="true"
    >
      {/* tail */}
      <path
        d="M 178 150 C 210 150, 214 110, 190 95"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="10"
        strokeLinecap="round"
        className={state === "happy" || state === "searching" ? "animate-tail" : ""}
        style={state === "happy" ? { animationDuration: "0.9s" } : undefined}
      />

      {/* body */}
      <ellipse cx="110" cy="150" rx="58" ry="42" fill="var(--color-ink)" />

      {/* head */}
      <g>
        <circle cx="90" cy="88" r="48" fill="var(--color-ink)" />

        {/* ears */}
        <path d="M 52 60 L 40 20 L 78 46 Z" fill="var(--color-ink)" className="animate-ear" />
        <path d="M 128 60 L 140 20 L 102 46 Z" fill="var(--color-ink)" />
        <path d="M 56 52 L 50 32 L 68 46 Z" fill="var(--color-accent)" opacity="0.9" />
        <path d="M 124 52 L 130 32 L 112 46 Z" fill="var(--color-accent)" opacity="0.9" />

        {/* eyes — vary by state */}
        {state === "happy" ? (
          <g>
            <path d="M 68 90 Q 74 82 80 90" fill="none" stroke="var(--color-paper)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 100 90 Q 106 82 112 90" fill="none" stroke="var(--color-paper)" strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : state === "loading" ? (
          <g>
            <circle cx="90" cy="88" r="9" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="30 15" className="animate-spin-loader" style={{ transformOrigin: "90px 88px" }} />
          </g>
        ) : state === "searching" ? (
          <g className="animate-eye-dart">
            <circle cx="74" cy="90" r="6" fill="var(--color-paper)" />
            <circle cx="106" cy="90" r="6" fill="var(--color-paper)" />
          </g>
        ) : state === "thinking" ? (
          <g>
            <ellipse cx="76" cy="88" rx="5" ry="6" fill="var(--color-paper)" />
            <ellipse cx="104" cy="86" rx="5" ry="6" fill="var(--color-paper)" />
          </g>
        ) : state === "error" ? (
          <g stroke="var(--color-paper)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="69" y1="85" x2="79" y2="95" />
            <line x1="79" y1="85" x2="69" y2="95" />
            <line x1="101" y1="85" x2="111" y2="95" />
            <line x1="111" y1="85" x2="101" y2="95" />
          </g>
        ) : state === "empty" ? (
          <g>
            <line x1="68" y1="90" x2="80" y2="90" stroke="var(--color-paper)" strokeWidth="3" strokeLinecap="round" />
            <line x1="100" y1="90" x2="112" y2="90" stroke="var(--color-paper)" strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : (
          <g className="animate-blink">
            <circle cx="74" cy="90" r="6" fill="var(--color-paper)" />
            <circle cx="106" cy="90" r="6" fill="var(--color-paper)" />
          </g>
        )}

        {/* mouth for error state */}
        {state === "error" && (
          <path d="M 80 108 Q 90 100 100 108" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* nose + whiskers */}
        <path d="M 90 104 L 85 110 L 95 110 Z" fill="var(--color-accent)" />
        <line x1="40" y1="100" x2="66" y2="104" stroke="var(--color-paper)" strokeWidth="1.5" opacity="0.5" />
        <line x1="40" y1="112" x2="66" y2="112" stroke="var(--color-paper)" strokeWidth="1.5" opacity="0.5" />
        <line x1="140" y1="100" x2="114" y2="104" stroke="var(--color-paper)" strokeWidth="1.5" opacity="0.5" />
        <line x1="140" y1="112" x2="114" y2="112" stroke="var(--color-paper)" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* thinking dots */}
      {state === "thinking" && (
        <g>
          <circle cx="150" cy="40" r="3.5" fill="var(--color-accent)" style={{ animation: "pulse-dot 1.2s ease-in-out infinite", animationDelay: "0s" }} />
          <circle cx="162" cy="34" r="3.5" fill="var(--color-accent)" style={{ animation: "pulse-dot 1.2s ease-in-out infinite", animationDelay: "0.2s" }} />
          <circle cx="174" cy="28" r="3.5" fill="var(--color-accent)" style={{ animation: "pulse-dot 1.2s ease-in-out infinite", animationDelay: "0.4s" }} />
        </g>
      )}

      {/* paws */}
      <ellipse cx="80" cy="188" rx="12" ry="9" fill="var(--color-ink)" />
      <ellipse cx="130" cy="188" rx="12" ry="9" fill="var(--color-ink)" />
    </svg>
  );
}
