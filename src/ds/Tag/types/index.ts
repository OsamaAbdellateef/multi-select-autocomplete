import type { TagType, TagColor } from "../index";
import { PRIMARY } from "./primary";
import { GRAY } from "./gray";
import { RED } from "./red";

type Props = { type: TagType };
export type Type = {
  defaultColor: TagColor;
  hoverColor: TagColor;
  disabledColor: TagColor;
};
const TYPES = {
  primary: PRIMARY,
  gray: GRAY,
  red: RED
};
export const useType = ({ type }: Props): Type => {
  return TYPES[type];
};
