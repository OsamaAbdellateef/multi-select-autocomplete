import { useEffect, useMemo, useRef } from "react";
import { AriaListBoxOptions, useListBox } from "@react-aria/listbox";
import { ListProps, ListState } from "@react-stately/list";
import { KeyboardDelegate } from "@react-types/shared";
import { ListKeyboardDelegate } from "@react-aria/selection";
import { useCollator } from "@react-aria/i18n";

import { AutocompleteInputOption } from "./AutocompleteInput";
import Option from "./Option";
import Text from "./ds/Text";

type KeyChecker<T extends AutocompleteInputOption> = {
  delegate: KeyboardDelegate;
  state: ListState<T>;
};
const useFirstKeyChecker = <T extends AutocompleteInputOption>({
  delegate,
  state
}: KeyChecker<T>) => {
  const manager = state.selectionManager;
  return () => {
    if (!delegate) return false;
    return !delegate.getKeyAbove(manager.focusedKey);
  };
};
interface Props<T extends AutocompleteInputOption>
  extends ListProps<T>,
    AriaListBoxOptions<T> {
  state: ListState<T>;
  onFirstItemArrowUp: (isFirstKeyAndArrowUp: boolean) => void;
  onEscape: () => void;
  noResultsMessage: string;
}
export default function ListBox<T extends AutocompleteInputOption>(
  props: Props<T>
) {
  const listRef = useRef<HTMLUListElement>(null);
  const { state, onFirstItemArrowUp, onEscape, noResultsMessage } = props;
  const collator = useCollator({ usage: "search", sensitivity: "base" });
  const collection = state.collection;
  const delegate = useMemo<ListKeyboardDelegate<T>>(
    () => new ListKeyboardDelegate(collection, new Set(), listRef, collator),
    [collator, listRef, collection]
  );
  const { listBoxProps } = useListBox(props, state, listRef);
  const isArrowUpOnFirstItem = useFirstKeyChecker({ delegate, state });
  const list = [...state.collection];
  return (
    <div className="nowheel custom-scrollbar overflow-y-auto">
      <ul
        {...listBoxProps}
        onKeyDown={(event) => {
          const key = event.key;
          if (key === "ArrowUp") {
            event.preventDefault();
            event.stopPropagation();

            const isFirst = isArrowUpOnFirstItem();
            onFirstItemArrowUp(isFirst);

            if (listRef.current && isFirst) {
              listRef.current.scrollTop = 0;
            }
          } else if (key === "ArrowDown") {
            event.preventDefault();
            event.stopPropagation();
          } else if (key === "Escape") {
            onEscape();
          }

          // Let's React Aria do it's magic
          listBoxProps.onKeyDown(event);
        }}
        ref={listRef}
        className="flex flex-col max-h-72 w-full pl-2 pr-5"
      >
        {list.map((item) => (
          <li key={item.key} className="mt-1 first:mt-2 last:mb-3">
            <Option item={item} state={state} />
          </li>
        ))}
        {!list.length && (
          <div className="flex justify-center py-1">
            <Text.H5>{noResultsMessage}</Text.H5>
          </div>
        )}
      </ul>
    </div>
  );
}
