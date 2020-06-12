import React, { useState } from "react";
import { Input, InputGroup, Icon, InputLeftElement } from "@chakra-ui/core";

interface Props {
  onSubmit: (query: string) => void;
}
export const SearchBox: React.FC<Props> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  return (
    <InputGroup m={10}>
      <InputLeftElement children={<Icon name="search" color="gray.300" />} />
      <Input
        type="text"
        placeholder="Search"
        name="query"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            onSubmit(query);
          }
        }}
      />
    </InputGroup>
  );
};
