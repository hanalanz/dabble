const SAVED_CRAFTS_KEY = 'dabble_saved_crafts';

/**
 * Get saved craft IDs from local storage
 */
export function getSavedCrafts(): number[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(SAVED_CRAFTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Save a craft ID to local storage
 */
export function saveCraft(craftId: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = getSavedCrafts();
    if (!saved.includes(craftId)) {
      saved.push(craftId);
      localStorage.setItem(SAVED_CRAFTS_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('Error saving craft:', error);
  }
}

/**
 * Remove a craft ID from local storage
 */
export function unsaveCraft(craftId: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = getSavedCrafts();
    const filtered = saved.filter((id: number) => id !== craftId);
    localStorage.setItem(SAVED_CRAFTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error unsaving craft:', error);
  }
}

/**
 * Check if a craft is saved
 */
export function isCraftSaved(craftId: number): boolean {
  const saved = getSavedCrafts();
  return saved.includes(craftId);
}

