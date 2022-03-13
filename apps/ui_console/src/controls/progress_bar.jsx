import React from "react";

const ProgressBar = (props) => {
  const { percent, className } = props;
  const percentInternal = Math.abs(percent) % 101;
  const getPercent = () => `${percentInternal}%`;

  return (
    <div className={`w-full ${className ? className : ""}`}>
      <div className="overflow-hidden h-[5px] mb-2 text-xs flex rounded bg-base-200">
        <div style={{ width: getPercent() }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary`}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
