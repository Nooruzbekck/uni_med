import { useState } from "react";
import { SearchInput } from "./components/UI/SearchInput";

export const App = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Введите текст для поиска"
        iconVariant="start" // или "end"
      />
    </div>
  );
};
