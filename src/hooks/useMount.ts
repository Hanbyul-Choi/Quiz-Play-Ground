import { useEffect, useRef, EffectCallback } from 'react';

export const useMount = (callback: EffectCallback): void => {
  const _callback = useRef<EffectCallback>(callback);

  useEffect(() => {
    _callback.current();
  }, []);
};
