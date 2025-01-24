export interface CVScore {
  completeness: number;
  relevance: number;
  grammar: number;
  visualClarity: number;
  overall: number;
}

export interface CVSuggestion {
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  category: 'format' | 'content' | 'skills' | 'impact' | 'ats';
}

export interface CVSection {
  complete: boolean;
  missing: string[];
}

export interface CVAnalysis {
  personalInfo: {
    complete: boolean;
    missing: string[];
  };
  education: {
    complete: boolean;
    missing: string[];
  };
  experience: {
    complete: boolean;
    missing: string[];
  };
  skills: {
    complete: boolean;
    missing: string[];
  };
  score: CVScore;
  suggestions: CVSuggestion[];
  keywords: string[];
}
