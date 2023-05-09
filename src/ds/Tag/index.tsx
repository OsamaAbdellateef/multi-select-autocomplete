import type { DOMAttributes, MouseEvent } from "react";
import cn from "classnames";

import { radius, colors } from "../tokens";
import type { BackgroundColor, TextColor } from "../tokens";
import Text from "../Text";
import type { FormElementSize } from "../../hooks/useStyles";
import { useType } from "./types/index";
import { FocusableElement } from "@react-types/shared";

export const TAG_TYPES = {
  gray: "gray",
  primary: "primary",
  red: "red"
};
export type TagColor = {
  background: BackgroundColor;
  foreground: TextColor;
  icon: TextColor;
};
export type TagType = keyof typeof TAG_TYPES;

export type Props = DOMAttributes<FocusableElement> & {
  label: string;
  type?: TagType;
  size?: FormElementSize;
  onRemove?: (event: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  ellipsis?: boolean;
  noWrap?: boolean;
  tabIndex?: number;
};

export default function Tag({
  label,
  onRemove,
  type = "gray",
  size = "normal",
  disabled = false,
  ellipsis = false,
  noWrap = false,
  tabIndex,
  ...rest
}: Props) {
  const { defaultColor, disabledColor } = useType({
    type
  });
  const background = disabled
    ? disabledColor.background
    : defaultColor.background;
  const color = disabled ? disabledColor.foreground : defaultColor.foreground;
  const iconColor = disabled ? disabledColor.icon : defaultColor.icon;
  return (
    <div
      {...rest}
      tabIndex={tabIndex}
      className={cn(
        "flex items-center justify-between",
        "focus-visible:outline-0",
        "focus-visible:ring-2 focus-visible:ring-primary-300",
        radius[4],
        colors.backgrounds[background],
        {
          "min-h-button": size === "normal"
        }
      )}
    >
      <div
        className={cn(
          "truncate max-w-[200px] pl-2 text-opacity-20",
          colors.textColors[color],
          {
            "pr-2": !onRemove,
            "py-1": size === "normal"
          }
        )}
      >
        <Text.H5 ellipsis={ellipsis} noWrap={noWrap} color={color}>
          {label}
        </Text.H5>
      </div>

      {Boolean(onRemove) && (
        <div
          tabIndex={-1}
          role="button"
          className={cn("flex items-center h-full", {
            "pointer-events-none": disabled,
            "py-1": size === "normal"
          })}
          onClickCapture={onRemove}
        >
          x
        </div>
      )}
    </div>
  );
}
