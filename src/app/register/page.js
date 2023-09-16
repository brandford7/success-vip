'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
const router = useRouter();
const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
});

const [errors, setErrors] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Perform form validation here
      const validationErrors = {};

      // Check for required fields
      if (!formData.username) {
        validationErrors.username = "Username is required";
      }
      if (!formData.email) {
        validationErrors.email = "Email is required";
      }
      if (!formData.password) {
        validationErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        validationErrors.password = "Password must be at least 6 characters";
      }

      // You can add more validation logic here for username and email

      if (Object.keys(validationErrors).length === 0) {
        // Perform email availability check here
        const emailIsAvailable = await checkEmailAvailability(formData.email);

        if (emailIsAvailable) {
          // Registration is successful, redirect to login
          router.push("/login");
        } else {
          validationErrors.email = "Email is already taken";
          setErrors(validationErrors);
        }
      } else {
        setErrors(validationErrors);
      }
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Register a New Account
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 px-3 py-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              placeholder="Username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 px-3 py-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              placeholder="Email address"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 px-3 py-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm">
          <p className="text-gray-600">
            Already have an account?
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
