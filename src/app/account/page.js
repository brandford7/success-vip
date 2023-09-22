// components/AccountPage.js
'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

const AccountPage = () => {
  const { user } = useAuth(); // Get the authenticated user from your context
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make an HTTP GET request to the user profile API using the user's ID
        const response = await axios.get(
          `https://success-secrets-bet-api.onrender.com/api/v1/users/profile`
        );

        if (response.status === 200) {
          // Set the user data to state
          setUserData(response.data);
        } else {
          // Handle error here
        }
      } catch (error) {
        // Handle error here
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-3xl font-semibold">Account Page</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user details */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default AccountPage;
