"use client";

import Predictions from "./components/predictions";
import { usePredictions } from "./context/predictionContext";
import Pagination from "./components/predictionPagination";
import SearchBar from "./components/searchBar";
import Filter from "./components/filter";

function HomePage() {
  const { predictions, isLoading, } = usePredictions();


  const freePredictions = predictions.filter((prediction) => !prediction.isVIP);

  return (
    <div className="container mx-auto py-4 ">
      <SearchBar />
      <Filter />

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
            <Predictions
              predictions={freePredictions}
              header="Free Predictions"
            />
          </div>
        )}
      </div>

      <Pagination />
    </div>
  );
}

export default HomePage;
