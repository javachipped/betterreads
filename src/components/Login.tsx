import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LOGIN = gql`
  query login {
    login {
      token
      secret
    }
  }
`;

const GOODREADS_AUTHORIZE_URL = `https://www.goodreads.com/oauth/authorize?oauth_token=:token&oauth_callback=https://localhost:8888/oauth/callback`;

export const Login = () => {
  const { loading, error, data } = useQuery(LOGIN);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  const { token, secret } = data.login;

  window.location.href = GOODREADS_AUTHORIZE_URL.replace(
    ":token",
    token
  ).replace(":secret", secret);

  return <div />;
};
