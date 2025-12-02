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
  
  const difficultyColors = {
    Easy: 'bg-success text-white',
    Medium: 'bg-warning text-text',
    Hard: 'bg-accent text-white',
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden border-2 border-black transition-all hover:-translate-y-1">
      <Link href={`/craft/${craft.id}`} className="block no-underline text-inherit">
        <div className="w-full h-[200px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center rounded-t-xl relative overflow-hidden">
          <div 
            className="text-6xl font-bold absolute"
            style={{ 
              color: 'transparent',
              WebkitTextStroke: '3px white',
              opacity: 0.9
            } as React.CSSProperties}
          >
            {craft.name.charAt(0)}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-text mb-2">{craft.name}</h3>
          
          <p className="text-text-light text-sm mb-4 leading-relaxed">{craft.description}</p>
          
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-text">⏱️ {formatTime(craft.time)}</span>
            <span className={`text-sm px-2 py-1 rounded font-medium ${difficultyColors[craft.difficulty]}`}>
              {craft.difficulty}
            </span>
            {matchInfo && matchInfo.isPartialMatch && !matchInfo.isPerfectMatch && (
              <span className="text-sm px-2 py-1 rounded font-medium bg-warning text-text">
                Partial Match (Missing {matchInfo.missingMaterials.length})
              </span>
            )}
          </div>
          
      
        </div>
      </Link>
    </div>
  );
}
