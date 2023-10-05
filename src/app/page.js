"use client";
import Predictions from "./components/predictions";
import { usePredictions } from "./context/predictionContext";
import Pagination from "./components/pagination";
import SearchBar from "./components/searchBar";
import Filter from "./components/filter";

function HomePage() {
  const { predictions, isLoading } = usePredictions();
  // Filter the predictions based on the isVIP flag
  const freePredictions = predictions.filter((prediction) => !prediction.isVIP);

  return (
    <div className="h-screen container mx-auto py-4">
      <SearchBar />
      <Filter />

      {isLoading ? (
        // Render a loading indicator while data is loading
        <p className="flex justify-center w-full mx-auto p-6 ">
          Loading predictions...
        </p>
      ) : (
        // Render predictions once data has loaded
        <div>
          <Predictions predictions={freePredictions} />
        </div>
      )}

      <Pagination />
    </div>
  );
}

export default HomePage;
