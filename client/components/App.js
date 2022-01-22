import React, { useState } from "react";
import "./App.css";
import DropZone from "./DropZone";
import { Web3Storage, getFilesFromPath } from "web3.storage";

const App = (props) => {
  const [files, setFiles] = useState([]);

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
    <div>
      <p className="title">React Drag and Drop Image Upload</p>
      <DropZone setFiles={setFiles} />
      <form className="btn" onSubmit={storeFiles}>
        <button>Upload to IPFS</button>
      </form>
    </div>
  );
};

export default App;
