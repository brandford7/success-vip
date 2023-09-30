"use client";

import Predictions from "./components/predictions";
import { usePredictions } from "./context/predictionContext";
import Pagination from "./components/pagination";
import SearchBar from "./components/searchBar";
import Filter from "./components/filter";

function HomePage() {
  const { predictions } = usePredictions();

  // Filter the predictions based on the isVIP flag
  const freePredictions = predictions.filter((prediction) => !prediction.isVIP);

  return (
    <div className="container mx-auto py-4">
      <SearchBar />

      <Filter />

      <div>
        <Predictions predictions={freePredictions} />
      </div>
      <Pagination />
    </div>
  );
}

export default HomePage;
