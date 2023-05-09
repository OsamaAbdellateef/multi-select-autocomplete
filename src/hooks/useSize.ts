import { useEffect } from "react";

import { AutocompleteInputOption } from "../AutocompleteInput";
import usePopoverStyles from "./usePopoverStyles";

type Props = {
  selected: AutocompleteInputOption[];
};
const useComboBoxSize = ({ selected }: Props) => {
  const { width, offset, alignOffset, onSizeChange, ref } = usePopoverStyles();
  useEffect(() => {
    onSizeChange(false);
  }, [onSizeChange, selected.length]);

  return {
    onSizeChange,
    width,
    offset,
    alignOffset,
    ref
  };
};

export default useComboBoxSize;
