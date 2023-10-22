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
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword} disabled={isLoading}>
        {isLoading ? "Sending..." : "Forgot Password"}
      </button>
      <ToastContainer // Add the ToastContainer
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

export default ResetPassword;
