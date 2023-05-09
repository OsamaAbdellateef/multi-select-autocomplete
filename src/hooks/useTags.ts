import { useEffect, useMemo, useState } from "react";
import sortBy from "lodash/sortBy";

import { AutocompleteInputOption } from "../AutocompleteInput";
import { KeyboardArrowHorizontalDirection } from "./useKeyboarEvents";

function findTag(
  currentTag: AutocompleteInputOption,
  tags: AutocompleteInputOption[],
  direction: KeyboardArrowHorizontalDirection
): AutocompleteInputOption | null {
  const index = tags.findIndex((tag) => tag.value === currentTag.value);
  return tags[direction === "left" ? index - 1 : index + 1];
}

type Props = {
  search: string | null;
  selectedItems: string[];
  options: AutocompleteInputOption[];
};
const useTags = ({ search, options, selectedItems }: Props) => {
  const tags = useMemo<AutocompleteInputOption[]>(() => {
    return sortBy(
      options.filter((o) =>
        selectedItems.includes((o.value as unknown) as string)
      ),
      (o) => selectedItems.indexOf((o.value as unknown) as string)
    );
  }, [options, selectedItems]);

  const [focusTag, setFocusTag] = useState<AutocompleteInputOption | null>(
    null
  );
  const setFocusOnLast = () => setFocusTag(tags[tags.length - 1]);
  const handleTextRemoval = (
    text: string,
    removeCallback: (tag: AutocompleteInputOption) => void
  ) => {
    if (text.length > 0) return;

    if (!focusTag) {
      setFocusOnLast();
    } else {
      removeCallback(tags[tags.length - 1]);
      setFocusTag(null);
    }
  };

  const onArrowMove = (
    text: string,
    direction: KeyboardArrowHorizontalDirection
  ) => {
    if (text.length > 0) return;
    if (!focusTag && direction === "right") return;
    if (!focusTag) return setFocusOnLast();

    const tag = findTag(focusTag, tags, direction);

    if (!tag) return;

    setFocusTag(tag);
  };

  useEffect(() => {
    if (search) return;

    setFocusTag(null);
  }, [search, setFocusTag]);

  return {
    tags,
    focusTag,
    setFocusTag,
    handleTextRemoval,
    onArrowMove
  };
};

export default useTags;
