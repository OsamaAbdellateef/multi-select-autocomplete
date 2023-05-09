import cn from "classnames";
type UseSelectWrapperStyles = { hasErrors: boolean };

export const useSelectWrapperStyles = ({ hasErrors }: UseSelectWrapperStyles) =>
  cn("flex items-center w-full relative focus:z-10", { "z-10": hasErrors });
