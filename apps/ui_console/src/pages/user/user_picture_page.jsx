import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import withUser from "../../hocs/with_user";
import { get_user_by_Id, update_app_user } from "../../graphql/user";
import paths from "../../routes/paths";
import PicturePicker from "../../components/picture_picker";
import ProgressBar from "../../controls/progress_bar";
import axios from "axios";

const formSchema = yup.object().shape({});
let formData = {};
const EditUserPicturePage = (props) => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [uploadProgress, setUploadProgress] = useState(50);
  const [user, setUser] = useState();
  const [pictureUrl, setPictureUrl] = useState();
  let [loading, setLoading] = useState(true);

  console.log(userId);
  const {
    loading: gqlLoading,
    error,
    data: users,
  } = useQuery(get_user_by_Id, {
    variables: {
      where: {
        id: userId,
      },
    },
    pollInterval: 0,
  });

  const [changeUser] = useMutation(update_app_user);

  const handleSave = async (data) => {
    const pdata = new FormData();
    pdata.append("file", data.picture);
    console.log(pdata);
    if (data.picture) {
      data.profile_picture = data.picture.name;
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
    const plc = { ...data };
    console.log(plc);

    changeUser({
      variables: {
        updateAppUserId: userId,
        name: plc.name,
        profile_picture: plc.profile_picture,
      },
    })
      .then((resp) => {
        console.log(resp);
        navigate(paths.user);
      })
      .catch((error) => {
        setUpdateError({ ...error, msg: error, show: true });
      });
    navigate(paths.user);
    return;
  };

  const handleBack = () => {
    navigate(paths.user);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  // if (data) {
  //   console.log(data);
  //   const sp = data.user;
  //   formData = {
  //     password: "",
  //     id: sp.id,
  //     name: sp.name,
  //     role: sp.role,
  //   };
  // }
  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(users);
    if (!gqlLoading && users) {
      const sp = users.user;
      console.log(sp);
      formData = {
        ...sp,
      };
      if (sp.profile_picture) {
        setPictureUrl(`/public/${sp.profile_picture}`);
      }
    }
  }, [gqlLoading]);

  const EntryForm = () => {
    return (
      <Formik initialValues={formData} enableReinitialize={true} onSubmit={handleSave} validationSchema={formSchema}>
        {({ dirty, values, errors, touched, isValid, handleChange, handleSubmit, handleReset, setFieldValue, handleBlur }) => {
          return (
            <Form autoComplete="off">
              <div className="form-control">
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Name</div>
                  <div className="p-2 m-2 flex flex-col">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      className="input input-primary input-md"
                      disabled
                    />
                    <ErrorMessage name="name" component="span" className="text-sm text-red-500 mx-2" />
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Photo</div>
                  <div className="flex flex-col items-left align-middle">
                    <div className="flex flex-col px-4 mt-8 mx-4 h-56 items-cente p-1 m-1" style={{ height: "200px", width: "200px" }}>
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
                  <button type="submit" disabled={!(dirty && isValid)} className="mx-1 lg:mx-6  py-3 h-12 w-24 btn btn-primary">
                    Save
                  </button>
                  <button disabled={!dirty} className="mx-1 lg:mx-6 py-3 h-12 w-24 btn btn-primary" onClick={handleReset}>
                    Clear
                  </button>
                </div>
                {/* <div>{loginError && <span className="text-sm text-red-500">{loginError}</span>}</div> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="px-4 text-2xl font-bold">Edit User</div>
      <EntryForm />
    </div>
  );
};

const rowData = [
  { label: "Admin", value: "ADMIN" },
  { label: "Supervisor", value: "SUPERVISOR" },
  { label: "Operator", value: "OPERATOR" },
  { label: "Redemption", value: "REDEMPTION" },
];

export default withUser(EditUserPicturePage);
