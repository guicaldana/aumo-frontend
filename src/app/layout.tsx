import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import "./globals.css";
import { Header } from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Users Like Me",
  description: "Aumo Frontend Challenge",
  icons: {
    icon: "/icons8-male-user-ios-17-outlined-16.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header />
      <div className="top-text">Encontre pessoas como você!</div>
        {children}
      </body>
    </html>
  );
}
