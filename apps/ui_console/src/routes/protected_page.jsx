import React from "react";
import { Route, Navigate } from "react-router-dom";
import { RequireAuth } from "../auth/auth_provider";

const ProtectedPage = ({ page: Page, path }) => {
  console.log(path);
  return <RequireAuth>{<Page />}</RequireAuth>;
};

export default ProtectedPage;
