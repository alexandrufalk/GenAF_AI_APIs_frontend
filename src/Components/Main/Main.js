import React from "react";
import ModelContainer from "../ModelContainer/ModelContainer";
import "./Main.css";
import ImagePred from "../ImagePred/ImagePred";

const Main = () => {
  return (
    <div className="main-con">
      <ModelContainer />
      <ImagePred />
    </div>
  );
};

export default Main;
