'use client'
import React, { useContext } from "react";
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
  const userSubscriptions = userData?.subscriptions[0] || [];



  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-4">Account Dashboard</h2>
      {isLoading && <p>Loading user data...</p>}
      {isError && <p>Error loading user data</p>}
      {userData && (
        <>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <p>Hi {userData.username}</p>
            {userSubscriptions.length > 0 ? (
              <>
                <p>You are currently subscribed to:</p>
                <ul>
                  {userSubscriptions.map((subscription) => (
                    <li key={subscription.id}>
                      {subscription.name} - {subscription.plan.name}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p>You are currently not subscribed to any plan.</p>
                <p>Select a plan below to subscribe:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href='/plans' className="hover:text-blue-500">Explore plans</Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountPage;
