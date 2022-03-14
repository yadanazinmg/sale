import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { AuthProvider } from "./auth/auth_provider";
import AppName from "./components/app_name";
import AppVersion from "./components/app_version";
import EmptyLayout from "./components/empty_layout";
import FullLayout from "./components/full_layout";
import withUser from "./hocs/with_user";
import paths from "./routes/paths";

const barePages = [paths.login, paths.print_record_base];

const App2 = (props) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isEmptyLayout = () => {
    for (let i = 0; i < barePages.length; i++) {
      if (location.pathname.startsWith(barePages[i])) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <AuthProvider user={props.user}>{isEmptyLayout() ? <EmptyLayout /> : <FullLayout />}</AuthProvider>
    </>
  );
};

export default withUser(App2);
