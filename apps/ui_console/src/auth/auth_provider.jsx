import React, { useState, useEffect, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import { logIn, logOut } from "../helpers/gql_auth_helpers";
import paths from "../routes/paths";
import { store } from "../store/configure_store";
import { actionCreators as userActions } from "../store/actions/user_actions";

const AuthContext = createContext(null);
let accessToken = "";

export const getAccessToken = () => accessToken;
export const setAccessToken = (token) => {
  accessToken = token;
};

export const AuthProvider = ({ user: usr, children }) => {
  const [user, setUser] = useState(usr);
  //console.log("AuthProvider");

  const signIn = async (signInUser) => {
    const response = await logIn(signInUser);
    if (response) {
      const { user: loginUser, accessToken: token } = response;
      loginUser.t = token;
      setUser(loginUser);
      setAccessToken(token);
      store.dispatch(userActions.setUser(loginUser));
      return loginUser;
    }
    return null;
  };

  const signOut = async () => {
    if (user) {
      await logOut();
      setUser(null);
      setAccessToken(null);
      store.dispatch(userActions.setUser(null));
    }
  };

  const value = { user, accessToken, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  let auth = useAuth();
  console.log(auth);
  let location = useLocation();

  //console.log(auth.user);

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={paths.login} state={{ from: location }} />;
  }

  return children;
};
