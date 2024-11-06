export interface Keyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  competition: number;
  priorityScore: number;
}

export interface AnalysisResult {
  url: string;
  timestamp: string;
  keywords: Keyword[];
} 