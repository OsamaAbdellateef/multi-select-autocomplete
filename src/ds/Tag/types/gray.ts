import type { Type } from "./index";
import { DISABLED_COMMON } from "./common";

const GRAY: Type = {
  defaultColor: {
    background: "gray200",
    foreground: "gray900",
    icon: "gray300"
  },
  hoverColor: {
    background: "gray200",
    foreground: "gray900",
    icon: "gray300"
  },
  disabledColor: DISABLED_COMMON
};

export { GRAY };
