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
import Link from "next/link";

const LoginPage = () => {
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
      router.push("/");
    } catch (error) {
      console.log("Login failed:", error);
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
      });
    }
  };

  return (
    <CheckAuth>
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

          <div className="mt-4 text-sm ">
            <span>Already have an account?</span>
            <Link
              href="/signup"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </CheckAuth>
  );
};

export default LoginPage;
