import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const USER_QUERY = gql`
  query getUser($input: OAuthAccessTokenInput!) {
    getUser(input: $input)
  }
`;

export const User = () => {
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { input: { token: "asdf", secret: "asdf" } },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  return <div>{data.getUser}</div>;
};
