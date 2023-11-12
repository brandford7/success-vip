

import Header from "./components/header";
import GoogleAnalytics from "./components/googleAnalytics";
import GoogleAdsense from "./components/googleAdsense";
import Footer from "./components/footer";
import { AuthProvider } from "./context/authContext";
import { UsersProvider } from "./context/userContext";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";
import { Inter } from "next/font/google";
import { PredictionsProvider } from "./context/predictionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Success Secrets Bet",
  description: "The Home Of Betting Tips",
};


export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3825617756167561"
          crossOrigin="anonymous"
          strategy='lazyOnload'
        />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PredictionsProvider>
              <UsersProvider>
                <GoogleAnalytics />
                <GoogleAdsense />
                <Header />
                {children}
                <Footer />
              </UsersProvider>
            </PredictionsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
