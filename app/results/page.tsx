'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CraftCard } from '@/components/CraftCard';
import { useApp } from '@/context/AppContext';
import { filterAndSortCrafts } from '@/utils/filterCrafts';
import { MatchResult } from '@/types/craft';

type TabType = 'perfect' | 'partial' | 'more';
type SortOption = 'time' | 'materials' | 'difficulty';
type SortDirection = 'asc' | 'desc';
type FilterOption = {
  time?: { min?: number; max?: number };
  materials?: { min?: number; max?: number };
  difficulty?: string[];
};

export default function ResultsPage() {
  const { crafts, filterState } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('perfect');
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filters, setFilters] = useState<FilterOption>({});
  
  const { perfectMatches, partialMatches, noMatches } = filterAndSortCrafts(
    crafts,
    filterState
  );
  
  const hasResults = perfectMatches.length > 0 || partialMatches.length > 0 || noMatches.length > 0;
  const totalCrafts = perfectMatches.length + partialMatches.length + noMatches.length;
  
  // Determine initial tab based on available results
  React.useEffect(() => {
    if (activeTab === 'perfect' && perfectMatches.length === 0) {
      if (partialMatches.length > 0) setActiveTab('partial');
      else if (noMatches.length > 0) setActiveTab('more');
    } else if (activeTab === 'partial' && partialMatches.length === 0) {
      if (perfectMatches.length > 0) setActiveTab('perfect');
      else if (noMatches.length > 0) setActiveTab('more');
    } else if (activeTab === 'more' && noMatches.length === 0) {
      if (perfectMatches.length > 0) setActiveTab('perfect');
      else if (partialMatches.length > 0) setActiveTab('partial');
    }
  }, [perfectMatches.length, partialMatches.length, noMatches.length, activeTab]);
  
  const getCurrentCrafts = (): MatchResult[] => {
    let crafts: MatchResult[] = [];
    switch (activeTab) {
      case 'perfect':
        crafts = perfectMatches;
        break;
      case 'partial':
        crafts = partialMatches;
        break;
      case 'more':
        crafts = noMatches;
        break;
    }
    
    // Apply filters
    let filtered = crafts;
    if (filters.time) {
      if (filters.time.min !== undefined) {
        filtered = filtered.filter(m => m.craft.time >= filters.time!.min!);
      }
      if (filters.time.max !== undefined) {
        filtered = filtered.filter(m => m.craft.time <= filters.time!.max!);
      }
    }
    if (filters.materials) {
      if (filters.materials.min !== undefined) {
        filtered = filtered.filter(m => m.missingMaterials.length >= filters.materials!.min!);
      }
      if (filters.materials.max !== undefined) {
        filtered = filtered.filter(m => m.missingMaterials.length <= filters.materials!.max!);
      }
    }
    if (filters.difficulty && filters.difficulty.length > 0) {
      filtered = filtered.filter(m => filters.difficulty!.includes(m.craft.difficulty));
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'time':
          comparison = a.craft.time - b.craft.time;
          break;
        case 'materials':
          comparison = a.missingMaterials.length - b.missingMaterials.length;
          break;
        case 'difficulty':
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          comparison = difficultyOrder[a.craft.difficulty] - difficultyOrder[b.craft.difficulty];
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  };
  
  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
    setShowSort(false);
  };
  
  const toggleDifficultyFilter = (difficulty: string) => {
    setFilters(prev => {
      const current = prev.difficulty || [];
      const updated = current.includes(difficulty)
        ? current.filter(d => d !== difficulty)
        : [...current, difficulty];
      return { ...prev, difficulty: updated.length > 0 ? updated : undefined };
    });
  };
  
  return (
    <>
      <main className="min-h-screen py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#6DC14E] text-black font-medium transition-all hover:opacity-90 border-2 border-black"
                style={{
                  borderRadius: '9999px',
                  borderTopWidth: '2px',
                  borderLeftWidth: '2px',
                  borderBottomWidth: '4px',
                  borderRightWidth: '4px',
                }}
              >
                ← search again
            </Link>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-text">Time to get Crafty!</h2>
            {hasResults && (
              <p className="text-text-light text-lg">
                Found {totalCrafts} {totalCrafts === 1 ? 'Craft' : 'Crafts'}
              </p>
            )}
          </div>
          
          {!hasResults ? (
            <div className="text-center py-16 px-8 bg-surface rounded-2xl shadow-lg border-2 border-black">
              <p className="text-lg text-text-light mb-8">
                No crafts found matching your criteria. Try adjusting your filters!
              </p>
              <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-primary text-white hover:bg-[#FF5A8A] hover:-translate-y-0.5 hover:shadow-md border-2 border-black">
                Start New Search
              </Link>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex gap-0 mb-0">
              {perfectMatches.length > 0 && (
                  <button
                    onClick={() => setActiveTab('perfect')}
                    className={`px-6 py-3 font-semibold transition-all text-text border-2 border-black ${
                      activeTab === 'perfect'
                        ? 'bg-primary text-white'
                        : 'bg-[#F493A9]'
                    }`}
                    style={{
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '0px',
                      borderBottomLeftRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  >
                    Perfect Matches
                  </button>
                )}
                {partialMatches.length > 0 && (
                  <button
                    onClick={() => setActiveTab('partial')}
                    className={`px-6 py-3 font-semibold transition-all text-text border-2 border-black ${
                      activeTab === 'partial'
                        ? 'bg-[#EB1B49] text-white'
                        : 'bg-[#EB1B49]'
                    }`}
                    style={{
                      borderRadius: '0px',
                    }}
                  >
                    Partial Matches
                  </button>
                )}
                {noMatches.length > 0 && (
                  <button
                    onClick={() => setActiveTab('more')}
                    className={`px-6 py-3 font-semibold transition-all text-text border-2 border-black ${
                      activeTab === 'more'
                        ? 'bg-[#29AFE3] text-white'
                        : 'bg-[#29AFE3]'
                    }`}
                    style={{
                      borderTopLeftRadius: '0px',
                      borderTopRightRadius: '10px',
                      borderBottomLeftRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  >
                    More Ideas
                  </button>
                )}
                  </div>
              
              {/* Content Area with Pink Background */}
              <div 
                className="bg-primary p-6 rounded-tr-xl rounded-br-xl rounded-bl-xl"
                style={{
                  borderColor: '#000000',
                  borderTopWidth: '2px',
                  borderRightWidth: '8px',
                  borderBottomWidth: '8px',
                  borderLeftWidth: '2px',
                  borderStyle: 'solid'
                }}
              >
                {/* Sort and Filter Buttons */}
                <div className="flex gap-3 mb-4">
                  <div className="relative">
                    <button
                      onClick={() => { setShowFilter(!showFilter); setShowSort(false); }}
                      className="flex items-center gap-1 px-4 py-2 bg-white border-2 border-black rounded-lg font-medium text-text hover:bg-gray-100 transition-colors"
                    >
                      <span>☰</span>
                      <span>Filter</span>
                    </button>
                    {showFilter && (
                      <div className="absolute top-full left-0 mt-2 bg-white border-2 border-black rounded-lg p-4 z-10 min-w-[200px] shadow-lg">
                        <div className="mb-3">
                          <label className="block text-sm font-semibold mb-2">Difficulty</label>
                          <div className="flex flex-col gap-2">
                            {['Easy', 'Medium', 'Hard'].map(diff => (
                              <label key={diff} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={filters.difficulty?.includes(diff) || false}
                                  onChange={() => toggleDifficultyFilter(diff)}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">{diff}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-semibold mb-2">Materials Missing</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="Min"
                              value={filters.materials?.min || ''}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                materials: { ...prev.materials, min: e.target.value ? parseInt(e.target.value) : undefined }
                              }))}
                              className="w-20 px-2 py-1 border-2 border-black rounded text-sm"
                            />
                            <input
                              type="number"
                              placeholder="Max"
                              value={filters.materials?.max || ''}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                materials: { ...prev.materials, max: e.target.value ? parseInt(e.target.value) : undefined }
                              }))}
                              className="w-20 px-2 py-1 border-2 border-black rounded text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Time (minutes)</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="Min"
                              value={filters.time?.min || ''}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                time: { ...prev.time, min: e.target.value ? parseInt(e.target.value) : undefined }
                              }))}
                              className="w-20 px-2 py-1 border-2 border-black rounded text-sm"
                            />
                            <input
                              type="number"
                              placeholder="Max"
                              value={filters.time?.max || ''}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                time: { ...prev.time, max: e.target.value ? parseInt(e.target.value) : undefined }
                              }))}
                              className="w-20 px-2 py-1 border-2 border-black rounded text-sm"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => setFilters({})}
                          className="mt-3 w-full px-3 py-1 bg-gray-200 border-2 border-black rounded text-sm font-medium hover:bg-gray-300"
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => { setShowSort(!showSort); setShowFilter(false); }}
                      className="flex items-center gap-1 px-4 py-2 bg-white border-2 border-black rounded-lg font-medium text-text hover:bg-gray-100 transition-colors"
                    >
                      <span>Sort</span>
                      <span>▼</span>
                    </button>
                    {showSort && (
                      <div className="absolute top-full left-0 mt-2 bg-white border-2 border-black rounded-lg p-3 z-10 min-w-[180px] shadow-lg">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleSort('time')}
                            className={`text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                              sortBy === 'time' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            Time {sortBy === 'time' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </button>
                          <button
                            onClick={() => toggleSort('materials')}
                            className={`text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                              sortBy === 'materials' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            Materials Needed {sortBy === 'materials' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </button>
                          <button
                            onClick={() => toggleSort('difficulty')}
                            className={`text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                              sortBy === 'difficulty' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            Difficulty {sortBy === 'difficulty' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentCrafts().map((match) => (
                      <CraftCard
                        key={match.craft.id}
                        craft={match.craft}
                        matchInfo={match}
                      />
                    ))}
                  </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
