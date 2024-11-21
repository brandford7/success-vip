"use client";

import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Head from "next/head";
import RoleProtectedRoute from "@/components/adminProtectedRoute";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <RoleProtectedRoute allowedRoles={["admin"]}>
      <div className="admin overflow-x-hidden max-w-full ">
        <Head>
          <title>Admin</title>
          <meta name="description" content="Admin Page" />
        </Head>

        {/* Ensure button is always rendered */}
        <button type="button" onClick={goBack} className="p-5">
          <BsChevronLeft />
        </button>

        {/* Render children consistently */}
        <div>{children}</div>
      </div>
    </RoleProtectedRoute>
  );
};

export default AdminLayout;
