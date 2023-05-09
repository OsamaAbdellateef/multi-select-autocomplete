import { MutableRefObject, useCallback, useEffect, useState } from "react";

type Props = {
  open: boolean;
  inputRef: MutableRefObject<HTMLInputElement>;
};
const useInputFocus = ({ open, inputRef }: Props) => {
  const [focusInput, setFocus] = useState(false);

  const setFocusInput = useCallback(
    (hasFocus: boolean) => {
      if (inputRef.current && hasFocus) {
        inputRef.current.focus();
      }

      setFocus(hasFocus);
    },
    [inputRef, setFocus]
  );

  useEffect(() => {
    setFocusInput(open);
  }, [open, setFocusInput]);

  return {
    focusInput,
    setFocusInput
  };
};

export default useInputFocus;
