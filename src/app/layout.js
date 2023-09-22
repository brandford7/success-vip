"use client";
import Header from "./components/header";
import ToggleThemeButton from "./components/toggleTheme";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
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
        <AuthProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <PredictionsProvider>
                <Header />
                {children}
              </PredictionsProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
