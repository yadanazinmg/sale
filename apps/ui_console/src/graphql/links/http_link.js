import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import constants from "../../constants";

const httpLink = createHttpLink({
  uri: constants.graphql_server,
});

export default httpLink;
