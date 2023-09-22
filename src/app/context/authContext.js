import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
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
          const userData = response.data;
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
     try {
       const response = await axios.post(
         "https://success-secrets-bet-api.onrender.com/api/v1/auth/login", // Update with the login route
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
