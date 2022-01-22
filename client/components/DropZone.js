import React from "react";
import "./DropZone.css";
import { useDropzone } from "react-dropzone";

const DropZone = ({ setFiles }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <img src={file.path} />
      {JSON.stringify(file)}
    </li>
  ));

  if (acceptedFiles.length) {
    console.log(makeFileObject(acceptedFiles[0]));
    setFiles(acceptedFiles);
  }

  return (
    <>
      <div className="container">
        <div className="drop-container" {...getRootProps()}>
          <input {...getInputProps()} />
          Drag 'n' drop some files here, or click to select files
        </div>
      </div>
      <aside className="container">
        <ol>{files}</ol>
      </aside>
    </>
  );
};
export default DropZone;
