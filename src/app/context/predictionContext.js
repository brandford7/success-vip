
 "use client"
import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../../config";
import { useCallback } from "react";



const PredictionsContext = createContext();

export const usePredictions = () => {
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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const applyFilters = () => {
    // Fetch predictions based on search, sort, filter, and pagination parameters
    fetchData();
  };

  const resetFilters = () => {
    // Reset filter values to their initial state
    setSearchTerm("");
    setSortField("createdAt");
    setSortOrder("desc");
    setIsVIP(false);
    setSelectedDate("");
    setSelectedCompetition("");
    // Fetch predictions with the new filter values
    fetchData();
  };

  // Function to fetch predictions based on filter parameters
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        searchTerm,
        sortField,
        sortOrder,
        isVIP,
        page,
        pageSize,
        selectedDate,
        selectedCompetition,
      });
      const response = await axiosInstance.get(
        `/predictions?${queryParams.toString()}`
      );
      const data = response.data;
      setPredictions(data.predictions);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  });

  // Fetch predictions initially
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    selectedDate,
    setSelectedDate,
    selectedCompetition,
    setSelectedCompetition,
    isLoading,
    error,
    applyFilters,
    resetFilters,
  };

  return (
    <PredictionsContext.Provider value={contextValue}>
      {children}
    </PredictionsContext.Provider>
  );
};
