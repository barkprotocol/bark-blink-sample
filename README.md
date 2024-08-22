# BARK | Solana Actions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About

### BARK Blink

BARK Blink is an innovative way to facilitate donations, payments, and staking on the Solana blockchain. Built on top of Solana Actions, BARK Blink allows users to generate shareable, metadata-rich links that can trigger blockchain transactions for donations, payments, or staking directly within wallets, websites, and other web contexts.

With BARK Blink, users can donate to causes, make payments, or stake SOL with a simple link, bypassing the need for complex interactions with decentralized apps (dApps). This feature makes it easier for organizations and individuals to accept contributions, payments, or delegate staking in SOL, ensuring a seamless, on-chain transaction experience.

### Stake

Staking SOL through BARK Blink empowers users to participate in securing the Solana network while earning staking rewards. By leveraging Solana Actions, BARK Blink simplifies the NFT staking process, allowing users to delegate their SOL to validators directly from a link. This process eliminates the need for users to manually interact with staking interfaces, offering a streamlined and accessible staking experience.

### Actions and Blinks

1. **Solana Actions** are specification-compliant APIs that return transactions on the Solana blockchain to be previewed, signed, and sent across a number of various contexts, including QR codes, buttons + widgets, and websites across the internet. Actions make it simple for developers to integrate the things you can do throughout the Solana ecosystem right into your environment, allowing you to perform blockchain transactions without needing to navigate away to a different app or webpage.

2. **Blockchain links – or blinks** – turn any Solana Action into a shareable, metadata-rich link. Blinks allow Action-aware clients (browser extension wallets, bots) to display additional capabilities for the user. On a website, a blink might immediately trigger a transaction preview in a wallet without going to a decentralized app; in Discord, a bot might expand the blink into an interactive set of buttons. This pushes the ability to interact on-chain to any web surface capable of displaying a URL.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.