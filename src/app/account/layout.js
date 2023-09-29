"use client";

import React from "react";
import { SubscriptionsProvider } from "../context/subscriptionContext";

const AccountLayout = ({ children }) => {
  return <SubscriptionsProvider>{children}</SubscriptionsProvider>;
};

export default AccountLayout;
