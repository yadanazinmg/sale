import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
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
import { get_customers, get_customer_by_id, increment_customer_amount } from "../../graphql/customer";
const formSchema = yup.object().shape({
  customer: yup.string().required("Customer is required."),
  total_amount: yup.number().required("Amount is required."),
  product_status: yup.string().required("Product Status is required."),
});

const formData = {
  voucher_no: "",
  customer: "",
  address: "",
  product_status: null,
  particular: "",
  metadata: "",
};

const CreateSpecialSalePage = (props) => {
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

  const {
    loading: sLoading,
    error: serror,
    data: customer,
  } = useQuery(get_customers, {
    variables: {
      where: {
        customer_type: {
          equals: parseInt(0),
        },
      },
    },
    pollInterval: 0,
    fetchPolicy: "no-cache",
  });

  const [getCurRecord, { loading: qLoading, data: sale }] = useLazyQuery(get_customer_by_id, {
    fetchPolicy: "network-only",
  });

  const [addGate, { data }] = useMutation(create_sale);
  const [updateCus] = useMutation(increment_customer_amount);
  const [updateVoucher] = useMutation(update_system_data);
  const [voucherno, setVoucherNo] = useState();
  let [loading, setLoading] = useState(true);
  const [customers, setCustomer] = useState();
  const [uploadProgress, setUploadProgress] = useState(50);
  const [pictureUrl, setPictureUrl] = useState();
  const [prices, setPrice] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
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

  useEffect(async () => {
    setLoading(sLoading);
    console.log(customer);
    if (!sLoading && customer) {
      const ctm = customer.customers;
      setCustomer(ctm);
    }
  }, [sLoading]);

  useEffect(async () => {
    setLoading(qLoading);
    console.log(sale);
    if (!qLoading && sale) {
      const ctm = sale.customer;
      console.log(ctm);
      setAddress(ctm.address);
      setPhone(ctm.Phone);
    }
  }, [qLoading]);

  const handleSave = async (data) => {
    console.log(data);
    const pdata = new FormData();
    pdata.append("file", data.picture);
    console.log(pdata);
    if (data.picture) {
      data.metadata = data.picture.name;
      axios
        .post("http://192.168.8.197:7000/upload", pdata, {
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
    const plc = { ...data };
    plc.net_amount = plc.total_amount;
    console.log(props.user.id);
    plc.user_name = props.user.name;
    plc.userId = props.user.id;
    console.log(plc.userId);
    plc.price = parseInt(plc.price);
    plc.give_amount = parseInt(plc.give_amount);

    let vno = 0;
    let vid = "";
    if (voucherno) {
      vno = parseInt(voucherno[0].value) + 1;
      vno = vno.toString();
      vid = voucherno[0].id;
    }
    if (customers) {
      let cus = customers.filter((c) => c.id == plc.customer);
      plc.customer_id = cus[0].id;
      plc.customer = cus[0].name;
      console.log(cus);
      console.log(plc.customer);
      console.log(plc.customer_id);
    }
    console.log(plc);
    addGate({
      variables: {
        data: {
          voucher_no: plc.voucher_no,
          customer: plc.customer,
          customer_id: plc.customer_id,
          address: plc.address,
          price: plc.price,
          give_amount: plc.give_amount,
          total_amount: plc.total_amount,
          net_amount: plc.net_amount,
          product_status: plc.product_status,
          user_name: plc.user_name,
          particular: plc.particular,
          referral_phone: plc.referral_phone,
          referral: plc.referral,
          installment_at: plc.installment_at,
          metadata: plc.metadata,
          phone: plc.phone,
          qty: plc.qty,
          father_name: plc.father_name,
          sale_date: plc.sale_date,
          customer_type: 1,
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
      console.log("after add");
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
      });
    });
    // navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const getAmount = (value) => {
    let tm = 0;
    console.log(value);
    console.log(prices);
    if (value) tm = parseInt(prices) - parseInt(value);
    return tm;
  };

  const getCustomerId = async (value) => {
    getCurRecord({
      variables: {
        where: {
          id: value,
        },
      },
    });
  };

  const getPriceFormat = (value) => {
    console.log(value);
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let dl = dollarUSLocale.format(value);
    console.log(dl);
    return dl;
  };

  return (
    <Formik initialValues={formData} enableReinitialize={true} onSubmit={handleSave} validationSchema={formSchema}>
      {({ dirty, values, isValid, errors, touched, handleChange, handleSubmit, handleReset, setFieldValue, handleBlur }) => {
        return (
          <Form autoComplete="off">
            <div className="px-4 text-2xl font-bold">New Special Sale</div>
            <div className="form-control">
              <div className="flex flex-nowrap">
                <div className="w-96 p-2 m-2 label "></div>
                <div className="flex flex-col px-4 mt-8 mx-4 h-56 items-cente p-1 m-1 w-full" style={{ height: "200px", width: "200px" }}>
                  <PicturePicker url={pictureUrl} onChange={(file) => setFieldValue("picture", file)} value={values.picture} />
                  <ProgressBar className="p-2" percent={uploadProgress} />
                  <span className="text-red-600 self-center text-sm">{touched.picture && errors.picture}</span>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap">
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">??????????????????????????????????????????</div>
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
                <div className="flex flex-nowrap w-auto">
                  <div className="w-36 p-2 m-2 label">???????????????????????????</div>
                  <div className="p-2 m-2">
                    <select
                      id="customer"
                      className="select select-primary w-48"
                      name="customer"
                      value={values.customer}
                      onChange={async (e) => {
                        const { value } = e.target;
                        let ts = await getCustomerId(value);
                        setFieldValue("customer", value);
                      }}
                    >
                      <option value="">Select</option>
                      {customers && customers.map((r) => <option value={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 ml-2 label">???????????????</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder="address"
                      value={address}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="address" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap">
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">Phone</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="phone"
                      value={phone}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="phone" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">?????????????????????????????????</div>
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
                  <div className="w-36 p-2 m-2 label">????????????????????????</div>
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
              </div>
              <div className="flex flex-row flex-nowrap">
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">Price</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      placeholder="price"
                      value={values.price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                        setFieldValue("price", e.target.value);
                      }}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="price" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">??????????????????</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="give_amount"
                      name="give_amount"
                      placeholder="give_amount"
                      value={values.give_amount}
                      onChange={(e) => {
                        let tm = getAmount(e.target.value);
                        console.log(tm);
                        setFieldValue("give_amount", e.target.value);
                        setFieldValue("total_amount", tm);
                      }}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="give_amount" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">???????????????????????????</div>
                  <div className="p-2 m-2">
                    <Field
                      type="number"
                      id="total_amount"
                      name="total_amount"
                      placeholder="total_amount"
                      value={values.total_amount}
                      onChange={handleChange}
                      className="input input-primary input-md"
                      disabled
                    />
                    <ErrorMessage name="total_amount" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap">
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">??????????????????</div>
                  <div className="p-2 m-2">
                    <DatePicker
                      id="sale_date"
                      name="sale_date"
                      selected={values.sale_date}
                      // maxDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => setFieldValue("sale_date", date)}
                      // onChangeRaw={handleDateChangeRaw}
                      autoComplete="off"
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="sale_date" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">?????????????????????????????????????????????????????????????????????</div>
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
                  <div className="w-36 p-2 m-2 label">???????????????????????????/?????????</div>
                  <div className="p-2 m-2">
                    <select
                      id="product_status"
                      className="select select-primary w-48"
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
              </div>
              <div className="flex flex-row flex-nowrap">
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">??????????????????</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="father_name"
                      name="father_name"
                      placeholder="father_name"
                      value={values.father_name}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="father_name" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">????????????????????????????????????</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="referral"
                      name="referral"
                      placeholder="referral"
                      value={values.referral}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="referral" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-36 p-2 m-2 label">Phone</div>
                  <div className="p-2 m-2">
                    <Field
                      type="text"
                      id="referral_phone"
                      name="referral_phone"
                      placeholder="referral_phone"
                      value={values.referral_phone}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="referral_phone" component="span" className="text-sm text-red-500 px-2" />
                  </div>
                </div>
              </div>
              <div className="flex flex-nowrap p-3">
                <div className=" w-80 p-2 m-2 mb-10 label"></div>
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

const ProductStatus = [
  { label: "???????????????????????????????????????", value: "AFTER" },
  { label: "??????????????????????????????????????????", value: "BEFORE" },
];

export default withUser(CreateSpecialSalePage);
