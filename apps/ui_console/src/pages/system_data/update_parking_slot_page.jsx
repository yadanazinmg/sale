import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import paths from "../../routes/paths";
import withUser from "../../hocs/with_user";
import { get_system_data_by_id, update_system_data } from "../../graphql/system_data";

const formSchema = yup.object().shape({
  value: yup.number().required("Name is required."),
});

let formData = {};

const EditParkingSlotPage = (props) => {
  const navigate = useNavigate();
  const { id: gateid } = useParams();
  console.log(gateid);
  const { error, data } = useQuery(get_system_data_by_id, {
    variables: {
      where: {
        id: {
          equals: gateid,
        },
      },
    },
    pollInterval: 0,
  });

  const [changeParkingSlot] = useMutation(update_system_data);

  const handleSave = async (data) => {
    const plc = { ...data };
    console.log(plc);

    changeParkingSlot({
      variables: {
        data: {
          code: {
            set: plc.code,
          },
          value: {
            set: plc.value,
          },
        },
        where: {
          id: gateid,
        },
      },
    })
      .then((resp) => {
        console.log(resp);
        navigate(paths.parking_slot);
      })
      .catch((error) => {
        setUpdateError({ ...error, msg: error, show: true });
      });
    navigate(paths.parking_slot);
    return;
  };

  const handleBack = () => {
    navigate(paths.parking_slot);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  if (data) {
    console.log(data);
    const sp = data.findFirstSystemData;
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
                  <div className="w-48 p-2 m-2 label">Code</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="code"
                      name="code"
                      placeholder="code"
                      value={values.code}
                      onChange={handleChange}
                      className="input input-primary input-md"
                      disabled
                    />
                    <ErrorMessage name="code" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Value</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="value"
                      name="value"
                      placeholder="value"
                      value={values.value}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="value" component="span" className="text-sm text-red-500 px-2" />
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
      <div className="px-4 text-2xl font-bold">Edit Parking Slot</div>
      <EntryForm />
    </div>
  );
};

const EntryType = [
  { label: "Entry", value: "ENTRY" },
  { label: "Exit", value: "EXIT" },
];

export default withUser(EditParkingSlotPage);
