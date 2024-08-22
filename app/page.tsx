import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldIcon, WalletIcon, ImageIcon } from 'lucide-react';
import Logo from '@/public/bark-mascot.png';

// Define the action cards data with TypeScript type
interface ActionCard {
  title: string;
  href: string;
  description: string;
  icon: JSX.Element;
}

const actionCards: ActionCard[] = [
  {
    title: 'Staking BARK',
    href: '/stake',
    description: 'Help secure the network by staking BARK to a validator.',
    icon: <ShieldIcon className="w-12 h-12" aria-label="Shield icon" />,
  },
  {
    title: 'Transfer BARK',
    href: '/transfer',
    description: 'Easily transfer BARK to any other Solana wallet.',
    icon: <WalletIcon className="w-12 h-12" aria-label="Wallet icon" />,
  },
  {
    title: 'Mint an NFT',
    href: '/mint-nft',
    description: 'Allow anyone to claim a digital collectible from a collection.',
    icon: <ImageIcon className="w-12 h-12" aria-label="Image icon" />,
  },
];

export default function Page() {
  return (
    <section id="features" className="relative container space-y-12 py-8 md:py-12 lg:py-24">
      {/* Background mascot image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={Logo}
          alt="Background BARK Mascot"
          layout="fill"
          objectFit="cover"
          className="opacity-20 mix-blend-multiply"
          quality={90}
        />
      </div>

      <div className="text-center mb-12 relative z-10">
        {/* Display the logo */}
        <Image
          src={Logo}
          alt="BARK Mascot"
          width={150}
          height={150}
          className="mx-auto"
          quality={90}
          loading="lazy"
        />
      </div>

      <div className="mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-4xl relative z-10">
        {actionCards.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <Card className="group transition-transform transform hover:scale-105 hover:border-primary cursor-pointer">
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
