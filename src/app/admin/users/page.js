"use client";
import React, { } from "react";
import Users from "../../components/users"; // Import the Predictions component
import UserControls from "../../components/userControls";
import Pagination from "../../components/userPagination";
import { useUser } from "@/app/context/userContext";
import { ToastContainer, toast } from "react-toastify";

const AllUsers = () => {
  const { users } = useUser();

  return (
    <div className="container mx-auto py-4">
      <UserControls/>
      <h2 className="text-2xl font-semibold p-5">All Users</h2>
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
      <Pagination/>
    </div>
  );
};

export default AllUsers;
