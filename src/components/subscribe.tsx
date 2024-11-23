"use client";

import ProtectedRoute from "@/components/protectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PaystackConsumer } from "react-paystack";
import { checkVipSubscription } from "../../utils/subscription/actions";

const Subscribe = () => {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const router = useRouter();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

  const amount = {
    daily: 5000,
    seasonal: 50000,
  };

  const currency = "GHS";

  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    router.push("/vip");
  };

  const onClose = () => {
    // implementation for whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const dailyConfig = {
    reference: new Date().getTime().toString(),
    email: user?.email as string,
    amount: amount.daily,
    currency,
    publicKey: publicKey,
    firstname: user?.firstName,
    //lastname,
  };

  const dailyComponentProps = {
    ...dailyConfig,
    onSuccess,
    text: "Paystack Button Implementation",
  };

  function generateTransactionReference(): string {
    const timestamp = new Date().getTime().toString(); // Current timestamp
    const random = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit random number
    return `TX-${timestamp}-${random}`;
  }

  const seasonalConfig = {
    reference: generateTransactionReference(),
    email: user?.email as string,
    amount: amount.seasonal,
    currency,
    publicKey: publicKey,
    firstname: user?.firstName,
    //lastname,
  };

  const seasonalComponentProps = {
    ...seasonalConfig,
    onSuccess,
    text: "Paystack Button Implementation (Seasonal)",
  };


  //check if user already has access to vip when the visit subscribe page
 
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
    }, [user?.customerId, user?.role]);

   if (hasAccess ) {
     router.push('/vip'); // Show a loading indicator while checking
   }


  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col space-y-5 items-center justify-center">
        <PaystackConsumer {...dailyComponentProps}>
          {({ initializePayment }) => {
            return (
              <div>
                <Button
                  onClick={() => initializePayment({ onSuccess, onClose })}
                >
                  Pay GHS50 for daily
                </Button>
              </div>
            );
          }}
        </PaystackConsumer>
        <PaystackConsumer {...seasonalComponentProps}>
          {({ initializePayment }) => {
            return (
              <Button onClick={() => initializePayment({ onSuccess, onClose })}>
                Pay GHS500 for seasonal
              </Button>
            );
          }}
        </PaystackConsumer>
      </div>
    </ProtectedRoute>
  );
};

export default Subscribe;
