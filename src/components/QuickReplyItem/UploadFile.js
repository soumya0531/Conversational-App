import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import ImageQuickReply from "./ImageQuickReply";

const UploadFile = ({ img, uploadFunc }) => {
  const inputRef = useRef();
  const [text, setText] = useState("Upload File");

  const handleUpload = () => {
    const file = inputRef.current.files[0];
    setText(`Uploading: ${file.name}`);

    // Handle file upload here as a promise.

    // uploadFunc(file)
    //   .then(setText("Uploaded!"))
    //   .catch((err) => setText("Upload Failed."));
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={() => handleUpload()}
        hidden
      />
      <ImageQuickReply
        imageUrl={img}
        text={text}
        color="#5c6bce"
        border="#bfc8ff"
        onClick={(e) => inputRef.current.click()}
      />
    </>
  );
};

UploadFile.propTypes = {
  img: PropTypes.string,
  uploadFunc: PropTypes.func,
};

UploadFile.defaultProps = {
  img:
    "https://assets.dryicons.com/uploads/icon/svg/6235/4a5dbdf4-499c-4b1b-8523-dcbfb8833da9.svg",
};

export default UploadFile;
