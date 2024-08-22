import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/lib/constants';
import { Providers } from './providers';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'BARK Blink',
  description: 'An application for managing BARK tokens and Solana actions.',
  keywords: 'BARK, Solana, cryptocurrency, tokens, staking, NFT, blockchain',
  author: 'BARK Protocol',
  ogImage: siteConfig.ogImage,
  url: siteConfig.url,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.ogImage} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={metadata.url} />
      </Head>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>
            <footer className="py-6 bg-background text-center border-t border-border">
              <div className="container mx-auto px-4">
                <p className="text-muted-foreground text-sm">
                  &copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.
                </p>
                <nav className="mt-4">
                  <Link href="/privacy-policy" className="text-primary hover:underline" aria-label="Privacy Policy">
                    Privacy Policy
                  </Link>
                  <span className="mx-2">|</span>
                  <Link href="/terms-of-service" className="text-primary hover:underline" aria-label="Terms of Service">
                    Terms of Service
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
