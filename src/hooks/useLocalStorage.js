import { useCallback, useState } from "react";

function getInitialValue(key, initialValue) {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const savedValue = window.localStorage.getItem(key);

    if (savedValue === null) {
      return initialValue;
    }

    return JSON.parse(savedValue);
  } catch {
    return initialValue;
  }
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    getInitialValue(key, initialValue)
  );

  const setValue = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const nextValue =
          value instanceof Function ? value(currentValue) : value;

        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
        }

        return nextValue;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
    }

    setStoredValue(initialValue);
  }, [initialValue, key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;