import React from "react";
import { useAuth } from "../auth/auth_provider";
import constants from "../constants";

const Header = (props) => {
  const { org } = props;
  let auth = useAuth();
  console.log(auth.user.name);

  console.log(auth.user);
  return (
    <div className="relative w-full p-1 flex flex-row justify-between">
      <span className="text-2xl font-bold text-gray-700">&nbsp;</span>
      <span className="text-2xl font-bold text-gray-700">{constants.app_name}</span>
      {auth.user && <span className="text-xl font-semibold text-red-700">{auth.user.user.user.name}</span>}
    </div>
  );
};

export default Header;
