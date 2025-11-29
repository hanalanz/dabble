'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { CraftCard } from '@/components/CraftCard';
import { useApp } from '@/context/AppContext';

export default function SavedPage() {
  const { crafts, savedCraftIds } = useApp();
  
  const savedCrafts = crafts.filter(craft => savedCraftIds.includes(craft.id));
  
  return (
    <>
      <Header />
      <main className="saved-page">
        <div className="container">
          <div className="saved-header">
            <h2 className="saved-title">Saved Crafts</h2>
            <p className="saved-count">
              {savedCrafts.length} {savedCrafts.length === 1 ? 'craft' : 'crafts'} saved
            </p>
          </div>
          
          {savedCrafts.length === 0 ? (
            <div className="no-saved">
              <p className="no-saved-text">
                You haven't saved any crafts yet. Start exploring and save your favorites!
              </p>
              <Link href="/" className="btn btn-primary">
                Discover Crafts
              </Link>
            </div>
          ) : (
            <div className="saved-crafts-grid">
              {savedCrafts.map(craft => (
                <CraftCard key={craft.id} craft={craft} />
              ))}
            </div>
          )}
        </div>
        
        <style jsx>{`
          .saved-page {
            min-height: calc(100vh - 80px);
            padding: 2rem 0;
          }
          
          .saved-header {
            margin-bottom: 2rem;
          }
          
          .saved-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--color-text);
          }
          
          .saved-count {
            color: var(--color-text-light);
            font-size: 1rem;
          }
          
          .no-saved {
            text-align: center;
            padding: 4rem 2rem;
            background-color: var(--color-surface);
            border-radius: 16px;
            box-shadow: 0 4px 16px var(--color-shadow);
          }
          
          .no-saved-text {
            font-size: 1.1rem;
            color: var(--color-text-light);
            margin-bottom: 2rem;
          }
          
          .saved-crafts-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          @media (min-width: 640px) {
            .saved-crafts-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .saved-crafts-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}</style>
      </main>
    </>
  );
}

