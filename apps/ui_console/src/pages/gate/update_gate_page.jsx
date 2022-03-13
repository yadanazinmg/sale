import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { get_gate_by_Id, update_gate } from "../../graphql/gate";
import paths from "../../routes/paths";
import withUser from "../../hocs/with_user";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  gate_type: yup.string().required("Gate Type is required."),
});

let formData = {};
const EditGatePage = (props) => {
  const navigate = useNavigate();
  const { id: gateid } = useParams();
  console.log(gateid);
  const { error, data } = useQuery(get_gate_by_Id, {
    variables: {
      where: {
        id: gateid,
      },
    },
    pollInterval: 0,
  });

  const [changeGate] = useMutation(update_gate);

  const handleSave = async (data) => {
    const plc = { ...data };
    console.log(plc);

    changeGate({
      variables: {
        data: {
          name: {
            set: plc.name,
          },
          gate_type: {
            set: plc.gate_type,
          },
        },
        where: {
          id: gateid,
        },
      },
    })
      .then((resp) => {
        console.log(resp);
        navigate(paths.gate);
      })
      .catch((error) => {
        setUpdateError({ ...error, msg: error, show: true });
      });
    navigate(paths.gate);
    return;
  };

  const handleBack = () => {
    navigate(paths.gate);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  if (data) {
    console.log(data);
    const sp = data.gate;
    formData = {
      ...sp,
    };
  }

  const EntryForm = () => {
    return (
      <Formik initialValues={formData} onSubmit={handleSave} validationSchema={formSchema}>
        {({ dirty, values, errors, touched, isValid, handleChange, handleSubmit, handleReset, setFieldValue }) => {
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
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Entry Type</div>
                  <div className="p-1 m-1">
                    <select id="gate_type" className="select select-primary" name="gate_type" value={values.gate_type} onChange={handleChange}>
                      <option disabled={true} value="">
                        Select Entry Type
                      </option>
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
      <div className="px-4 text-2xl font-bold">Edit Gate</div>
      <EntryForm />
    </div>
  );
};

const EntryType = [
  { label: "Entry", value: "ENTRY" },
  { label: "Exit", value: "EXIT" },
];

export default withUser(EditGatePage);
