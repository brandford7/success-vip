"use client";
import { useMutation, useQuery } from "react-query";
import { useSubscriptions } from "../context/subscriptionContext";
import { useAuth } from "../context/authContext";
import { axiosInstance } from "../../../config";

const PlansPage = () => {
  const { fetchPlans } = useSubscriptions();
  const { user } = useAuth();
  const userEmail = user ? user.email : "";

 

  const signUpForPlanMutation = useMutation(async (planCode) => {
    const { data } = await axiosInstance.post(
      "/subscriptions/initialize-transaction-with-plan",
      {
        email: userEmail,
        amount: 50.0, // Change this to your desired amount
        plan: planCode,
      }
    );

    if (data.authorization_url) {
      console.log("Authorization URL:", data.authorization_url);
      // Redirect to the authorization URL
      window.location.href = data.authorization_url;
    } else {
      console.error("Error initializing transaction");
    }
  });

  const { data: plansData, isLoading } = useQuery("plans", fetchPlans, {
    retry: false,
  });

  console.log(plansData);

  const handleSubscribe = (planCode) => {
    signUpForPlanMutation.mutate(planCode);
  };

  return (
    <div className="grid grid-cols-1  place-items-center l gap-4 ">
      <h2 className="text-lg font-bold">Subscribe to a Plan</h2>
      {isLoading && <p>Loading....</p>}
      {plansData &&
        plansData.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col bg-white rounded-lg shadow-lg items-center p-5"
            style={{ maxWidth: "300px" }} // Adjust the max-width as needed
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">
              Amount: {plan.amount} {plan.currency}
            </p>
            <button
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
              onClick={() => handleSubscribe(plan.plan_code)}
            >
              Subscribe
            </button>
          </div>
        ))}
    </div>
  );
};

export default PlansPage;
