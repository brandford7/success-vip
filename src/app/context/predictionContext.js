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
      const response = await axiosInstance.get(`/predictions?${queryParams.toString()}`);
      const data = response.data;
      setPredictions(data.predictions);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [isVIP, page, pageSize, searchTerm, selectedCompetition, selectedDate, sortField, sortOrder]);

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

  const getAllPredictions = async () => {
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
      const response = await axiosInstance.get(`/predictions?${queryParams.toString()}`);
      const data = response.data;
      setPredictions(data.predictions);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const postPrediction = async () => {
  try {
    await axiosInstance.post('/predictions');
    // Optionally, you can refresh the predictions list after deletion
    fetchData();
  } catch (error) {
    console.error("Error deleting prediction:", error);
  }
};


 const deletePrediction = async (predictionId) => {
  try {
    await axiosInstance.delete(`/predictions/${predictionId}`);
    // Optionally, you can refresh the predictions list after deletion
    fetchData();
  } catch (error) {
    console.error("Error deleting prediction:", error);
  }
};

  const editPrediction = async (predictionId, updatedPrediction) => {
   
  try {
    await axiosInstance.patch(`/predictions/${predictionId}`, updatedData);
    // Optionally, you can refresh the predictions list after editing
    //fetchData();
  } catch (error) {
    console.error("Error editing prediction:", error);
  }
  };

  return (
    <PredictionsContext.Provider value={{ ...contextValue, getAllPredictions,postPrediction, deletePrediction, editPrediction }}>
      {children}
    </PredictionsContext.Provider>
  );
};
