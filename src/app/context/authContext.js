'use client'
// authContext.js
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  const response = await axios.get(
    "https://success-secrets-bet-api.onrender.com/api/v1/users/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error fetching user data");
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Use React Query to fetch user data
  const { data: userData } = useQuery("userData", fetchUserData, {
    retry: false,
    onSuccess: (data) => {
      setUser(data);
      setIsLoading(false);
    },
    onError: () => {
      setUser(null);
      setIsLoading(false);
    },
  });

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "https://success-secrets-bet-api.onrender.com/api/v1/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        router.push("/");
        return true;
      } else {
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
      const response = await axios.post(
        "https://success-secrets-bet-api.onrender.com/api/v1/auth/register",
        formData
      );

      if (response.status === 200) {
        router.push("/");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return false;
    }
  };

  const editUserField = async (field, value) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }

      const response = await axios.put(
        "https://success-secrets-bet-api.onrender.com/api/v1/users/profile",
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
