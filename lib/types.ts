export type TopicItem =
  | {
      id: string;
      type: "lesson";
      title: string;
      locked?: boolean;
      current?: boolean;
      questionCount?: number;
      durationMin?: number;
    }
  | { id: string; type: "pdf"; title: string; file: string }
  | { id: string; type: "quiz"; title: string; quizId: string };

export interface Week {
  id: string;
  title: string;
  description: string;
  items: TopicItem[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  enrolled: number;
  youtubeId: string;
  videoDurationSec: number;
  thumbnail?: string;
  weeks: Week[];
}

export type CourseStatus = "not-started" | "in-progress" | "completed";

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  answerIndex: number;
}

export interface Quiz {
  id: string;
  timeLimitSec: number;
  questions: QuizQuestion[];
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  isYou?: boolean;
}
