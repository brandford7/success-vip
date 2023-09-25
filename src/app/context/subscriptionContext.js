import { createContext, useContext } from "react";
import axios from "axios";

const SubscriptionsContext = createContext();

export const useSubscriptions = () => {
  return useContext(SubscriptionsContext);
};

export const SubscriptionsProvider = ({ children }) => {
  // Your API base URL
  const BASE_URL = "https://success-secrets-bet-api.onrender.com/api/v1";

  // Function to fetch plans
const fetchPlans = async () => {
  if (!user) {
    throw new Error("User is not authenticated");
  }

  const response = await axios.get(`${BASE_URL}/subscriptions/plans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


  // Function to initialize a transaction with a plan
  const initializeTransactionWithPlan = async (planCode) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.post(
      `${BASE_URL}/subscriptions/initialize-transaction`,
      {
        plan: planCode,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  // Function to create a subscription
  const createSubscription = async (planCode) => {
    const response = await axios.post(`${BASE_URL}/subscriptions/create`, {
      plan: planCode,
    });
    return response.data;
  };

  // Function to update payment method
  const updatePaymentMethod = async (paymentMethodId) => {
    const response = await axios.post(
      `${BASE_URL}/subscriptions/update-payment-method`,
      {
        payment_method: paymentMethodId,
      }
    );
    return response.data;
  };

  // Other subscription-related functions can be added here

  const subscriptionsContextValue = {
    fetchPlans,
    initializeTransactionWithPlan,
    createSubscription,
    updatePaymentMethod,
    // Add other functions here
  };

  return (
    <SubscriptionsContext.Provider value={subscriptionsContextValue}>
      {children}
    </SubscriptionsContext.Provider>
  );
};
