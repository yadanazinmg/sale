import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withUser from "../../hocs/with_user";
import * as yup from "yup";
import { create_redemption } from "../../graphql/redemption";
import { get_redemption_types } from "../../graphql/redemption_type";
import LoadingIndicator from "../../components/loading_indicator";

const formSchema = yup.object().shape({
  vehicle_id: yup.string().required("Vehicle Id is required."),
  // from_hour: yup.number().required("From Hour is required."),
  // from_min: yup.number().required("From Minute is required."),
  // to_hour: yup.number().required("To Hour is required."),
  // to_min: yup.number().required("To Min is required."),
  redemption_type_id: yup.string().required("Redemption Type is required."),
});

const formData = {
  vehicle_id: "",
  from_hour: 0,
  from_min: 0,
  to_hour: 0,
  to_min: 0,
  redemption_type_id: "",
};

const CreateRedemptionPage = (props) => {
  const {
    loading: gloading,
    error,
    data: gates,
    refetch,
  } = useQuery(get_redemption_types, {
    pollInterval: 0,
    fetchPolicy: "network-only",
    variables: {
      orderBy: [
        {
          name: "asc",
        },
      ],
    },
  });
  const [addRedemption, { data }] = useMutation(create_redemption);
  const [redemptionType, setRedemptionType] = useState();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);

  const handleSave = async (data) => {
    console.log(data);
    const plc = { ...data };
    let redenptiontype = redemptionType.filter((r) => r.id == data.redemption_type_id);
    const duration = redenptiontype[0].discount_minute;
    addRedemption({
      variables: {
        data: {
          vehicle_id: plc.vehicle_id,
          from_hour: plc.from_hour,
          from_min: plc.from_min,
          to_hour: plc.to_hour,
          to_min: duration,
          redemption_type: {
            connect: {
              id: plc.redemption_type_id,
            },
          },
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

  useEffect(async () => {
    setLoading(gloading);
    console.log(gates);
    if (!gloading && gates) {
      setRedemptionType(gates.redemptionTypes);
    }
  }, [gloading]);

  const EntryForm = () => {
    return (
      <Formik initialValues={formData} enableReinitialize={true} onSubmit={handleSave} validationSchema={formSchema}>
        {({ dirty, isValid, values, errors, touched, handleChange, handleSubmit, handleReset, setFieldValue }) => {
          return (
            <Form autoComplete="off">
              <div className="form-control">
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Vehicle Id</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="vehicle_id"
                      name="vehicle_id"
                      placeholder="vehicle_id"
                      value={values.vehicle_id}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="vehicle_id" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                {/* <div className="flex flex-nowrap">
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
                </div> */}
                {redemptionType && (
                  <div className="flex flex-nowrap">
                    <div className="w-48 p-2 m-2 label">Redemption Type</div>
                    <div className="p-2 m-2">
                      <select
                        id="redemption_type_id"
                        className="select select-primary"
                        name="redemption_type_id"
                        value={values.redemption_type_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Redemption Type</option>
                        {redemptionType.map((r) => (
                          <option value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
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
                <LoadingIndicator loading={loading} color="#000099" />
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="px-4 text-2xl font-bold">New Redemption</div>
      <EntryForm />
    </div>
  );
};

export default withUser(CreateRedemptionPage);
