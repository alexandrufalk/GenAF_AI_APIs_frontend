import React from "react";
import ModelContainer from "../ModelContainer/ModelContainer";
import "./Main.css";
import ImagePred from "../ImagePred/ImagePred";
import ObjectDetection from "../ObjectDetection/ObjectDetection";

const Main = () => {
  return (
    <div className="main-con">
      <ModelContainer />
      <ImagePred />
      <ObjectDetection />
    </div>
  );
};

export default Main;
