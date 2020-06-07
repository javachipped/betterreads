import React, { useState } from "react";

interface Props {
  onSubmit: (query: string) => void;
}
export const SearchBox: React.FC<Props> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  return (
    <input
      name="query"
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          onSubmit(query);
        }
      }}
    />
  );
};
