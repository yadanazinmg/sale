import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import paths from "../../routes/paths";
import withUser from "../../hocs/with_user";
import { get_shift_by_Id, update_shift } from "../../graphql/shift";

const formSchema = yup.object().shape({
  name: yup.string().required("name Id is required."),
  from_hour: yup.number().required("From Hour is required."),
  from_min: yup.number().required("From Minute is required."),
  to_hour: yup.number().required("To Hour is required."),
  to_min: yup.number().required("To Min is required."),
});

let formData = {};
const EditShiftPage = (props) => {
  const navigate = useNavigate();
  const { id: shiftid } = useParams();
  console.log(shiftid);
  const { error, data } = useQuery(get_shift_by_Id, {
    variables: {
      where: {
        id: shiftid,
      },
    },
    pollInterval: 0,
  });

  const [changeShift] = useMutation(update_shift);

  const handleSave = async (data) => {
    const plc = { ...data };
    console.log(plc);

    changeShift({
      variables: {
        data: {
          name: {
            set: plc.name,
          },
          from_hour: {
            set: plc.from_hour,
          },
          from_min: {
            set: plc.from_min,
          },
          to_hour: {
            set: plc.to_hour,
          },
          to_min: {
            set: plc.to_min,
          },
        },
        where: {
          id: shiftid,
        },
      },
    })
      .then((resp) => {
        console.log(resp);
        navigate(paths.shift);
      })
      .catch((error) => {
        setUpdateError({ ...error, msg: error, show: true });
      });
    navigate(paths.shift);
    return;
  };

  const handleBack = () => {
    navigate(paths.shift);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  if (data) {
    console.log(data);
    const sp = data.shift;
    formData = {
      ...sp,
    };
  }

  const EntryForm = () => {
    return (
      <Formik initialValues={formData} enableReinitialize={true} onSubmit={handleSave} validationSchema={formSchema}>
        {({ dirty, isValid, values, errors, touched, handleChange, handleSubmit, handleReset, setFieldValue }) => {
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
                  <div className="w-48 p-2 m-2 label">From Hour</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="from_hour"
                      name="from_hour"
                      placeholder="from_hour"
                      value={values.from_hour}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="from_hour" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">From Minute</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="from_min"
                      name="from_min"
                      placeholder="from_min"
                      value={values.from_min}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="from_min" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">To Hour</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="to_hour"
                      name="to_hour"
                      placeholder="to_hour"
                      value={values.to_hour}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="to_hour" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">To Min</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="to_min"
                      name="to_min"
                      placeholder="to_min"
                      value={values.to_min}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="to_min" component="span" className="text-sm text-red-500 px-2" />
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
      <div className="px-4 text-2xl font-bold">Edit Shift</div>
      <EntryForm />
    </div>
  );
};

const EntryType = [
  { label: "Entry", value: "ENTRY" },
  { label: "Exit", value: "EXIT" },
];

export default withUser(EditShiftPage);
