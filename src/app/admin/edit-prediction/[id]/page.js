"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { usePredictions } from "../../../context/predictionContext";
import { axiosInstance } from "../../../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router"; // Use "next/router" instead of "next/navigation"

// ... (other imports)

function EditPrediction({ params: {id}}) {
  const router = useRouter();
  const { editPrediction } = usePredictions();

  const [predictionData, setPredictionData] = useState({
    competition: "",
    game: "",
    tip: "",
    odd: "",
    result: "pending",
    date: "", // Initialize date field
    status: "pending",
    isVIP: false, // Initialize isVIP field
  });

  useEffect(() => {
    if (id) {
      // Fetch prediction data when the component loads and 'id' is available
      getPredictionData(id);
    }
  }, [router.query.id]);

  const getPredictionData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/predictions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
      await editPrediction(router.query.id, predictionData); // Use router.query.id
      toast.success("Prediction updated successfully!");
      router.push(`/admin/all-predictions}`); // Redirect back to the prediction page
    } catch (error) {
      toast.error("Error updating prediction.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Edit Prediction</h1>
        <form onSubmit={handleSubmit}>
          {/* ... (other form fields) */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={predictionData.date} // Populate the date field
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isVIP" className="block text-sm font-medium text-gray-700">
              VIP Prediction
            </label>
            <select
              id="isVIP"
              name="isVIP"
              value={predictionData.isVIP}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value={false}>No</option> {/* Use false for "No" */}
              <option value={true}>Yes</option> {/* Use true for "Yes" */}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
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
