


import { SubscriptionsProvider } from "../context/subscriptionContext";


export const metadata = {
  title: "Account",
  description: "Account page",
};

const AccountPageLayout = ({ children }) => {
  return <SubscriptionsProvider>{children}</SubscriptionsProvider>;
};

export default AccountPageLayout;
