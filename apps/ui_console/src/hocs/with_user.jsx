import React from "react";
import { connect } from "react-redux";

const withUser = (WrappedComponent) => {
  const HOC = (props) => {
    return <WrappedComponent {...props} />;
  };
  const mapStateToProps = (state) => ({
    user: state.User,
  });

  return connect(mapStateToProps)(HOC);
};

export default withUser;
