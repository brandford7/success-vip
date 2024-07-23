"use client";

import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Providers from "../providers";

/*
export const metadata = {
  title: "Admin",
  description: "Admin Page",
}; */

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="admin" suppressHydrationWarning>
      <head>
        <title>Admin</title>
        <meta name="description" content="Admin Page" />
      </head>
      <Providers>
        <button onClick={goBack} className="p-5">
          <BsChevronLeft />
        </button>
        {children}
      </Providers>
    </div>
  );
};

export default AdminLayout;
