import React from "react";
import { useLocation } from "react-router";

const NotFound = () => {
  const location = useLocation();

  console.log(location);
  return <div>Route Not Found : {location?.pathname}</div>;
};

export default NotFound;
