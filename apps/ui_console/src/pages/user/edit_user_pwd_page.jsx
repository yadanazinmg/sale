import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { get_user_by_Id, update_user, upsert_user } from "../../graphql/user";
import paths from "../../routes/paths";

const EditUserPwdPage = () => {
  const [pwd, setPwd] = useState("");
  const [updateError, setUpdateError] = useState({ msg: "", show: false });
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { error, data } = useQuery(get_user_by_Id, {
    variables: {
      where: {
        id: userId,
      },
    },
  });
  const [updatePwd] = useMutation(update_user);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const handleBack = () => {
    navigate(paths.user);
  };

  const handleSave = () => {
    if (data && data.user) {
      const plc = { ...data.user };
      console.log(pwd);
      var salt = bcrypt.genSaltSync(10);
      const pwd_hash = bcrypt.hashSync(pwd, salt);
      console.log(pwd_hash);
      updatePwd({
        variables: {
          data: {
            name: {
              set: plc.name,
            },
            password: {
              set: pwd_hash,
            },
            role: {
              set: plc.role,
            },
          },
          where: {
            id: userId,
          },
        },
      })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          setUpdateError({ ...error, msg: error, show: true });
        });
      navigate(paths.user);
    }
  };

  return (
    <div className="p-3 flex flex-col">
      <div className="font-semibold text-2xl">Change User Password</div>
      <div className="w-80 p-2 grid grid-cols-2 grid-flow-row gap-4">
        <div className="w-48 p-2 m-2 label">Name</div>
        <div className="p-2 m-2 flex flex-col">{data?.user.name}</div>
        <div className="w-48 p-2 m-2 label">Role</div>
        <div className="p-2 m-2 flex flex-col">{data?.user.role}</div>
        <div className="w-48 p-2 m-2 label">Password</div>
        <div className="p-2 m-2 flex flex-col">
          <input type="text" className="input input-primary input-md" onChange={handlePasswordChange} />
        </div>
      </div>
      <div className="flex flex-nowrap p-3">
        <button aria-label="back" onClick={handleBack} className="mx-1 lg:mx-6 py-3 h-12 w-24 btn">
          Back
        </button>
        <button type="submit" onClick={handleSave} disabled={false} className="mx-1 lg:mx-6  py-3 h-12 w-24 btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUserPwdPage;
