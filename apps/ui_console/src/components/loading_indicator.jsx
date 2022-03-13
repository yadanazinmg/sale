import React, { useState } from "react";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const LoadingIndicator = (props) => {
  //let [loading, setLoading] = useState(true);
  //let [color, setColor] = useState("#000099");
  let { loading, color } = props;
  if (color === undefined) color = "#000099";
  if (loading === false) return null;
  return (
    <div
      className="absolute top-1/3 left-1/3 rounded-md bg-gray-400 flex flex-col items-center backdrop-filter backdrop-blur-lg opacity-90
  bg-gradient-to-r from-gray-300 to-blue-100"
    >
      <PulseLoader color={color} loading={true} css={override} size={20} margin={4} />
      <span className="font-semibold p-2">Loading...</span>
    </div>
  );
};

export default LoadingIndicator;
