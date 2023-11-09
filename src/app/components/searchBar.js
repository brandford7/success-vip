import React, { useEffect } from "react";
import { usePredictions } from "../context/predictionContext";

const SearchBar = () => {
  const { search, setSearch, setPage, predictions, fetchPredictions } =
    usePredictions();

  useEffect(() => {
    // Use the `users` data or any other logic to display the user list
  }, [predictions]);

  const handleSearch = () => {
    setPage(1); // Reset the page to 1 when applying a new search
    fetchPredictions(); // Fetch data with the updated search parameter
  };

  return (
    <>
      
      <div className="w-full md:w-1/2 lg:w-1/3 mb-2 px-5 text-black">
        <input
          type="text"
          placeholder="Search predictions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>
    </>
  );
};

export default SearchBar;
