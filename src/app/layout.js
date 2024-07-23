"use client";
import Header from "./components/header";
import GoogleAnalytics from "./components/googleAnalytics";
import Footer from "./components/footer";
//import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import BetBanner from "./components/BetBanner";
import Providers from "./providers";
import { useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata = {
  title: "Success Secrets Bet",
  description: "The Home Of Betting Tips",
};
*/

export default function RootLayout({ children }) {
  const { theme } = useTheme();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Success Secrets Bet</title>
        <meta name="description" content="The Home Of Betting Tips" />
      </head>
      <body
        className={`bgback ${inter.className} `}
      >
        {/* adsense script */}
        {/*
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3825617756167561"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />*/}
        <Providers>
          <GoogleAnalytics />

          <Header />

          <Suspense fallback={<Loading />}> {children}</Suspense>
          <Footer />
          <BetBanner />
        </Providers>
      </body>
    </html>
  );
}
