import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { axiosInstance } from "../../../config";

// Create the context
const PredictionContext = createContext();

export const usePredictions = () => {
  return useContext(PredictionContext);
};

export const PredictionsProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]);
  const [prediction, setPrediction] = useState({
    competition: "",
    game: "",
    tip: "",
    odd: "",
    result: "pending",
    date: "",
    status: "pending",
    isVIP: false,
  });
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isVIP, setIsVIP] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [date, setDate] = useState("");
  const [competition, setCompetition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const applyFilters = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const resetFilters = () => {
    setSearch("");
    setSortField("createdAt");
    setSortOrder("desc");
    setIsVIP(""); // Change back to the initial state as needed
    setDate("");
    setCompetition("");
    setPage(1); // Reset the page to 1 when applying new filters
    applyFilters();
  };

  const postPrediction = async (newPrediction) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      const response = await axiosInstance.post("/predictions", newPrediction, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept:"application/json",
        },
      });

      console.log("Prediction posted:", response);

      if (response.status === 201) {
        console.log("Prediction posted successfully");
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
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      await axiosInstance.delete(`/predictions/${predictionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Prediction deleted successfully, you may update the predictions list
      fetchData();
    } catch (error) {
      console.error("Error deleting prediction:", error);
    }
  };

  // Function to edit a prediction by ID
  const editPrediction = async (predictionId, updatedPrediction) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      await axiosInstance.patch(
        `/predictions/${predictionId}`,
        updatedPrediction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Prediction edited successfully, you may update the predictions list
      fetchData();
    } catch (error) {
      console.error("Error editing prediction:", error);
    }
  };

  const contextValue = {
    predictions,

    setPredictions,
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
    <PredictionContext.Provider value={contextValue}>
      {children}
    </PredictionContext.Provider>
  );
};
