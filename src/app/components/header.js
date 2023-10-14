import { useState } from "react";
import Link from "next/link";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import UserAvatar from "./userAvatar";
import { useAuth } from "../context/authContext";
import Image from "next/image";

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
    <header className="bg-blue-500 py-5 md:py-10">
      <div className="container mx-auto flex justify-between items-center px-5">
        {user?.name !== "" ? (
          <div className="flex items-center absolute top-1 right-5">
            <div className="flex items-center space-x-2">
              <p className="text-white">{`Welcome, ${user.name}`}</p>
              <UserAvatar />{" "}
            </div>
          </div>
        ) : (
          <Link href="/login">
            {" "}
            <p className="flex items-center absolute right-10 text-white">
              Login
            </p>
          </Link>
        )}

        <Link
          href="/"
          className="flex items-center  absolute top-1 left-5 pb-5 space-x-2"
        >
          <h1 className="hidden md:inline-block text-white text-2xl font-bold">
            Success Secrets Bet
          </h1>
          <Image
            src="/success-image.webp"
            alt="success secrets bet"
            width="30"
            height="30"
            className="rounded-full"
          />
        </Link>

        <div className="hidden md:flex space-x-4 items-center mx-auto ">
          <ul className="flex space-x-5">
            <li onClick={handleMenuItemClick}>
              <Link href="/vip">
                <span className="text-white cursor-pointer">VIP</span>
              </Link>
            </li>

            <li>
              <a
                href="https://x.com/successecretbet"
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
        <div className="md:hidden text-center mx-auto">
          <button
            className="text-white py-5 px-20 focus:outline-none"
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

            {user?.name !== "" && (
              <div className="flex items-center text-center justify-center space-x-2">
                <p className=" text-white">{`Welcome, ${user.name}`}</p>
                <UserAvatar />
              </div>
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
