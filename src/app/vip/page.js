"use client";
import React from "react";
import Predictions from "../components/predictions"; // Import the Predictions component
import { usePredictions } from "../context/predictionContext";
import Pagination from "../components/pagination";
import SearchBar from "../components/searchBar";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { useQuery } from "react-query";

function HomePage() {
  const { predictions } = usePredictions(); // Access predictions from context
  const { user, fetchUserData } = useAuth();
  // Filter the predictions based on the isVIP flag
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery("userData", () => fetchUserData(user), {
    retry: false,
    enabled: !!user,
  });

  const subscription = userData?.subscriptions[0];

  const vipPredictions = predictions.filter(
    (prediction) => prediction.isVIP === true
  );
console.log(vipPredictions)

  if (!user) {
    return (
      <div className="container mx-auto py-4">
       
        <div
          className="max-h-screen overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {isLoading ? (
            // Render a loading indicator while data is loading
            <p className="flex justify-center w-full mx-auto p-6">
              Loading predictions...
            </p>
          ) : (
            // Render predictions once data has loaded
            <div>
              <Predictions predictions={vipPredictions} />
            </div>
          )}
        </div>

        <Pagination />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      {subscription ? (
        <>
          <SearchBar />
          <div>
            <Predictions predictions={vipPredictions} />
          </div>
          <Pagination />
        </>
      ) : (
        <>
          <p className="mt-4">You are currently not subscribed to any plan.</p>
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
        </>
      )}
    </div>
  );
}

export default HomePage;
