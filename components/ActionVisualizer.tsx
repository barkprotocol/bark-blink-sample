"use client";

import { Action, Blink, useAction } from "@dialectlabs/blinks";
import { useEffect, useState } from "react";
import "@dialectlabs/blinks/index.css";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { useTheme } from "next-themes";

type ActionVisualizerProps = {
  url: string;
};

export function ActionVisualizer({ url }: ActionVisualizerProps) {
  const [actionState, setActionState] = useState<Action | null>(null);
  const { theme } = useTheme();

  // Devnet only for now
  const { adapter } = useActionSolanaWalletAdapter(
    process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
  );
  const { action } = useAction({ url, adapter });

  useEffect(() => {
    if (action) {
      setActionState(action);
    }
  }, [action]);

  if (!actionState) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="md:w-1/2 w-full mx-auto">
      <Blink
        action={actionState}
        websiteText={new URL(url).hostname}
        stylePreset={theme === "dark" ? "x-dark" : "x-light"}
      />
    </div>
  );
}
