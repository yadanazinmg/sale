import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import paths from "../../routes/paths";
import withUser from "../../hocs/with_user";
import { get_user_by_Id, update_app_user, update_user } from "../../graphql/user";
import PicturePicker from "../../components/picture_picker";
import ProgressBar from "../../controls/progress_bar";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  role: yup.string().nullable().required("Role is required."),
});
let formData = {};
const EditUserPage = (props) => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
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

  const [changeUser] = useMutation(update_user);
  const [uploadProgress, setUploadProgress] = useState(50);
  const [user, setUser] = useState();
  const [pictureUrl, setPictureUrl] = useState();
  const [loading, setLoading] = useState();

  const handleSave = async (data) => {
    const pdata = new FormData();
    pdata.append("file", data.picture);
    console.log(pdata);
    if (data.picture) {
      data.profile_picture = data.picture.name;
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
    var salt = bcrypt.genSaltSync(10);
    const pwd_hash = bcrypt.hashSync(plc.password, salt);
    console.log(pwd_hash);
    plc.updated_at = moment().toDate();
    console.log(plc);

    changeUser({
      variables: {
        data: {
          name: {
            set: plc.name,
          },
          role: {
            set: plc.role,
          },
          profile_picture: {
            set: plc.profile_picture,
          },
          updated_at: {
            set: plc.updated_at,
          },
        },
        where: {
          id: userId,
        },
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
  //   if (sp.profile_picture) {
  //     setPictureUrl(`dist/public/${sp.profile_picture}`);
  //   }
  //   formData = {
  //     password: "",
  //     id: sp.id,
  //     name: sp.name,
  //     role: sp.role,
  //     picture: null,
  //   };
  // }
  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(users);
    if (!gqlLoading && users) {
      const sp = users.user;
      if (sp.profile_picture) {
        setPictureUrl(`/ui_console/public/${sp.profile_picture}`);
        sp.picture = null;
      }
      console.log(sp);
      formData = {
        ...sp,
      };
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
                  <div className="w-48 p-2 m-2 label">Photo</div>
                  <div className="flex flex-col items-left align-middle">
                    <div className="flex flex-col px-4 mt-8 mx-4 h-56 items-cente p-1 m-1" style={{ height: "200px", width: "200px" }}>
                      <PicturePicker url={pictureUrl} onChange={(file) => setFieldValue("picture", file)} value={values.picture} />
                      <ProgressBar className="p-2" percent={uploadProgress} />
                    </div>
                  </div>
                </div>
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
                    />
                    <ErrorMessage name="name" component="span" className="text-sm text-red-500 mx-2" />
                  </div>
                </div>
                {/* <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Password</div>
                  <div className="p-2 m-2 flex flex-col">
                    <Field
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      className="input input-primary input-md"
                    />
                    <ErrorMessage name="password" component="span" className="text-sm text-red-500 mx-2" />
                  </div>
                </div> */}
                <div className="flex flex-nowrap">
                  <div className="w-48 p-2 m-2 label">Role</div>
                  <div className="p-2 m-2 flex flex-col">
                    <select className="select select-primary" name="role" value={values.role} onChange={handleChange} onBlur={handleBlur}>
                      <option value="">Select Role</option>
                      {rowData.map((r) => (
                        <option value={r.value}>{r.label}</option>
                      ))}
                    </select>
                    <ErrorMessage name="role" component="span" className="text-sm text-red-500" />
                    {/* <Field type="text" id="DoseType" name="DoseType" placeholder="DoseType" value={values.DoseType} onChange={handleChange} /> */}
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

export default withUser(EditUserPage);
