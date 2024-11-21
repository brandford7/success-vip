"use client";
import CustomInputField from "@/components/customInputField";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginType } from "../../../../utils/auth/types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import CheckAuth from "../../../../utils/auth/checkAuth";


const LoginPage = () => {
  //const router = useRouter();
  const { loginUser, refreshUser } = useAuth();
  
  const router = useRouter();


  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: LoginType) => {
    try {
      await loginUser(data);

      toast.success("Logged in successfully!", {
        position: "top-center",
      });
      refreshUser();
      // Redirect to the home page after successful login

      //router.push("/");

     
    } catch (error) {
      console.log("Sign up failed:", error);
    }
  };


 

  return (
    <CheckAuth>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-screen flex flex-col items-center justify-center"
        >
          <h1>Login Page</h1>
          <CustomInputField name="email" type="text" control={form.control} />
          <CustomInputField
            name="password"
            type="password"
            control={form.control}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </CheckAuth>
  );
};

export default LoginPage;
