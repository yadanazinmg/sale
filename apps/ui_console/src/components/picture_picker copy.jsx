import React, { useState, useRef, useEffect } from "react";
import { CloseIcon } from "../assets/icons/svg_icons";

const transparentGif_1x1 = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

const PicturePicker = (props) => {
  const { url, onChange, value } = props;
  const fileInputRef = useRef();
  const imgRef = useRef();
  const [modified, setModified] = useState(false);

  useEffect(() => {
    if (value === null) {
      handleRemove();
    }
  }, [value, url]);

  const handleFileChange = (e) => {
    console.log("handleFileChange");

    if (e.target.files.length > 0) {
      console.log(e.target.files[0]);

      imgRef.current.src = URL.createObjectURL(e.target.files[0]);
      setModified(true);
      if (onChange) {
        onChange(e.target.files[0]);
      }
    }
  };

  const handleRemove = () => {
    console.log("close");
    if (url) imgRef.current.src = url;
    else {
      imgRef.current.src = transparentGif_1x1;
      //imgRef.current.removeAttribute("src");
    }
    setModified(false);
    if (onChange) {
      onChange(null);
    }
  };

  const handleSelect = () => {
    console.log("Select");
    fileInputRef.current.click();
  };

  const handleImageError = (e) => {
    e.target.src = transparentGif_1x1;
  };

  return (
    <div>
      <input
        id="avatar"
        name="avatar"
        ref={fileInputRef}
        type="file"
        multiple={false}
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      ></input>
      <div className="relative rounded-full h-44 w-44 bg-gray-200">
        <img ref={imgRef} className="rounded-full w-full h-full" alt="" onError={handleImageError}></img>
        {modified && (
          <div className="absolute left-20 bottom-2 cursor-pointer rounded-full bg-gray-200" onClick={handleRemove}>
            <CloseIcon />
          </div>
        )}
        {!modified && (
          <div className="absolute top-[40%] left-0 cursor-pointer text-center opacity-60 bg-gray-200 rounded-3xl" onClick={handleSelect}>
            Drag & Drop files or <span className="underline">Browse</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PicturePicker;
