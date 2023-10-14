"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider, useTheme } from "./context/themeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";
import { Inter } from "next/font/google";
import { PredictionsProvider } from "./context/predictionContext";

const inter = Inter({ subsets: ["latin"] });

/*export const metadata = {
  title: "Success Secrets Bet",
  description: "The Home Of Betting Tips",
};
*/

export default function RootLayout({ children }) {
/*  const { isDarkMode, toggleTheme } = useTheme();

  const containerStyle = {
    color: isDarkMode ? "#fff" : " rgb(var(--foreground-rgb))",
    background: `linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb))`,
  };
*/
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className} >
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <PredictionsProvider>
                <Header />

                {children}
                <Footer />
              </PredictionsProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
