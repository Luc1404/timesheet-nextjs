import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientProviders from "../components/ClientProviders";

export const metadata: Metadata = {
  title: "TimeSheet",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Timesheet logo.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          referrerPolicy="no-referrer"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="main-layout">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
