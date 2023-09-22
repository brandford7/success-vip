import React from "react";
import { usePredictionsContext } from "../context/predictionContext";

const Pagination = () => {
  const { page, setPage, pageSize, setPageSize } = usePredictionsContext();

  const pageSizeOptions = [10, 20, 30]; // You can customize the page size options

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 mb-2 flex justify-between items-center px-5">
        <button
          onClick={() => setPage(page - 1)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2"
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          Next
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          className="w-1/3 border px-3 py-1 rounded-lg"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Pagination;
