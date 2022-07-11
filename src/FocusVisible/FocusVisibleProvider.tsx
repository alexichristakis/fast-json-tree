import { FC, PropsWithChildren, useState } from "react";
import useCallbackRef from "../hooks/useCallbackRef";
import useMountEffect from "../hooks/useMountEffect";
import FocusVisibleContext from "./FocusVisibleContext";

const FocusVisibleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState(true);

  const handlePointerDown = useCallbackRef(() => setHadKeyboardEvent(false));

  const handleKeyDown = useCallbackRef(
    ({ metaKey, altKey, ctrlKey }: KeyboardEvent) => {
      if (metaKey || altKey || ctrlKey) {
        return;
      }

      setHadKeyboardEvent(true);
    }
  );

  useMountEffect(() => {
    function onVisibilityChange(_e: Event) {
      if (document.visibilityState === "hidden") {
        setHadKeyboardEvent(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    document.addEventListener("visibilitychange", onVisibilityChange, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange,
        true
      );
    };
  });

  return (
    <FocusVisibleContext.Provider value={hadKeyboardEvent}>
      {children}
    </FocusVisibleContext.Provider>
  );
};

export default FocusVisibleProvider;
