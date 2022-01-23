import React, { useState } from "react";
import "./App.css";
import DropZone from "./DropZone";

const App = (props) => {
  return (
    <div>
      <p className="title">React Drag and Drop Image Upload</p>
      <DropZone />
    </div>
  );
};

export default App;
