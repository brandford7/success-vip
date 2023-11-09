import React, { useEffect } from "react";
import { usePredictions } from "../context/predictionContext";

const Filter = () => {
  const {
    date,
    setDate,
    competition,
    setCompetition,
    applyFilters,
    resetFilters,
  } = usePredictions();

 useEffect(() => {
   // Get today's date in "YYYY-MM-DD" format
   const today = new Date();
   const yyyy = today.getFullYear();
   const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
   const dd = String(today.getDate()).padStart(2, "0");

   const formattedDate = `${yyyy}-${mm}-${dd}`;
   setDate(formattedDate);
 }, [setDate]);

  return (
    <div className="flex flex-wrap justify-center px-5 text-black">
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <input
          type="date"
          value={date}
          
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg py-2 px-3"
        />
      </div>
      {/*  <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <input
          type="text"
          placeholder="Competition"
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
          className="w-full border rounded-lg py-2 px-3"
        />
  </div>*/}
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
