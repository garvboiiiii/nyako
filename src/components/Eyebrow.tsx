export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-xs uppercase tracking-wide text-primary font-medium">
      {children}
    </p>
  );
}
