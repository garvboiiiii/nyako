import { MonitorSmartphone, LogIn, Ban, Zap } from "lucide-react";

const BADGES = [
  { icon: MonitorSmartphone, label: "Files stay on your device" },
  { icon: LogIn, label: "No login" },
  { icon: Ban, label: "No watermarks" },
  { icon: Zap, label: "Fast browser processing" },
];

export default function PrivacyBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {BADGES.map((b) => (
        <span
          key={b.label}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-dim border border-line rounded-full px-3 py-1.5 bg-surface"
        >
          <b.icon size={13} className="text-primary" />
          {b.label}
        </span>
      ))}
    </div>
  );
}
