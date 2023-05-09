import cn from "classnames";

import {
  font,
  colors,
  shadow,
  radius as radiusTokens,
  radiusLeft,
  radiusTop,
  radiusTopLeft,
  radiusTopRight,
  radiusRight,
  useBorderWidth
} from "../ds/tokens";
import type { RadiusPosition, BorderWidthOption } from "../ds/tokens";

export type FormElementSize = "normal" | "small";

export type IconProps = { name: string };
type Props = {
  radius?: RadiusPosition;
  borderWidth?: BorderWidthOption;
  disabled?: boolean;
  forcedFocus?: boolean;
  size?: FormElementSize;
  icon?: IconProps;
  hasErrors?: boolean;
  selectNone?: boolean;
  focusZIndex?: boolean;
};

const useStyles = ({
  radius = "full",
  size = "normal",
  disabled = false,
  forcedFocus,
  hasErrors,
  selectNone = false,
  borderWidth = { full: "2" },
  focusZIndex = true,
  icon = null
}: Props = {}): string => {
  const borderWidthCss = useBorderWidth(borderWidth);
  return cn(
    "outline-none w-full min-w-0 relative",
    font.size.h5,
    borderWidthCss,
    {
      "py-2 px-4": size === "normal",
      "py-1 px-2 min-h-inputSmall": size === "small",
      "pl-8": icon?.name && size === "normal",
      "pl-7": icon?.name && size === "small",
      // Text
      [colors.textColors.gray900]: !disabled,
      [colors.textColors.gray600]: disabled,
      [colors.textColors.red1000]: hasErrors,

      // Borders
      [colors.borderColors.gray200]: !hasErrors,
      [colors.borderColors.red1000]: !disabled && hasErrors,

      // backgrounds
      [colors.backgrounds.white]: !disabled,
      [colors.backgrounds.gray200]: disabled,

      // Radius
      [radiusTokens["8"]]: radius === "full",
      [radiusTokens["none"]]: radius === "none",
      [radiusTop["8"]]: radius === "top",
      [radiusTopLeft["8"]]: radius === "topLeft",
      [radiusTopRight["8"]]: radius === "topRight",
      [radiusLeft["8"]]: radius === "left",
      [radiusRight["8"]]: radius === "right",

      // Focus styles
      [colors.focusBorderColors.primary]:
        borderWidth && !disabled && !hasErrors,
      [colors.focusBorderColors.red1000]: borderWidth && !disabled && hasErrors,
      [shadow.focus.primary200]: borderWidth && !hasErrors,
      [shadow.focus.red200]: borderWidth && hasErrors,

      // Forced focus progamatically
      [colors.borderColors.primary]:
        borderWidth && forcedFocus && !disabled && !hasErrors,
      [colors.borderColors.red1000]:
        borderWidth && forcedFocus && !disabled && hasErrors,
      [shadow.normal.primary200]: borderWidth && forcedFocus && !hasErrors,
      [shadow.normal.red200]: borderWidth && forcedFocus && hasErrors,

      "select-none": selectNone,
      "focus:z-10": focusZIndex
    }
  );
};

export default useStyles;
