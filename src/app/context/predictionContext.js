// predictionContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

const PREDICTIONS_API_URL =process.env.API_URL 

const PredictionsContext = createContext();

export const usePredictionsContext = () => {
  return useContext(PredictionsContext);
};

export const PredictionsProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isVIP, setIsVIP] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch predictions based on search, sort, filter, and pagination parameters
  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          searchTerm,
          sortField,
          sortOrder,
          isVIP,
          page,
          pageSize,
        });
        const response = await fetch(
          `${PREDICTIONS_API_URL}?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch predictions: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPredictions(data.predictions);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [searchTerm, sortField, sortOrder, isVIP, page, pageSize]);

  const contextValue = {
    predictions,
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
    isLoading,
    error,
  };

  return (
    <PredictionsContext.Provider value={contextValue}>
      {children}
    </PredictionsContext.Provider>
  );
};
