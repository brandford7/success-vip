"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect,useCallback } from "react";

import { usePredictions } from "@/app/context/predictionContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../../../../../config";

function EditPrediction({ params: { id } }) {
  const router = useRouter();
  const { editPrediction } = usePredictions();
  const [prediction, setPrediction] = useState({
    competition: "",
    game: "",
    tip: "",
    odd: "",
    result: "pending",
    startPeriod: null,
    status: "pending",
    isVIP: false,
  });

  const getPredictionData = useCallback(async (id) => {
    try {
      const response = await axiosInstance.get(`/predictions/${id}`);
      if (response.status === 200) {
        setPrediction(response.data);
      } else {
        console.error(`Error fetching prediction: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during fetchPredictionData:", error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      // Fetch prediction data when the component loads and 'id' is available
      getPredictionData(id);
    }
  }, [getPredictionData, id]);

 const handleInputChange = (e) => {
   const { name, value } = e.target;
   if (name === "startPeriod") {
     setPrediction({
       ...prediction,
       startPeriod: new Date(value).toISOString(), // Convert to ISO string
     });
   } else {
     setPrediction({
       ...prediction,
       [name]: value,
     });
   }
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editPrediction(id, prediction); 
      toast.success("Prediction updated successfully!");
      router.back(); // Redirect back to the prediction page
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
        <form onSubmit={handleSubmit} className='text-black'>
          <div className="mb-4">
            <label
              htmlFor="competition"
              className="block text-sm font-medium text-gray-700"
            >
              Competition
            </label>
            <input
              type="text"
              id="competition"
              name="competition"
              value={prediction.competition}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="game"
              className="block text-sm font-medium text-gray-700"
            >
              Game
            </label>
            <input
              type="text"
              id="game"
              name="game"
              value={prediction.game}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tip"
              className="block text-sm font-medium text-gray-700"
            >
              Tip
            </label>
            <input
              type="text"
              id="tip"
              name="tip"
              value={prediction.tip}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="odd"
              className="block text-sm font-medium text-gray-700"
            >
              Odd
            </label>
            <input
              type="text"
              id="odd"
              name="odd"
              value={prediction.odd}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="result"
              className="block text-sm font-medium text-gray-700"
            >
              Result
            </label>
            <input
              type="text"
              id="result"
              name="result"
              value={prediction.result}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="startPeriod"
              name="startPeriod"
              value={
                prediction.startPeriod
                  ? new Date(prediction.startPeriod).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={prediction.status}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="pending">Pending</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="isVIP"
              className="block text-sm font-medium text-gray-700"
            >
              isVIP
            </label>
            <select
              id="isVIP"
              name="isVIP"
              value={prediction.isVIP}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value={false}>no</option>
              <option value={true}>yes</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600 w-full"
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
