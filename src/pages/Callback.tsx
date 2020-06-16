import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ACCESS_TOKEN_QUERY = gql`
  query accessToken($requestToken: String!, $requestTokenSecret: String!) {
    accessToken(
      data: {
        requestToken: $requestToken
        requestTokenSecret: $requestTokenSecret
      }
    ) {
      accessToken
      accessTokenSecret
    }
  }
`;

export const Callback = (props: any) => {
  const requestToken = localStorage.getItem("requestToken");
  const requestTokenSecret = localStorage.getItem("requestTokenSecret");
  const { loading, error, data } = useQuery(ACCESS_TOKEN_QUERY, {
    variables: { requestToken, requestTokenSecret },
  });
  if (error) {
    return <div>Error :(</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  }

  localStorage.setItem("accessToken", data.accessToken.accessToken);
  localStorage.setItem("accessTokenSecret", data.accessToken.accessTokenSecret);
  localStorage.removeItem("requestToken");
  localStorage.removeItem("requestTokenSecret");
  window.location.href = "/";
  return <div></div>;
};
