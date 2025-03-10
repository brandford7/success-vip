"use server";
import { axiosInstance } from "../../config";
import { LoginType, SignupType } from "./types";

type UserType = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
};
export const handleSignUp = async (values: SignupType) => {
  try {
    // Pass values directly as data in the post request
    const response = await axiosInstance.post(`/auth/signup`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    

    // Directly access response data
    const data = response.data;

   
  } catch (error) {
    console.log("Sign up failed:", error);
  }
};


/*
export const handleLogin= async (values: LoginType) => {
  try {
    // Pass values directly as data in the post request
    const response = await axiosInstance.post(`/auth/login`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Directly access response data
    const data = response.data;

    
  } catch (error) {
    console.log("log in failed:", error);
  }
};

*/

export const handleLogin = async (values: LoginType) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    return response.data;
   
  } catch (error) {
    console.log("Log in failed:", error);
  }
};

export const getUsers = async (): Promise<UserType> => {
  try {
    const response = await axiosInstance.get(`api/users`);
    const users = await response.data.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};
