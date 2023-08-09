import { useLayoutEffect, useRef, type EffectCallback } from 'react';

export const useMountLayout = (callback: EffectCallback): void => {
  const _callback = useRef<EffectCallback>(callback);

  useLayoutEffect(() => {
    _callback.current();
  }, []);
};
