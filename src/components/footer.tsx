import Link from "next/link";
import React from "react";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-secondary-foreground py-6 md:py-8">
      <div className="container mx-auto text-white text-center">
        <ul className="flex justify-center space-x-4 mb-4">
          <li>
            <a
              href="https://x.com/successsecretbet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <FaSquareXTwitter size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://t.me/Successsecretbet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <FaTelegram size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@successsecretbet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <FaYoutube size={24} />
            </a>
          </li>
        </ul>
        <div className="md:flex md:justify-center space-x-4 mt-4">
          <Link
            href="/privacy"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Privacy
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            About Us
          </Link>
        </div>
        <p className="mt-4 text-sm md:text-base">
          &copy; {new Date().getFullYear()} Success Secrets Bet VIP
        </p>
      </div>
    </footer>
  );
}

export default Footer;
