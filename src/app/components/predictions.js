import React from "react";
import { useAuth } from "../context/authContext";

function Prediction({ predictions }) {
  const { user } = useAuth(); // Access the user's role from your authentication context

  const isAdmin = user && user.role === "admin"; // Check if the user has the admin role

  const handleEdit = (predictionId) => {
    // Handle the edit action (e.g., navigate to an edit page)
  };

  const handleDelete = (predictionId) => {
    // Handle the delete action (e.g., show a confirmation dialog and make a delete request)
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
                  {prediction.result}
                </td>
                {isAdmin && (
                  <td className="border-b border-gray-300 py-2 px-4">
                    <button
                      onClick={() => handleEdit(prediction._id)}
                      className="bg-blue-500 text-white p-1 px-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>
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
}

export default Prediction;
