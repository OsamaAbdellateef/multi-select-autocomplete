import { useState, useMemo } from "react";

import AutocompleInput from "./AutocompleteInput";

const options = [
  { label: "Tomato", value: "tomato" },
  { label: "Orange", value: "orange" },
  { label: "Apple", value: "apple" },
  { label: "Papaya", value: "papaya" },
  {
    label: "Olive",
    value: "olive"
  },
  { label: "Raspberries", value: "paspberries" },
  { label: "Muskmelon", value: "muskmelon" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Cranberry", value: "cranberry" },
  { label: "Avocados", value: "avocado" }
];
export default function App() {
  const [selectedValues, setSelected] = useState([]);
  const selectedItems = useMemo(() => {
    const values = selectedValues.map((selected) => selected.value);
    return options
      .filter((o) => values.includes(o.value as string))
      .map((o) => o.value as string);
  }, [options, selectedValues]);
  const onChange = (values: SelectOption[]) => {
    setSelected(values);
  };
  return (
    <div className="w-80 flex flex-col items-start">
      <AutocompleInput
        name="things"
        placeholder="Select something..."
        size="small"
        selectedItems={selectedItems}
        onChange={onChange}
        options={options}
        selectionMode="multiple"
      />
    </div>
  );
}
