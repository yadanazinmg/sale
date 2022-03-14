import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import paths from "../../routes/paths";
import withUser from "../../hocs/with_user";
import { get_sale_by_id, update_sale } from "../../graphql/sale";

const formSchema = yup.object().shape({
  customer: yup.string().required("Gate Type is required."),
  total_amount: yup.number().required("Gate Type is required."),
});

let formData = {};
const EditSalePage = (props) => {
  const navigate = useNavigate();
  const { id: saleid } = useParams();
  const {
    loading: gqlLoading,
    error,
    data: sale,
  } = useQuery(get_sale_by_id, {
    variables: {
      where: {
        id: saleid,
      },
    },
    pollInterval: 0,
  });

  const [changeSale] = useMutation(update_sale);
  let [loading, setLoading] = useState(true);
  const [sales, setSale] = useState();

  const handleSave = async (data) => {
    const plc = { ...data };
    console.log(plc);

    changeSale({
      variables: {
        data: {
          customer: {
            set: plc.customer,
          },
          address: {
            set: plc.address,
          },
          give_amount: {
            set: plc.give_amount,
          },
          total_amount: {
            set: plc.total_amount,
          },
          particular: {
            set: plc.particular,
          },
          installment_at: {
            set: plc.installment_at,
          },
          qty: {
            set: plc.qty,
          },
          product_status: {
            set: plc.product_status,
          },
        },
        where: {
          id: saleid,
        },
      },
    })
      .then((resp) => {
        console.log(resp);
        navigate(paths.sale);
      })
      .catch((error) => {
        setUpdateError({ ...error, msg: error, show: true });
      });
  };

  const handleBack = () => {
    navigate(paths.sale);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  if (sale) {
    console.log(sale);
    const sp = sale.saleRecord;
    sp.installment_at = new Date(sp.installment_at);
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
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">နောက်ဆုံးကြွေးဆပ်နေ့စွဲ</div>
                  <div className="p-2 m-2">
                    <DatePicker
                      id="installment_at"
                      name="installment_at"
                      selected={values.installment_at}
                      // maxDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => setFieldValue("installment_at", date)}
                      // onChangeRaw={handleDateChangeRaw}
                      autoComplete="off"
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="installment_at" component="span" className="text-sm text-red-500 px-2" />
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
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="px-4 text-2xl font-bold">Edit Customer</div>
      <EntryForm />
    </div>
  );
};

const ProductStatus = [
  { label: "ပစ္စည်းယူပြီး", value: "AFTER" },
  { label: "ပစ္စည်းမယူရသေး", value: "BEFORE" },
];

export default withUser(EditSalePage);
