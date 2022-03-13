import React from "react";
import { Link } from "react-router-dom";
import paths from "../routes/paths";

const AppName = (props) => {
  const { className } = props;
  return (
    <div className={`flex items-center flex-none ${className}`}>
      <Link to={paths.home} className="px-1 flex-0 btn btn-ghost md:px-4 nuxt-link-active" aria-label="Homepage">
        <div className="inline-block text-3xl font-title text-primary">
          <span className="lowercase">zm</span>
          <span className="text-base-content">Control</span>
        </div>
      </Link>
    </div>
  );
};

export default AppName;
