import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  fromPromise,
  gql,
} from "@apollo/client";
import "apollo-upload-client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from "../graphql/auth/mutations";
import { Token } from "graphql";
import { Redirect } from "react-router";

let apolloClient;

const refreshToken = () => {
  const actualRefreshToken = localStorage.getItem("refreshToken");
  if (actualRefreshToken !== null) {
    return apolloClient
      .mutate({
        mutation: REFRESH_TOKEN,
        variables: {
          refreshToken: actualRefreshToken,
        },
      })
      .then((result) => {
        localStorage.setItem(
          "accessToken",
          result.data.refreshToken.accessToken
        );
        return result.data.refreshToken.accessToken;
      });
  } else {
    return;
  }
};
const httpLink = createUploadLink({
  uri: "https://api.taktak.com.tn/graphql",
  headers: {
    "keep-alive": "true",
  },
});

const defaultOptions = {
  watchQuery: { fetchPolicy: "cache-end-network", errorPolicy: "ignore" },
  query: { fetchPolicy: "network-only", errorPolicy: "all" },
  mutate: { errorPolicy: "all" },
};
let authLink = new ApolloLink((operation, forward) => {
  operation.setContext(async () => {
    const token = await localStorage.getItem("accessToken");
    if (token !== null) {
      return {
        headers: {
          "access-token": token,
        },
      };
    } else {
      return {
        headers: {},
      };
    }
  });
  return forward(operation);
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.code) {
          case "UNAUTHENTICATED":
              
             
             return fromPromise(
               refreshToken().catch((error) => {
              //  Handle token refresh errors e.g clear stored tokens, redirect to login
                 console.log('',error);
                 return;
               })
             )
               .filter((value) => Boolean(value))
               .flatMap((accessToken) => {
               console.log("tttt", accessToken);
                 const oldHeaders = operation.getContext().headers;
               // modify the operation context with a new token
                 operation.setContext({
                   headers: {
                     ...oldHeaders,
                     "access-token": `${accessToken}`,
                   },
                 });

              //  retry the request, returning the new observable
                 return forward(operation);
               });
            
            break;
          default:
            break;
        }
      }
    }
  }
);
apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions
});
export default apolloClient;
