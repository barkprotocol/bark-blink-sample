import Link from "next/link";
import { ShieldIcon, WalletIcon, ImageIcon } from "lucide-react";
import Logo from "@/public/bark-mascot.png";

// Define the action cards data
const actionCards: Array<{
  title: string;
  href: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}> = [
  {
    title: "Staking BARK",
    href: "/stake",
    description: "Help secure the network by staking BARK to a validator.",
    icon: <ShieldIcon className="card-icon" />,
  },
  {
    title: "Transfer BARK",
    href: "/transfer",
    description: "Easily transfer BARK to any other Solana wallet.",
    icon: <WalletIcon className="card-icon" />,
  },
  {
    title: "Mint an NFT",
    href: "/mint-nft",
    description: "Allow anyone to claim a digital collectible from a collection.",
    icon: <ImageIcon className="card-icon" />,
  },
];

// Define the Pages component
export default function Pages() {
  return (
    <section 
      id="features" 
      className="relative container space-y-12 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      {/* Background mascot image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src={Logo.src} 
          alt="BARK Mascot" 
          className="responsive-img opacity-20 mix-blend-multiply" 
        />
      </div>

      <div className="text-center mb-12 relative z-10">
        {/* Display the logo */}
        <img 
          src={Logo.src} 
          alt="BARK Blink Logo" 
          className="logo mx-auto h-16" 
        />
      </div>

      <div className="mx-auto grid gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 relative z-10">
        {actionCards.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <div className="card">
              <div className="card-header">
                <div className="flex items-center">
                  {item.icon}
                  <h3 className="card-title">{item.title}</h3>
                </div>
              </div>
              <div className="card-content">
                <p className="card-description">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
