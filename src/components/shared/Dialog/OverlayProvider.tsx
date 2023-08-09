import {
  Fragment,
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

export const OverlayContext = createContext<{
  mount(id: string, element: ReactNode): void;
  unmount(id: string): void;
} | null>(null);

export type CreateOverlayElement = (props: { isOpen: boolean; close: () => void; exit: () => void }) => JSX.Element;

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlays, setOverlays] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlays(_overlays => {
      const __overlays = new Map(_overlays);
      __overlays.set(id, element);

      return __overlays;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlays(_overlays => {
      const __overlays = new Map(_overlays);
      __overlays.delete(id);

      return __overlays;
    });
  }, []);

  const context = useMemo(
    () => ({
      mount,
      unmount
    }),
    [mount, unmount]
  );

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlays.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const overlayContext = useContext(OverlayContext);
  if (!overlayContext) {
    throw new Error('useOverlayContext is only available within OverlayProvider');
  }

  return overlayContext;
};
