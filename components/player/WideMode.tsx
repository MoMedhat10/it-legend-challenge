"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useStoredState } from "@/hooks/useStoredState";

interface WideModeValue {
  wide: boolean;
  toggleWide: () => void;
}

const WideModeContext = createContext<WideModeValue | null>(null);

export function WideModeProvider({ children }: { children: ReactNode }) {
  const [wide, setWide] = useStoredState("player-wide-mode", false);
  return (
    <WideModeContext value={{ wide, toggleWide: () => setWide((prev) => !prev) }}>{children}</WideModeContext>
  );
}

export function useWideMode(): WideModeValue {
  const value = useContext(WideModeContext);
  if (!value) throw new Error("useWideMode must be used inside <WideModeProvider>");
  return value;
}
