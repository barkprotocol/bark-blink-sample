"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import "@solana/wallet-adapter-react-ui/styles.css";

// Import logos for light and dark themes
import LogoLight from "@/public/logo.light.png";
import LogoDark from "@/public/logo.dark.png";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);

    // Set up theme detection and listener
    const darkThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Initial theme setup
    setTheme(darkThemeMediaQuery.matches ? 'dark' : 'light');
    
    // Listen for changes in color scheme
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    darkThemeMediaQuery.addEventListener('change', handleThemeChange);

    // Clean up listener on component unmount
    return () => darkThemeMediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Ideally, use a more secure wallet adapter in production
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  if (!mounted) {
    return null;
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-white bg-opacity-60 dark:bg-gray-800 dark:border-gray-700 shadow-lg border-b border-gray-200 backdrop-blur-lg">
                <Link href="/" className="flex items-center space-x-2">
                  <img
                    src={theme === 'dark' ? LogoDark.src : LogoLight.src}
                    alt="BARK Blink Logo"
                    className="h-10"
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <WalletMultiButton />
                  <ModeToggle />
                </div>
              </header>
              <main className="flex-1 space-y-10 max-w-screen-xl mx-auto pt-16">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
