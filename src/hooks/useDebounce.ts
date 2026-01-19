import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeId);
  });

  return debounceValue;
}
