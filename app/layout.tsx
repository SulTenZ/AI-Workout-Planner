// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider"; // <-- IMPORT PROVIDER

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Workout Planner",
  description: "Your personal AI-powered fitness companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* BUNGKUS SELURUH APLIKASI DENGAN PROVIDER INI */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}