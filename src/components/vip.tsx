"use client";

import { useEffect, useState, useContext } from "react";
import { useAuth } from "@/context/authContext"; // Path to your auth context
import { checkVipAccess } from "../../utils/subscription/checkPayment";
import { checkVipSubscription } from "../../utils/subscription/actions";

export default function VipContent() {
  const { user } = useAuth(); // Get user data from auth context
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user?.customerId) {
      setHasAccess(false);

      return;
      }
      
      console.log(user?.customerId);
      

    async function verifyAccess() {
      const isSubscribed = await checkVipSubscription(user?.customerId);
      setHasAccess(isSubscribed);
    }

    verifyAccess();
  }, [user?.customerId]);

  if (hasAccess === null) {
    return <p>Loading...</p>; // Show a loading indicator while checking
  }

  if (!hasAccess) {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You do not have a valid subscription to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome to the VIP Section!</h2>
      <p>Your exclusive content goes here.</p>
    </div>
  );
}
