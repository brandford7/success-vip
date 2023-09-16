// components/Header.js

import Link from "next/link";
import { useAuth } from "../context/authContext"; // Import your auth context

function Header() {
  const { user, logout } = useAuth(); // Use your authentication context here.

  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold px-5">
        Success Secrets VIP
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/login" className="text-white">
                Login
              </Link>
            </li>
            <li>
              <Link href="/vip" className="text-white">
                VIP Predictions
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
          <Link href="/login" className="text-white"></Link>
        )}
      </div>
    </header>
  );
}

export default Header;
