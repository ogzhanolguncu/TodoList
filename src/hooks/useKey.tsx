import { useState, useEffect, useCallback } from 'react';

export const useKey = (keyCodeArr: string[]) => {
  const [keyPressed, setKeyPressed] = useState(true);

  const keyFunction = useCallback(
    (event: KeyboardEvent) => {
      if (keyCodeArr.includes(event.code)) {
        setKeyPressed((prevState) => !prevState);
      }
    },
    [keyCodeArr]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyFunction, false);
    return () => {
      document.removeEventListener('keydown', keyFunction, false);
    };
  }, [keyFunction]);

  return [keyPressed, setKeyPressed] as const;
};
