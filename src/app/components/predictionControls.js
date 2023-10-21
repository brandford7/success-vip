import React, { useEffect } from "react";
import { usePredictions } from "@/app/context/predictionContext";

const PredictionsControls = () => {
  const {
    predictions,
    search,
    setSearch,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    isVIP,
    setIsVIP,
    page,
    setPage,
    pageSize,
    setPageSize,
    date,
    setDate,
    competition,
    setCompetition,
    isLoading,
    error,
    applyFilters,
    resetFilters, // Access the resetFilters function
  } = usePredictions();

  useEffect(() => {
    // Use the `predictions` data or any other logic to display the predictions list
  }, [predictions]);

  // Handle search and filters, similar to the user's component
  const handleSearch = () => {
    setPage(1);
    applyFilters();
  };

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-2 mx-2">
      <input
        type="text"
        placeholder="Search Predictions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {/* <input
        type="text"
        placeholder="Competition"
        value={competition}
        onChange={(e) => setCompetition(e.target.value)}
        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />*/}
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <select
        value={isVIP}
        onChange={(e) => setIsVIP(e.target.value)}
        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All</option>
        <option value="true">VIP</option>
        <option value="false">Non-VIP</option>
      </select>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>

      {/* Reset filters button */}
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reset Filters
      </button>

      {/* Rest of the code to display predictions, pagination, etc. */}
    </div>
  );
};

export default PredictionsControls;
