import { useCallback, useState } from "react";

export const Search = (props: any) => {
  const [search, setSearch] = useState("");
  const { onSearch } = props;

  const handleChange = useCallback(
    (e: any) => {
      const text = e.target.value;
      onSearch(text);
      setSearch(text);
    },
    [search]
  );

  return (
    <div className="grid place-items-center">
      <input
        placeholder="Search...."
        type="search"
        className="shadow-lg rounded-lg p-4 text-xl border-0"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};
