"use client";

import ProtectedRoute from "@/components/protectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { PaystackConsumer } from "react-paystack";

const SubscriptionPage = () => {
  const [isClient, setIsClient] = useState(false); // to track if we are on the client side
  const { user } = useAuth();
  const publicKey = (process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    "") as string;

  const amount = {
    daily: 5000,
    seasonal: 50000,
  };

  const currency = "GHS";

  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log("reference");
  };

  const onClose = () => {
    // implementation for whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  // Only set isClient to true after the component has mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner if you prefer
  }

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
    text: "Paystack Button Implementation (Seasonal)",
  };

  /* if (user?.role !== "admin") {
   return (
     <div>
       You do not have access to this page.
       <Link href=''>
         
         <Button>Please Subscribe</Button>
       </Link>
     </div>
   );
 }*/
  console.log(user?.customerId);

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

export default SubscriptionPage;
