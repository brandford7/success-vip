"use client";

import React from "react";
import Predictions from "../components/predictions"; // Import the Predictions component
import { usePredictionsContext } from "../context/predictionContext";
import Pagination from "../components/pagination";
import SearchBar from "../components/searchBar";
import Sorting from "../components/sorting";
import Filter from "../components/filter";

function HomePage() {
  const { predictions } = usePredictionsContext(); // Access predictions from context

  // Filter the predictions based on the isVIP flag
 const vipPredictions = predictions.filter(
   (prediction) => prediction.isVIP === true
 );


  return (
    <div className="container mx-auto py-4">
      <SearchBar />

      <div>
        <Predictions predictions={vipPredictions} />
      </div>
      <Pagination />
    </div>
  );
}

export default HomePage;
