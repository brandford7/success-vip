import React from "react";
import { useAuth } from "../context/authContext";

import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "react-query";

// Define a mutation function for deleting a prediction

const Users = ({ users, header }) => {
  const { user,deleteUser } = useAuth();
  
  const queryClient = useQueryClient();
  const userRole = user?.role;
  //const isAdmin = userRole === "admin";

  // Use a mutation hook to handle the delete prediction action
  const handleDelete = useMutation(deleteUser, {
    onMutate: (id) => {
      // When the mutation starts, you can use onMutate to store the prediction
      // being deleted in case you need it later (e.g., to undo the delete).
      /*   queryClient.setQueryData("predictions", (prev) =>
        prev.filter((prediction) => prediction.id !== id)
      );*/
    },
    onError: () => {
      // If there's an error, you can display an error toast
      toast.error("Error deleting user");
    },
    onSettled: () => {
      // When the mutation is completed (either success or failure), you can refetch the predictions
      queryClient.invalidateQueries("users");
    },
  });

  return (
    <div className="max-w-screen-lg mx-auto mb-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          {/* <h2 className="text-2xl font-semibold p-5">{header}</h2>*/}
          <thead>
            <tr className="bg-gray-200">
              {/* ... Table headers ... */}
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border-b border-gray-300 py-2 px-4">
                  {user.username}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {user.email}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {user.role}
                </td>

                <td className="border-b border-gray-300 py-2 px-4 space-y-5">
                  {/* Provide a link for editing the prediction */}

                  <Link
                    href="/admin/users/edit-user/[id]"
                    as={`/admin/users/edit-user/${user._id}`}
                  >
                    <button className="bg-blue-500 text-white p-1 px-2  rounded-lg mr-2">
                      Edit
                    </button>
                  </Link>
                  {/* Add a button to delete the prediction */}
                  <button
                    onClick={() => handleDelete.mutate(user._id)}
                    className="bg-red-500 text-white p-1 px-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default Users;
