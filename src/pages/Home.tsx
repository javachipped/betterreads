import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const BOOKS = gql`
  {
    books {
      title
    }
  }
`;

export const Home = () => {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(({ title }: any) => (
    <div key={title}>
      <p>{title}</p>
    </div>
  ));
};
