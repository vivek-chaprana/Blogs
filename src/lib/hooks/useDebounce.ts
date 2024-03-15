"use client";
import { useMemo } from "react";

type DebouncedFunction<T> = (...args: any[]) => void;

export default function useDebounce<T>(
  fn: DebouncedFunction<T>,
  delay?: number
) {
  return useMemo(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    return async () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(async () => {
        await fn();
        timeoutId = null;
      }, delay || 500);
    };
  }, [fn]);
}
