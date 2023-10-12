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

  // Function to apply filters and fetch predictions
  const applyFilters = useCallback(() => {
    fetchData();
  }, [fetchData]);

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

  // Fetch predictions initially
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postPrediction = async (newPrediction) => {
    try {
      const response = await axiosInstance.post("/predictions", newPrediction);
      if (response.status === 201) {
        // Prediction posted successfully, you may update the predictions list
        fetchData();
      }
    } catch (error) {
      console.error("Error posting prediction:", error);
    }
  };

  // Function to delete a prediction by ID
  const deletePrediction = async (predictionId) => {
    try {
      await axiosInstance.delete(`/predictions/${predictionId}`);
      // Prediction deleted successfully, you may update the predictions list
      fetchData();
    } catch (error) {
      console.error("Error deleting prediction:", error);
    }
  };

  // Function to edit a prediction by ID
  const editPrediction = async (predictionId, updatedPrediction) => {
    try {
      await axiosInstance.patch(
        `/predictions/${predictionId}`,
        updatedPrediction
      );
      // Prediction edited successfully, you may update the predictions list
      fetchData();
    } catch (error) {
      console.error("Error editing prediction:", error);
    }
  };

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
    postPrediction,
    deletePrediction,
    editPrediction,
  };

  return (
    <PredictionsContext.Provider value={contextValue}>
      {children}
    </PredictionsContext.Provider>
  );
};
