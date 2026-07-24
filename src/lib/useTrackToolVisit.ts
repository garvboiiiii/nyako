import { useEffect } from "react";
import { useRecentTools } from "./useToolMemory";
import { track } from "./analytics";

export function useTrackToolVisit(toolId: string) {
  const { recordVisit } = useRecentTools();

  useEffect(() => {
    recordVisit(toolId);
    track("tool_page_view", { toolId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId]);
}
