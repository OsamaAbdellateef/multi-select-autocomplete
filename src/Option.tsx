import { useRef } from "react";
import cn from "classnames";
import { ListState } from "@react-stately/list";
import { useOption } from "@react-aria/listbox";
import { Node } from "@react-types/shared";

import Text from "./ds/Text";
import { AutocompleteInputOption } from "./AutocompleteInput";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { colors, radius, shadow } from "./ds/tokens";

type OptionProps = {
  item: Node<AutocompleteInputOption>;
  state: ListState<AutocompleteInputOption>;
};
export default function Option({ item, state }: OptionProps) {
  const ref = useRef<HTMLDivElement>();
  const { optionProps, isSelected } = useOption({ key: item.key }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const hasFocus = isFocusVisible;

  return (
    <div
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      aria-labelledby={item.value.label.toString()}
      className={cn(
        "group min-h-8",
        "flex flex-row justify-between cursor-pointer items-center",
        "py-1 px-2",
        "border-2 focus:outline-0 border-transparent",
        radius["8"],
        {
          "bg-primary-100 border-primary-100 hover:bg-primary-100": isSelected,
          [colors.focusBorderColors.primary]: hasFocus,
          [shadow.normal.primary200]: isFocusVisible
        }
      )}
    >
      <Text.H5
        color={isSelected ? "primary1000" : "gray1000"}
        ellipsis
        wordBreak="normal"
        noWrap
      >
        {item.rendered}
      </Text.H5>
    </div>
  );
}
