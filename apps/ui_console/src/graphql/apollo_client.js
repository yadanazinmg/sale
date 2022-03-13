import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import authLink from "./links/auth_link";
import httpLink from "./links/http_link";

const allLinks = from([authLink, httpLink]);

const defaultOptions = {
  watchQuery: {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    errorPolicy: "all",
  },
};

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: allLinks,
  defaultOptions: defaultOptions,
});

export default apolloClient;
