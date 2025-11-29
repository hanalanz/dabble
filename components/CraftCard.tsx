'use client';

import React from 'react';
import Link from 'next/link';
import { Craft } from '@/types/craft';
import { useApp } from '@/context/AppContext';

interface CraftCardProps {
  craft: Craft;
  matchInfo?: {
    matchScore: number;
    missingMaterials: string[];
    isPerfectMatch: boolean;
    isPartialMatch: boolean;
  };
}

export function CraftCard({ craft, matchInfo }: CraftCardProps) {
  const { isCraftSaved, toggleSaveCraft } = useApp();
  const isSaved = isCraftSaved(craft.id);
  
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
  };
  
  return (
    <div className="craft-card">
      <Link href={`/craft/${craft.id}`} className="craft-card-link">
        <div className="craft-image">
          <div className="craft-image-placeholder">
            {craft.name.charAt(0)}
          </div>
        </div>
        
        <div className="craft-info">
          <div className="craft-header">
            <h3 className="craft-name">{craft.name}</h3>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSaveCraft(craft.id);
              }}
              className={`save-btn ${isSaved ? 'saved' : ''}`}
              aria-label={isSaved ? 'Unsave craft' : 'Save craft'}
            >
              {isSaved ? '❤️' : '🤍'}
            </button>
          </div>
          
          <p className="craft-description">{craft.description}</p>
          
          <div className="craft-meta">
            <span className="craft-time">⏱️ {formatTime(craft.time)}</span>
            <span className={`craft-difficulty difficulty-${craft.difficulty.toLowerCase()}`}>
              {craft.difficulty}
            </span>
          </div>
          
          {matchInfo && (
            <div className="craft-match-info">
              {matchInfo.isPerfectMatch && (
                <span className="match-badge perfect">Perfect Match!</span>
              )}
              {matchInfo.isPartialMatch && !matchInfo.isPerfectMatch && (
                <span className="match-badge partial">
                  Partial Match ({matchInfo.missingMaterials.length} missing)
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
      
      <style jsx>{`
        .craft-card {
          background-color: var(--color-surface);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px var(--color-shadow);
          transition: all 0.2s;
        }
        
        .craft-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px var(--color-shadow);
        }
        
        .craft-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        
        .craft-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .craft-image-placeholder {
          font-size: 4rem;
          color: white;
          opacity: 0.8;
        }
        
        .craft-info {
          padding: 1.25rem;
        }
        
        .craft-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .craft-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text);
          flex: 1;
        }
        
        .save-btn {
          font-size: 1.5rem;
          padding: 0.25rem;
          line-height: 1;
          transition: transform 0.2s;
        }
        
        .save-btn:hover {
          transform: scale(1.2);
        }
        
        .craft-description {
          color: var(--color-text-light);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        
        .craft-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .craft-time {
          font-size: 0.85rem;
          color: var(--color-text-light);
        }
        
        .craft-difficulty {
          font-size: 0.85rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
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
        
        .craft-match-info {
          margin-top: 0.75rem;
        }
        
        .match-badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .match-badge.perfect {
          background-color: var(--color-success);
          color: white;
        }
        
        .match-badge.partial {
          background-color: var(--color-warning);
          color: var(--color-text);
        }
      `}</style>
    </div>
  );
}

