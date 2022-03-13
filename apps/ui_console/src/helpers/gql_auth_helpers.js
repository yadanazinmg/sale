import apolloClient from "../graphql/apollo_client";
import { sing_in } from "../graphql/user";

export const logIn = async (user) => {
  console.log(user);
  const result = await apolloClient.mutate({
    mutation: sing_in,
    variables: {
      name: user.name,
      pwd: user.pwd,
    },
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
  });
  if (result && result.data) {
    const siginUser = result.data.signIn;
    return siginUser;
  }
  return result;
};

export const logOut = () => {
  //
};
