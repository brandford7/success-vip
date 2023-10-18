"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/authContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUser({ params: { id } }) {
  const router = useRouter();
  const { getUserById, editUserDetails } = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role:""
  });

  

  useEffect(() => {
    if (id) {
      // Fetch prediction data when the component loads and 'id' is available
      getUserById(id);
    }
  }, [getUserById, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUserDetails(id, userData); // Use router.query.id
      toast.success("User updated successfully!");
      router.push("/admin/users"); // Redirect back to the prediction page
    } catch (error) {
      toast.error("Error updating user details.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Edit User
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
              Edit User
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

export default EditUser;
