import type { Course, Lesson } from "@/lib/types";

/*
 * Mock catalogue. Every YouTube id was checked against YouTube's oEmbed
 * endpoint to make sure the video exists and allows embedding.
 * Lessons are chapters of the videos (startSec + durationSec).
 */

const video = (
  id: string,
  title: string,
  youtubeId: string,
  startSec: number,
  durationSec: number,
  locked = false,
): Lesson => ({ id, title, type: "video", youtubeId, startSec, durationSec, locked });

const pdf = (id: string, title: string): Lesson => ({ id, title, type: "pdf" });

const exam = (id: string, title: string, questionCount: number, minutes: number): Lesson => ({
  id,
  title,
  type: "exam",
  questionCount,
  durationSec: minutes * 60,
});

const SEO = "DvwS7cV9GmQ";
const PHP = "OK_JCtrrv-c";
const JS_FULL = "PkZNo7MFNFg";
const JS_100 = "DHjqpvDnNGE";
const JS_CRASH = "hdI2bqOjy3c";
const EVENT_LOOP = "8aGhZQkoFbQ";
const REACT_FULL = "bMknfKXIFA8";
const REACT_100 = "Tn6-PIqc4UM";
const REACT_CRASH = "w7ejDZ8SWv8";
const HTML_FULL = "pQN-pnXPaVg";
const CSS_FULL = "1Rs2ND1ryYc";
const FRONTEND_BOOTCAMP = "zJSY8tbf_ys";
const PYTHON_FULL = "rfscVS0vtbw";
const PYTHON_100 = "x7X9w_GIm1s";
const TS_FULL = "30LWjhZzg50";
const TS_100 = "zQnBQ4tB3ZA";
const GIT = "RGOj5yH7evk";

const storyDescription = "Advanced story telling techniques for writers: Personas, Characters & Plots";

