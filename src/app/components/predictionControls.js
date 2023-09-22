import React from "react";
import { usePredictionsContext } from "../context/predictionContext";

function PredictionControls() {
  const {
    searchTerm,
    setSearchTerm,
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
  } = usePredictionsContext();

  return (
    <div className="container mx-auto py-4 flex flex-wrap justify-between items-center">
     

      {/* Sorting options */}
      <div className="w-full md:w-1/4 lg:w-1/6 mb-2 flex items-center">
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="w-full border p-2 rounded-lg"
        >
          {/* Add your sorting options */}
        </select>
      </div>
      <div className="w-full md:w-1/4 lg:w-1/6 mb-2 flex items-center">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border p-2 rounded-lg"
        >
          {/* Add sorting order options */}
        </select>
      </div>

      {/* Pagination */}
      
    </div>
  );
}

export default PredictionControls;
