"use client";
import { useTheme } from "next-themes";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

const pID = process.env.NEXT_PUBLIC_PUB_ID

/*
export const metadata = {
  title: "Success Secrets Bet",
  description: "The Home Of Betting Tips",
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Success Secrets Bet</title>
        <meta name="description" content="The Home Of Betting Tips" />
      </head>
      <body
        className={`${inter.className}flex flex-col gap-y-10 min-h-screen overflow-x-hidden max-w-full`}
      >
      
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    
    </html>
  );
}
