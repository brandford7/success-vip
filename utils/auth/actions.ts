"use server";

import { revalidatePath } from "next/cache";
import { axiosInstance } from "../../config";


type UserType = {
  email: string;
  first_name: string;
  last_name: string;

}

export const handleSignUp = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  };
  try {
    const response = await axiosInstance.post(`/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: rawFormData,
      }),
    });

    revalidatePath("/login");
    const data = await response.data.data;

    console.log("Sign up successful:", data);
  } catch (error) {
    console.log("Sign up failed:", error);
  }
};


export const getUsers = async (req: Request, res: Response): Promise<UserType> => {
  try {
    const response = await axiosInstance.get(`/users`);
    const users = await response.data.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
 }
