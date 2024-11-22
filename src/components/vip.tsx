"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { checkVipSubscription } from "../../utils/subscription/actions";

export default function VipContent() {
  const { user } = useAuth(); // Get user data from auth context
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user?.customerId) {
      setHasAccess(false);

      return;
    }

    async function verifyAccess() {
      const isSubscribed =
        (await checkVipSubscription(user?.customerId)) ||
        user?.role === "admin";
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
