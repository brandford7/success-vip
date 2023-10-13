"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import UserAvatar from "./userAvatar";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    closeMenu();
  };

  return (
    <header className="bg-blue-500 py-5 px-5">
      <div className="container mx-auto flex justify-between items-center px-5 ">
        <Link href="/" className="text-white text-2xl font-bold px-5">
          Success Secrets Bet VIP
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <ul className="flex space-x-5">
            <li onClick={handleMenuItemClick}>
              <Link href="/vip">
                <span className="text-white cursor-pointer">VIP</span>
              </Link>
            </li>

            <li>
              <a
                href="https://x.com/successsecretbet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-black"
              >
                <FaSquareXTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://t.me/Successsecretbet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-blue-800"
              >
                <FaTelegram size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@successsecretbet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-red-500"
              >
                <FaYoutube size={24} />
              </a>
            </li>
          </ul>
        </div>
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
        {user?.name !== '' ? 
          <UserAvatar />
         : (
          <Link href="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden fixed inset-0 bg-blue-500 w-70vw h-screen flex flex-col justify-center text-white z-10 transform transition-transform duration-300 ease-in-out">
          <ul className="p-4 space-y-4 text-white text-center">
            <li onClick={handleMenuItemClick}>
              <Link href="/vip">
                <span className="text-white cursor-pointer text-2xl">
                  VIP Predictions
                </span>
              </Link>
            </li>

            <li>
              <a
                href="https://x.com/successsecretbet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-black"
                onClick={closeMenu}
              >
                <FaSquareXTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://t.me/Successsecretbet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-blue-900"
                onClick={closeMenu}
              >
                <FaTelegram size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@successsecretbet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-red-500"
                onClick={closeMenu}
              >
                <FaYoutube size={24} />
              </a>
            </li>

            {user?.name !== '' && (
              <li>
                <UserAvatar />
              </li>
            )}
          </ul>
          <button
            className="text-white p-2 absolute top-4 right-4 focus:outline-none"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
