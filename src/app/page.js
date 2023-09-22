"use client";

import React from "react";
import Predictions from "./components/predictions"; // Import the Predictions component
//import PredictionControls from "./components/predictionControls";
import { usePredictionsContext } from "./context/predictionContext";
import Pagination from "./components/pagination";
import SearchBar from "./components/searchBar";
import Sorting from "./components/sorting";

function HomePage() {
  const { predictions } = usePredictionsContext(); // Access predictions from context

  // Filter the predictions based on the isVIP flag
  const freePredictions = predictions.filter((prediction) => !prediction.isVIP);

  return (
    <div className="container mx-auto py-4">
      <SearchBar />
      <Sorting />
      {/*<PredictionControls />*/}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {freePredictions.map((prediction) => (
          <Predictions key={prediction.id} prediction={prediction} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}

export default HomePage;
