import { createContext, useContext, useState, useCallback, useRef } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const pendingRef = useRef(new Set());
  const [ready, setReady] = useState(false);

  const register = useCallback((key) => {
    pendingRef.current.add(key);
  }, []);

  const done = useCallback((key) => {
    pendingRef.current.delete(key);
    if (pendingRef.current.size === 0) {
      setReady(true);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ ready, register, done }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
