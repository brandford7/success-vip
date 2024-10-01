// components/Banner.js
import { useState, useEffect } from "react";
import Image from "next/image";

const BetBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50000); // Load after 2 seconds

    return () => clearTimeout(timer);
  }, [isClosed]);

  useEffect(() => {
    let reloadTimer;
    if (isClosed) {
      reloadTimer = setTimeout(() => {
        setIsClosed(false);
        setIsVisible(false); // Reset visibility to load again after delay
      }, 5000); // Reload after 5 seconds of being closed
    }

    return () => clearTimeout(reloadTimer);
  }, [isClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
  };

  return (
    isVisible && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-white rounded-md shadow-lg  ">
        <button
          className="absolute top-2 right-2 text-black font-bold z-10 "
          onClick={handleClose}
        >
          &times;
        </button>
        <a href="https://go.aff.affiliates-b2b.com/srdlp40s">
          <div className="relative w-80 h-20">
            {" "}
            {/* Adjust width and height as needed */}
            <Image
              src="https://static3.smr.vc/b66192964505700f455421-SportsbookBonus320x50EN.jpg"
              alt="Sportsbook Bonus"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        </a>
      </div>
    )
  );
};

export default BetBanner;
