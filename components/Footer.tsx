import React from 'react';
import Link from 'next/link';

// Footer component
const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <Link href="/privacy-policy">
              <a className="text-sm hover:text-primary" aria-label="Privacy Policy">
                Privacy Policy
              </a>
            </Link>
            <span>|</span>
            <Link href="/terms-of-service">
              <a className="text-sm hover:text-primary" aria-label="Terms of Service">
                Terms of Service
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
