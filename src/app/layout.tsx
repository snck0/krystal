import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Krystal – Česká slovní hra",
  description: "Uhodni pětipísmenné české slovo. Česká verze Wordle s účty a statistikami.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${outfit.variable} antialiased`}>
        <div className="liquid-bg">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
