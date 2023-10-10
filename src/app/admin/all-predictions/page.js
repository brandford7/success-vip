"use client";
import React, { useState, useEffect } from "react";
import Predictions from "../../components/predictions"; // Import the Predictions component
import { usePredictions } from "@/app/context/predictionContext";

const AllPredictions=() =>{
  const { predictions } = usePredictions();

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-semibold">All Matches</h2>
      <div className='max-h-screen'>
        <Predictions predictions={predictions} />
      </div>
    </div>
  );
}

export default AllPredictions;
