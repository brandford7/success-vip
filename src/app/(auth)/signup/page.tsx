"use client";
import React from "react";
import { signUpSchema, SignupType } from "../../../../utils/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInputField from "@/components/customInputField";
import { Form } from "@/components/ui/form";
import { handleSignUp } from "../../../../utils/auth/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CheckAuth from "../../../../utils/auth/checkAuth";

const SignUpPage = () => {
  const router = useRouter();

  const form = useForm<SignupType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: SignupType) => {
    try {
      await handleSignUp(data); // Pass data to handleSignUp function
      router.push("/login");

      console.log(data);
    } catch (error) {
      console.log("Sign up failed:", error);
    }
  };

  return (
    <CheckAuth>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-screen flex flex-col items-center justify-center"
        >
          <h1>Sign Up Page</h1>
          <CustomInputField name="email" type="text" control={form.control} />
          <CustomInputField
            name="first_name"
            type="text"
            control={form.control}
          />
          <CustomInputField
            name="last_name"
            type="text"
            control={form.control}
          />
          <CustomInputField name="phone" type="text" control={form.control} />
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

export default SignUpPage;
