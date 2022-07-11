import { useState, useContext, FocusEventHandler } from "react";
import useCallbackRef from "../hooks/useCallbackRef";
import FocusVisibleContext from "./FocusVisibleContext";

type Return = {
  focusVisible: boolean;
  onFocus: FocusEventHandler;
  onBlur: FocusEventHandler;
};

const useFocusVisible = (): Return => {
  const [focused, setFocused] = useState(false);
  const hadKeyboardEvent = useContext(FocusVisibleContext);

  const handleFocus = useCallbackRef(() => setFocused(true));

  const handleBlur = useCallbackRef(() => setFocused(false));

  return {
    focusVisible: hadKeyboardEvent && focused,
    onBlur: handleBlur,
    onFocus: handleFocus,
  };
};

export default useFocusVisible;
