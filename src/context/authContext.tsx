"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "../../utils/auth/actions";
import { LoginType } from "../../utils/auth/types";

enum Role {
  Admin = "admin",
  User = "user",
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  customerId: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  logOut: () => void;
  refreshUser: () => void;
  loginUser: (values: LoginType) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Initialize user state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Refresh user data if needed
  const refreshUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const loginUser = async (values: LoginType) => {
    try {
      const data = await handleLogin(values); // Use handleLogin from actions
      const { token, user } = data;

      // Save token and user in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user); // Update the context state
      router.push("/"); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logOut,
        loginUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
