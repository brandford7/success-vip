"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePredictions } from "@/app/context/predictionContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostPrediction = () => {
  const { postPrediction } = usePredictions();
  const router = useRouter();

  const currentDate = new Date().toISOString().split("T")[0];

  const initialPredictionState = {
    competition: "",
    game: "",
    tip: "",
    odd: "",
    isVIP: false,
    result: "pending",
    startPeriod: currentDate,
    status: "pending",
  };

  const [prediction, setPrediction] = useState(initialPredictionState);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrediction({
      ...prediction,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postPrediction(prediction);

      // Show a success message only when the request is successful
      toast.success("Prediction posted successfully!");

      // Reset the form to initial state
      setPrediction(initialPredictionState);

      // Optionally, navigate to another page or perform additional actions
      router.push("/admin/all-predictions");
    } catch (error) {
      // Handle errors, show an error message, and log the error
      toast.error("Error posting prediction.");
      console.error("Error Details:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Post Prediction
        </h1>
        <form onSubmit={handleSubmit} className='text-black'>
          {renderFormField("Competition", "competition")}
          {renderFormField("Game", "game")}
          {renderFormField("Tip", "tip")}
          {renderFormField("Odd", "odd")}
          {renderFormField("Result", "result")}
          {renderSelectField("Status", "status", ["pending", "won", "lost"])}
          {renderSelectField("IsVIP", "isVIP", ["true", "false"])}
          {renderFormField("Date", "startPeriod", "date")}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
            >
              Post Prediction
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

  function renderFormField(label, name, type = "text") {
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={prediction[name]}
          onChange={handleInputChange}
          className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
    );
  }

  function renderSelectField(label, name, options) {
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={prediction[name]}
          onChange={handleInputChange}
          className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
          required
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
};

export default PostPrediction;
