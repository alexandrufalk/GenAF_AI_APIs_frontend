import React from "react";
import "./ModelContainer.css";

const ModelContainer = () => {
  const models = [
    { name: "Model 1", description: "Model 1 Description" },
    { name: "Model 2", description: "Model 2 Description" },
    { name: "Model 3", description: "Model 3 Description" },
    { name: "Model 1", description: "Model 1 Description" },
    { name: "Model 2", description: "Model 2 Description" },
    { name: "Model 3", description: "Model 3 Description" },
    { name: "Model 1", description: "Model 1 Description" },
    { name: "Model 2", description: "Model 2 Description" },
    { name: "Model 3", description: "Model 3 Description" },
    // Add more models here...
  ];
  return (
    <div className="modelscon">
      {models.map((model, index) => (
        <div key={index} className="modelcon">
          <div className="modelbody">
            <div className="modeltitle">{model.name}</div>
            <div className="modeldescription">{model.description}</div>
          </div>
        </div>
      ))}
      {/* <div className="modelcon">
        <div className="modelbody">
          <div className="modeltitle">Test Container 1</div>
          <div className="modeldescription">Model Desription</div>
        </div>
      </div> */}
    </div>
  );
};

export default ModelContainer;
