export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface UserAnswers {
  [key: number]: string; // questionId: value
}

export type AppPhase = 'intro' | 'quiz' | 'analyzing' | 'result';

export interface AnalysisResult {
  headline: string;
  summary: string;
  metabolicAge: number;
}