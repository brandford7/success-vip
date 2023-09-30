import React from "react";
import { usePredictions } from "../context/predictionContext";

const Sorting = () => {
  const { sortField, setSortField, sortOrder, setSortOrder } =
    usePredictions();

  return (
    <div className="flex flex-wrap items-center justify-between mb-4 px-5">
      {/* Sorting options */}
      <div className="w-full md:w-1/4 lg:w-1/6 mb-2 flex items-center">
        <label htmlFor="sortField" className="mr-2 text-gray-600">
          Sort By:
        </label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="w-full border p-2 rounded-lg"
        >
          {/* Add your sorting options */}
          <option value="createdAt">Date (Latest First)</option>
          <option value="competition">Competition</option>
          <option value="game">Game</option>
          {/* Add more sorting options as needed */}
        </select>
      </div>
      <div className="w-full md:w-1/4 lg:w-1/6 mb-2 flex items-center">
        <label htmlFor="sortOrder" className="mr-2 text-gray-600">
          Sort Order:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border p-2 rounded-lg"
        >
          {/* Add sorting order options */}
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Sorting;
