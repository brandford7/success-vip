import { useEffect, useState } from "react";

export default function Account() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from your backend API here and set it in the state
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Handle error
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCancelSubscription = async () => {
    try {
      // Send a request to cancel the subscription to your backend API
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
      });

      if (response.ok) {
        // Subscription canceled successfully, update the user interface
        setUserData((prevData) => ({
          ...prevData,
          isSubscribed: false,
        }));
      } else {
        // Handle error
        console.error("Error canceling subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    // Implement the logic to update the payment method here
    // This may involve showing a payment method update form or modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">User Account</h1>
      {userData ? (
        <div className="lg:flex">
          <div className="lg:w-1/2">{/* Display user details */}</div>
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h2 className="text-xl font-semibold mb-2">Subscription Status</h2>
            {userData.isSubscribed ? (
              <>
                <p>You are subscribed to the premium plan.</p>
                <button
                  className="mt-2 bg-red-500 text-white rounded px-4 py-2"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </button>
              </>
            ) : (
              <>
                <p>You are not currently subscribed.</p>
                <button
                  className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                  onClick={handleUpdatePaymentMethod}
                >
                  Update Payment Method
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
