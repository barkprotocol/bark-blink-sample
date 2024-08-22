import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/constants";
import { ModeToggle } from "@/components/mode-toggle";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "BARK Blinks",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
