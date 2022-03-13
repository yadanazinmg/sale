import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../../store/actions/user_actions";
import { useAuth } from "../../auth/auth_provider";
import LogoImg from "../../components/logo_img";
import constants from "../../constants";

const formSchema = yup.object().shape({
  name: yup.string().required("User Id is required."),
  password: yup.string().required("Password is required."),
});

const formData = {
  name: "",
  password: "",
};

const LoginPage = (props) => {
  const [loginError, setLoginError] = useState();

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let state = location.state;
  let from = state ? state.from.pathname : "/";

  const handleLogin = async (data) => {
    console.log(data);
    const user = await auth.signIn({ name: data.name, pwd: data.password });
    if (user) {
      navigate(from, { replace: true });
    } else {
      setLoginError("Invalid Name or Password!");
    }
  };

  const isEmpty = (obj) => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
  };

  return (
    <div className="h-screen w-full">
      <div className="absolute m-2 p-2 w-[500px] border-[1px] left-1/2 mt-[100px] ml-[-250px] border-gray-300 rounded-md">
        <Formik initialValues={formData} enableReinitialize={true} onSubmit={handleLogin} validationSchema={formSchema} className="w-full">
          {({ dirty, values, errors, touched, handleChange, handleSubmit, handleReset, setFieldValue }) => {
            return (
              <Form autoComplete="off">
                <div className="flex flex-col place-items-center">
                  <div className="p-1 text-lg font-semibold">Login to {constants.app_id}</div>
                  <div className="p-1">
                    {/* <img className="w-48 h-48" src={logo}></img> */}
                    <LogoImg className="w-28 h-28" />
                  </div>
                  <div className="flex flex-nowrap">
                    <div className="w-24 p-2 m-2">User Name</div>
                    <div className="p-2 m-2 flex flex-col">
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="User Name"
                        className="input input-sm "
                        value={values.name}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="name" component="span" className="text-sm text-red-500" />
                    </div>
                  </div>
                  <div className="flex flex-nowrap">
                    <div className="w-24 p-2 m-2">Password</div>
                    <div className="p-2 m-2 flex flex-col">
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="input input-sm "
                        value={values.password}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="password" component="span" className="text-sm text-red-500" />
                    </div>
                  </div>
                  <div className="flex flex-col py-3 items-center">
                    <button type="submit" disabled={!dirty} className="p-3 h-12 w-24 mb-2 btn btn-primary">
                      Login
                    </button>
                    {loginError && <span className="text-sm text-red-500">{loginError}</span>}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(actionCreators.fetchUser(userId)),
  };
};
export default connect(null, mapDispatchToProps)(LoginPage);
