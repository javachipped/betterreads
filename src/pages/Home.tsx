import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { SearchBox } from "../components";

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
      {data && <p>Total Pages: {data.searchBooks.totalPages}</p>}
      {data &&
        data.searchBooks.books.map(({ title, author: { name } }: any) => (
          <div key={title}>
            <p>
              {title} - {name}
            </p>
          </div>
        ))}
    </>
  );
};
