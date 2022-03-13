import React, { useState } from "react";
import { resetPassword } from "../../helpers/fb_function_helpers";

const ResetPwd = () => {
  const [uid, setUid] = useState();
  const [pwd, setPwd] = useState();

  const handleUid = (e) => {
    setUid(e.target.value);
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleClick = async (e) => {
    console.log({ uid: uid, password: pwd });
    const result = await resetPassword({ uid: uid, password: pwd });
    console.log(result);
  };

  return (
    <div className="w-96 p-10 grid grid-rows-3 gap-2">
      <input type="text" placeholder="uid" name="uid" onChange={handleUid} value={uid} />
      <input type="text" placeholder="pwd" name="pwd" onChange={handlePwd} value={pwd} />
      <input type="button" className="p-2 bg-gray-300 rounded-md" onClick={handleClick} value="Update" />
    </div>
  );
};

export default ResetPwd;
