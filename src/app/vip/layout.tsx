

'use client'

/*export const metadata = {
  title: "VIP",
  description: "The best VIP Soccer tips to earn more money",
};*/

const VIPPageLayout = ({ children }) => {
  return (
    <>
      <head>
        <title>VIP</title>
        <meta
          name="description"
          content="The best VIP Soccer tips to earn more money"
        />
      </head>
      {children}
    </>
  );
};

export default VIPPageLayout;
