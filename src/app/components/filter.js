import React from "react";
import { usePredictions } from "../context/predictionContext";

const Filter = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedCompetition,
    setSelectedCompetition,
    applyFilters,
    resetFilters,
  } = usePredictions();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border rounded-lg py-2 px-3"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <input
          type="text"
          placeholder="Competition"
          value={selectedCompetition}
          onChange={(e) => setSelectedCompetition(e.target.value)}
          className="w-full border rounded-lg py-2 px-3"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <button
          onClick={applyFilters}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Apply
        </button>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <button
          onClick={resetFilters}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
