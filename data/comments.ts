import type { Comment } from "@/lib/types";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

/** Starter comments shown on every course; new ones are saved in localStorage. */
export const seedComments: Comment[] = [
  { id: "seed-1", author: "Ali Hassan", date: "2026-10-10", text: LOREM },
  { id: "seed-2", author: "John Carter", date: "2026-10-15", text: LOREM },
  { id: "seed-3", author: "Ahmed Samir", date: "2026-10-19", text: LOREM },
];
