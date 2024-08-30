import React, { useState, useEffect, useRef } from "react";

import json_detection_classes from "./detection_classes";

const ObjectDetection = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [response, setResponse] = useState(null);
  const [nrDetections, setNrDetections] = useState(0);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const classLabels = Object.keys(json_detection_classes).reduce((acc, key) => {
    acc[key] = json_detection_classes[key].name;
    return acc;
  }, {});

  const allowedClasses = [1, 37, 43];

  console.log(classLabels);

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

      console.log("Detection Box1:", response.detection_boxes[0][1]);
      console.log(
        "Detection score",
        response.detection_scores[0][0].toFixed(2)
      );

      // Filter detection results to include only allowed classes
      const filteredIndices = response.detection_classes[0]
        .map((classId, index) =>
          allowedClasses.includes(classId) ? index : null
        )
        .filter((index) => index !== null);

      console.log("filteredIndices:", filteredIndices);
      console.log("response.detection_boxes[0]:", response.detection_boxes[0]);

      // Draw detection boxes
      filteredIndices.forEach((index) => {
        const box = response.detection_boxes[0][index];
        const classId = response.detection_classes[0][index];
        const score = response.detection_scores[0][index];

        if (score > 0.51) {
          console.log("box", box);
          console.log("classId", classId);
          console.log("score", score);
          setNrDetections(nrDetections + 1);

          const [ymin, xmin, ymax, xmax] = box;
          const x = xmin * image.width;
          const y = ymin * image.height;
          const width = (xmax - xmin) * image.width;
          const height = (ymax - ymin) * image.height;

          // Draw the box
          context.strokeStyle = "red";
          context.lineWidth = 2;
          context.strokeRect(x, y, width, height);

          // Draw the label and score
          const label = classLabels[classId] || `Class ${classId}`;
          context.font = "18px Arial";
          context.fillStyle = "red";
          context.fillText(
            `${label} (${score.toFixed(2)})`,
            x,
            y > 10 ? y - 5 : 10
          );
        }
      });
    }
  }, [response]);

  //       response.detection_boxes[0].forEach((box, index) => {
  //         const [ymin, xmin, ymax, xmax] = box;
  //         const x = xmin * image.width;
  //         const y = ymin * image.height;
  //         const width = (xmax - xmin) * image.width;
  //         const height = (ymax - ymin) * image.height;

  //         context.strokeStyle = "red";
  //         context.lineWidth = 2;
  //         context.strokeRect(x, y, width, height);

  //         // Optionally, draw class label and score
  //         const classId = response.detection_classes[index];
  //         const score = response.detection_scores[index];

  //         context.font = "18px Arial";
  //         context.fillStyle = "red";
  //         context.fillText(
  //           `Class: ${classId} Score: ${score}`,
  //           x,
  //           y > 10 ? y - 5 : 10
  //         );
  //       });
  //     }
  //   }, [response]);

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
          <p>Number of Detections: {nrDetections + 1}</p>
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
