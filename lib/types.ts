export type LessonType = "video" | "pdf" | "exam";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  /** Video lessons: YouTube video id and the chapter inside it. */
  youtubeId?: string;
  startSec?: number;
  /** Video length, or the time limit for an exam. */
  durationSec?: number;
  /** Exam lessons only. */
  questionCount?: number;
  locked?: boolean;
}

export interface Week {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
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
  /** Cover video; its YouTube thumbnail is used as the course image. */
  youtubeId: string;
  /** Optional custom image that overrides the YouTube thumbnail. */
  thumbnail?: string;
  weeks: Week[];
  /** Demo progress: the first N lessons count as completed until the student has saved progress. */
  seedCompletedLessons: number;
}

export type CourseStatus = "not-started" | "in-progress" | "completed";
