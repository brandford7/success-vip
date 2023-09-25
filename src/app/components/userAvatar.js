import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Link from "next/link";

const UserAvatar = () => {
  const { user, logout } = useAuth(); // Use your authentication context here.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="text-white">Welcome, {user.username}</p>
        <img
          src={user?.avatarUrl || "/default-avatar.jpg text-gray-500"} // Use the user's avatar URL or a default image
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <ul>
            {user.role === "admin" && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={closeDropdown} // Close the dropdown when the link is clicked
              >
                <Link href="/admin">Admin</Link>
              </li>
            )}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={closeDropdown} // Close the dropdown when the link is clicked
            >
              <Link href="/account">Account</Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                logout();
                closeDropdown(); // Close the dropdown after logout
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
