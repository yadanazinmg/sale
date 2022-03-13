import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../routes/paths";

const InfoShow2 = (props) => {
  const navigate = useNavigate();
  const { title, label1, count1, label2, count2, type } = props;

  const handleClick = () => {
    console.log("patient");
    navigate(paths.getPatientType(type));
  };

  return (
    <div
      className={`m-2 p-2 grid grid-cols-3 gap-2 bg-green-100 rounded-md border-[1px] border-gray-300 w-[250px] cursor-pointer ${props.className}`}
      onClick={handleClick}
    >
      <div className="px-2 text-lg col-span-3 font-semibold">{title}</div>
      <div className="px-2 text-lg col-span-2">{label1}</div>
      <div className="px-2 text-right">{count1}</div>
      <div className="px-2 text-lg col-span-2">{label2}</div>
      <div className="px-2 text-right">{count2}</div>
    </div>
  );
};

export default InfoShow2;
