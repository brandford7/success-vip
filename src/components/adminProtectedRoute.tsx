import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext"; // Assuming your AuthContext is in this path
import { useRouter } from "next/navigation";

interface RoleProtectedProps {
  allowedRoles: string[]; // Array of roles allowed to access the route
  children: React.ReactNode;
}

const RoleProtectedRoute = ({ allowedRoles, children }: RoleProtectedProps) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if the user is not authenticated
      router.push("/login");
      return;
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Redirect to a "not authorized" page if the user does not have the required role
      router.push("/not-authorized");
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    // Render nothing while redirecting
    return null;
  }

  // Render the children if the user is authenticated and has the required role
  return <>{children}</>;
};

export default RoleProtectedRoute;
