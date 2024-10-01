
'use client'
import { SubscriptionsProvider } from "../context/subscriptionContext";

/*
export const metadata = {
  title: "Account",
  description: "Account page",
};
*/

const AccountPageLayout = ({ children }) => {
  return (
    <>
      <head>
        <title>Account</title>
        <meta name="description" content="Account Page" />
      </head>
      <SubscriptionsProvider>{children}</SubscriptionsProvider>
    </>
  );
};

export default AccountPageLayout;
