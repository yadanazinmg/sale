import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestorePrefix } from "../constants/firebase";
import withOrg from "../hocs/with_org";

const ImageShow = (props) => {
  const navigate = useNavigate();
  const [logourl, setLogoURL] = useState(`${firestorePrefix}/${props.org.id}%2Flogo.png?alt=media&token=e16e6b73-0a5f-4308-8546-58b0a0f9ff02`);
  console.log(props);
  return <img className={`${props.className}`} src={logourl}></img>;
};

export default withOrg(ImageShow);
