import { useCallback, useRef, useState } from "react";
import cn from "classnames";
import xor from "lodash/xor";
import compact from "lodash/compact";
import { useFilter } from "@react-aria/i18n";
import { Item } from "@react-stately/collections";
import { ListProps, useListState } from "@react-stately/list";
import { Node, Selection } from "@react-types/shared";

import { colors, radius, shadow } from "./ds/tokens";
import useSize from "./hooks/useSize";
import { FormElementSize } from "ds/Form/useStyles";
import { BorderWidthOption, RadiusPosition } from "ds/tokens";

import useSearch from "./hooks/useSearch";
import useKeyboarEvents from "./hooks/useKeyboarEvents";
import useTags from "./hooks/useTags";
import useInputFocus from "./hooks/useInputFocus";

import ListBox from "./ListBox";
import InputWrapper from "./InputWrapper";
import Input from "./Input";

function buildSelectedItems(prevItems: string[], newItems: string[]): string[] {
  return compact(xor(prevItems, newItems));
}

export type AutocompleteInputOption = {
  label: string | number;
  value: string | number;
};
export type AutocompleteInputOnChangeHandler = (
  options: AutocompleteInputOption[]
) => void;
export interface BaseProps<T extends AutocompleteInputOption>
  extends ListProps<T> {
  onChange: AutocompleteInputOnChangeHandler;
  placeholder?: string;
  selectedItems: string[];
  options: T[];
  name: string;
  size?: FormElementSize;
  listProps?: ListProps<T>;
  disabled?: boolean;
  noResultsMessage?: string;
  hasErrors?: boolean;
  radius?: RadiusPosition;
  borderWidth?: BorderWidthOption;
}
const AutocompleBase = <T extends AutocompleteInputOption>({
  children,
  placeholder,
  disabled = false, // TODO: Do this we need when running async save operations
  name,
  selectedItems = [],
  options,
  noResultsMessage = "No results",
  onChange,
  selectionMode = "multiple"
}: BaseProps<T>) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { search, setSearch, onSearch } = useSearch({ initialSearch: "" });
  const { focusInput, setFocusInput } = useInputFocus({ inputRef, open });
  const { contains } = useFilter({ sensitivity: "base" });
  const filter = useCallback(
    (nodes: Iterable<Node<T>>) =>
      Array.from(nodes).filter((item) =>
        contains(item.value.label as string, search)
      ),
    [contains, search]
  );
  const clearSearch = () => {
    if (inputRef.current) inputRef.current.value = "";
    setSearch("");
  };
  const onSelectionChange = useCallback(
    (values: string[]) => {
      const selectedOptions = options.filter((o) =>
        values.includes(o.value as string)
      );
      onChange(selectedOptions);
    },
    [options, onChange]
  );
  const state = useListState<T>({
    items: options,
    children,
    selectionBehavior: selectionMode === "single" ? "replace" : "toggle",
    selectionMode: selectionMode === "single" ? "single" : "multiple", // In multiple we handle selection
    defaultSelectedKeys: selectedItems,
    filter,
    onSelectionChange: (keys: Selection) => {
      const selectedKeys =
        keys === "all"
          ? selectedItems
          : (Array.from(keys.values()) as string[]);
      onSelectionChange(selectedKeys);
      clearSearch();
    }
  });
  const {
    tags,
    focusTag,
    setFocusTag,
    handleTextRemoval,
    onArrowMove
  } = useTags({
    search,
    options,
    selectedItems
  });
  const resetState = () => {
    clearSearch();
    setFocusTag(null);
    setFocusInput(false);
    state.selectionManager.setFocusedKey(null);
    state.selectionManager.setFocused(false);
  };

  const removeOption = (option: AutocompleteInputOption | null) => {
    const newItems = buildSelectedItems(selectedItems, [
      option?.value as string | null
    ]);
    state.selectionManager.setSelectedKeys(newItems);
    onSelectionChange(newItems);
  };
  const { keyboardProps } = useKeyboarEvents({
    events: {
      keydown: {
        onArrowDown: () => {
          state.selectionManager.setFocusedKey(
            state.collection.getFirstKey(),
            "first"
          );
          state.selectionManager.setFocused(true);
        },
        onEscape: () => {
          setOpen(false);
          resetState();
        },
        onEnter: () => {
          if (search && state.collection.size > 0) {
            state.selectionManager.select(state.collection.getFirstKey());
          }
        },
        onBackspace: (text) => {
          handleTextRemoval(text, removeOption);
        },
        onArrowMove
      }
    }
  });

  const {
    ref: triggerRef,
    width,
    offset,
    alignOffset,
    onSizeChange
  } = useSize({ selected: [] });
  const onOpenChange = (open: boolean) => {
    onSizeChange(!open);
    setFocusInput(open);
    setOpen(open);
    if (!open) {
      resetState();
    }
    clearSearch();
  };
  const inputPlacholder = !selectedItems.length ? placeholder : null;
  return (
    <div
      className={cn(
        colors.backgrounds.white,
        shadow.normal["2p"],
        radius["16"],
        "flex flex-col",
        "animate-slideDownAndFade"
      )}
      style={{ width: 280 }}
    >
      <div className="pt-2 px-2">
        <InputWrapper
          isOpen={open}
          focusTag={focusTag}
          focusInput={focusInput}
          setFocusTag={setFocusTag}
          tags={tags}
          onRemove={removeOption}
        >
          <Input
            {...keyboardProps}
            ref={inputRef}
            hasItems={selectedItems.length > 0}
            autoFocus
            name={name}
            disabled={disabled}
            onChange={onSearch}
            placeholder={inputPlacholder}
          />
        </InputWrapper>
      </div>
      <ListBox
        aria-labelledby="listbox"
        disallowEmptySelection
        onFirstItemArrowUp={(focusInput: boolean) => {
          if (!focusInput) return;

          setFocusInput(true);
          state.selectionManager.setFocused(false);
        }}
        onEscape={() => {
          onOpenChange(false);
        }}
        selectionMode={selectionMode}
        noResultsMessage={noResultsMessage}
        items={options}
        state={state}
        onFocusChange={(isFocus) => setFocusInput(!isFocus)}
      >
        {(item) => <Item key={item.value}>{item.label}</Item>}
      </ListBox>
    </div>
  );
};

type Props<T extends AutocompleteInputOption> = Omit<BaseProps<T>, "children">;
export const AutocompleteInput = <T extends AutocompleteInputOption>(
  props: Props<T>
) => {
  return (
    <AutocompleBase {...props}>
      {(item) => <Item key={item.value}>{item.label}</Item>}
    </AutocompleBase>
  );
};

export default AutocompleteInput;
