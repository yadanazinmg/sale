import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, useAuth } from "../../auth/auth_provider";

const authLink = setContext((req, previousContext) => {
  //console.log(previousContext);
  const { headers } = previousContext;
  // get the authentication token from local storage if it exists
  const token = getAccessToken(); //localStorage.getItem("token");
  //console.log("token : " + token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default authLink;
