import Link from "next/link";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const MobileMenu = ({ handleMenuItemClick, closeMenu, toggleMenu }) => {
  return (
    <nav className="md:hidden fixed inset-0 bg-blue-500 w-70vw h-screen flex flex-col justify-center text-white z-10 transform transition-transform duration-300 ease-in-out">
      <ul className="p-4 space-y-4 text-white text-center">
        {/* VIP Nav Link small screens */}
              {/*   <li onClick={handleMenuItemClick}>
          <Link href="/vip">
            <span className="text-white cursor-pointer text-2xl">VIP</span>
          </Link>
        </li>
*/}
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
  );
};

export default MobileMenu;
