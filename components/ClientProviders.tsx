"use client";
import * as React from "react";
import EmotionRegistry from "./EmotionRegistry";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthProvider } from "./AuthContext";

const theme = createTheme({
  // Customize theme if needed
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </EmotionRegistry>
  );
} 