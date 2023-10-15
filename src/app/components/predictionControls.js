import React, { useEffect } from "react";
import { usePredictions } from "../context/PredictionsContext";

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
    <div>
      <input
        type="text"
        placeholder="Search Predictions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Competition"
        value={competition}
        onChange={(e) => setCompetition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={isVIP} onChange={(e) => setIsVIP(e.target.value)}>
        <option value="">All</option>
        <option value="true">VIP</option>
        <option value="false">Non-VIP</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      {/* Reset filters button */}
      <button onClick={resetFilters}>Reset Filters</button>

      {/* Rest of the code to display predictions, pagination, etc. */}
    </div>
  );
};

export default PredictionsControls;
