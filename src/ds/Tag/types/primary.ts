import type { Type } from "./index";
import { DISABLED_COMMON } from "./common";

const PRIMARY: Type = {
  defaultColor: {
    background: "primary",
    foreground: "white",
    icon: "primary100"
  },
  hoverColor: {
    background: "primary",
    foreground: "white",
    icon: "primary100"
  },
  disabledColor: DISABLED_COMMON
};

export { PRIMARY };
