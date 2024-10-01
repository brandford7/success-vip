import React, { useState } from "react";

import Link from "next/link";
import { VscChevronDown } from "react-icons/vsc";
import { useAuth } from "@/app/context/authContext";

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
        className="flex flex-col items-center space-x-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div>
          <VscChevronDown className="rounded-full w-5 h-5 text-black" />
        </div>
      </div>

      {isDropdownOpen && (
        <div className=" mt-2 w-40 bg-white border rounded-lg shadow-lg">
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
              className="px-4 py-2 hover-bg-gray-100 cursor-pointer"
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
