import React from "react";
import logo from "../assets/images/logo.png";

const LogoImg = (props) => {
  return <img className={`${props.className}`} src={logo}></img>;
};

export default LogoImg;
