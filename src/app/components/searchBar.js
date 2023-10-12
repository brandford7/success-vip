import React from "react";
import { usePredictions } from "../context/predictionContext";

const SearchBar = () => {
  const { search, setSearch} = usePredictions();

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 mb-2 px-5">
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
