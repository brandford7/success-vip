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
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjust the page size as needed

  // Function to fetch users based on search, date, and username

const fetchUsers = useCallback(async () => {


  setIsLoading(true);

  try {

const token = localStorage.getItem("token");


    const queryParams = new URLSearchParams({
      search,
      date,
      username,
      page, // Include page and page size for pagination
      pageSize,
    });

    const apiUrl = `/users?${queryParams.toString()}`;
    console.log("API URL:", apiUrl);

    const response = await axiosInstance.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response Data:", response.data);

    const data = response.data;

    // Update users with the received data
    setUsers(data.users);

    setIsLoading(false);
  } catch (error) {
    setError(error);
    setIsLoading(false);
  }
}, [search, date, username, page, pageSize, ]);

  // Function to apply search and filter criteria and reset pagination
  const applyFilters = useCallback(() => {
    setPage(1); // Reset to the first page when applying new filters
    fetchUsers();
  }, [fetchUsers]);

  // Function to reset filters and pagination to their initial state
  const resetFilters = () => {
    setSearch("");
    setDate("");
    setUsername("");
    setPage(1); // Reset to the first page
    fetchUsers(); // Fetch users after resetting filters
  };

  // Fetch users initially and when filters, page, or page size change
  useEffect(() => {
    fetchUsers();
  }, [search, date, username, page, pageSize, fetchUsers]);

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

  // Function to add a user by admin

  const addUser = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      console.log("Prediction data:", userData);

      const response = await axiosInstance.post("/users", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("User added:", response.data);

      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Function to edit a user's profile by logged in user

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
    fetchUsers,
    setPage,
    pageSize,
    setPageSize,
    date,
    setDate,
applyFilters,
    username,
    setUsername,
    resetFilters,
    addUser,
    editProfile,
    getUserProfile,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
