"use client";
import {useEffect} from 'react'
import Predictions from "./components/predictions";
import { usePredictions } from "./context/predictionContext";
import Pagination from "./components/predictionPagination";
import SearchBar from "./components/searchBar";
import Filter from "./components/filter";

function HomePage() {
  const { predictions, isLoading,setStartPeriod } = usePredictions();

  /* useEffect(() => {
     // Get today's date in "YYYY-MM-DD" format
     const today = new Date();
     const yyyy = today.getFullYear();
     const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
     const dd = String(today.getDate()).padStart(2, "0");

     const formattedDate = `${yyyy}-${mm}-${dd}`;
     setStartPeriod(formattedDate);
   }, [setStartPeriod]);
*/
  // Filter the predictions based on the isVIP flag
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
