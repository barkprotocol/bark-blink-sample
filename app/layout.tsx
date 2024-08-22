import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/constants";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "BARK Blink",
  description: "An application for managing BARK tokens and Solana actions.",
  keywords: "BARK, Solana, cryptocurrency, tokens, staking, NFT, blockchain",
  author: "BARK Protocol",
  ogImage: siteConfig.ogImage,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-center py-5 container bg-background shadow-md">
              {/* Header content goes here */}
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="py-4 bg-background text-center">
              <div className="container">
                <p className="text-muted-foreground">&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
                <nav className="mt-4">
                  <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                  <span className="mx-2">|</span>
                  <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
                </nav>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
