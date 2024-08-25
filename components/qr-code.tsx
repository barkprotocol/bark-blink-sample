"use client";

import { createSolanaQR, encodeURL } from "@solana/actions";
import { useEffect, useRef } from "react";

type ComponentProps = {
  url: string | URL;
  className?: string;
  background?: string;
  color?: string;
  size?: number;
};

export function SolanaQRCode({
  url,
  className,
  background = "transparent",
  color = "#080808",
  size = 400,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Ensure URL is correctly handled
      const resolvedUrl = typeof url === "string" ? new URL(url, window.location.href) : url;

      // Encode the URL for Solana QR
      const encodedUrl = encodeURL({ link: resolvedUrl }, "solana:");

      console.log("Encoded URL:", encodedUrl.toString());

      // Create the Solana QR code
      const qr = createSolanaQR(encodedUrl, size, background, color);

      // Append QR code to the ref element
      if (ref.current) {
        ref.current.innerHTML = ""; // Clear previous QR code if any
        qr.append(ref.current);
      }
    } catch (error) {
      console.error("Error creating Solana QR code:", error);
    }

    // Cleanup: clear QR code when component unmounts
    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [url, background, color, size]); // Dependencies for useEffect

  return <div ref={ref} className={className} role="img" aria-label="Solana QR Code" />;
}
