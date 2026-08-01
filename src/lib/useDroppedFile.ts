import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface DroppedFileState {
  droppedFile?: File;
}

/**
 * When a file is dropped on the homepage and the person clicks one of the
 * suggested tools, the file is carried along via React Router navigation
 * state (in-memory, never touches a URL or a server) instead of being
 * dropped on the floor. This hook picks it up on the destination tool
 * page and hands it to that tool's normal file handler — so it behaves
 * exactly as if the person had dropped it directly on that tool's own
 * dropzone.
 */
export function useDroppedFile(onFile: (file: File) => void) {
  const location = useLocation();
  const navigate = useNavigate();
  const consumed = useRef(false);

  useEffect(() => {
    if (consumed.current) return;
    const state = location.state as DroppedFileState | null;
    const file = state?.droppedFile;
    if (file instanceof File) {
      consumed.current = true;
      onFile(file);
      // Clear the state so navigating back/forward or refreshing doesn't
      // re-trigger processing of the same file.
      navigate(location.pathname + location.search, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
