"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { useSubscriptions } from "../context/subscriptionContext";

import { axiosInstance } from "../../../config";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const AccountPage = () => {
  const { user, getUserProfile } = useAuth();
  const { cancelSubscription } = useSubscriptions();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let token = null;

  if (typeof window !== "undefined") {
    // Check if we are in a browser environment
    token = localStorage.getItem("token");
  }

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery("userData", () => getUserProfile(), {
    retry: false,
    enabled: !!user,
  });

  const customer_id = userData?.customer.customerId;

  useEffect(() => {
    // Function to fetch subscriptions
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle case where token is missing or expired
          console.error("Token is missing or expired");
          return;
        }

        const response = await axiosInstance.get(
          `/subscriptions/subscription?customer=${customer_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Successfully fetched subscriptions
          setSubscriptions(response.data);
        } else {
          // Handle other status codes (e.g., 401 for unauthorized)
          console.error(`Error fetching subscriptions: ${response.statusText}`);
        }
      } catch (error) {
        // Handle network errors and other errors
        console.error("Error during fetchSubscriptions:", error);
      } finally {
        // Set loading to false, whether successful or not
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [customer_id]);
  let subscription = subscriptions[0];

  console.log(userData);

  return (
    <div className="h-screen container mx-auto mt-10 px-4 space-y-5">
      <h2 className="text-3xl font-semibold mb-4">Account Dashboard</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        {isLoading && <p className="text-gray-600">Loading user data...</p>}
        {isError && (
          <p className="text-red-600">Error loading user data, Please Log in</p>
        )}
        {userData && (
          <>
            <p className="text-lg">
              Hi {userData.username}, welcome to your account dashboard!
            </p>
            {subscription &&
            subscription.customer.id === userData.customer.customerId ? (
              <section className="space-y-5">
                <p className="mt-4 font-bold">
                  You are currently on the {subscription.plan.name} plan
                </p>
                <p className="font-bold">
                  Status:
                  <span className="text-green-500">{subscription.status}</span>
                </p>
                <p className="font-bold">
                  Subscription Code: {subscription.subscription_code}
                </p>
                <p className="font-bold">
                  Card on file: {subscription.authorization.brand} card ending
                  in {subscription.authorization.last4} expires on{" "}
                  {subscription.authorization.exp_month}/
                  {subscription.authorization.exp_year}
                </p>
                <p>
                  Next payment date:{" "}
                  {new Date(
                    subscription.next_payment_date
                  ).toLocaleDateString()}
                </p>
                <div className="flex flex-col">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={`${BASE_URL}/subscriptions/update-payment-method?subscription_code=${subscription.subscription_code}" target="_blank`}
                  >
                    Manage subscription
                  </Link>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() =>
                      cancelSubscription(
                        subscription.subscription_code,
                        subscription.subscription_code
                      )
                    }
                  >
                    Cancel subscription
                  </button>
                </div>
              </section>
            ) : (
              <section className="space-y-5">
                <p className="mt-4">
                  You are currently not subscribed to any plan.
                </p>
                <p className="mt-2">
                  To get started, explore our subscription plans:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <Link
                    href="/plans"
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 text-center"
                  >
                    Explore Plans
                  </Link>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
