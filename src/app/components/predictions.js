"use client";
import React from "react";
import { useAuth } from "../context/authContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import Link from 'next/link'
const Predictions = ({ predictions }) => {
  const { user, fetchUserData } = useAuth(); // Access the user's role from your authentication context
  const queryClient = useQueryClient();

  // Query to fetch user data


  // Access the user's role
  const userRole = user?.role;

  // Check if the user has the admin role
  const isAdmin = userRole === "admin";

  // Mutation for deleting a prediction
  const deletePrediction = useMutation(
    (predictionId) => handleDelete(predictionId),
    {
      onSuccess: () => {
        // Invalidate and refetch the predictions query after a successful delete
        queryClient.invalidateQueries("predictions");
      },
    }
  );

  const handleDelete = (predictionId) => {
    // Handle the delete action (e.g., show a confirmation dialog and make a delete request)
    // You can use the `deletePrediction.mutate(predictionId)` to trigger the delete mutation
  };

  const handleEdit = (predictionId) => {
    // Handle the edit action (e.g., navigate to the edit page for the prediction)
  };

  return (
    <div className="max-w-screen-lg mx-auto mb-4">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b border-gray-300 py-2 px-4 text-left">
                Competition
              </th>
              <th className="border-b border-gray-300 py-2 px-4 text-left">
                Game
              </th>
              <th className="border-b border-gray-300 py-2 px-4 text-left">
                Tip
              </th>
              <th className="border-b border-gray-300 py-2 px-4 text-left">
                Odd
              </th>
              <th className="border-b border-gray-300 py-2 px-4 text-left">
                Result
              </th>
              {isAdmin && (
                <th className="border-b border-gray-300 py-2 px-4 text-left">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction, index) => (
              <tr
                key={prediction._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border-b border-gray-300 py-2 px-4">
                  {prediction.competition}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {prediction.game}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {prediction.tip}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {prediction.odd}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {prediction.status === "won" ? (
                    <VscCheck className="text-green-500" /> // Won
                  ) : prediction.status === "lost" ? (
                    <VscChromeClose className="text-red-500" /> // Lost
                  ) : (
                    prediction.result // Display the status text if not won or lost
                  )}
                </td>
                {isAdmin && (
                  <td className="border-b border-gray-300 py-2 px-4">
                    <Link href='/admin/edit-prediction/predictionId'>
                      
                      <button className="bg-blue-500 text-white p-1 px-2 rounded-lg mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(prediction._id)}
                      className="bg-red-500 text-white p-1 px-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Predictions;
