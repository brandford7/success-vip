// context/authContext.js
//use client
import { createContext, useContext, useState, useEffect } from "react";

// Create the auth context
export const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // You can fetch the user data from your API or local storage here
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from your API or local storage
        const response = await fetch(
          "https://jobsapi-cr7j.onrender.com/api/v1/auth/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // You may need to adjust the token storage method
            },
          }
        );

        if (!response.ok) {
          // Handle error when fetching user data
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();

        // Set the user state
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const login = async (userData) => {
    // Handle user login logic (e.g., making API requests)
    try {
      const response = await fetch(
        "https://jobsapi-cr7j.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        // Handle login error
        throw new Error("Login failed");
      }

      const responseData = await response.json();

      // Once the user is logged in, set the user state
      setUser(responseData.user);

      // Save user data to local storage if needed
      // localStorage.setItem('user', JSON.stringify(responseData.user));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (userData) => {
    // Handle user registration logic (e.g., making API requests)
    try {
      const response = await fetch(
        "https://jobsapi-cr7j.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        // Handle registration error
        throw new Error("Registration failed");
      }

      const responseData = await response.json();

      // Once the user is registered, set the user state
      setUser(responseData.user);

      // Save user data to local storage if needed
      // localStorage.setItem('user', JSON.stringify(responseData.user));
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = () => {
    // Handle user logout logic (e.g., making API requests)
    // After logout, set the user state to null
    setUser(null);

    // Clear user data from local storage if needed
    // localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
