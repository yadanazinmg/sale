import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withUser from "../../hocs/with_user";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { create_sale } from "../../graphql/sale";
import { get_system_data, update_system_data } from "../../graphql/system_data";
import LoadingIndicator from "../../components/loading_indicator";
import paths from "../../routes/paths";
import PicturePicker from "../../components/picture_picker";
import ProgressBar from "../../controls/progress_bar";
import axios from "axios";
const formSchema = yup.object().shape({
  name: yup.string().required("Customer is required."),
});

const formData = {
  name: "",
  address: "",
};

const CreateCustomerPage = (props) => {
  const {
    loading: gqlLoading,
    error,
    data: gates,
    refetch,
  } = useQuery(get_system_data, {
    pollInterval: 0,
    fetchPolicy: "no-cache",
    variables: {
      where: {
        code: {
          equals: "VoucherNo",
        },
      },
    },
  });
  const [addGate, { data }] = useMutation(create_sale);
  const [updateVoucher] = useMutation(update_system_data);
  const [voucherno, setVoucherNo] = useState();
  let [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(50);
  const [pictureUrl, setPictureUrl] = useState();
  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(gates);
    if (!gqlLoading && gates) {
      let vcode = gates.findManySystemData[0].value;
      console.log(gates.findManySystemData);
      formData.voucher_no = vcode;
      setVoucherNo(gates.findManySystemData);
    }
  }, [gqlLoading]);

  const handleSave = async (data) => {
    console.log(data);
    const plc = { ...data };
    console.log(plc);
    addGate({
      variables: {
        data: {
          name: plc.name,
          address: plc.address,
          phone: plc.phone,
        },
      },
    }).then((resp) => {
      console.log(resp);
    });
    //navigate(-1);
  };

  const handleBack = () => {
    navigate(paths.customer);
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
                  <div className="w-48 p-2 m-2 label">ဝယ်သူအမည်</div>
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
                  <div className="w-48 p-2 m-2 label">နေရပ်</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder="address"
                      value={values.address}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="address" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Phone</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="phone" component="span" className="text-sm text-red-500 px-2" />
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
      <div className="px-4 text-2xl font-bold">New Customer</div>
      <EntryForm />
    </div>
  );
};

const ProductStatus = [
  { label: "ပစ္စည်းယူပြီး", value: "AFTER" },
  { label: "ပစ္စည်းမယူရသေး", value: "BEFORE" },
];

export default withUser(CreateCustomerPage);
