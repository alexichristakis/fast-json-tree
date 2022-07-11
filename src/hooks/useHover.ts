import { Ref, useRef, useState } from "react";
import useCallbackRef from "./useCallbackRef";
import useMountEffect from "./useMountEffect";

type Args = {
  onHover?: () => void;
};

type Return<T extends HTMLElement> = [ref: Ref<T>, hovered: boolean];

const useHover = <T extends HTMLElement>({ onHover }: Args = {}): Return<T> => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = useCallbackRef(() => {
    setHovered(true);
    onHover?.();
  });

  const handleMouseLeave = useCallbackRef(() => setHovered(false));

  useMountEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.addEventListener("mouseenter", handleMouseEnter, true);
    node.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter, true);
      node.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  });

  return [ref, hovered];
};

export default useHover;
