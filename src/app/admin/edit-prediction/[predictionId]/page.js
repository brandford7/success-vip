"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {usePredictions} from '../../../context/predictionContext'
import { axiosInstance } from "../../../../../config";

function EditPrediction() {
  const router = useRouter();
  const { updatePrediction } = usePredictions();

  const [predictionData, setPredictionData] = useState({
    competition: "",
    game: "",
    tip: "",
    odd: "",
    result: "pending",
    date: "",
    status: "pending",
  });

  const predictionId = router.query.id; // Get the ID from the route parameters

  useEffect(() => {
    if (predictionId) {
      // Fetch prediction data when the component loads and the ID is available
      getPredictionData(predictionId);
    }
  }, [predictionId]);

  const getPredictionData = async (id) => {
    try {
      const response = await axiosInstance.get(`/predictions/${id}`);
      if (response.status === 200) {
        setPredictionData(response.data);
      } else {
        console.error(`Error fetching prediction: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during fetchPredictionData:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPredictionData({
      ...predictionData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (predictionId) {
      // Update the prediction data if the ID is available
      updatePrediction(predictionId, predictionData).then(() => {
        console.log("Prediction updated successfully");
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Edit Prediction
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Input fields as before */}
          {/* ... */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600"
            >
              Update Prediction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPrediction;
