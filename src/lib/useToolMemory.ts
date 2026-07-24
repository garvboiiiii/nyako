import { useCallback, useEffect, useState } from "react";

const RECENT_KEY = "nyako-recent-tools";
const FAVORITES_KEY = "nyako-favorite-tools";
const MAX_RECENT = 6;

function readList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) — fail silently,
    // this is a nice-to-have feature, not core functionality.
  }
}

/** Records tool visits and returns the most recent ones, most-recent-first. */
export function useRecentTools() {
  const [recent, setRecent] = useState<string[]>(() => readList(RECENT_KEY));

  const recordVisit = useCallback((toolId: string) => {
    setRecent((prev) => {
      const next = [toolId, ...prev.filter((id) => id !== toolId)].slice(0, MAX_RECENT);
      writeList(RECENT_KEY, next);
      return next;
    });
  }, []);

  return { recent, recordVisit };
}

export function useFavoriteTools() {
  const [favorites, setFavorites] = useState<string[]>(() => readList(FAVORITES_KEY));

  useEffect(() => {
    writeList(FAVORITES_KEY, favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  }, []);

  const isFavorite = useCallback((toolId: string) => favorites.includes(toolId), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
