import { PublicKey } from "@solana/web3.js";

// Default PublicKeys for Solana-related entities
export const DEFAULT_VALIDATOR_VOTE_PUBKEY: PublicKey = new PublicKey(
  "5ZWgXcyqrrNpQHCme5SdC5hCeYb2o3fEJhF7Gok3bTVN"
);

export const DEFAULT_SOL_ADDRESS: PublicKey = new PublicKey(
  "8PkvQK3F15kwGvqLMJVbCT1gvSitDDb7bvVCwVgWw58w"
);

export const DEFAULT_BARK_ADDRESS: PublicKey = new PublicKey(
  "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
);

// Default amounts used in the application
export const DEFAULT_BARK_AMOUNT: number = 1000000; // Amount in BARK tokens (1 BARK = 1,000,000 base units)
export const DEFAULT_SOL_AMOUNT: number = 1.0;      // Amount in SOL tokens
export const DEFAULT_STAKE_AMOUNT: number = 1.0;    // Amount for staking (in SOL or BARK tokens, specify based on context)

// Site configuration
export const siteConfig = {
  name: "BARK Blink",
  description: "An application for managing BARK tokens and Solana actions.", // Description for SEO and metadata
  url: "https://blink.barkprotocol.net", // Base URL for the application
  ogImage: "https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg", // Open Graph image for social media sharing
  links: {
    twitter: "https://twitter.com/bark_protocol", // Twitter profile link
    github: "https://github.com/barkprotocol/bark-blink", // GitHub repository link
    docs: "https://solana.com/docs/advanced/actions", // Documentation link
  },
};
