import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/auth_provider";
import constants from "../../constants/index";
import yadana from "../../assets/images/yadana.jpg";

const HomePage = (props) => {
  const auth = useAuth();
  console.log(auth);
  return (
    <div className="p-2 flax flex-col h-full">
      <div className="flex flex-col h-[calc(100vh-85px)] justify-center items-center">
        <img className="w-64 h-64" src={yadana}></img>
        <div className="font-semibold text-4xl p-2 pt-5"></div>
        <div className="font-semibold text-4xl p-1">Welcome.. {auth.user?.name}</div>
      </div>
    </div>
  );
};

export default HomePage;
