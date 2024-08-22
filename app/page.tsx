import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinsIcon, FileTextIcon, ImageIcon, ShieldIcon, WalletIcon } from "lucide-react";
import { siteConfig } from "@/lib/constants";

// Define the action cards data
const actionCards: Array<{
  title: string;
  href: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}> = [
  // Disabled card
  // {
  //   title: "On-chain Memo",
  //   href: "/memo",
  //   description: "Send a simple message on-chain using an SPL Memo.",
  //   icon: <FileTextIcon className="size-12" />,
  // },
  {
    title: "Staking BARK",
    href: "/stake",
    description: "Help secure the network by staking BARK to a validator.",
    icon: <ShieldIcon className="size-12" />,
  },
  {
    title: "Transfer BARK",
    href: "/transfer",
    description: "Easily transfer BARK to any other Solana wallet.",
    icon: <WalletIcon className="size-12" />,
  },
  {
    title: "Mint an NFT",
    href: "/mint-nft",
    description: "Allow anyone to claim a digital collectible from a collection.",
    icon: <ImageIcon className="size-12" />,
  },
];

// Define the Pages component
export default function Pages() {
  return (
    <section id="features" className="container space-y-12 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {actionCards.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <Card className="group transition-transform transform hover:scale-105 hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  {item.icon}
                  <span className="font-bold group-hover:text-primary">{item.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
