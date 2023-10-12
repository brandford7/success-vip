"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { usePredictions } from "../../../context/predictionContext";
import { axiosInstance } from "../../../../../config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditPrediction() {
  const router = useRouter();
  const { editPrediction } = usePredictions();

  const [predictionData, setPredictionData] = useState({
    competition: "",
    game: "",
    tip: "",
    odd: "",
    result: "pending",
    date: "",
    status: "pending",
  });

  const { predictionId } = router.query;
 
  // Get the ID from the route parameters

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editPrediction(predictionId, updatedPrediction);
      toast.success("Prediction updated successfully!");
    } catch (error) {
      toast.error("Error updating prediction.");
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default EditPrediction;
