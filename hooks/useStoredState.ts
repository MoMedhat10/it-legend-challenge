import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { parseJson, readStorage, subscribeStorage, writeStorage } from "@/lib/storage";

type SetStoredState<T> = (next: T | ((prev: T) => T)) => void;


const getServerSnapshot = () => null;

export function useStoredState<T>(key: string, fallback: T): [T, SetStoredState<T>] {
  const [initial] = useState(fallback);

  const raw = useSyncExternalStore(subscribeStorage, () => readStorage(key), getServerSnapshot);
  const value = useMemo(() => parseJson(raw, initial), [raw, initial]);

  const setValue = useCallback<SetStoredState<T>>(
    (next) => {
      const prev = parseJson(readStorage(key), initial);
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
      writeStorage(key, resolved);
    },
    [key, initial],
  );

  return [value, setValue];
}
