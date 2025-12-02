'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function CraftDetailPage() {
  const params = useParams();
  const { crafts } = useApp();
  
  const craftId = Number(params.id);
  const craft = crafts.find(c => c.id === craftId);
  
  if (!craft) {
    return (
      <>
        <main className="min-h-screen py-8 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4 text-text">Craft not found</h2>
              <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-primary text-white hover:bg-[#FF5A8A] hover:-translate-y-0.5 hover:shadow-md border-2 border-black">
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }
  
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
  
  // Generate a search URL for purchasing materials (using Google Shopping as placeholder)
  const getPurchaseLink = (material: string) => {
    const searchQuery = encodeURIComponent(material);
    return `https://www.google.com/search?tbm=shop&q=${searchQuery}`;
  };
  
  return (
    <>
      <main className="min-h-screen py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link 
            href="/results" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#6DC14E] text-black font-medium transition-all hover:opacity-90 border-2 border-black mb-6"
            style={{
              borderRadius: '9999px',
              borderTopWidth: '2px',
              borderLeftWidth: '2px',
              borderBottomWidth: '4px',
              borderRightWidth: '4px',
            }}
          >
            ← Back to Results
          </Link>
          
          <article className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">{craft.name}</h1>
              <p className="text-lg text-text-light leading-relaxed mb-4">{craft.description}</p>
            </div>
            
            {/* Video and Instructions Card */}
            <div 
              className="bg-white rounded-xl p-6 mb-8"
              style={{
                borderColor: '#000000',
                borderTopWidth: '2px',
                borderRightWidth: '8px',
                borderBottomWidth: '8px',
                borderLeftWidth: '2px',
                borderStyle: 'solid'
              }}
            >
              {/* Video Placeholder */}
              <div className="w-full h-[400px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center rounded-xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl">▶</div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                  Video Placeholder
                </div>
              </div>
              
              {/* Time and Difficulty under video */}
              <div className="flex gap-6 flex-wrap mb-8">
                <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background font-medium">
                  <span className="text-xl">⏱️</span>
                  {formatTime(craft.time)}
                </span>
                <span className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${difficultyColors[craft.difficulty]}`}>
                  <span className="text-xl">🎨</span>
                  {craft.difficulty}
                </span>
              </div>
              
              {/* Materials Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-text">Materials Needed</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {craft.materials.map((material, index) => (
                    <div 
                      key={index} 
                      className="bg-background rounded-lg border-l-4 border-primary px-4 py-3 flex items-center justify-between"
                    >
                      <span className="text-sm text-text">{material}</span>
                      <a
                        href={getPurchaseLink(material)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-primary hover:text-[#FF5A8A] transition-colors whitespace-nowrap ml-2 underline"
                      >
                        get more!
                      </a>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Instructions Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text">Instructions</h2>
                <ol className="list-none space-y-6">
                  {craft.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4 p-6 bg-background rounded-xl border-l-4 border-accent">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent text-white rounded-full font-bold text-lg">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-base leading-relaxed text-text pt-2">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
