"use client";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./userAvatar";

const Header = () => {
  return (
    <header className=" flex px-3  items-center lg:justify-center bg-primary  py-5 md:py-10 ">
      <Link href="/" className="flex gap-3 items-center">
        <h1 className="capitalize md:text-2xl lg:text-4xl">
          Success Secrets Bet
        </h1>
        <Image
          src="/success-image.webp"
          alt="logo"
          height="30"
          priority
          width="30"
          className="rounded-full"
        />
      </Link>
      <UserAvatar />
    </header>
  );
};

export default Header;
