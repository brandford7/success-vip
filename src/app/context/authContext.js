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
  const [user, setUser] = useState({name:"", role:""});
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
  const fetchUserData = async () => {
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

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("auth/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { user:{name,role}, token } = response.data;

        // Store the token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
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
    setUser(null);
    localStorage.removeItem("token");
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


  const editUserField = async (field, value) => {
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

  const authContextValue = {
    user,
  
    login,
    logout,
    register,
    fetchUserData,
    editUserField,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
