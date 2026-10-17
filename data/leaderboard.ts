import type { LeaderboardEntry } from "@/lib/types";

export const leaderboardMessage = {
  emoji: "💪",
  text: "Great job, my friend! You are doing better than 60% of the students in this course. Keep going, I want to see your name on this leaderboard!",
};

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Mariam Youssef", points: 980 },
  { rank: 2, name: "Karim Nabil", points: 925 },
  { rank: 3, name: "Sara Adel", points: 890 },
  { rank: 4, name: "Omar Fathy", points: 840 },
  { rank: 5, name: "Nour Hany", points: 790 },
  { rank: 12, name: "You", points: 610, isYou: true },
];
