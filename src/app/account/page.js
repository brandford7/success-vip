"use client";

import React from "react";
import { useQuery } from "react-query";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { useSubscriptions } from "../context/subscriptionContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const AccountPage = () => {
  const { user, fetchUserData } = useAuth();
  const { cancelSubscription } = useSubscriptions();
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery("userData", () => fetchUserData(user), {
    retry: false,
    enabled: !!user,
  });

  // Extract subscriptions from the user data
  const subscription = userData?.subscriptions[0];

  return (
    <div className="container mx-auto mt-10 px-4 space-y-5">
      <h2 className="text-3xl font-semibold mb-4">Account Dashboard</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        {isLoading && <p className="text-gray-600">Loading user data...</p>}
        {isError && <p className="text-red-600">Error loading user data</p>}
        {userData && (
          <>
            <p className="text-lg">
              Hi {userData.username}, welcome to your account dashboard!
            </p>
            {subscription ? (
              <section className="space-y-5">
                <p className="mt-4 font-bold">
                  You are currently on the {subscription.plan.name} plan
                </p>
                <p className="font-bold">
                  Status: <span className="text-green-500">{subscription.status}</span>
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
                  <Link href="/plans">
                    <a className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 text-center">
                      Explore Plans
                    </a>
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
