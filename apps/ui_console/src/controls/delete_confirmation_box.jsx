import React from "react";

const DeleteConfirmationBox = (props) => {
  const { id, onClose } = props;
  const handleCancel = (e) => {
    //e.preventDefault();
    console.log("delete=false");
    onClose(false);
  };

  const handleOk = (e) => {
    //e.preventDefault();
    console.log("delete=true");
    onClose(true);
  };
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p>Are sure you want to delete!</p>
          <div className="modal-action">
            <label htmlFor={id} className="btn btn-primary" onClick={handleCancel}>
              Cancel
            </label>
            <label htmlFor={id} className="btn" onClick={handleOk}>
              Ok
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationBox;
