export interface Craft {
  id: number;
  name: string;
  time: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  materials: string[];
  description: string;
  instructions: string[];
  image: string;
}

export interface FilterState {
  materialsHave: string[];
  materialsWant: string[];
  timeAvailable: number | null; // in minutes, null means no filter
}

export interface MatchResult {
  craft: Craft;
  matchScore: number; // number of matching materials
  missingMaterials: string[];
  isPerfectMatch: boolean;
  isPartialMatch: boolean;
}

