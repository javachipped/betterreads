import { ApolloServer, gql } from "apollo-server-lambda";
import OAuth from "oauth";
import { searchBooks } from "./resolvers/books";
import { stringify } from "querystring";

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

  type OAuthRequest {
    token: String!
    secret: String!
  }

  input OAuthAccessTokenInput {
    token: String!
    secret: String!
  }

  type Query {
    searchBooks(query: String!, page: Int!): SearchBooksOutput!
    login: OAuthRequest!
    getUser(token: OAuthAccessTokenInput!): String!
  }
`;

const resolvers = {
  Query: {
    searchBooks: (_: any, { query, page }: any) => searchBooks(query, page),
    login: async () => {
      var oauth = new OAuth.OAuth(
        "https://goodreads.com/oauth/request_token",
        "https://goodreads.com/oauth/access_token",
        process.env.GOODREADS_API_KEY,
        process.env.GOODREADS_API_SECRET,
        "1.0",
        null,
        "HMAC-SHA1"
      );
      const { token, secret } = await new Promise<{
        token: string;
        secret: string;
      }>((resolve, reject) => {
        oauth.getOAuthRequestToken((err, token, secret) => {
          resolve({ token, secret });
        });
      });
      return { token, secret };
    },
    getUser: async (_: any, { token: { token, secret } }) => {
      console.log(token, secret);
      return "javachip";
    },
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
