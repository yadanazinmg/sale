import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withUser from "../../hocs/with_user";
import * as yup from "yup";
import { create_redemption_type } from "../../graphql/redemption_type";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  discount_minute: yup.number().required("Discount Minute is required."),
});

const formData = {
  name: "",
  discount_minute: null,
};

const CreateRedemptionTypePage = (props) => {
  const [addRedemptionType, { data }] = useMutation(create_redemption_type);
  const navigate = useNavigate();

  const handleSave = async (data) => {
    console.log(data);
    const plc = { ...data };
    console.log(plc);
    addRedemptionType({
      variables: {
        data: { name: plc.name, discount_minute: plc.discount_minute },
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
      <div className="px-4 text-2xl font-bold">New Redemption Type</div>
      <EntryForm />
    </div>
  );
};

export default withUser(CreateRedemptionTypePage);
