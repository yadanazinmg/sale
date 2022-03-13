import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

const ComfirmationPopup = (props) => {
  const { onClose, value: valueProp, open, ...other } = props;

  console.log(props);
  const { id } = props;
  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    console.log("handle delete false");
    onClose(false);
  };

  const handleOk = () => {
    console.log("handle delete true");
    onClose(true);
  };

  return (
    <div id={id} className="modal">
      <Popup open={open} closeOnDocumentClick>
        <div className="shadow flex flex-col p-4 h-40 w-80 items-center bg-gray-200 rounded-lg model">
          <div className="flex m-2">Are sure you want to delete!</div>
          <div className="flex flex-row mt-6">
            <button className="m-2 p-2 h-10 w-20 rounded bg-gray-300 hover:bg-gray-400" onClick={handleCancel}>
              Cancel
            </button>
            <button onClick={handleOk} className="m-2 p-2 h-10 w-20 rounded bg-gray-300 hover:bg-gray-400">
              OK
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ComfirmationPopup;
