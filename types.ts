export enum Page {
  HOME = 'HOME',
  PRE_TEST = 'PRE_TEST',
  CONTENT = 'CONTENT',
  POST_TEST = 'POST_TEST',
  EVALUATION = 'EVALUATION',
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswerId: string;
}

export interface UserProfile {
  age: string;
  education: string;
  experience: string;
  deliveryMethod: string;
}

export interface LikertQuestion {
  id: number;
  text: string;
}

export interface EvaluationData {
  ratings: Record<number, number>; // questionId -> rating (1-5)
  impression: string;
  suggestion: string;
}

export interface FullUserData {
  profile: UserProfile | null;
  preTestScore: number;
  postTestScore: number;
  preTestAnswers?: Record<number, string>; // Stores answer key (e.g., {1: 'A', 2: 'B'})
  postTestAnswers?: Record<number, string>; // Stores answer key
  evaluation: EvaluationData | null;
  calendarYear?: string; // For yearly statistics (e.g., "2567")
  submittedAt?: string; // ISO Timestamp
}