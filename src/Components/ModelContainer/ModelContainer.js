import React, { useState } from "react";
import "./ModelContainer.css";

const ModelContainer = ({ onModelClick }) => {
  // State for selected task, data type, and search query
  const [selectedTask, setSelectedTask] = useState("All");
  const [selectedDataType, setSelectedDataType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const models = [
    {
      id: "1",
      name: "Neural Network Regression",
      description:
        "The following describes a generalized process for inputting a set of numerical data, identifying patterns within the dataset, and subsequently generating a specific output value based on these identified patterns.",
      task: "Image Classification",
      dataType: "Images",
      model_details: "",
      input:
        "A three-channel image of variable size - the model does NOT support batching. The input tensor is a tf.uint8 tensor with shape [1, height, width, 3] with values in [0, 255].",
      output: `Predictions`,
    },
    {
      id: "2",
      name: "Object detection using EfficientNet-b0",
      description:
        "EfficientDet Object detection model (SSD with EfficientNet-b0 + BiFPN feature extractor, shared box predictor and focal loss), trained on COCO 2017 dataset.",
      task: "Image Classification",
      dataType: "Numerical",
      model_details: "",
      input:
        "A three-channel image of variable size - the model does NOT support batching. The input tensor is a tf.uint8 tensor with shape [1, height, width, 3] with values in [0, 255].",
      output: `num_detections: a tf.int tensor with only one value, the number of detections [N].
        detection_boxes: a tf.float32 tensor of shape [N, 4] containing bounding box coordinates in the following order [ymin, xmin, ymax, xmax].
        detection_classes: a tf.int tensor of shape [N] containing detection class index from the label file.
        detection_scores: a tf.float32 tensor of shape [N] containing detection scores.`,
    },
    {
      name: "Object detection using mobilenet_v2",
      description: "Model 3 Description",
      task: "Computer Vision and CNN",
      dataType: "Images",
      model_details: "",
      input:
        "A three-channel image of variable size - the model does NOT support batching. The input tensor is a tf.uint8 tensor with shape [1, height, width, 3] with values in [0, 255].",
      output: `num_detections: a tf.int tensor with only one value, the number of detections [N].
        detection_boxes: a tf.float32 tensor of shape [N, 4] containing bounding box coordinates in the following order [ymin, xmin, ymax, xmax].
        detection_classes: a tf.int tensor of shape [N] containing detection class index from the label file.
        detection_scores: a tf.float32 tensor of shape [N] containing detection scores.`,
    },
    {
      name: "Image Generation",
      description: "Image Generation using Stable Diffusion",
      task: "Image generation",
      dataType: "Images",
      model_details: "",
      input: "Text",
      output: `Image`,
    },
    {
      name: "Model 2",
      description: "Model 2 Description",
      task: "Time Series",
      dataType: "Time Series",
    },
    {
      name: "Model 3",
      description: "Model 3 Description",
      task: "Text Generation",
      dataType: "Text",
    },
    {
      name: "Model 1",
      description: "Model 1 Description",
      task: "Object Detection",
      dataType: "Images",
    },
    {
      name: "Model 2",
      description: "Model 2 Description",
      dataType: "Numerical",
    },
    {
      name: "Model 2",
      description: "Model 2 Description",
      task: "Time Series",
      dataType: "Time Series",
    },
    {
      name: "Model 3",
      description: "Model 3 Description",
      task: "Text Generation",
      dataType: "Text",
    },
    {
      name: "Model 1",
      description: "Model 1 Description",
      task: "Object Detection",
      dataType: "Images",
    },
    {
      name: "Model 2",
      description: "Model 2 Description",
      dataType: "Numerical",
    },
  ];

  // Handle changes in task, data type, and search query filters
  const handleTaskChange = (event) => setSelectedTask(event.target.value);
  const handleDataTypeChange = (event) =>
    setSelectedDataType(event.target.value);
  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value);

  // Filter models based on selected task, data type, and search query
  const filteredModels = models.filter((model) => {
    return (
      (selectedTask === "All" || model.task === selectedTask) &&
      (selectedDataType === "All" || model.dataType === selectedDataType) &&
      model.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Get unique tasks and data types for filter options
  const uniqueTasks = [
    "All",
    ...new Set(models.map((model) => model.task).filter(Boolean)),
  ];
  const uniqueDataTypes = [
    "All",
    ...new Set(models.map((model) => model.dataType).filter(Boolean)),
  ];

  return (
    <div>
      <div className="filters-container">
        {/* Filter by Task */}
        <div className="filter-container">
          <label htmlFor="task-filter">Filter by Task: </label>
          <select
            id="task-filter"
            className="custom-select"
            value={selectedTask}
            onChange={handleTaskChange}
          >
            {uniqueTasks.map((task, index) => (
              <option key={index} value={task}>
                {task}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Data Type */}
        <div className="filter-container">
          <label htmlFor="datatype-filter">Filter by Data Type: </label>
          <select
            id="datatype-filter"
            className="custom-select"
            value={selectedDataType}
            onChange={handleDataTypeChange}
          >
            {uniqueDataTypes.map((dataType, index) => (
              <option key={index} value={dataType}>
                {dataType}
              </option>
            ))}
          </select>
        </div>

        {/* Search by Model Name */}
        <div className="filter-container">
          <label htmlFor="name-filter">Search by Model Name: </label>
          <input
            type="text"
            id="name-filter"
            className="custom-input"
            placeholder="Enter model name..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
      </div>

      {/* Render filtered models */}
      <div className="modelscon">
        {filteredModels.map((model, index) => (
          <div
            key={index}
            className="modelcon"
            onClick={() => onModelClick(model)}
          >
            <div className="modelbody">
              <div className="modeltitle">{model.name}</div>
              <div className="modeldescription">{model.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelContainer;
