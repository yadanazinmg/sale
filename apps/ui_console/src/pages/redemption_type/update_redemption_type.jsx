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
import { get_redemption_type_by_Id, update_redemption_type } from "../../graphql/redemption_type";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  discount_minute: yup.number().required("Discount Minute is required."),
});

let formData = {};

const EditRedemptionPage = (props) => {
  const navigate = useNavigate();
  const { id: parkingfeeId } = useParams();
  console.log(parkingfeeId);
  const { error, data } = useQuery(get_redemption_type_by_Id, {
    variables: {
      where: {
        id: parkingfeeId,
      },
    },
    pollInterval: 0,
  });

  const [changeRedemptionType] = useMutation(update_redemption_type);

  const handleSave = async (data) => {
    const plc = { ...data };
    console.log(plc);

    changeRedemptionType({
      variables: {
        data: {
          name: {
            set: plc.name,
          },
          discount_minute: {
            set: plc.discount_minute,
          },
        },
        where: {
          id: parkingfeeId,
        },
      },
    })
      .then((resp) => {
        console.log(resp);
        navigate(paths.redemption_type);
      })
      .catch((error) => {
        setUpdateError({ ...error, msg: error, show: true });
      });
    return;
  };

  const handleBack = () => {
    navigate(paths.redemption_type);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  if (data) {
    console.log(data);
    const sp = data.redemptionType;
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
                  <div className="w-48 p-2 m-2 label">Discount Minute</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="discount_minute"
                      name="discount_minute"
                      placeholder="Discount Minute"
                      value={values.discount_minute}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="discount_minute" component="span" className="text-sm text-red-500 px-2" />
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
export default withUser(EditRedemptionPage);
