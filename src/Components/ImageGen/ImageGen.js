import React, { useState } from "react";
import "../ObjectDetection/ObjectDetection.css";

function ImageGen({ model }) {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const outputLines = model.output.split("\n");
  const hasMultipleLines = outputLines.length > 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5010//generate2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Error generating image");
      }

      const blob = await response.blob(); // The response is an image (binary data)
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (err) {
      setError("Error generating image");
    } finally {
      setLoading(false);
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
        <div className="body-subtitle">Test Image Generation</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="buttons-container">
          <input
            className="prompt"
            type="text"
            placeholder="Enter prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="button" type="submit" disabled={loading}>
            Generate
          </button>
        </div>
      </form>

      {loading && <p>Generating image...</p>}
      {error && <p>{error}</p>}
      {image && (
        <div>
          <h2>Generated Image:</h2>
          <img src={image} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default ImageGen;
