import { MouseEvent, ReactNode, useRef } from "react";
import cn from "classnames";
import { useFocusWithin } from "@react-aria/interactions";

import TagAtom from "./ds/Tag";
import useStyles from "./hooks/useStyles";
import { useSelectWrapperStyles } from "./ds/Select";
import { AutocompleteInputOption } from "./AutocompleteInput";

import type { BaseProps as AutocompleteProps } from "../index";
import useMoreTagsCounter from "./hooks/useMoreTags";

type TagProps = {
  isOpen: boolean;
  hasFocus: boolean;
  tag: AutocompleteInputOption;
  size: string;
  onRemove: (option: AutocompleteInputOption) => void;
  setFocusTag: any;
};
const Tag = ({
  hasFocus,
  isOpen,
  setFocusTag,
  size,
  tag,
  onRemove
}: TagProps) => {
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (isFocusWithin) => {
      if (!isOpen) return;

      if (!isFocusWithin && hasFocus) {
        setFocusTag(null);
      } else if (isFocusWithin && !hasFocus) {
        setFocusTag(tag);
      }
    }
  });
  return (
    <div className="inline-flex my-0.5 mr-1 ml-0">
      <TagAtom
        {...focusWithinProps}
        data-tag={true}
        tabIndex={0}
        ellipsis
        noWrap
        type={hasFocus ? "primary" : "gray"}
        size={size}
        label={String(tag.label)}
        onRemove={(event: MouseEvent<HTMLDivElement>) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(tag);
        }}
      />
    </div>
  );
};

const MoreTags = ({ count }: { count: number }) => {
  return (
    <div className="z-39 absolute bottom-1 right-1">
      <TagAtom size="normal" label={`+${count}`} />
    </div>
  );
};

type Props<T extends AutocompleteInputOption> = Pick<
  AutocompleteProps<T>,
  "size" | "radius" | "borderWidth" | "disabled" | "hasErrors"
> & {
  isOpen?: boolean;
  tags: AutocompleteInputOption[];
  focusTag: AutocompleteInputOption | null;
  focusInput: boolean;
  setFocusTag: ReactStateDispatch<AutocompleteInputOption>;
  onRemove?: (option: AutocompleteInputOption) => void;
  children?: ReactNode;
};

const InputWrapper = <T extends AutocompleteInputOption>({
  isOpen = false,
  tags,
  focusTag,
  setFocusTag,
  onRemove,
  size,
  radius,
  borderWidth,
  disabled,
  hasErrors,
  children
}: Props<T>) => {
  const styles = useStyles({
    size,
    radius,
    borderWidth,
    disabled,
    hasErrors,
    forcedFocus: isOpen
  });
  const wrapperStyles = useSelectWrapperStyles({ hasErrors });
  const ref = useRef<HTMLDivElement>();
  const moreTagsCount = useMoreTagsCounter({ tags, isOpen, ref });
  return (
    <div className={wrapperStyles}>
      <div className={cn(styles, "pt-0.5 pb-1 pl-0.5")}>
        <div
          ref={ref}
          className={cn(
            "relative flex flex-wrap justify-start",
            "overflow-hidden -mb-1 -mt-0.5",
            {
              "max-h-[72px]": !isOpen
            }
          )}
        >
          {tags.map((tag: AutocompleteInputOption, index: number) => (
            <Tag
              key={`${tag.value}-${index}`}
              isOpen={isOpen}
              size="small"
              tag={tag}
              hasFocus={focusTag?.value === tag.value}
              setFocusTag={setFocusTag}
              onRemove={onRemove}
            />
          ))}
          <div className="flex flex-1 pl-0.5 h-full relative">{children}</div>
        </div>
      </div>

      {!isOpen && moreTagsCount > 0 && <MoreTags count={moreTagsCount} />}
    </div>
  );
};

export default InputWrapper;
