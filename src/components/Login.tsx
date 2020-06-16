import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LOGIN = gql`
  query login {
    login {
      requestToken
      requestTokenSecret
      loginURL
    }
  }
`;

export const Login = () => {
  const { loading, error, data } = useQuery(LOGIN);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  const { requestToken, requestTokenSecret, loginURL } = data.login;
  localStorage.setItem("requestToken", requestToken);
  localStorage.setItem("requestTokenSecret", requestTokenSecret);

  window.location.href = loginURL;

  return <div />;
};
