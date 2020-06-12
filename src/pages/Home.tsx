import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Stack, Text } from "@chakra-ui/core";

import { SearchBox, BookItem } from "../components";

const SEARCH_BOOKS = gql`
  query searchBooks($query: String!, $page: Int!) {
    searchBooks(query: $query, page: $page) {
      totalPages
      books {
        title
        author {
          name
        }
      }
    }
  }
`;

export const Home = () => {
  const [loadSearchBooks, { loading, error, called, data }] = useLazyQuery(
    SEARCH_BOOKS
  );

  if (called && loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <SearchBox
        onSubmit={(query) => loadSearchBooks({ variables: { query, page: 1 } })}
      />
      {data && (
        <Stack spacing={10} mx={4}>
          <Text>Total Pages: {data.searchBooks.totalPages}</Text>
          {data &&
            data.searchBooks.books.map((book: any) => (
              <BookItem key={book.title} book={book} />
            ))}
        </Stack>
      )}
    </>
  );
};
