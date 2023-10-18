"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const { addUser } = useUser();
  const router = useRouter();

  
  const initialUserState = {
    username: "",
    email: "",
    password: "",
    role: "user",
  };

  const [userData, setUserData] = useState(initialUserState);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addUser(userData);

      // Show a success message only when the request is successful
      toast.success("User added successfully!");
      // Reset the form to initial state
      setUser(initialUserState);

      // Optionally, navigate to another page or perform additional actions
      router.push("/admin/users");
    } catch (error) {
      // Handle errors, show an error message, and log the error
      toast.error("Error adding user.");
      console.error("Error Details:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add User
        </h1>
        <form onSubmit={handleSubmit}>
          {renderFormField("Username", "username")}
          {renderFormField("Email", "email")}
          {renderFormField("Password", "password")}

          {renderSelectField("Role", "role", ["user", "admin"])}

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );

  function renderFormField(label, name, type = "text") {
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={userData[name]}
          onChange={handleInputChange}
          className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
    );
  }

  function renderSelectField(label, name, options) {
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={userData[name]}
          onChange={handleInputChange}
          className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
          required
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
};

export default AddUser;