export const courses: Course[] = [
  {
    slug: "starting-seo-home-based-business",
    title: "Starting SEO as your Home Based Business",
    description:
      "Learn how search engines rank pages, find keywords people actually search for, and turn organic traffic into a business you can run from home.",
    instructor: "Edward Norton",
    category: "Marketing",
    level: "Beginner",
    language: "English",
    enrolled: 65,
    youtubeId: SEO,
    seedCompletedLessons: 5,
    weeks: [
      {
        id: "week-1-4",
        title: "Week 1-4",
        description: storyDescription,
        lessons: [
          video("w1-l1", "Introduction", SEO, 0, 420),
          video("w1-l2", "Course Overview", SEO, 420, 540),
          exam("w1-l3", "Course Overview", 0, 10),
          pdf("w1-l4", "Course Exercise / Reference Files"),
          video("w1-l5", "Code Editor Installation (Optional if you have one)", PHP, 300, 600),
          video("w1-l6", "Embedding PHP in HTML", PHP, 900, 720, true),
        ],
      },
      {
        id: "week-5-8",
        title: "Week 5-8",
        description: storyDescription,
        lessons: [
          video("w5-l1", "Defining Functions", PHP, 6000, 660, true),
          video("w5-l2", "Function Parameters", PHP, 6660, 540, true),
          exam("w5-l3", "Return Values From Functions", 2, 15),
          video("w5-l4", "Global Variable and Scope", PHP, 7200, 600, true),
          video("w5-l5", "Newer Way of creating a Constant", PHP, 7800, 480, true),
          video("w5-l6", "Constants", PHP, 8280, 420, true),
        ],
      },
    ],
  },
  {
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "Variables, functions, arrays, objects and the event loop, explained from first principles with small exercises after every topic.",
    instructor: "Sarah Mitchell",
    category: "Development",
    level: "Beginner",
    language: "English",
    enrolled: 1240,
    youtubeId: JS_FULL,
    seedCompletedLessons: 10,
    weeks: [
      {
        id: "week-1",
        title: "Week 1",
        description: "Core syntax and how JavaScript runs in the browser.",
        lessons: [
          video("w1-l1", "JavaScript in 100 Seconds", JS_100, 0, 120),
          video("w1-l2", "Variables and Data Types", JS_FULL, 600, 900),
          video("w1-l3", "Strings and Template Literals", JS_FULL, 1500, 780),
          video("w1-l4", "Functions and Scope", JS_FULL, 2280, 1020),
          exam("w1-l5", "Syntax Check", 5, 10),
        ],
      },
      {
        id: "week-2",
        title: "Week 2",
        description: "Working with collections and asynchronous code.",
        lessons: [
          video("w2-l1", "Arrays and Loops", JS_CRASH, 1800, 840),
          video("w2-l2", "Objects and JSON", JS_CRASH, 2640, 720),
          video("w2-l3", "The DOM", JS_CRASH, 3360, 960),
          video("w2-l4", "What the Heck is the Event Loop?", EVENT_LOOP, 0, 1560),
          exam("w2-l5", "Final Quiz", 10, 20),
        ],
      },
    ],
  },
  {
    slug: "react-from-zero",
    title: "React From Zero to Your First App",
    description: "Components, props, state and hooks. Build three small projects and ship one.",
    instructor: "Omar Haddad",
    category: "Development",
    level: "Intermediate",
    language: "English",
    enrolled: 860,
    youtubeId: REACT_FULL,
    seedCompletedLessons: 3,
    weeks: [
      {
        id: "week-1",
        title: "Week 1",
        description: "Thinking in components.",
        lessons: [
          video("w1-l1", "React in 100 Seconds", REACT_100, 0, 130),
          video("w1-l2", "JSX and Components", REACT_FULL, 300, 1200),
          video("w1-l3", "Props", REACT_FULL, 1500, 960),
          pdf("w1-l4", "Project Starter Files"),
        ],
      },
      {
        id: "week-2",
        title: "Week 2",
        description: "State, effects and data.",
        lessons: [
          video("w2-l1", "useState", REACT_CRASH, 2400, 900),
          video("w2-l2", "useEffect and Fetching Data", REACT_CRASH, 3300, 1080),
          video("w2-l3", "Forms and Controlled Inputs", REACT_FULL, 9000, 1140),
          exam("w2-l4", "Hooks Quiz", 8, 15),
        ],
      },
    ],
  },
  {
    slug: "html-essentials",
    title: "HTML Essentials",
    description: "Semantic, accessible markup.",
    instructor: "Lina Farouk",
    category: "Development",
    level: "Beginner",
    language: "English",
    enrolled: 2310,
    youtubeId: HTML_FULL,
    seedCompletedLessons: 0,
    weeks: [
      {
        id: "week-1",
        title: "Week 1",
        description: "The building blocks of every web page.",
        lessons: [
          video("w1-l1", "Document Structure", HTML_FULL, 0, 840),
          video("w1-l2", "Text, Links and Images", HTML_FULL, 840, 1320),
          video("w1-l3", "Forms and Inputs", HTML_FULL, 4200, 1500),
          exam("w1-l4", "HTML Quiz", 6, 10),
        ],
      },
    ],
  },
  {
    slug: "modern-css-layouts",
    title: "Modern CSS Layouts: Flexbox, Grid and Responsive Design for Real-World Interfaces",
    description:
      "Stop fighting your stylesheets. This course walks through the box model, Flexbox, CSS Grid, fluid typography and container queries, then puts it all together by rebuilding three production landing pages that work on every screen size, from a small phone to an ultra-wide monitor.",
    instructor: "Daniel Okafor",
    category: "Design",
    level: "Intermediate",
    language: "English",
    enrolled: 540,
    youtubeId: CSS_FULL,
    seedCompletedLessons: 0,
    weeks: [
      {
        id: "week-1",
        title: "Week 1",
        description: "Foundations of layout.",
        lessons: [
          video("w1-l1", "The Box Model", CSS_FULL, 1800, 1080),
          video("w1-l2", "Flexbox", CSS_FULL, 12600, 1800),
          video("w1-l3", "CSS Grid", CSS_FULL, 18000, 2100),
        ],
      },
      {
        id: "week-2",
        title: "Week 2",
        description: "Responsive patterns.",
        lessons: [
          video("w2-l1", "Media Queries", FRONTEND_BOOTCAMP, 9000, 1500),
          video("w2-l2", "Fluid Typography", FRONTEND_BOOTCAMP, 10500, 900),
          pdf("w2-l3", "Landing Page Assets"),
          exam("w2-l4", "Layout Challenge", 12, 30),
        ],
      },
    ],
  },
  {
    slug: "python-for-everyone",
    title: "Python for Everyone",
    description:
      "A gentle, hands-on introduction to programming with Python. No experience needed, just curiosity.",
    instructor: "Priya Raman",
    category: "Development",
    level: "Beginner",
    language: "English",
    enrolled: 3120,
    youtubeId: PYTHON_FULL,
    seedCompletedLessons: 2,
    weeks: [
      {
        id: "week-1-2",
        title: "Week 1-2",
        description: "Getting set up and writing your first programs.",
        lessons: [
          video("w1-l1", "Python in 100 Seconds", PYTHON_100, 0, 140),
          video("w1-l2", "Installing Python", PYTHON_FULL, 0, 660),
          video("w1-l3", "Your First Program", PYTHON_FULL, 660, 480),
          video("w1-l4", "Variables", PYTHON_FULL, 1140, 600),
          video("w1-l5", "Strings", PYTHON_FULL, 1740, 720),
          exam("w1-l6", "Basics Quiz", 5, 10),
        ],
      },
      {
        id: "week-3-4",
        title: "Week 3-4",
        description: "Control flow and data structures.",
        lessons: [
          video("w3-l1", "Lists", PYTHON_FULL, 3600, 780),
          video("w3-l2", "Tuples", PYTHON_FULL, 4380, 420),
          video("w3-l3", "Functions", PYTHON_FULL, 4800, 900),
          video("w3-l4", "If Statements", PYTHON_FULL, 5700, 840),
          video("w3-l5", "Dictionaries", PYTHON_FULL, 6540, 600),
          pdf("w3-l6", "Cheat Sheet"),
        ],
      },
      {
        id: "week-5-6",
        title: "Week 5-6",
        description: "Loops, files and classes.",
        lessons: [
          video("w5-l1", "While and For Loops", PYTHON_FULL, 7200, 1080),
          video("w5-l2", "Reading Files", PYTHON_FULL, 11400, 720),
          video("w5-l3", "Classes and Objects", PYTHON_FULL, 13800, 900),
          exam("w5-l4", "Final Exam", 15, 30),
        ],
      },
    ],
  },
  {
    slug: "typescript-in-practice",
    title: "TypeScript in Practice",
    description:
      "Add types to real JavaScript code: interfaces, generics, narrowing and the patterns you will meet in every React codebase.",
    instructor: "Youssef Adel",
    category: "Development",
    level: "Advanced",
    language: "English",
    enrolled: 410,
    youtubeId: TS_FULL,
    seedCompletedLessons: 4,
    weeks: [
      {
        id: "week-1",
        title: "Week 1",
        description: "The type system.",
        lessons: [
          video("w1-l1", "TypeScript in 100 Seconds", TS_100, 0, 140),
          video("w1-l2", "Basic Types", TS_FULL, 600, 1200),
          video("w1-l3", "Interfaces vs Types", TS_FULL, 1800, 900),
          video("w1-l4", "Generics", TS_FULL, 2700, 1500),
          video("w1-l5", "Narrowing", TS_FULL, 4200, 960),
          exam("w1-l6", "Types Quiz", 10, 20),
        ],
      },
    ],
  },
  {
    slug: "git-and-github-basics",
    title: "Git & GitHub Basics",
    description:
      "Commit, branch, merge and open your first pull request. Everything you need to work on a team.",
    instructor: "Mona Saleh",
    category: "Tools",
    level: "Beginner",
    language: "English",
    enrolled: 1780,
    youtubeId: GIT,
    seedCompletedLessons: 0,
    weeks: [
      {
        id: "week-1",
        title: "Week 1",
        description: "Version control in one week.",
        lessons: [
          video("w1-l1", "What is Git?", GIT, 0, 540),
          video("w1-l2", "Branches and Merging", GIT, 1800, 900),
          video("w1-l3", "Pull Requests on GitHub", GIT, 2700, 780),
        ],
      },
    ],
  },
];
