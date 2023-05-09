import { ReactNode, forwardRef } from "react";
import cn from "classnames";

import type {
  FontSize,
  FontWeight,
  FontSpacing,
  TextColor,
  WordBreak,
  Overflow,
  WhiteSpace
} from "../tokens";
import {
  font,
  colors,
  whiteSpace as whiteSpaceOptions,
  overflow as overflowOptions,
  wordBreak as wordBreakOptions
} from "../tokens";

type Display = "inline" | "inline-block" | "block";
type Common = {
  children: ReactNode;
  color?: TextColor;
  centered?: boolean;
  capitalize?: boolean;
  uppercase?: boolean;
  wordBreak?: WordBreak;
  whiteSpace?: WhiteSpace;
  ellipsis?: boolean;
  display?: Display;
  userSelect?: boolean;
  noWrap?: boolean;
};

export type TextProps = {
  size?: FontSize;
  weight?: FontWeight;
  spacing?: FontSpacing;
  centered?: boolean;
  capitalize?: boolean;
  wordBreak?: WordBreak;
  uppercase?: boolean;
  userSelect?: boolean;
};

type FooProps = TextProps & Common;
const Text = forwardRef<HTMLSpanElement, FooProps>(function Text(
  {
    children,
    size = "h4",
    color = "gray900",
    spacing = "normal",
    weight = "normal",
    display = "inline",
    uppercase = false,
    centered = false,
    capitalize = false,
    whiteSpace = "normal",
    wordBreak,
    ellipsis = false,
    userSelect = true,
    noWrap = false
  },
  ref
) {
  const colorClass = colors.textColors[color];
  const sizeClass = font.size[size];
  const weightClass = font.weight[weight];
  const spacingClass = font.spacing[spacing];
  const wordBreakClass = wordBreakOptions[wordBreak];
  const whiteSpaceClass = whiteSpaceOptions[whiteSpace];
  return (
    <span
      ref={ref}
      className={cn(
        font.family.sans,
        sizeClass,
        weightClass,
        spacingClass,
        colorClass,
        wordBreakClass,
        whiteSpaceClass,
        display,
        {
          capitalize: capitalize,
          uppercase: uppercase,
          "text-center": centered,
          "text-left": !centered,
          truncate: ellipsis,
          "select-none": !userSelect,
          "whitespace-nowrap": noWrap
        }
      )}
    >
      {children}
    </span>
  );
});

// H1
const H1 = forwardRef<HTMLSpanElement, Common>(function H1(props, ref) {
  return <Text ref={ref} size="h1" {...props} />;
});

// H2
const H2 = forwardRef<HTMLSpanElement, Common>(function H2(props, ref) {
  return <Text ref={ref} size="h2" {...props} />;
});
const H2B = forwardRef<HTMLSpanElement, Common>(function H2B(props, ref) {
  return <Text ref={ref} size="h2" weight="bold" {...props} />;
});

// H3
const H3 = forwardRef<HTMLSpanElement, Common>(function H3(props, ref) {
  return <Text ref={ref} size="h3" {...props} />;
});
const H3B = forwardRef<HTMLSpanElement, Common>(function H3B(props, ref) {
  return <Text ref={ref} size="h3" weight="bold" {...props} />;
});

// H4
const H4 = forwardRef<HTMLSpanElement, Common>(function H4(props, ref) {
  return <Text ref={ref} size="h4" {...props} />;
});
const H4M = forwardRef<HTMLSpanElement, Common>(function H4M(props, ref) {
  return <Text ref={ref} size="h4" weight="medium" {...props} />;
});
const H4B = forwardRef<HTMLSpanElement, Common>(function H4B(props, ref) {
  return <Text ref={ref} size="h4" weight="semibold" {...props} />;
});

// H5
const H5 = forwardRef<HTMLSpanElement, Common>(function H5(props, ref) {
  return <Text ref={ref} size="h5" {...props} />;
});
const H5M = forwardRef<HTMLSpanElement, Common>(function H5M(props, ref) {
  return <Text ref={ref} size="h5" weight="medium" {...props} />;
});
const H5B = forwardRef<HTMLSpanElement, Common>(function H5B(props, ref) {
  return <Text ref={ref} size="h5" weight="semibold" {...props} />;
});

// H6
const H6 = forwardRef<HTMLSpanElement, Common>(function H6(props, ref) {
  return <Text ref={ref} size="h6" {...props} />;
});

const H6M = forwardRef<HTMLSpanElement, Common>(function H6M(props, ref) {
  return <Text ref={ref} size="h6" weight="medium" {...props} />;
});
const H6B = forwardRef<HTMLSpanElement, Common>(function H6B(props, ref) {
  return <Text ref={ref} size="h6" weight="semibold" {...props} />;
});

const H6C = forwardRef<HTMLSpanElement, Common>(function H6C(props, ref) {
  return (
    <Text
      ref={ref}
      uppercase
      size="h6"
      spacing="wide"
      weight="bold"
      {...props}
    />
  );
});

// H7
const H7C = forwardRef<HTMLSpanElement, Common>(function H7C(props, ref) {
  return (
    <Text
      ref={ref}
      uppercase
      size="h7"
      spacing="wide"
      weight="bold"
      {...props}
    />
  );
});

type MonoProps = {
  color: TextColor;
  children: React.ReactNode;
  weight?: string;
  userSelect?: boolean;
  overflow?: Overflow;
  ellipsis?: boolean;
  display?: Display;
};
const Mono = forwardRef<HTMLSpanElement, MonoProps>(function MonoFont(
  { color, weight, children, userSelect, ellipsis, overflow, display },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        font.family.mono,
        font.size.h6,
        font.weight[weight],
        colors.textColors[color],
        overflowOptions[overflow],
        {
          [display]: !ellipsis,
          "block truncate": ellipsis,
          "select-none": !userSelect
        }
      )}
    >
      {children}
    </span>
  );
});

Mono.defaultProps = {
  userSelect: true,
  weight: "normal",
  ellipsis: false,
  display: "inline"
};

export default {
  H1,
  H2,
  H2B,
  H3,
  H3B,
  H4,
  H4M,
  H4B,
  H5,
  H5M,
  H5B,
  H6,
  H6M,
  H6B,
  H6C,
  H7C,
  Mono
};
