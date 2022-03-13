import React, { useState, useEffect } from "react";
import { resetPassword } from "../../helpers/fb_function_helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { getUser } from "../../helpers/firestore_helpers";
import withOrg from "../../hocs/with_org";
import paths from "../../routes/paths";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  password: yup
    .string()
    .min(6, "6 characters in minumum")
    .matches(/^(?=.*[0-9a-zA-Z]).{6,}$/, "Password contains invalid characters.")
    .required("Password is required."),
});

const initFormData = {
  name: "",
  password: "",
};
const UpdateUserPasswordPage = (props) => {
  const [formData, setFormData] = useState(initFormData);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(async () => {
    const tmp = await getUser(props.org.id, id);
    console.log(tmp);
    setFormData({
      name: tmp.name,
      password: "",
    });
  }, []);

  const handleSave = async (data) => {
    console.log({ uid: id, password: data.password });
    const result = await resetPassword({ uid: id, password: data.password });
    console.log(result);
    navigate(paths.user);
  };

  const handleBack = () => {
    navigate(paths.user);
  };

  const EntryForm = () => {
    return (
      <Formik initialValues={formData} enableReinitialize={true} onSubmit={handleSave} validationSchema={formSchema}>
        {({ dirty, values, errors, touched, isValid, handleChange, handleSubmit, handleReset, setFieldValue, handleBlur }) => {
          return (
            <Form autoComplete="off">
              <div className="">
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Name</div>
                  <div className="p-2 m-2 flex flex-col">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      value={values.name}
                      onChange={handleChange}
                      className="input input-primary input-md input-disabled cursor-default focus:ring-0"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Password</div>
                  <div className="p-2 m-2 flex flex-col">
                    <Field
                      type="text"
                      id="password"
                      name="password"
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                  </div>
                </div>
                <div className="flex flex-nowrap p-3">
                  <button aria-label="back" onClick={handleBack} className="mx-6 py-3 h-12 w-24 btn">
                    Back
                  </button>
                  <button type="submit" disabled={!(dirty && isValid)} className="mx-6 py-3 h-12 w-24 btn btn-primary">
                    Update
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
      <div className="px-4 text-2xl font-bold">Update User Password</div>
      <EntryForm />
    </div>
  );
};
export default withOrg(UpdateUserPasswordPage);
