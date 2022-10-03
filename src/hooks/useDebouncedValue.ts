import { useEffect, useState } from "react";

const DEFAULT_DELAY = 100;

export const useDebouncedValue = <T = unknown>(value: T, delay: number = DEFAULT_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
