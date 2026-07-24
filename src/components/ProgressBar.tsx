import NyakoMascot from "./NyakoMascot";

export default function ProgressBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="w-full flex items-center gap-3" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <NyakoMascot state="loading" size={36} className="shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between text-xs text-text-dim mb-1 font-display">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-line overflow-hidden">
          <div
            className="h-full bg-primary transition-[width] duration-200 motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
