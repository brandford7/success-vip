import React, { useEffect } from "react";
import { useUsers } from "../context/UsersContext";

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
    <div>
      <input
        type="text"
        placeholder="Search Users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Reset filters button */}
      <button onClick={resetFilters}>Reset Filters</button>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      }

      {/* Pagination controls */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <input
        type="number"
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value)}
      />
    </div>
  );
};

export default UserControls;
