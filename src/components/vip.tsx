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
      const isSubscribed = await checkVipSubscription(
        user?.customerId,
        user?.role
      );
      setHasAccess(isSubscribed);
    }


    verifyAccess();
  }, [user?.customerId, user?.role]);

  if (!hasAccess) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p>You do not have access to VIP tips</p>

        <Link href="/subscribe" className="text-blue-500">
          Kindly Subscribe
        </Link>
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
          header="VIP Predictions"
          currentPage={0}
          search={""}
        />
      </Suspense>
    </div>
  );
}
