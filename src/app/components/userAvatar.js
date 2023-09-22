import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Link from "next/link";

const UserAvatar = () => {
  const { user, logout } = useAuth(); // Use your authentication context here.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(user)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="text-white">{user.username}</p>
        <img
          src={user.avatarUrl || "/default-avatar.png"} // Use the user's avatar URL or a default image
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <ul>
            {user.role === "admin" && (
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link href="/admin">Admin</Link>
              </li>
            )}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/account">Account</Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={logout}
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
