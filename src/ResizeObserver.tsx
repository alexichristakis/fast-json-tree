import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import useCallbackRef from "./hooks/useCallbackRef";
import useLazyRef from "./hooks/useLazyRef";

const ResizeObserverContext = createContext<ResizeObserver | undefined>(
  undefined
);

const callbackKey = Symbol("resizeObserverCallback");
const lastPayloadKey = Symbol("resizeObserverLastPayload");

type ObserverCallback = (payload: DOMRectReadOnly) => void;

type ObserverElement = Element & {
  [callbackKey]?: Set<ObserverCallback>;
  [lastPayloadKey]?: DOMRectReadOnly;
};

type ObserverEntry = Omit<ResizeObserverEntry, "target"> & {
  target: ObserverElement;
};

export type ObserverRef = (node: Element | null) => void;

export const ResizeObserverProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useLazyRef(
    () =>
      new ResizeObserver((entries: ObserverEntry[]) => {
        entries.forEach(({ target, contentRect }) => {
          target[lastPayloadKey] = contentRect;
          target[callbackKey]?.forEach((c) => c(contentRect));
        });
      })
  ).current;

  return (
    <ResizeObserverContext.Provider value={value}>
      {children}
    </ResizeObserverContext.Provider>
  );
};

/**
 */
export const useResizeObserver = (callback: ObserverCallback): ObserverRef => {
  const observer = useContext(ResizeObserverContext);
  const ref = useRef<ObserverElement | null>(null);

  const wrappedCallback = useCallbackRef(callback);

  return useCallbackRef((node: ObserverElement | null) => {
    if (ref.current) {
      const callbackSet = ref.current[callbackKey];
      if (callbackSet) {
        callbackSet.delete(wrappedCallback);
        if (callbackSet.size === 0) {
          ref.current[callbackKey] = undefined;
          ref.current[lastPayloadKey] = undefined;
          observer?.unobserve(ref.current);
        }
      }
    }

    ref.current = node;

    if (ref.current) {
      const callbackSet = ref.current[callbackKey];
      if (callbackSet) {
        callbackSet.add(wrappedCallback);
        // Since we don't call observe again, we should compute the rect here and call the callback
        const lastRect = ref.current[lastPayloadKey];
        if (lastRect) {
          wrappedCallback(lastRect);
        }
      } else {
        ref.current[callbackKey] = new Set([wrappedCallback]);
        observer?.observe(ref.current);
      }
    }
  });
};

export type Dimension = number | null;

export type Rect = {
  height: Dimension;
  width: Dimension;
};

export const useDimensions = (): [rect: Rect, ref: ObserverRef] => {
  const [height, setHeight] = useState<Dimension>(null);
  const [width, setWidth] = useState<Dimension>(null);

  const ref = useResizeObserver(({ width, height }) => {
    setHeight(height);
    setWidth(width);
  });

  const dimensions = useMemo(() => ({ height, width }), [width, height]);
  return [dimensions, ref];
};

export const useHeight = (): [height: Dimension, ref: ObserverRef] => {
  const [height, setHeight] = useState<Dimension>(null);

  const ref = useResizeObserver(({ height }) => {
    setHeight(height);
  });

  return [height, ref];
};

export const useWidth = (): [width: Dimension, ref: ObserverRef] => {
  const [width, setWidth] = useState<Dimension>(null);

  const ref = useResizeObserver(({ width }) => {
    setWidth(width);
  });

  return [width, ref];
};
