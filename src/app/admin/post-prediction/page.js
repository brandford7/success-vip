"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { usePredictions } from "@/app/context/predictionContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostPrediction = () => {
  const { postPrediction } = usePredictions();

/*  const [predictionData, setPredictionData] = useState({
    competition: "",
    game: "",
    tip: "",
    odd: "",
    isVIP: false,
    result: "pending",
    date: "",
    status: "pending",
  });
*/
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setPredictionData({
      ...predictionData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postPrediction();
      toast.success("Prediction posted successfully!");
      router.push("/admin/all-predictions");
    } catch (error) {
      toast.error("Error posting prediction.");
      console.log(error)
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Post Prediction
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
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={predictionData.status}
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
              IsVIP
            </label>
            <select
              id="isVIP"
              name="isVIP"
              value={predictionData.isVIP}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
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
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
            >
              Submit Prediction
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
};

export default PostPrediction;
