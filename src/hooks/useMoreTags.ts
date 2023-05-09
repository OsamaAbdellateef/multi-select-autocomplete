import { MutableRefObject, useMemo } from "react";
import { AutocompleteInputOption } from "../AutocompleteInput";

const CLOSED_MAX_HEIGH = 72;
type Props = {
  isOpen: boolean;
  tags: AutocompleteInputOption[];
  ref: MutableRefObject<HTMLDivElement>;
};
const useMoreTagsCounter = ({ ref, isOpen, tags }: Props) => {
  const numOfTags = tags.length;
  return useMemo(() => {
    if (!ref.current) return 0;
    if (isOpen) return 0;
    if (numOfTags === 0) return 0;

    const element = ref.current;
    const { top: elTop } = element.getBoundingClientRect();
    const parentBottom = elTop + CLOSED_MAX_HEIGH;
    return Array.from(element.querySelectorAll(`[data-tag="true"]`)).filter(
      (item) => {
        const { top: itemTop } = item.getBoundingClientRect();
        return itemTop > parentBottom;
      }
    ).length;
  }, [isOpen, numOfTags, ref]);
};

export default useMoreTagsCounter;
