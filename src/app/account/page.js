// AccountPage.js
"use client";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useQuery, useMutation } from "react-query";
import Link from "next/link";

const AccountPage = () => {
  const { user, fetchUserData, editUserField } = useAuth();
  

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery("userData", fetchUserData, {
    enabled: !!user,
    retry: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState("");
  const [editedValue, setEditedValue] = useState("");

  const { mutateAsync: editUserFieldMutation } = useMutation(editUserField, {
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const handleEditClick = (field) => {
    setIsEditing(true);
    setEditedField(field);
    setEditedValue(userData[field]);
  };

  const handleSaveClick = async () => {
    if (editedField && editedValue) {
      await editUserFieldMutation(editedField, editedValue);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Account Page</h2>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : isError ? (
        <p>Error fetching user data</p>
      ) : (
        userData && (
          <div>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              {isEditing && editedField === "email" ? (
                <input
                  type="text"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  className="border rounded p-1 mr-2"
                />
              ) : (
                userData.email
              )}
              {!isEditing && (
                <button
                  onClick={() => handleEditClick("email")}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              )}
            </p>
            <p className="mb-2">
              <strong>Username:</strong>{" "}
              {isEditing && editedField === "username" ? (
                <input
                  type="text"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  className="border rounded p-1 mr-2"
                />
              ) : (
                userData.username
              )}
              {!isEditing && (
                <button
                  onClick={() => handleEditClick("username")}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              )}
            </p>
            <p className="mb-2">
              <strong>Password:</strong>{" "}
              {isEditing && editedField === "password" ? (
                <input
                  type="password"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  className="border rounded p-1 mr-2"
                />
              ) : (
                "********"
              )}
              {!isEditing && (
                <button
                  onClick={() => handleEditClick("password")}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              )}
            </p>
            <p className="mb-2">
              <strong>Subscribed:</strong>{" "}
              {userData.isSubscribed ? "Yes" : "No"}
            </p>
            {userData.subscriptions.length > 0 ? (
              <div>
                <h3 className="font-semibold mb-2">Subscriptions:</h3>
                <ul>
                  {fetchUserSubscriptions.map((subscription, index) => (
                    <li key={index}>
                      {/* Render subscription details here */}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p>No subscriptions found.</p>
                <Link href='/plans'>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
                    Explore Plans
                  </button>
                </Link>
              </div>
            )}
            {isEditing && (
              <div className="mt-2">
                <button
                  onClick={handleSaveClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default AccountPage;
