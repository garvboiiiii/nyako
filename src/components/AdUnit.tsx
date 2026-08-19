import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  /** Ad unit slot ID from AdSense > Ads > Ad units. */
  slot: string;
  className?: string;
  format?: string;
}

/**
 * A manually-placed AdSense ad unit. Use this instead of relying on Auto
 * Ads whenever you want an ad guaranteed to sit next to real, specific
 * content (e.g. below a tool's description/FAQ, inside a blog post) —
 * Auto Ads decides placement heuristically and can occasionally choose a
 * thin or loading screen, which is what triggered the AdSense "ads on
 * screens without publisher content" flag in the first place.
 *
 * Create the ad unit itself in the AdSense dashboard (Ads > By ad unit >
 * Display ads) and pass its slot ID here.
 */
export default function AdUnit({ slot, className = "", format = "auto" }: AdUnitProps) {
  const pushed = useRef(false);

  const hasValidSlot = /^\d{10,20}$/.test(slot);

  useEffect(() => {
    if (!hasValidSlot) return;
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded yet (e.g. blocked, offline) — fail silently.
    }
  }, [hasValidSlot]);

  // Keep manual ads disabled until a real AdSense display-unit slot is
  // configured. This prevents a placeholder slot from shipping accidentally.
  if (!hasValidSlot) return null;

  return (
    <div className={`my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6663361980769657"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
