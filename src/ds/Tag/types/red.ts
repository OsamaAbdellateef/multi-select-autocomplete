import type { Type } from "./index";
import { DISABLED_COMMON } from "./common";

const RED: Type = {
  defaultColor: {
    background: "red100",
    foreground: "red1000",
    icon: "red1000"
  },
  hoverColor: {
    background: "red100",
    foreground: "red1000",
    icon: "red1000"
  },
  disabledColor: DISABLED_COMMON
};

export { RED };
