"use client";
import { useState } from "react";
import Link from "next/link";
import UserAvatar from "./userAvatar";
import { useAuth } from "../context/authContext";
import Image from "next/image";
import HamburgerMenu from "./hamburgerMenu";
import MobileMenu from "./mobileMenu";
import ToggleThemeButton from "./toggleTheme";

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
      <ToggleThemeButton />
      <div className="container mx-auto flex justify-between items-center ">
        <Link
          href="/"
          className="flex items-center top-1 left-5 pb-5 space-x-2"
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
        {user?.name !== "" ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <p className="text-black">{`Welcome, ${user?.name}`}</p>
              <UserAvatar />
            </div>
          </div>
        ) : (
          <div className="flex items-center text-white ">
            <Link href="/auth/login">
              <p className="mx-10 ">Login</p>
            </Link>
          </div>
        )}

        {/*hamburger menu below */}

        <HamburgerMenu toggleMenu={toggleMenu} />

        {/* VIP Nav Link Large screens */}
        {/*  <div className="hidden md:flex space-x-4 items-center mx-auto ">
          <Link href="/vip">
            <span className="text-white cursor-pointer">VIP</span>
          </Link>
        </div>*/}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenu
          handleMenuItemClick={handleMenuItemClick}
          closeMenu={closeMenu}
          toggleMenu={toggleMenu}
        />
      )}
    </header>
  );
};

export default Header;
