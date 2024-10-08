"use client";
import React from "react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Admin Dashboard
        </h1>
        <div className="space-y-2">
          <Link
            href="/admin/users"
            className="block bg-primary text-primary-foreground p-3 rounded hover:bg-muted-foreground text-center"
          >
            All Users
          </Link>
          <Link
            href="/admin/users/add-user"
            className="block bg-primary text-primary-foreground p-3 rounded hover:bg-muted-foreground text-center"
          >
            Add User
          </Link>
          <Link
            href="/admin/post-prediction"
            className="block bg-primary text-primary-foreground p-3 rounded hover:bg-muted-foreground text-center"
          >
            Post Prediction
          </Link>

          <Link
            href="/admin/all-predictions"
            className="block bg-primary text-primary-foreground p-3 rounded hover:bg-muted-foreground text-center"
          >
            All Predictions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
