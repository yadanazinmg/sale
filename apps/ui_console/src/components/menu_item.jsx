import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {
  const { name, link, active } = props;
  //console.log(location.pathname);

  return (
    <NavLink to={link}>
      <div
        key={name}
        className={`w-full h-12 my-1 flex flex-row p-2 hover:bg-gray-300 hover:text-gray-900 rounded-md ${
          active ? "bg-gray-400 text-gray-900 font-semibold" : "font-normal"
        } `}
      >
        <div className="flex pl-1 pr-1 w-16 h-12">
          <props.icon className="w-16 h-16" />
        </div>
        <span className="flex pt-0 pl-2 pr-1 text-lg">{name}</span>
      </div>
    </NavLink>
  );
};

export default MenuItem;
