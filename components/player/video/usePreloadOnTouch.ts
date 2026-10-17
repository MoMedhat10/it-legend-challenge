import { useEffect, useState } from "react";

// iOS only plays with sound if play() runs right after the tap, so load the player early on touch devices.
export function usePreloadOnTouch(enabled: boolean): boolean {
  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    if (!enabled || preloaded || !window.matchMedia("(pointer: coarse)").matches) return;
    let idleId = 0;
    const schedule = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(() => setPreloaded(true), { timeout: 3000 })
        : window.setTimeout(() => setPreloaded(true), 1500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [enabled, preloaded]);

  return preloaded;
}
