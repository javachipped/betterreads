import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, CSSReset, Heading, Flex, Link } from "@chakra-ui/core";

import { Home } from "./pages/Home";
import { User } from "./pages/User";

import { Login } from "./components/Login";

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
            <Link href="/login" rel="noreferrer">
              Login
            </Link>
          </Flex>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/oauth/callback">
              <User />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};
