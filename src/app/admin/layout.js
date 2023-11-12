"use client";

import React from "react";
import { AuthProvider } from "../context/authContext";
import {BsChevronLeft} from 'react-icons/bs'
import {useRouter} from 'next/navigation'

export const metadata = {
  title: "Success Secrets Bet",
  description: "The Home Of Betting Tips",
};


const AdminLayout = ({ children }) => {

const router = useRouter()

  const goBack = () => {
  router.back()
}

  return (
    <>
      <AuthProvider>
        <button onClick={goBack} className='p-5'><BsChevronLeft/></button>
        {children}
      </AuthProvider>
    </>
  );
};

export default AdminLayout;
