"use client";

import React from "react";
import { useAuth } from "../context/authContext";
import { useSubscriptions } from "../context/subscriptionContext";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

const PlansPage = () => {
  const { user } = useAuth();
  const { fetchPlans, initializeTransactionWithPlan } = useSubscriptions();
  const router = useRouter();

  const {
    data: plans,
    isLoading,
    isError,
  } = useQuery("plans", fetchPlans, {
    retry: false,
  });

  const handleSignUpForPlan = async (planCode) => {
    try {
      if (!user) {
        // Redirect to login if user is not authenticated
        router.push("/login");
        return;
      }

      const { authorization_url } = await initializeTransactionWithPlan(
        planCode
      );

      // Redirect to the payment page
      router.push(authorization_url);
    } catch (error) {
      console.error("Error signing up for plan:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Subscription Plans</h2>
      {isLoading ? (
        <p>Loading plans...</p>
      ) : isError ? (
        <p>Error fetching plans</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border p-4 rounded shadow-lg transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-gray-500 mb-2">
                {plan.currency} {plan.amount / 100} / {plan.interval}
              </p>
              <p className="text-gray-500 mb-2">
                Invoice Limit: {plan.invoice_limit}
              </p>
              <button
                onClick={() => handleSignUpForPlan(plan.plan_code)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlansPage;
