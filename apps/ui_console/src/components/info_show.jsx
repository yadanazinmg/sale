import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../routes/paths";

const InfoShow = (props) => {
  const navigate = useNavigate();
  const { label, count, type } = props;
  //const { type } = props.type;

  const handleClick = () => {
    console.log("patient");
    console.log(type);
    navigate(paths.getPatientType(type));
  };
  return (
    <div className={`m-2 p-2 flex flex-row bg-blue-50 rounded-md border-[1px] border-gray-300 min-w-[250px] cursor-pointer ${props.className}`}>
      <div className="px-2 font-semibold text-lg" onClick={handleClick}>
        {label}
      </div>
      <div className="px-2 text-right">{count}</div>
    </div>
  );
};

export default InfoShow;
