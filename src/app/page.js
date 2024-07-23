"use client";

import Predictions from "./components/predictions";
import { usePredictions } from "./context/predictionContext";
import Pagination from "./components/predictionPagination";
import SearchBar from "./components/searchBar";
import Filter from "./components/filter";


function HomePage() {
  const { predictions, isLoading } = usePredictions();
  

  const freePredictions = predictions.filter((prediction) => !prediction.isVIP);

  return (
    <div>
      {/* <SearchBar />*/}
      <Filter />

      <div
        className="h-screen overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {/* Render predictions once data has loaded */}
        <div>
          <Predictions
            predictions={freePredictions}
            header="Free Predictions"
          />
        </div>
      </div>

      <Pagination />
    </div>
  );
}

export default HomePage;
