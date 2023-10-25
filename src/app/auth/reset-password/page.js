"use client";
import {useState} from 'react'
import { useAuth } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setIsLoading(true);

    const success = await forgotPassword(email);

    setIsLoading(false);

    if (success) {
      toast.success("Password reset email sent successfully", {
        position: "top-right",
        autoClose: 2000, // Close the notification after 3 seconds
      });
    } else {
      // Handle failure
      toast.error("Password reset request failed. Please try again.", {
        position: "top-right",
        autoClose: 3000, // Close the notification after 3 seconds
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        />
        <button
          onClick={handleForgotPassword}
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
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
    </div>
  );
};

export default ResetPassword;
