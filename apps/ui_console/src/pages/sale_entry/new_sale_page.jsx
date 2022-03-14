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
    const pdata = new FormData();
    pdata.append("file", data.picture);
    console.log(pdata);

    if (data.picture) {
      axios
        .post("http://localhost:7000/upload", pdata, {
          // receive two parameter endpoint url ,form data
          onUploadProgress: (ProgressEvent) => {
            // setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
          },
        })
        .then((res) => {
          // then print response status
          console.log(res.statusText);
        })
        .catch((err) => {
          //toast.error("upload fail");
        });
    }
    return;
    const plc = { ...data };
    plc.net_amount = plc.total_amount;
    console.log(props.user.id);
    plc.user_name = props.user.name;
    plc.userId = props.user.id;
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
          installment_at: plc.installment_at,
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
        //navigate(paths.sale);
      });
    });
    navigate(-1);
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
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Photo</div>
                  <div className="flex flex-col items-left align-middle">
                    <div className="flex flex-col px-4 mt-8 mx-4 h-56 items-cente p-2 m-2" style={{ height: "200px", width: "200px" }}>
                      <PicturePicker url={pictureUrl} onChange={(file) => setFieldValue("picture", file)} value={values.picture} />
                      <ProgressBar className="p-2" percent={uploadProgress} />
                      <span className="text-red-600 self-center text-sm">{touched.picture && errors.picture}</span>
                    </div>
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
