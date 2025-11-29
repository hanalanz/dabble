'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <Image
              src="/dabble.png"
              alt="Dabble"
              width={120}
              height={40}
              priority
              className="logo-image"
            />
          </Link>
          
          <nav className="nav">
            <Link 
              href="/saved" 
              className={`nav-link ${pathname === '/saved' ? 'active' : ''}`}
            >
              favorites
            </Link>
          </nav>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          background-color: var(--color-surface);
          border-bottom: 2px solid var(--color-border);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 4px var(--color-shadow);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          text-decoration: none;
          color: var(--color-text);
          display: flex;
          align-items: center;
        }
        
        .logo-image {
          height: auto;
          width: auto;
          max-height: 50px;
        }
        
        .nav {
          display: flex;
          gap: 1.5rem;
        }
        
        .nav-link {
          text-decoration: none;
          color: var(--color-text);
          font-weight: 500;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          transition: all 0.2s;
          background-color: #98D8C8;
          color: white;
        }
        
        .nav-link:hover {
          background-color: #7FC4B0;
          transform: translateY(-1px);
        }
        
        .nav-link.active {
          background-color: #7FC4B0;
        }
      `}</style>
    </header>
  );
}

