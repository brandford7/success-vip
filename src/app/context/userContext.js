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
  //define current date
const currentDate = new Date().toISOString().split("T")[0];

  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    username: null,
    email: null,

    role: "user",
  });

  const [search, setSearch] = useState("");
  const [date, setDate] = useState(currentDate);
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

      const response = await axiosInstance.get(
        `/users?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      // Update users with the received data
      setUsers(data.users);

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [search, date, username, page, pageSize]);

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

  const getUserById = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { username, email, role } = response.data.user;
        setUserData({
          ...userData,
          username: username || "",
          email: email || "",
          role: role || "user",
        });
      } else {
        console.error(`Error fetching user data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during fetchUserData:", error);
    }
  }, []);

  // Function to edit a user's profile by logged in user
  const editUserDetails = async (id, updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      await axiosInstance.patch(`/users/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // Prediction edited successfully, you may update the predictions list
      fetchUsers();
    } catch (error) {
      console.error("Error editing prediction:", error);
    }
  };

  // Function to delete a user by ID
  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      await axiosInstance.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Prediction deleted successfully, you may update the predictions list
      fetchUsers();
    } catch (error) {
      console.error("Error deleting prediction:", error);
    }
  };

  const contextValue = {
    users,
    setUsers,
    userData,
    setUserData,
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
    deleteUser,
    getUserById,
    editUserDetails,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
