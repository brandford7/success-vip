"use client";

import Image from "next/image";

const Header = () => {
  return (
    <header className=" flex px-3 gap-3 items-center lg:justify-center bg-primary  py-5 md:py-10 mb-10">
      <h1 className="capitalize">Success Secrets Bet</h1>
      <Image
        src="/success-image.webp"
        alt="logo"
        height="30"
        width="30"
        className="rounded-full"
      />
    </header>
  );
};

export default Header;
