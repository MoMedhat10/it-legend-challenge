import { useEffect, useState, type RefObject } from "react";

const FULLSCREEN_BUTTON = ".media-fullscreen-button";

function supportsElementFullscreen(): boolean {
  const doc = document as Document & { webkitFullscreenEnabled?: boolean };
  return Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
}

// iPhone Safari has no element fullscreen, so the player's fullscreen button covers the screen instead.
export function usePseudoFullscreen(containerRef: RefObject<HTMLElement | null>): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || supportsElementFullscreen()) return;

    const intercept = (event: Event) => {
      if (!(event.target instanceof Element) || !event.target.closest(FULLSCREEN_BUTTON)) return;
      if (event instanceof KeyboardEvent) {
        const isActivation = event.type === "keydown" ? event.key === "Enter" : event.key === " ";
        if (!isActivation) return;
      }
      event.preventDefault();
      event.stopPropagation();
      setActive((prev) => !prev);
    };

    container.addEventListener("click", intercept, true);
    container.addEventListener("keydown", intercept, true);
    container.addEventListener("keyup", intercept, true);
    return () => {
      container.removeEventListener("click", intercept, true);
      container.removeEventListener("keydown", intercept, true);
      container.removeEventListener("keyup", intercept, true);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return active;
}
