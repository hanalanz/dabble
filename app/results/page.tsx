'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { CraftCard } from '@/components/CraftCard';
import { useApp } from '@/context/AppContext';
import { filterAndSortCrafts } from '@/utils/filterCrafts';

export default function ResultsPage() {
  const { crafts, filterState } = useApp();
  
  const { perfectMatches, partialMatches, noMatches } = filterAndSortCrafts(
    crafts,
    filterState
  );
  
  const hasResults = perfectMatches.length > 0 || partialMatches.length > 0 || noMatches.length > 0;
  
  return (
    <>
      <Header />
      <main className="results-page">
        <div className="container">
          <div className="results-header">
            <Link href="/" className="back-link">
              ← Back to Search
            </Link>
            <h2 className="results-title">Craft Results</h2>
            {hasResults && (
              <p className="results-count">
                Found {perfectMatches.length + partialMatches.length + noMatches.length} crafts
              </p>
            )}
          </div>
          
          {!hasResults ? (
            <div className="no-results">
              <p className="no-results-text">
                No crafts found matching your criteria. Try adjusting your filters!
              </p>
              <Link href="/" className="btn btn-primary">
                Start New Search
              </Link>
            </div>
          ) : (
            <div className="results-content">
              {perfectMatches.length > 0 && (
                <section className="results-section">
                  <h3 className="section-title">Perfect Matches ✨</h3>
                  <div className="crafts-grid">
                    {perfectMatches.map((match) => (
                      <CraftCard
                        key={match.craft.id}
                        craft={match.craft}
                        matchInfo={match}
                      />
                    ))}
                  </div>
                </section>
              )}
              
              {partialMatches.length > 0 && (
                <section className="results-section">
                  <h3 className="section-title">Partial Matches 🎯</h3>
                  <p className="section-subtitle">
                    These crafts are missing only 1-2 materials
                  </p>
                  <div className="crafts-grid">
                    {partialMatches.map((match) => (
                      <CraftCard
                        key={match.craft.id}
                        craft={match.craft}
                        matchInfo={match}
                      />
                    ))}
                  </div>
                </section>
              )}
              
              {noMatches.length > 0 && (
                <section className="results-section">
                  <h3 className="section-title">More Ideas 💡</h3>
                  <div className="crafts-grid">
                    {noMatches.map((match) => (
                      <CraftCard
                        key={match.craft.id}
                        craft={match.craft}
                        matchInfo={match}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
        
        <style jsx>{`
          .results-page {
            min-height: calc(100vh - 80px);
            padding: 2rem 0;
          }
          
          .results-header {
            margin-bottom: 2rem;
          }
          
          .back-link {
            display: inline-block;
            margin-bottom: 1rem;
            color: var(--color-primary);
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s;
          }
          
          .back-link:hover {
            color: #FF9BB0;
          }
          
          .results-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--color-text);
          }
          
          .results-count {
            color: var(--color-text-light);
            font-size: 1rem;
          }
          
          .no-results {
            text-align: center;
            padding: 4rem 2rem;
            background-color: var(--color-surface);
            border-radius: 16px;
            box-shadow: 0 4px 16px var(--color-shadow);
          }
          
          .no-results-text {
            font-size: 1.1rem;
            color: var(--color-text-light);
            margin-bottom: 2rem;
          }
          
          .results-content {
            display: flex;
            flex-direction: column;
            gap: 3rem;
          }
          
          .results-section {
            margin-bottom: 2rem;
          }
          
          .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--color-text);
          }
          
          .section-subtitle {
            color: var(--color-text-light);
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
          }
          
          .crafts-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          @media (min-width: 640px) {
            .crafts-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .crafts-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}</style>
      </main>
    </>
  );
}

