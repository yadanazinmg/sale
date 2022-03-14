import React, { useState } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loaded, setLoaded] = useState(0);

  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setLoaded(0);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    console.log(data);

    axios
      .post("http://localhost:7000/upload", data, {
        // receive two parameter endpoint url ,form data
        onUploadProgress: (ProgressEvent) => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
        toast.success("upload success");
      })
      .catch((err) => {
        toast.error("upload fail");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form method="post" action="#" id="#">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" multiple="" onChange={onChangeHandler} />
            </div>
          </form>
        </div>
      </div>
      <div className="form-group">
        <Progress max="100" color="success" value={loaded}>
          {Math.round(loaded, 2)}%
        </Progress>
      </div>
      <div className="form-group">
        <ToastContainer />
      </div>
      <div className="row">
        <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default App;
