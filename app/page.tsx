'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { MaterialSelector } from '@/components/MaterialSelector';
import { TimeSelector } from '@/components/TimeSelector';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const router = useRouter();
  const { filterState, setFilterState } = useApp();
  
  const handleSearch = () => {
    router.push('/results');
  };
  
  return (
    <>
      <Header />
      <main className="home-page">
        <div className="container">
          <div className="home-hero">
            <h2 className="hero-title">
              Wanna <span className="dabble-text">Dabble</span> in a new craft?
            </h2>
            <p className="hero-subtitle">
              Tell us what materials you have and how much time you've got, 
              and we'll find the perfect craft for you!
            </p>
          </div>
          
          <div className="home-content">
            <div className="filters-section">
              <MaterialSelector
                selected={filterState.materialsHave}
                onChange={(materials) => 
                  setFilterState({ ...filterState, materialsHave: materials })
                }
              />
              
              <TimeSelector
                selected={filterState.timeAvailable}
                onChange={(time) => 
                  setFilterState({ ...filterState, timeAvailable: time })
                }
              />
              
              <button
                onClick={handleSearch}
                className="btn btn-primary search-btn"
                disabled={filterState.materialsHave.length === 0}
              >
                find my perfect craft!
              </button>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .home-page {
            min-height: calc(100vh - 80px);
            padding: 2rem 0;
          }
          
          .home-hero {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem 0;
          }
          
          .hero-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--color-text);
          }
          
          .dabble-text {
            background: linear-gradient(135deg, #4A90E2, #FF6B9D, #FFB6C1, #98D8C8, #4A90E2, #FF6B9D);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
            color: var(--color-text-light);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }
          
          .home-content {
            max-width: 800px;
            margin: 0 auto;
          }
          
          .filters-section {
            background-color: #B0E0E6;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 16px var(--color-shadow);
          }
          
          .search-btn {
            width: 100%;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            margin-top: 1rem;
            text-transform: lowercase;
            border-radius: 12px;
          }
          
          .search-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .search-btn:not(:disabled):hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(255, 107, 157, 0.3);
          }
          
          @media (min-width: 768px) {
            .hero-title {
              font-size: 3.5rem;
            }
            
            .filters-section {
              padding: 3rem;
            }
          }
        `}</style>
      </main>
    </>
  );
}

