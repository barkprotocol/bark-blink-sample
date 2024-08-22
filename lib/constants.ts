import { PublicKey } from "@solana/web3.js";

export const DEFAULT_VALIDATOR_VOTE_PUBKEY: PublicKey = new PublicKey(
  "5ZWgXcyqrrNpQHCme5SdC5hCeYb2o3fEJhF7Gok3bTVN"
);

export const DEFAULT_SOL_ADDRESS: PublicKey = new PublicKey(
  "8PkvQK3F15kwGvqLMJVbCT1gvSitDDb7bvVCwVgWw58w"
);

export const DEFAULT_BARK_ADDRESS: PublicKey = new PublicKey(
  "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
);

export const DEFAULT_BARK_AMOUNT: number = 1000000;
export const DEFAULT_SOL_AMOUNT: number = 1.0;
export const DEFAULT_STAKE_AMOUNT: number = 1.0;

export const siteConfig = {
  name: "BARK Blink",
  description: "",
  url: "https://blink.barkprotocol.net",
  ogImage: "https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg",
  links: {
    twitter: "https://twitter.com/bark_protocol",
    github: "https://github.com/barkprotocol/bark-blink",
    docs: "https://solana.com/docs/advanced/actions",
  },
};