"use client";
import React, { useState, useEffect } from "react";
import Predictions from "../../components/predictions"; // Import the Predictions component
import PredictionControls from "../../components/predictionControls";
import Pagination from "../../components/predictionPagination";
import { usePredictions } from "@/app/context/predictionContext";
import { ToastContainer, toast } from "react-toastify";

const AllPredictions = () => {
  const { predictions, setDate, isLoading } = usePredictions();

  useEffect(() => {
    setDate('')
  }, [setDate]);

  

  return (
    <div className="container mx-auto py-4">
      <PredictionControls />
      <h2 className="text-2xl font-semibold p-5">All Predictions</h2>
      <div
        className="h-screen overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {isLoading ? (
          // Render a loading indicator while data is loading
          <p className="flex justify-center w-full mx-auto p-6">
            Loading predictions...
          </p>
        ) : (
          // Render predictions once data has loaded
          <div>
            <Predictions predictions={predictions} header="Free Predictions" />
          </div>
        )}
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
      <Pagination />
    </div>
  );
};

export default AllPredictions;
