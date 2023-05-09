import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";
import { font } from "./ds/tokens";

export type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "text" | "size"
> & {
  hasItems: boolean;
};
const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { placeholder, onChange, hasItems, ...rest },
  ref
) {
  return (
    <input
      {...rest}
      autoComplete="off"
      ref={ref}
      className={cn(
        "min-h-button pl-2 w-full bg-transparent ",
        "focus:ring-0 focus:ring-offset-0 focus:outline-0",
        "placeholder:text-sm placeholder:leading-5 placeholder:font-normal",
        font.size.h5,
        font.weight.normal,
        {
          "pl-0": hasItems
        }
      )}
      type="text"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
});

export default Input;
