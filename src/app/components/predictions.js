import React from "react";
import { useAuth } from "../context/authContext";
import { usePredictions } from "../context/predictionContext";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "react-query";

// Define a mutation function for deleting a prediction

const Predictions = ({ predictions, header }) => {
  const { user } = useAuth();
  const { deletePrediction } = usePredictions();
  const queryClient = useQueryClient();
  const userRole = user?.role;
  const isAdmin = userRole === "admin";

  // Use a mutation hook to handle the delete prediction action
  const handleDelete = useMutation(deletePrediction, {
    onMutate: (id) => {
      
    },
    onError: () => {
      // If there's an error, you can display an error toast
      toast.error("Error deleting prediction");
    },
    onSettled: () => {
      // When the mutation is completed (either success or failure), you can refetch the predictions
      queryClient.invalidateQueries("predictions");
    },
  });

  /*if (!predictions.length) {
    return (
      <>
        <div className="flex justify-center items-center">
          <i className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24 fa-solid fa-spinner"></i>{" "}
          
        </div>
      </>
    );
  }*/
  return (
    <div className="max-w-screen-lg mx-auto mb-4">
      <div className="overflow-x-auto">
        {predictions.length > 0 && (
          <table className="w-full table-auto border-collapse text-black">
            
            <thead>
              <tr className="bg-gray-200">
                {/* ... Table headers ... */}
                <th>Competition</th>
                <th>Game</th>
                <th>Tip</th>
                <th>Odd</th>
                <th>Result</th>
                <th></th>

                {isAdmin && <th>Actions</th>}
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
                  <td className="border-b border-gray-300 py-2 px-4">
                    {prediction.status !== "pending" &&
                      (prediction.status === "won" ? (
                        <VscCheck className="w-5 h-5 text-green-500" />
                      ) : (
                        <VscChromeClose className=" w-5 h-5 text-red-500" />
                      ))}
                  </td>
                  {isAdmin && (
                    <td className="border-b border-gray-300 py-2 px-4 space-y-5">
                      {/* Provide a link for editing the prediction */}

                      <Link
                        href="/admin/all-predictions/edit-prediction/[id]"
                        as={`/admin/all-predictions/edit-prediction/${prediction._id}`}
                      >
                        <button className="bg-blue-500 text-white p-1 px-2  rounded-lg mr-2">
                          Edit
                        </button>
                      </Link>
                      {/* Add a button to delete the prediction */}
                      <button
                        onClick={() => handleDelete.mutate(prediction._id)}
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
        )}
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

export default Predictions;
