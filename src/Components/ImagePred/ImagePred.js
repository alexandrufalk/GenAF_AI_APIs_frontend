import React, { useState } from "react";

function ImagePred() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
    <div className="App">
      <h1>Image Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Predict</button>
      </form>
      {prediction && <div>Prediction: {JSON.stringify(prediction)}</div>}
    </div>
  );
}

export default ImagePred;
