import React, { useEffect } from "react";
import { useUser } from "../context/userContext";

const UserControls = () => {
  const {
    users,
    search,
    setSearch,
    isLoading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    date,
    setDate,
    username,
    setUsername,
    resetFilters, // Access the resetFilters function
  } = useUser();

  useEffect(() => {
    // Use the `users` data or any other logic to display the user list
  }, [users]);

  const handleSearch = () => {
    setPage(1); // Reset the page to 1 when applying a new search
    fetchData(); // Fetch data with the updated search parameter
  };

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-2 mx-2">
      <input
        type="text"
        placeholder="Search Users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
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

      {/* Pagination controls */}
      {/* <div className="md:flex md:items-center md:space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next
        </button>
        <input
          type="number"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
  </div>*/}
    </div>
  );
};

export default UserControls;
