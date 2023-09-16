"use client";

import React from "react";
import Prediction from "./components/prediction";
import ToggleThemeButton from "./components/toggleTheme";
import Header from "./components/Header";

function HomePage() {
  // Filter predictions where isVIP is false

  return (
    <div className="container mx-auto py-8">
      
      <div>
        <h1 className="text-2xl font-bold mb-4">VIP Predictions</h1>
        {/* Implement the table and prediction rendering here */}
      </div>
      <Prediction />
    </div>
  );
}

export default HomePage;
