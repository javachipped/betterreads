import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, CSSReset, Heading, Box } from "@chakra-ui/core";

import { Home } from "./pages/Home";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
});

export const App = () => (
  <ThemeProvider>
    <CSSReset />
    <ApolloProvider client={client}>
      <Router>
        <Box p={5} borderBottom={`1px solid #979797`}>
          <Heading>BetterReads</Heading>
        </Box>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  </ThemeProvider>
);
