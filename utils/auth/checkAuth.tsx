import Loading from "@/app/loading";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return <Loading />;

  return <div>{children}</div>;
};

export default CheckAuth;
