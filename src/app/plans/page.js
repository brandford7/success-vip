'use client'
import React from "react";
import { useSubscriptions } from "../context/subscriptionContext";
import { useAuth } from "../context/authContext";
import { useQuery } from "react-query";
import { useMutation, queryCache } from "react-query";
import { useRouter } from "next/navigation";

const PlansPage = () => {
  const { fetchPlans } = useSubscriptions();
  const { user } = useAuth();
  const userEmail = user ? user.email : "";
  //const router = useRouter();

  const subscribeToPlan = async (email, planCode) => {
    const response = await fetch(
      "https://success-secrets-bet-api.onrender.com/api/v1/subscriptions/initialize-transaction-with-plan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: 50000, // Change this to your desired amount
          plan: planCode,
        }),
      }
    );

    if (!response.ok) {
      console.error("Error initializing transaction");
      return;
    }

    // Update the subscriptions data in the cache after successful subscription
  //  queryCache.invalidateQueries("plans");
  //  router.push("/subscriptions"); // Redirect to subscriptions page or another appropriate page
  };

  const {
    data: plansData,
    isLoading: plansLoading,
    isError: plansError,
  } = useQuery("plans", fetchPlans, {
    retry: false,
  });

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-4">Choose a Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plansLoading ? (
          <p>Loading plans...</p>
        ) : plansError ? (
          <p>Error fetching plans</p>
        ) : (
          plansData &&
          plansData.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">
                Amount: {plan.amount} {plan.currency}
              </p>
              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                onClick={() => subscribeToPlan(userEmail, plan.plan_code)}
              >
                Subscribe
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlansPage;
