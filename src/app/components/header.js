'use client'

import Link from "next/link";
import { useAuth } from "../context/authContext"; // Import your auth context
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth(); // Use your authentication context here.
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold px-5">
          Success Secrets VIP
        </Link>
        <nav className="hidden md:flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/vip" className="text-white">
                VIP
              </Link>
            </li>
          </ul>
        </nav>
        {user ? (
          <div className="flex items-center space-x-4">
            <p className="text-white">{user.name}</p>
            <img
              src={user.avatarUrl || "/default-avatar.png"} // Use the user's avatar URL or a default image
              alt={`${user.name}'s Avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        ) : (
          <Link href="/login" className="text-white">
            Login
          </Link>
        )}
        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            className="text-white p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-500 w-full">
          <ul className="p-4 space-y-4">
            <li>
              <Link href="/vip" className="text-white">
                VIP Predictions
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
