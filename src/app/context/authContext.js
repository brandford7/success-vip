"use client";
// authContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../../../config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", role: "" });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the user data and token exist in localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      // If they exist, set the user data
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Use React Query to fetch user data

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("auth/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const {
          user: { name, role },
          token,
        } = response.data;

        // Store the token and user data in localStorage
        localStorage.setItem("token", token);

        // Store the user data as an object in localStorage
        localStorage.setItem("user", JSON.stringify({ name, role }));

        setUser({ name, role }); // Update the user state with name and role
        return true;
      } else {
        console.error("Login failed. Response status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser({ name: "", role: "" });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log(user);
    router.push("/login");
  };

  const register = async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error during registration:", error);
      return {
        success: false,
        message: "An error occurred during registration.",
      }; // Return an error response
    }
  };

  const getUserById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setUser(response.data);
      } else {
        console.error(`Error fetching user details: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during getUserDetails:", error);
    }
  };

  /* const editUserField = async (field, value) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }

      const response = await axios.put(
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
*/
  
  const addUser = async (newUser) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }

      const response = await axiosInstance.post("/users", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("User added:", response);

      if (response.status === 201) {
        console.log("User added successfully");
        // Prediction posted successfully, you may update the predictions list
        fetchData();
      }
    } catch (error) {
      console.error("Error posting prediction:", error);
    }
  };

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
      fetchData();
    } catch (error) {
      console.error("Error editing prediction:", error);
    }
  };

  const authContextValue = {
    user,
    setUser,
    login,
    logout,
    register,
    getUserById,
    addUser,
    editUserDetails,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
