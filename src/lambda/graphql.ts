import { ApolloServer, gql } from "apollo-server-lambda";
import { searchBooks } from "./resolvers/books";
import { login, accessToken } from "./resolvers/login";

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

  type LoginRequest {
    requestToken: String!
    requestTokenSecret: String!
    loginURL: String!
  }

  type Query {
    searchBooks(query: String!, page: Int!): SearchBooksOutput!
    login: LoginRequest!
    accessToken(data: RequestTokenPair): AccessTokenPair!
  }

  input RequestTokenPair {
    requestToken: String!
    requestTokenSecret: String!
  }

  type AccessTokenPair {
    accessToken: String!
    accessTokenSecret: String!
  }
`;

const resolvers = {
  Query: {
    searchBooks: (_: any, { query, page }: any) => searchBooks(query, page),
    login: (_: any, args: any) => login(),
    accessToken: (_: any, { data }: any) => accessToken(data),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
