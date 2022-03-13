import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
//import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { create_app_user, create_user } from "../../graphql/user";
import withUser from "../../hocs/with_user";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  role: yup.string().nullable().required("Role is required."),
  password: yup
    .string()
    .min(6, "6 characters in minumum")
    .matches(/^(?=.*[0-9a-zA-Z]).{6,}$/, "Password contains invalid characters.")
    .required("Password is required."),
});

const formData = {
  name: "",
  role: "",
  password: "",
};

const CreateUserPage = (props) => {
  const [addUser, { data }] = useMutation(create_app_user);
  const navigate = useNavigate();

  const handleSave = async (data) => {
    console.log(data);
    const plc = { ...data };
    addUser({
      variables: {
        name: plc.name,
        pwd: plc.password,
        role: plc.role,
      },
    }).then((resp) => {
      console.log(resp);
      navigate(-1);
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const EntryForm = () => {
    return (
      <Formik initialValues={formData} enableReinitialize={true} onSubmit={handleSave} validationSchema={formSchema}>
        {({ dirty, values, errors, touched, isValid, handleChange, handleSubmit, handleReset, setFieldValue, handleBlur }) => {
          return (
            <Form autoComplete="off">
              <div className="form-control">
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Name</div>
                  <div className="p-2 m-2 flex flex-col">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="name" component="span" className="text-sm text-red-500 mx-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Password</div>
                  <div className="p-2 m-2 flex flex-col">
                    <Field
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="password" component="span" className="text-sm text-red-500 mx-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Role</div>
                  <div className="p-2 m-2 flex flex-col">
                    <select className="select select-primary" name="role" value={values.role} onChange={handleChange} onBlur={handleBlur}>
                      <option value="">Select Role</option>
                      {rowData.map((r) => (
                        <option value={r.value}>{r.label}</option>
                      ))}
                    </select>
                    <ErrorMessage name="role" component="span" className="text-sm text-red-500" />
                    {/* <Field type="text" id="DoseType" name="DoseType" placeholder="DoseType" value={values.DoseType} onChange={handleChange} /> */}
                  </div>
                </div>
                <div className="flex flex-nowrap p-3">
                  <button aria-label="back" onClick={handleBack} className="mx-1 lg:mx-6 py-3 h-12 w-24 btn">
                    Back {/* <ArrowBackIcon className="text-yellow-700" fontSize="large" /> */}
                  </button>
                  <button type="submit" disabled={!(dirty && isValid)} className="mx-1 lg:mx-6  py-3 h-12 w-24 btn btn-primary">
                    Save
                  </button>
                  <button disabled={!dirty} className="mx-1 lg:mx-6 py-3 h-12 w-24 btn btn-primary" onClick={handleReset}>
                    Clear
                  </button>
                </div>
                {/* <div>{loginError && <span className="text-sm text-red-500">{loginError}</span>}</div> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="px-4 text-2xl font-bold">New User Entry</div>
      <EntryForm />
    </div>
  );
};

const rowData = [
  { label: "Admin", value: "ADMIN" },
  { label: "Supervisor", value: "SUPERVISOR" },
  { label: "Operator", value: "OPERATOR" },
  { label: "Redemption", value: "REDEMPTION" },
];

export default withUser(CreateUserPage);
