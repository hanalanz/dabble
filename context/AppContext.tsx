'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Craft, FilterState } from '@/types/craft';
import { getSavedCrafts, saveCraft, unsaveCraft } from '@/utils/localStorage';

interface AppContextType {
  crafts: Craft[];
  filterState: FilterState;
  savedCraftIds: number[];
  setFilterState: (state: FilterState) => void;
  toggleSaveCraft: (craftId: number) => void;
  isCraftSaved: (craftId: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, initialCrafts }: { children: React.ReactNode; initialCrafts: Craft[] }) {
  const [crafts] = useState<Craft[]>(initialCrafts);
  const [filterState, setFilterState] = useState<FilterState>({
    materialsHave: [],
    materialsWant: [],
    timeAvailable: null,
  });
  const [savedCraftIds, setSavedCraftIds] = useState<number[]>([]);

  // Load saved crafts from localStorage on mount
  useEffect(() => {
    setSavedCraftIds(getSavedCrafts());
  }, []);

  const toggleSaveCraft = (craftId: number) => {
    if (savedCraftIds.includes(craftId)) {
      unsaveCraft(craftId);
      setSavedCraftIds(prev => prev.filter(id => id !== craftId));
    } else {
      saveCraft(craftId);
      setSavedCraftIds(prev => [...prev, craftId]);
    }
  };

  const isCraftSaved = (craftId: number) => {
    return savedCraftIds.includes(craftId);
  };

  return (
    <AppContext.Provider
      value={{
        crafts,
        filterState,
        savedCraftIds,
        setFilterState,
        toggleSaveCraft,
        isCraftSaved,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

