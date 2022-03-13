import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withUser from "../../hocs/with_user";
import * as yup from "yup";
import { create_gate } from "../../graphql/gate";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  gate_type: yup.string().required("Gate Type is required."),
});

const formData = {
  name: "",
  gate_type: "",
};

const CreateGatePage = (props) => {
  const [addGate, { data }] = useMutation(create_gate);
  const navigate = useNavigate();

  const handleSave = async (data) => {
    console.log(data);
    const plc = { ...data };
    console.log(plc);
    addGate({
      variables: {
        data: {
          name: plc.name,
          gate_type: plc.gate_type,
        },
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
        {({ dirty, values, isValid, errors, touched, handleChange, handleSubmit, handleReset, setFieldValue }) => {
          return (
            <Form autoComplete="off">
              <div className="form-control">
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Name</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      value={values.name}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="name" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap w-auto">
                  <div className="w-48 p-2 m-2 label">Gate Type</div>
                  <div className="p-2 m-2">
                    <select id="gate_type" className="select select-primary w-full" name="gate_type" value={values.gate_type} onChange={handleChange}>
                      <option value="">Select Entry Type</option>
                      {EntryType.map((r) => (
                        <option value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-nowrap p-3">
                  <button aria-label="back" onClick={handleBack} className="mx-1 lg:mx-6 py-3 h-12 w-24 btn">
                    Back {/* <ArrowBackIcon className="text-yellow-700" fontSize="large" /> */}
                  </button>
                  <button type="submit" disabled={!dirty || !isValid} className="mx-1 lg:mx-6  py-3 h-12 w-24 btn btn-primary">
                    Save
                  </button>
                  <button disabled={!dirty} className="mx-1 lg:mx-6 py-3 h-12 w-24 btn btn-primary" onClick={handleReset}>
                    Clear
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="px-4 text-2xl font-bold">New Gate</div>
      <EntryForm />
    </div>
  );
};

const EntryType = [
  { label: "Entry", value: "ENTRY" },
  { label: "Exit", value: "EXIT" },
];

export default withUser(CreateGatePage);
