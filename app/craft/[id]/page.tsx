'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';

export default function CraftDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { crafts, isCraftSaved, toggleSaveCraft } = useApp();
  
  const craftId = Number(params.id);
  const craft = crafts.find(c => c.id === craftId);
  
  if (!craft) {
    return (
      <>
        <Header />
        <main className="craft-detail-page">
          <div className="container">
            <div className="error-message">
              <h2>Craft not found</h2>
              <Link href="/" className="btn btn-primary">
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }
  
  const isSaved = isCraftSaved(craft.id);
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
  };
  
  return (
    <>
      <Header />
      <main className="craft-detail-page">
        <div className="container">
          <Link href="/results" className="back-link">
            ← Back to Results
          </Link>
          
          <article className="craft-detail">
            <div className="craft-detail-header">
              <div className="craft-detail-title-section">
                <h1 className="craft-detail-title">{craft.name}</h1>
                <button
                  onClick={() => toggleSaveCraft(craft.id)}
                  className={`save-btn-large ${isSaved ? 'saved' : ''}`}
                  aria-label={isSaved ? 'Unsave craft' : 'Save craft'}
                >
                  {isSaved ? '❤️ Saved' : '🤍 Save'}
                </button>
              </div>
              
              <p className="craft-detail-description">{craft.description}</p>
              
              <div className="craft-detail-meta">
                <span className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  {formatTime(craft.time)}
                </span>
                <span className={`meta-item difficulty-${craft.difficulty.toLowerCase()}`}>
                  <span className="meta-icon">🎨</span>
                  {craft.difficulty}
                </span>
              </div>
            </div>
            
            <div className="craft-detail-image">
              <div className="craft-image-placeholder-large">
                {craft.name.charAt(0)}
              </div>
            </div>
            
            <div className="craft-detail-content">
              <section className="materials-section">
                <h2 className="section-heading">Materials Needed</h2>
                <ul className="materials-list">
                  {craft.materials.map((material, index) => (
                    <li key={index} className="material-item">
                      {material}
                    </li>
                  ))}
                </ul>
              </section>
              
              <section className="instructions-section">
                <h2 className="section-heading">Instructions</h2>
                <ol className="instructions-list">
                  {craft.instructions.map((instruction, index) => (
                    <li key={index} className="instruction-item">
                      <span className="instruction-number">{index + 1}</span>
                      <span className="instruction-text">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>
        </div>
        
        <style jsx>{`
          .craft-detail-page {
            min-height: calc(100vh - 80px);
            padding: 2rem 0;
          }
          
          .back-link {
            display: inline-block;
            margin-bottom: 1.5rem;
            color: var(--color-primary);
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s;
          }
          
          .back-link:hover {
            color: #FF9BB0;
          }
          
          .craft-detail {
            max-width: 900px;
            margin: 0 auto;
            background-color: var(--color-surface);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 16px var(--color-shadow);
          }
          
          .craft-detail-header {
            padding: 2rem;
          }
          
          .craft-detail-title-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1rem;
          }
          
          .craft-detail-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--color-text);
            flex: 1;
          }
          
          .save-btn-large {
            padding: 0.5rem 1rem;
            border: 2px solid var(--color-primary);
            border-radius: 8px;
            background-color: transparent;
            color: var(--color-primary);
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .save-btn-large.saved {
            background-color: var(--color-primary);
            color: white;
          }
          
          .save-btn-large:hover {
            background-color: var(--color-primary);
            color: white;
            transform: translateY(-1px);
          }
          
          .craft-detail-description {
            font-size: 1.1rem;
            color: var(--color-text-light);
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
          
          .craft-detail-meta {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
          }
          
          .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            background-color: var(--color-background);
            font-weight: 500;
          }
          
          .meta-icon {
            font-size: 1.2rem;
          }
          
          .difficulty-easy {
            background-color: var(--color-success);
            color: white;
          }
          
          .difficulty-medium {
            background-color: var(--color-warning);
            color: var(--color-text);
          }
          
          .difficulty-hard {
            background-color: var(--color-accent);
            color: white;
          }
          
          .craft-detail-image {
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .craft-image-placeholder-large {
            font-size: 6rem;
            color: white;
            opacity: 0.8;
          }
          
          .craft-detail-content {
            padding: 2rem;
          }
          
          .section-heading {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--color-text);
          }
          
          .materials-section {
            margin-bottom: 2rem;
          }
          
          .materials-list {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 0.75rem;
          }
          
          .material-item {
            padding: 0.75rem 1rem;
            background-color: var(--color-background);
            border-radius: 8px;
            border-left: 4px solid var(--color-primary);
            font-size: 0.95rem;
          }
          
          .instructions-list {
            list-style: none;
            counter-reset: instruction-counter;
          }
          
          .instruction-item {
            counter-increment: instruction-counter;
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            background-color: var(--color-background);
            border-radius: 12px;
            border-left: 4px solid var(--color-accent);
          }
          
          .instruction-number {
            flex-shrink: 0;
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-accent);
            color: white;
            border-radius: 50%;
            font-weight: 700;
            font-size: 1.1rem;
          }
          
          .instruction-text {
            flex: 1;
            font-size: 1rem;
            line-height: 1.6;
            color: var(--color-text);
            padding-top: 0.5rem;
          }
          
          @media (min-width: 768px) {
            .craft-detail-header {
              padding: 3rem;
            }
            
            .craft-detail-content {
              padding: 3rem;
            }
            
            .craft-detail-title {
              font-size: 2.5rem;
            }
          }
        `}</style>
      </main>
    </>
  );
}

