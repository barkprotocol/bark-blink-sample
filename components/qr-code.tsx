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
  color = "#000000", // Default color to black
  size = 400,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure URL is correctly handled
    const resolvedUrl = new URL(url, window.location.href);

    // Encode the URL for Solana QR
    const encodedUrl = encodeURL(
      { link: resolvedUrl },
      "solana:"
    );

    console.log("Encoded URL:", encodedUrl.toString());

    // Create the Solana QR code
    const qr = createSolanaQR(encodedUrl, size, background, color);

    // Append QR code to the ref element
    if (ref.current) {
      ref.current.innerHTML = ""; // Clear previous QR code if any
      qr.append(ref.current);
    }

    // Cleanup: clear QR code when component unmounts
    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [url, background, color, size]); // Dependencies for useEffect

  return <div ref={ref} className={className} />;
}
