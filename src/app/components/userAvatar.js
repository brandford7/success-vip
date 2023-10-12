import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { VscChevronDown } from "react-icons/vsc";

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
    <div className="relative inline-block ">
      <div className="flex items-center space-x-2 cursor-pointer">
        <p className="text-white px-4">Welcome, {user.name}</p>
        <div onClick={toggleDropdown}>
          <VscChevronDown className=" rounded-full w-10 h-10 text-black" />{" "}
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <ul className="text-black">
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
