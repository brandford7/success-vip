import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { axiosInstance } from "../../../config";

// Create the context
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch predictions based on filter parameters
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        page,
        pageSize,
        date,
        username,
      });

      const response = await axiosInstance.get(
        `/users/?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [date, page, pageSize, search, username]);

  // Function to fetch predictions based on filter parameters

  // Function to apply filters and fetch predictions
  const applyFilters = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

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
    fetchUsers();
  }, [fetchUsers]);

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axiosInstance.get(`/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching user data");
    }
  };

  // Function to delete a prediction by ID

  // Function to edit a prediction by ID
  const editProfile = async (field, value) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }

       await axiosInstance.patch(
        "/users/profile",
        { field, value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the local user object with the edited value
        setUser((prevUser) => ({
          ...prevUser,
          [field]: value,
        }));
        return true;
      } else {
        // Handle edit error here
        return false;
      }
    } catch (error) {
      console.error("Error during edit:", error);
      return false;
    }
  };

  const contextValue = {
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
    resetFilters,

    editProfile,
    getUserProfile,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
