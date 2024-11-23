"use client";

import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { checkVipSubscription } from "../../utils/subscription/actions";
import Link from "next/link";
import Loading from "@/app/loading";
import Hero from "./hero";
import PredictionsTable from "./predictions";
import { PredictionType } from "../../utils/types";

export default function VipContent({
  predictions,
}: {
  predictions: PredictionType[] | null;
}) {
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
        <h2>You do not have access to VIP tips</h2>
        <Link href="/subscribe">Kindly click to Subscribe </Link>
      </div>
    );
  }

  return (
    <div>
      {/*  <SearchBar placeholder={"search prediction"} />*/}
      {/*    <Filter />*/}
      <Hero />
      <Suspense fallback={<Loading />}>
        <PredictionsTable
          predictions={predictions}
          header="Free Predictions" currentPage={0} search={""}        
        />
      </Suspense>
    </div>
  );
}
