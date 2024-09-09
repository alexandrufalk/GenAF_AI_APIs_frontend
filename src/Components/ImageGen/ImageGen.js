import React, { useState } from "react";

function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
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
    <div className="App">
      <h1>Generate Image with Stable Diffusion</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Generate
        </button>
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
