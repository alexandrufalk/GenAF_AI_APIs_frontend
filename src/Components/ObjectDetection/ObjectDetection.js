import React, { useState, useEffect, useRef } from "react";

const ObjectDetection = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [response, setResponse] = useState(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/detect", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error uploading file");
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (response && imageRef.current && canvasRef.current) {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Clear previous drawings
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set canvas dimensions to match image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw detection boxes
      response.detection_boxes.forEach((box, index) => {
        const [ymin, xmin, ymax, xmax] = box;
        const x = xmin * image.width;
        const y = ymin * image.height;
        const width = (xmax - xmin) * image.width;
        const height = (ymax - ymin) * image.height;

        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);

        // Optionally, draw class label and score
        const classId = response.detection_classes[index];
        const score = response.detection_scores[index];
        // const score_2 = score.toFixed(2);
        context.font = "18px Arial";
        context.fillStyle = "red";
        context.fillText(
          `Class: ${classId} Score: ${score}`,
          x,
          y > 10 ? y - 5 : 10
        );
      });
    }
  }, [response]);

  return (
    <div>
      <h2>Upload Image for Detection</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      {imageUrl && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%" }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      )}
      {response && (
        <div>
          <h3>Detection Results</h3>
          <p>Number of Detections: {response.num_detections}</p>
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
