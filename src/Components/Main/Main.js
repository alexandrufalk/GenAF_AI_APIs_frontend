import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ModelContainer from "../ModelContainer/ModelContainer";
import "./Main.css";
import ImagePred from "../ImagePred/ImagePred";
import ObjectDetection from "../ObjectDetection/ObjectDetection";
import ObjectDetectionMNet from "../ObjectDetectionMNet/ObjectDetectionMNet";

const Main = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedmodel] = useState(null);
  // const [selectedModel, setSelectedModel] = useState(null);
  // const handleModelSelection = (model) => {
  //   setSelectedModel(model);
  //   console.log("Selected model", model);
  // };
  const handleModelClick = (model) => {
    console.log(`Clicked model name ${model.name}`);
    setSelectedmodel(model);

    if (model.name === "Neural Network Regression") {
      navigate("/genaf/image-pred");
    } else if (model.name === "Object detection using EfficientNet-b0") {
      navigate("/genaf/object-detection");
    } else if (model.name === "Object detection using mobilenet_v2") {
      navigate("/genaf/object-detection-mnet");
    } else {
      console.warn("No matching route for this model");
    }
  };
  return (
    <div className="main-con">
      <Routes>
        {/* The exact path should match with the structure used in index.js */}
        <Route
          path=""
          element={<ModelContainer onModelClick={handleModelClick} />}
        />
        <Route
          path="image-pred"
          element={<ImagePred model={selectedModel} />}
        />
        <Route
          path="object-detection"
          element={<ObjectDetection model={selectedModel} />}
        />
        <Route
          path="object-detection-mnet"
          element={<ObjectDetectionMNet model={selectedModel} />}
        />
      </Routes>
    </div>
  );
};

export default Main;
