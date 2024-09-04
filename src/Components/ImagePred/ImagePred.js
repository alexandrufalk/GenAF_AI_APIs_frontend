import React, { useState, useRef } from "react";
import "./ImagePred.css";

function ImagePred({ model }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const imageRef = useRef(null);

  const outputLines = model.output.split("\n");
  const hasMultipleLines = outputLines.length > 1;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-body">
      <div className="body-header">
        <div className="body-title">{model.name}</div>
        <div className="body-description">{model.description}</div>
      </div>
      <div className="body-header">
        <div className="body-title">Model Details</div>
        <div className="body-description">Description</div>
        <div className="body-subtitle">Input</div>
        <div className="body-description">
          <p>{model.input}</p>
        </div>
        <div className="body-subtitle">Output</div>
        <div className="body-description">
          {hasMultipleLines ? (
            <ul>
              {outputLines.map((line, index) => {
                const [boldText, regularText] = line.split(":");

                return (
                  <li key={index}>
                    <strong>{boldText}:</strong>
                    {regularText}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>{model.output}</p>
          )}
        </div>
      </div>
      <div className="body-header">
        <div className="body-subtitle">Test Food Prediction</div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Predict</button>
      </form> */}
      <div className="buttons-container">
        <form onSubmit={handleSubmit}>
          <button
            className="button"
            onClick={() => document.getElementById("file-upload").click()}
          >
            Choose File
          </button>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <button className="button">Predict</button>
        </form>
      </div>
      {prediction && (
        <div>
          <div className="prediction">
            Prediction: {JSON.stringify(prediction)}
          </div>
        </div>
      )}
      {imageUrl && (
        <div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Uploaded"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePred;
