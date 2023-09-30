'use client'

import React from "react";
import { useQuery } from "react-query";
import { useAuth } from "../context/authContext";
import Link from "next/link";

const AccountPage = () => {
  const { user, fetchUserData } = useAuth();

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
    <div className="container mx-auto mt-10 px-4">
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
              <>
                <p className="mt-4">
                  You are currently on the {subscription.plan.name} plan
                </p>
                <p>Status: {subscription.status}</p>
                <p>Subscription Code: {subscription.subscription_code}</p>
                <p>
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
                <a
                  href={`https://success-secrets-bet-api.onrender.com/api/v1//update-payment-method?subscription_code=${subscription.subscription_code}`}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Manage subscription
                </a>
              </>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
