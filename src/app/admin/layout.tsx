"use client";

import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Head from "next/head";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="admin overflow-x-hidden ">
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
  );
};

export default AdminLayout;
