"use client";
import React, { } from "react";
import Users from "../../components/users"; // Import the Predictions component
import { useUser } from "@/app/context/userContext";
import { ToastContainer, toast } from "react-toastify";

const AllUsers = () => {
  const { users } = useUser();

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-semibold p-5">All Predictions</h2>
      <div className="max-h-screen">
        <Users users={users} />
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
};

export default AllUsers;
