import { ChangeEventHandler, useState, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";

type Props = { initialSearch: string | null };
const useSearch = ({ initialSearch }: Props) => {
  const [search, setSearch] = useState(initialSearch);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };
  const onSearch = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  // Cancel search on unmount
  useEffect(() => () => onSearch.cancel(), [onSearch]);

  return { search, setSearch, onSearch };
};

export default useSearch;
