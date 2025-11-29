import { Craft, FilterState, MatchResult } from '@/types/craft';

/**
 * Get all unique materials from all crafts
 */
export function getAllMaterials(crafts: Craft[]): string[] {
  const materialsSet = new Set<string>();
  crafts.forEach(craft => {
    craft.materials.forEach(material => {
      materialsSet.add(material.toLowerCase());
    });
  });
  return Array.from(materialsSet).sort();
}

/**
 * Calculate match score and missing materials for a craft
 */
function calculateMatch(craft: Craft, filterState: FilterState): MatchResult {
  const materialsHave = filterState.materialsHave.map(m => m.toLowerCase());
  const materialsWant = filterState.materialsWant.map(m => m.toLowerCase());
  const craftMaterials = craft.materials.map(m => m.toLowerCase());
  
  // Count how many required materials the user has
  let matchScore = 0;
  const missingMaterials: string[] = [];
  
  craftMaterials.forEach(material => {
    if (materialsHave.includes(material)) {
      matchScore++;
    } else {
      missingMaterials.push(material);
    }
  });
  
  // Check if user wants any of the missing materials (bonus point)
  const wantedMaterialsMatch = missingMaterials.some(m => 
    materialsWant.some(want => want.includes(m) || m.includes(want))
  );
  
  const totalMaterials = craftMaterials.length;
  const isPerfectMatch = matchScore === totalMaterials;
  // Partial match: missing only 1-2 materials
  const isPartialMatch = !isPerfectMatch && (totalMaterials - matchScore) <= 2;
  
  return {
    craft,
    matchScore,
    missingMaterials,
    isPerfectMatch,
    isPartialMatch,
  };
}

/**
 * Filter and sort crafts based on filter state
 * Core filtering logic:
 * 1. Filter by time (duration <= selected time)
 * 2. Calculate match scores based on materials
 * 3. Sort by: perfect matches first, then by match score, then by time ascending
 */
export function filterAndSortCrafts(
  crafts: Craft[],
  filterState: FilterState
): { perfectMatches: MatchResult[]; partialMatches: MatchResult[]; noMatches: MatchResult[] } {
  // If no materials selected, show all crafts (filtered by time only)
  if (filterState.materialsHave.length === 0 && filterState.materialsWant.length === 0) {
    let filtered = crafts;
    
    // Filter by time if specified
    if (filterState.timeAvailable !== null) {
      filtered = crafts.filter(craft => craft.time <= filterState.timeAvailable!);
    }
    
    // Sort by time ascending
    filtered = filtered.sort((a, b) => a.time - b.time);
    
    const results = filtered.map(craft => ({
      craft,
      matchScore: 0,
      missingMaterials: craft.materials,
      isPerfectMatch: false,
      isPartialMatch: false,
    }));
    
    return {
      perfectMatches: [],
      partialMatches: [],
      noMatches: results,
    };
  }
  
  // Calculate matches for all crafts
  let matches = crafts.map(craft => calculateMatch(craft, filterState));
  
  // Filter by time if specified
  if (filterState.timeAvailable !== null) {
    matches = matches.filter(result => result.craft.time <= filterState.timeAvailable!);
  }
  
  // Separate into perfect, partial, and no matches
  const perfectMatches = matches
    .filter(m => m.isPerfectMatch)
    .sort((a, b) => a.craft.time - b.craft.time); // Sort by time ascending
  
  const partialMatches = matches
    .filter(m => m.isPartialMatch && !m.isPerfectMatch)
    .sort((a, b) => {
      // Sort by match score (descending), then by time (ascending)
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return a.craft.time - b.craft.time;
    });
  
  const noMatches = matches
    .filter(m => !m.isPerfectMatch && !m.isPartialMatch)
    .sort((a, b) => {
      // Sort by match score (descending), then by time (ascending)
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return a.craft.time - b.craft.time;
    });
  
  return { perfectMatches, partialMatches, noMatches };
}

