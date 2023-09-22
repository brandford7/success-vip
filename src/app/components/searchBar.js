import React from "react";
import { usePredictionsContext } from "../context/predictionContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = usePredictionsContext();

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 mb-2 px-5">
        <input
          type="text"
          placeholder="Search predictions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>
    </>
  );
};

export default SearchBar;
