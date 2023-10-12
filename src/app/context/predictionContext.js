import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { axiosInstance } from "../../../config";

// Create the context
const PredictionsContext = createContext();

export const usePredictions = () => {
  return useContext(PredictionsContext);
};

export const PredictionsProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isVIP, setIsVIP] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [date, setDate] = useState("");
  const [competition, setCompetition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to apply filters and fetch predictions
  const applyFilters = useCallback(() => {
    fetchData();
  }, [search, sortField, sortOrder, isVIP, page, pageSize, date, competition]);

  // Function to reset filters to their initial state
  const resetFilters = () => {
    setSearch("");
    setSortField("createdAt");
    setSortOrder("desc");
    setIsVIP(false);
    setDate("");
    setCompetition("");
    applyFilters(); // Fetch predictions after resetting filters
  };

  // Function to fetch predictions based on filter parameters
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        sortField,
        sortOrder,
        isVIP,
        page,
        pageSize,
        date,
        competition,
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
  }, [search, sortField, sortOrder, isVIP, page, pageSize, date, competition]);

  // Fetch predictions initially
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = {
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
    resetFilters,
  };

  return (
    <PredictionsContext.Provider value={contextValue}>
      {children}
    </PredictionsContext.Provider>
  );
};
