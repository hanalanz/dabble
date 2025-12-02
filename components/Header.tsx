'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);
  
  return (
    <header className="py-4 sticky top-0 z-50 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center no-underline text-text">
            {!logoError ? (
              <Image
                src="/dabble.svg"
                alt="Dabble"
                width={150}
                height={50}
                priority
                className="h-auto w-auto max-h-[60px] max-w-[200px] object-contain"
                onError={() => setLogoError(true)}
                unoptimized
              />
            ) : (
              <span className="text-2xl font-bold logo-gradient">Dabble</span>
            )}
          </Link>
          
          <nav className="flex gap-6">
            <Link 
              href="/saved" 
              className="no-underline font-medium py-2 px-5 rounded-full transition-all bg-[#6DC14E] text-white border-black hover:opacity-90 hover:-translate-y-0.5"
              style={{
                borderTopWidth: '2px',
                borderLeftWidth: '2px',
                borderBottomWidth: '4px',
                borderRightWidth: '4px',
                borderStyle: 'solid'
              }}
            >
              favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
