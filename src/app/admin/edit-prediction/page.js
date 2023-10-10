import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../../config";

function EditPrediction() {
  const [predictionData, setPredictionData] = useState({
    competition: "",
    game: "",
    tip: "",
    odd: "",
    result: "pending",
    date: "",
    status: "pending",
  });
  const [predictionId, setPredictionId] = useState(""); // Set the specific prediction ID

  // Function to fetch and populate prediction data based on a specific prediction ID
  const fetchPredictionData = async () => {
    try {
      const response = await axiosInstance.get(`/predictions/${predictionId}`);

      if (response.status === 200) {
        // Successfully fetched prediction data
        setPredictionData(response.data);
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        console.error(`Error fetching prediction: ${response.statusText}`);
      }
    } catch (error) {
      // Handle network errors and other errors
      console.error("Error during fetchPredictionData:", error);
    }
  };

  // Function to update the prediction data
  const updatePrediction = async () => {
    try {
      const response = await axiosInstance.put(
        `/predictions/${predictionId}`,
        predictionData
      );

      if (response.status === 200) {
        // Successfully updated the prediction
        console.log("Prediction updated successfully");
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        console.error(`Error updating prediction: ${response.statusText}`);
      }
    } catch (error) {
      // Handle network errors and other errors
      console.error("Error during updatePrediction:", error);
    }
  };

  useEffect(() => {
    // Fetch prediction data when the component loads
    fetchPredictionData();
  }, [predictionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPredictionData({
      ...predictionData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the prediction data
    updatePrediction();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Edit Prediction
        </h1>
        <form onSubmit={handleSubmit}>
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
              value={predictionData.competition}
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
              value={predictionData.game}
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
              value={predictionData.tip}
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
              value={predictionData.odd}
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
              value={predictionData.result}
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
              id="date"
              name="date"
              value={predictionData.date}
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
            <input
              type="text"
              id="status"
              name="status"
              value={predictionData.status}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
