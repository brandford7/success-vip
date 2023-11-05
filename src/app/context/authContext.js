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
  const [errorMessage, setErrorMessage] = useState("");
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
 
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);

      if (response.status === 200) {
        const {
          user: { name, role },
          token,
        } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ name, role }));
        setUser({ name, role });
        setErrorMessage(""); // Clear any previous error message
        return true;
      } else {
        setErrorMessage("Login failed");
        console.error("Login failed. Response status:", response.status);
        return false;
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser({ name: "", role: "" });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log(user);
    router.push("auth/login");
  };

  const register = async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      return response.data; // Ensure the register function returns the response data
    } catch (error) {
      console.error("Error during registration:", error);
      return {
        success: false,
        message: "An error occurred during registration.",
      };
    }
  };


// function to reset user password
const forgotPassword = async (email) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", { email });

      if (response.status === 200) {
        // Handle the success case
        console.log("Password reset email sent successfully");
        return true;
      } else {
        console.error("Password reset request failed. Response status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error during forgotPassword:", error);
      return false;
    }
  };
  
   const getUserProfile = async () => {
     const token = localStorage.getItem("token");
     if (!token) {
       throw new Error("Token not found");
     }

     const response = await axiosInstance.get(`/auth/profile`, {
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

const editUserProfile = async (field, value) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }

      await axiosInstance.patch(
        "/auth/profile",
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
    setUser,
    login,
    logout,
    register,
    getUserProfile,
    editUserProfile,
    isLoading,
    errorMessage,
    forgotPassword,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
