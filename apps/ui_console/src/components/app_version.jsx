import React from "react";

const AppVersion = (props) => {
  const { className, prefix } = props;
  return (
    <div data-tip="App Version" className={`font-mono text-xs opacity-50 ${className}`}>
      <span className="hidden lg:inline xl:ml-2">{prefix ? prefix : "ver"}</span>&nbsp;1.0
    </div>
  );
};

export default AppVersion;
