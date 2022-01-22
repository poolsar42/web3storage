import React, { useState } from "react";
import "./DropZone.css";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import { useDropzone } from "react-dropzone";

const DropZone = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [_files, setFiles] = useState([]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const makeFileObject = (file) => {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    return new File([file], file.path.split("/")[-1]);
  };

  async function storeFiles(event) {
    event.preventDefault();
    // const path = files[0].path.split("/").slice(0, -1).join("/");
    // const _files = await getFilesFromPath(path);
    console.log(files);
    // const cid = await client.put(_files);
    // console.log(_files[0]);
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
export default React.memo(DropZone);
