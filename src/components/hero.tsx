import Image from "next/image";
import React from "react";

const HomeBanner = () => {
  return (
    <div className="relative h-[300px] w-full">
      <Image
        src="/hero.jpg"
        alt="hero image"
        quality={80}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default HomeBanner;
