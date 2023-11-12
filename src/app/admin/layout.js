'use client'

import React from "react";
import { AuthProvider } from "../context/authContext";
import {BsChevronLeft} from 'react-icons/bs'
import {useRouter} from 'next/navigation'

/*
export const metadata = {
  title: "Admin",
  description: "Admin Page",
}; */


const AdminLayout = ({ children }) => {

const router = useRouter()

  const goBack = () => {
  router.back()
}

  return (
    <>
      <head>
        <title>Admin</title>
        <meta
          name="description"
          content="Admin Page"
        />
      </head>
      <AuthProvider>
        <button onClick={goBack} className="p-5">
          <BsChevronLeft />
        </button>
        {children}
      </AuthProvider>
    </>
  );
};

export default AdminLayout;
