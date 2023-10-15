"use client";

import React from "react";
import { AuthProvider } from "../context/authContext";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default AdminLayout;
