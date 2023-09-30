"use client";
import { createContext, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../../../config";

const SubscriptionsContext = createContext();

export const useSubscriptions = () => {
  return useContext(SubscriptionsContext);
};

export const SubscriptionsProvider = ({ children }) => {
  // Your API base URL

  const router = useRouter();

  // Function to fetch plans (No authentication required)
  const fetchPlans = async () => {
    const response = await axiosInstance.get(`/subscriptions/plans`);
    return response.data;
  };

  // Function to create a subscription
  const createSubscription = async (planCode) => {
    const response = await axios.post(`/subscriptions/create`, {
      plan: planCode,
    });
    return response.data;
  };

  const fetchUserSubscriptions = async () => {
    try {
      // Get user and token from local storage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.token) {
        throw new Error("User is not authenticated or token is missing");
      }

      const response = await axiosInstance.get(`/subscriptions/subscription`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
      throw error;
    }
  };

  // Function to update payment method
  const updatePaymentMethod = async (paymentMethodId) => {
    const response = await axios.get(`/subscriptions/update-payment-method`, {
      payment_method: paymentMethodId,
    });
    return response.data;
  };

  const cancelSubscription = async (paymentMethodId) => {
    const response = await axios.post(`/subscriptions/cancel-subscription`, {
     code,token
    });
    return response.data;
  };

  const subscriptionsContextValue = {
    fetchPlans,
    createSubscription,
    cancelSubscription,
    updatePaymentMethod,
    fetchUserSubscriptions,
  };

  return (
    <SubscriptionsContext.Provider value={subscriptionsContextValue}>
      {children}
    </SubscriptionsContext.Provider>
  );
};
