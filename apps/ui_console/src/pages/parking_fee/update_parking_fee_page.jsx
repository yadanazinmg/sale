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
import { get_parking_fee_by_Id, update_parking_fee } from "../../graphql/parking_fee";

const formSchema = yup.object().shape({
  from_min: yup.number().required("From Min is required."),
  to_min: yup.number().required("To Min is required."),
  duration: yup.number().required("Duration is required."),
  fee: yup.number().required("Fee is required."),
  vehicle_class: yup.string().required("vehicle class is required."),
});

let formData = {};

const EditParkingFeePage = (props) => {
  const navigate = useNavigate();
  const { id: parkingfeeId } = useParams();
  console.log(parkingfeeId);
  const { error, data } = useQuery(get_parking_fee_by_Id, {
    variables: {
      where: {
        id: parkingfeeId,
      },
    },
    pollInterval: 0,
  });

  const [changeParkingFee] = useMutation(update_parking_fee);

  const handleSave = async (data) => {
    const plc = { ...data };
    console.log(plc);

    changeParkingFee({
      variables: {
        data: {
          from_min: {
            set: plc.from_min,
          },
          to_min: {
            set: plc.to_min,
          },
          duration: {
            set: plc.duration,
          },
          fee: {
            set: plc.fee,
          },
          vehicle_class: {
            set: plc.vehicle_class,
          },
        },
        where: {
          id: parkingfeeId,
        },
      },
    })
      .then((resp) => {
        console.log(resp);
        navigate(paths.parking_fee);
      })
      .catch((error) => {
        setUpdateError({ ...error, msg: error, show: true });
      });
    return;
  };

  const handleBack = () => {
    navigate(paths.parking_fee);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  if (data) {
    console.log(data);
    const sp = data.parkingFee;
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
                  <div className="w-48 p-2 m-2 label">From Min</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="from_min"
                      name="from_min"
                      placeholder="From Min"
                      value={values.from_min}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="from_min" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">To Min</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="to_min"
                      name="to_min"
                      placeholder="To Min"
                      value={values.to_min}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="to_min" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Duration</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="duration"
                      name="duration"
                      placeholder="duration"
                      value={values.duration}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="duration" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Fee</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="fee"
                      name="fee"
                      placeholder="Fee"
                      value={values.fee}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="fee" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Vehicle Class</div>
                  <div className="p-2 m-2">
                    <select id="vehicle_class" className="select select-primary" name="vehicle_class" value={values.vehicle_class} onChange={handleChange}>
                      <option disabled={true} value="">
                        Select Vehicle Class
                      </option>
                      {VehicleClass.map((r) => (
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
      <div className="px-4 text-2xl font-bold">Edit Parking Fee</div>
      <EntryForm />
    </div>
  );
};

const VehicleClass = [
  { label: "CAR", value: "CAR" },
  { label: "MOTORCYCLE", value: "MOTORCYCLE" },
];
export default withUser(EditParkingFeePage);
