
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "next-themes";
import { PredictionsProvider } from "./context/predictionContext";
import { UsersProvider } from "./context/userContext";
import GoogleAnalytics from "./components/googleAnalytics";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PredictionsProvider>
            <UsersProvider>
              <GoogleAnalytics />

              {children}
            </UsersProvider>
          </PredictionsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
