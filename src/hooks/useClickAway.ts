import { useEffect, useRef } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

type UseClickAwayType = {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
  events: string[];
};

export const useClickAway = ({ ref, callback, events = defaultEvents }: UseClickAwayType) => {
  const _callback = useRef(callback);

  useEffect(() => {
    _callback.current = callback;
  }, [callback]);

  useEffect(() => {
    const onClickAway = (event: any) => {
      event.stopPropagation();

      if (ref.current && !ref.current.contains(event.target)) {
        // _callback.current(event);
      }
    };

    events.forEach(event => document.addEventListener(event, onClickAway));

    return () => {
      events.forEach(event => document.removeEventListener(event, onClickAway));
    };
  }, [events, ref]);
};
