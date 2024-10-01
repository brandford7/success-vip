"use client";
import { useEffect, useState } from "react";
import Predictions from "../components/predictions";
import { usePredictions } from "../context/predictionContext";
import Pagination from "../components/predictionPagination";
import SearchBar from "../components/searchBar";
import { useAuth } from "../context/authContext";

import Link from "next/link";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../config";
// Import your axios instance

const VIPPage = () => {
  const { predictions } = usePredictions();
  const { user, getUserProfile } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    data: userData,
    // isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery("userData", () => getUserProfile(), {
    retry: false,
    enabled: !!user,
  });

  const customer_id = userData?.customer.customerId;

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
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
          setSubscriptions(response.data);
        } else {
          console.error(`Error fetching subscriptions: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error during fetchSubscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [customer_id]);

  let subscription = subscriptions[0];

  // Check if the user is subscribed to VIP predictions
  /*const isSubscribedToVIP = subscriptions.some(
    (subscription) => subscription.productName === "VIP Predictions"
  );
*/
  const vipPredictions = predictions.filter(
    (prediction) => prediction.isVIP === true
  );

  if (!user) {
    return (
      <div className="container mx-auto px-4">
        <div
          className="max-h-screen overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {isLoading ? (
            <p className="flex justify-center w-full mx-auto p-6">
              Loading predictions...
            </p>
          ) : (
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
      {subscription &&
      subscription.customer.id === userData.customer.customerId ? (
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
};

export default VIPPage;
