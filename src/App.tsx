import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ThemeProvider,
  CSSReset,
  Heading,
  Flex,
  Link,
  Text,
} from "@chakra-ui/core";

import { Home } from "./pages/Home";
import { Callback } from "./pages/Callback";

import { Login } from "./components/Login";
import { Logout } from "./pages/Logout";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
});

export const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <ApolloProvider client={client}>
        <Router>
          <Flex p={5} alignItems="center" borderBottom={`1px solid #979797`}>
            <Heading flex="1 1 auto">BetterReads</Heading>
            {localStorage.getItem("accessToken") &&
            localStorage.getItem("accessTokenSecret") ? (
              <Link href="/logout" rel="noreferrer">
                Logout
              </Link>
            ) : (
              <Link href="/login" rel="noreferrer">
                Login
              </Link>
            )}
          </Flex>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/oauth/callback">
              <Callback />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};
