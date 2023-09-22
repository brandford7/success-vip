// authContext.js

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the Next.js router

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Initialize the Next.js router

  useEffect(() => {
    // Fetch user data or check local storage for a saved token and user info
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          "https://success-secrets-bet-api.onrender.com/api/v1/users/me", // Update with the user profile route
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const login = async (credentials) => {
    // Make a POST request to the login route
    try {
      const response = await fetch(
        "https://success-secrets-bet-api.onrender.com/api/v1/auth/login", // Update with the login route
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        setUser(user);

        // Save the token to local storage
        localStorage.setItem("token", token);

        // Redirect to the homepage after successful login
        router.push("/"); // Update with the correct homepage route
        return true;
      } else {
        // Handle login error here
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = () => {
    // Clear user data and token from state and local storage
    setUser(null);
    localStorage.removeItem("token");

    // Redirect to the login page after logout
    router.push("/login"); // Update with the correct login page route
  };

  // Register function for user registration
  const register = async (formData) => {
    try {
      const response = await fetch(
        "https://success-secrets-bet-api.onrender.com/api/v1/auth/register", // Update with the register route
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Redirect to the homepage after successful registration
        router.push("/"); // Update with the correct homepage route
        return true;
      } else {
        // Handle registration error here
        return false;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return false;
    }
  };

  const authContextValue = {
    user,
    login,
    logout,
    register,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
