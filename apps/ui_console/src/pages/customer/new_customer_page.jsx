import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import withUser from "../../hocs/with_user";
import * as yup from "yup";
import paths from "../../routes/paths";
import { create_customer } from "../../graphql/customer";
import PicturePicker from "../../components/picture_picker";
import ProgressBar from "../../controls/progress_bar";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Customer is required."),
});

const formData = {
  name: "",
  address: "",
  description: "customer",
};

const CreateCustomerPage = (props) => {
  const [addGate, { data }] = useMutation(create_customer);
  let [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(50);
  const [pictureUrl, setPictureUrl] = useState();
  const navigate = useNavigate();

  const handleSave = async (data) => {
    const pdata = new FormData();
    pdata.append("file", data.picture);
    if (data.picture) {
      data.description = data.picture.name;
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
    console.log(data);
    const plc = { ...data };
    console.log(plc);
    console.log(data);
    addGate({
      variables: {
        data: {
          name: plc.name,
          address: plc.address,
          Phone: plc.Phone,
          description: plc.description,
          total_amount: 0,
        },
      },
    }).then((resp) => {
      console.log(resp);
    });
    navigate(-1);
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
                  <div className="w-48 p-2 m-2 label">Photo</div>
                  <div className="flex flex-col items-left align-middle">
                    <div className="flex flex-col px-4 mt-8 mx-4 h-56 items-cente p-1 m-1" style={{ height: "200px", width: "200px" }}>
                      <PicturePicker url={pictureUrl} onChange={(file) => setFieldValue("picture", file)} value={values.picture} />
                      <ProgressBar className="p-2" percent={uploadProgress} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">???????????????????????????</div>
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
                  <div className="w-48 p-2 m-2 label">???????????????</div>
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
                      id="Phone"
                      name="Phone"
                      placeholder="Phone"
                      value={values.Phone}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="Phone" component="span" className="text-sm text-red-500 px-2" />
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
      <div className="px-4 text-2xl font-bold">New Customer</div>
      <EntryForm />
    </div>
  );
};

export default withUser(CreateCustomerPage);
