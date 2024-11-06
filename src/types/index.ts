export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  competition: number;
  priorityScore: number;
}

export interface AnalysisResult {
  url: string;
  keywords: KeywordData[];
  timestamp: string;
}