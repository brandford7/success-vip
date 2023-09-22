"use client";

import React from "react";
import Predictions from "./components/predictions"; // Import the Predictions component
//import PredictionControls from "./components/predictionControls";
import { usePredictionsContext } from "./context/predictionContext";
import Pagination from "./components/pagination";
import SearchBar from "./components/searchBar";
import Sorting from "./components/sorting";
import Filter from "./components/filter";

function HomePage() {
  const { predictions } = usePredictionsContext(); // Access predictions from context

  // Filter the predictions based on the isVIP flag
  const freePredictions = predictions.filter((prediction) => !prediction.isVIP);
  console.log(predictions);

  return (
    <div className="container mx-auto py-4">
      <SearchBar />
      <Sorting />
      <Filter />

      <div>
        <Predictions predictions={freePredictions} />
      </div>
      <Pagination />
    </div>
  );
}

export default HomePage;
