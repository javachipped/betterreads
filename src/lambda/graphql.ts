import { ApolloServer, gql } from "apollo-server-lambda";

import { searchBooks } from "./resolvers/books";

const typeDefs = gql`
  type SearchBooksOutput {
    totalPages: Int!
    books: [Book!]!
  }
  type Book {
    title: String!
    author: Author!
  }

  type Author {
    name: String!
  }

  type Query {
    searchBooks(query: String!, page: Int!): SearchBooksOutput!
  }
`;

const resolvers = {
  Query: {
    searchBooks: (_: any, { query, page }: any) => searchBooks(query, page),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
