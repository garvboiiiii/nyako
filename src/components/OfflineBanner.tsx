import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "../lib/useOnlineStatus";

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div className="bg-ink text-white text-sm px-4 py-2.5 flex items-center justify-center gap-2 text-center">
      <WifiOff size={14} />
      You're offline — most tools still work since everything runs on your device. Some tools that
      need a first-time download (like OCR) may not.
    </div>
  );
}
