import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withUser from "../../hocs/with_user";
import * as yup from "yup";
import { create_sale } from "../../graphql/sale";
import { get_system_data, update_system_data } from "../../graphql/system_data";
import LoadingIndicator from "../../components/loading_indicator";
import paths from "../../routes/paths";

const formSchema = yup.object().shape({
  customer: yup.string().required("Gate Type is required."),
  total_amount: yup.number().required("Gate Type is required."),
});

const formData = {
  voucher_no: "",
  customer: "",
  address: "",
  give_amount: 0,
  net_amount: 0,
  product_status: null,
  particular: "",
};

const CreateSalePage = (props) => {
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
  const navigate = useNavigate();
  console.log(props.user.user.name);

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
    plc.net_amount = plc.total_amount;

    plc.user_name = props.user.user.name;
    plc.userId = props.user.user.id;
    let vno = 0;
    let vid = "";
    if (voucherno) {
      vno = parseInt(voucherno[0].value) + 1;
      vno = vno.toString();
      vid = voucherno[0].id;
    }
    console.log(plc);
    addGate({
      variables: {
        data: {
          voucher_no: plc.voucher_no,
          customer: plc.customer,
          address: plc.address,
          give_amount: plc.give_amount,
          total_amount: plc.total_amount,
          net_amount: plc.net_amount,
          product_status: plc.product_status,
          user_name: plc.user_name,
          particular: plc.particular,
          qty: plc.qty,
          user: {
            connect: {
              id: plc.userId,
            },
          },
          shop: {
            connect: {
              id: "1",
            },
          },
        },
      },
    }).then((resp) => {
      console.log(resp);
      updateVoucher({
        variables: {
          data: {
            value: {
              set: vno,
            },
          },
          where: {
            id: vid,
          },
        },
      }).then((resp) => {
        console.log(resp);
        navigate(paths.sale);
      });
    });
    navigate(paths.sale);
  };

  const handleBack = () => {
    navigate(paths.sale);
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
                  <div className="w-48 p-2 m-2 label">ဘောင်ချာနံပါတ်</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="voucher_no"
                      name="voucher_no"
                      placeholder="voucher_no"
                      value={values.voucher_no}
                      onChange={handleChange}
                      className="input input-primary input-md"
                      disabled
                    />
                    <ErrorMessage name="voucher_no" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">ဝယ်သူအမည်</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="customer"
                      name="customer"
                      placeholder="customer"
                      value={values.customer}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="customer" component="span" className="text-sm text-red-500 px-2" />
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
                  <div className="w-48 p-2 m-2 label">ပစ္စည်းအမည်</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="particular"
                      name="particular"
                      placeholder="particular"
                      value={values.particular}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="particular" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">အရေအတွက်</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="qty"
                      name="qty"
                      placeholder="qty"
                      value={values.qty}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="qty" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">ကြွေးကျန်</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="total_amount"
                      name="total_amount"
                      placeholder="total_amount"
                      value={values.total_amount}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="total_amount" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap w-auto">
                  <div className="w-48 p-2 m-2 label">ပစ္စည်းယူ/မယူ</div>
                  <div className="p-2 m-2">
                    <select
                      id="product_status"
                      className="select select-primary w-full"
                      name="product_status"
                      value={values.product_status}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {ProductStatus.map((r) => (
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

export default withUser(CreateSalePage);
