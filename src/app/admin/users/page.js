"use client";
import { useEffect} from "react";
import Users from "../../components/users"; // Import the Predictions component
import UserControls from "../../components/userControls";
import Pagination from "../../components/userPagination";
import { useUser } from "@/app/context/userContext";
import { ToastContainer } from "react-toastify";

const AllUsers = () => {
  const { users, isLoading } = useUser();
  

  return (
    <div className="container mx-auto py-4">
      <UserControls/>
      <h2 className="text-2xl font-semibold p-5">All Users</h2>
      <div
        className="h-screen overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {isLoading ? (
          // Render a loading indicator while data is loading
          <p className="flex justify-center w-full mx-auto p-6">
            Loading users...
          </p>
        ) : (
          // Render predictions once data has loaded
          <div>
            <Users
              users={users}
              
            />
          </div>
        )}
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
