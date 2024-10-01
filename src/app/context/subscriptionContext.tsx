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


  // Function to fetch plans (No authentication required)
  const fetchPlans = async () => {
    const response = await axiosInstance.get(`/subscriptions/plans`);
    return response.data;
  };

  const cancelSubscription = async (paymentMethodId) => {
    const response = await axios.post(`/subscriptions/cancel-subscription`, {
      code,
      token,
    });
    return response.data;
  };

  const subscriptionsContextValue = {
    fetchPlans,
    cancelSubscription,
  };

  return (
    <SubscriptionsContext.Provider value={subscriptionsContextValue}>
      {children}
    </SubscriptionsContext.Provider>
  );
};
