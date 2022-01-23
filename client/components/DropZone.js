import React, { useState } from "react";
import "./DropZone.css";
import { Web3Storage } from "web3.storage";
import { useDropzone } from "react-dropzone";

//* DON'T DO LIKE THAT IN PRODUCTION
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxMDhFNGQwMkRBNTk3NzQ0RUM4M0JiMUY2NDIyODA3NEE1MjJmNEUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDI4OTc2MTEzODAsIm5hbWUiOiJTdG9yYWdlIn0.tr3AsloRafN6bStrCr9zNzcMF-iWSKBRAUrrtzr3H4A";

function makeStorageClient() {
  return new Web3Storage({ token: API_TOKEN });
}

const client = makeStorageClient();

const makeFileObject = (file) => {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const splitted = file.path.split("/");
  const len = splitted.length;
  return new File([file], splitted[len - 1]);
};

const DropZone = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [_files, setFiles] = useState([]);
  const [cid, setCid] = useState("");
  const [wait, setWait] = useState("");

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const storeFiles = async (event) => {
    event.preventDefault();
    if (acceptedFiles.length) {
      const modFiles = acceptedFiles.map((file) => makeFileObject(file));
      try {
        setWait("Hang Tight");
        const CID = await client.put(modFiles);
        setCid(CID);
        setWait("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="drop-container" {...getRootProps()}>
          <input {...getInputProps()} />
          Drag 'n' drop some files here, or click to select files
        </div>
      </div>
      {cid.length ? (
        <div className="container_new">
          <h3>You now able to view your folder here:</h3>
          <h3>
            <a href={`https://ipfs.io/ipfs/${cid}`}>{`https://ipfs.io/ipfs/${cid}`}</a>
          </h3>
        </div>
      ) : (
        <div className="container">No CID yet</div>
      )}
      {wait.length ? <h1 className="container">{wait}</h1> : <></>}

      <aside className="container">
        <ol>{files}</ol>
      </aside>
      <form className="btn" onSubmit={storeFiles}>
        <button>Upload to IPFS</button>
      </form>
    </>
  );
};
export default React.memo(DropZone);
