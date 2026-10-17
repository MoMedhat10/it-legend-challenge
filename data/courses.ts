import type { Course, TopicItem, Week } from "@/lib/types";

/*
 * Mock catalogue. Every course plays one YouTube video; ids were checked
 * against YouTube's oEmbed endpoint (exists + embeddable) and
 * videoDurationSec is the real video length.
 */

const SUMMARY_PDF = "/pdfs/course-summary.pdf";

const lesson = (
  id: string,
  title: string,
  extra: Omit<Extract<TopicItem, { type: "lesson" }>, "id" | "title" | "type"> = { locked: true },
): TopicItem => ({ id, title, type: "lesson", ...extra });

const pdf = (id: string): TopicItem => ({ id, title: "Course Summary (PDF)", type: "pdf", file: SUMMARY_PDF });

const quiz = (id: string, title: string, quizId: string): TopicItem => ({ id, title, type: "quiz", quizId });

/** First week: summary PDF, the current lesson, locked lessons, then the week quiz. */
const firstWeek = (title: string, description: string, quizId: string, lessons: string[]): Week => {
  const [current, ...rest] = lessons;
  return {
    id: "week-1",
    title,
    description,
    items: [
      pdf("w1-pdf"),
      lesson("w1-l1", current, { current: true, questionCount: 0, durationMin: 30 }),
      ...rest.map((name, i) => lesson(`w1-l${i + 2}`, name)),
      quiz("w1-quiz", `${title}: Questions`, quizId),
    ],
  };
};

const nextWeek = (index: number, title: string, description: string, quizId: string, lessons: string[]): Week => ({
  id: `week-${index}`,
  title,
  description,
  items: [
    ...lessons.map((name, i) => lesson(`w${index}-l${i + 1}`, name)),
    quiz(`w${index}-quiz`, `${title}: Questions`, quizId),
  ],
});

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
    durationLabel: "3 weeks",
    youtubeId: "DvwS7cV9GmQ",
    videoDurationSec: 1179,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-4", storyDescription, "seo", [
        "Introduction",
        "Course Overview",
        "Course Exercise / Reference Files",
        "Code Editor Installation (Optional if you have one)",
        "Embedding PHP in HTML",
      ]),
      nextWeek(2, "Week 5-8", storyDescription, "seo", [
        "Defining Functions",
        "Function Parameters",
        "Return Values From Functions",
        "Global Variable and Scope",
        "Newer Way of creating a Constant",
        "Constants",
      ]),
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
    durationLabel: "4 weeks",
    youtubeId: "PkZNo7MFNFg",
    videoDurationSec: 12403,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-2", "Core syntax and how JavaScript runs in the browser.", "javascript", [
        "Getting Started",
        "Variables and Data Types",
        "Strings and Template Literals",
        "Functions and Scope",
      ]),
      nextWeek(2, "Week 3-4", "Working with collections and the DOM.", "javascript", [
        "Arrays and Loops",
        "Objects and JSON",
        "The DOM",
        "The Event Loop",
      ]),
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
    durationLabel: "4 weeks",
    youtubeId: "bMknfKXIFA8",
    videoDurationSec: 42927,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-2", "Thinking in components.", "react", ["Why React?", "JSX and Components", "Props"]),
      nextWeek(2, "Week 3-4", "State, effects and data.", "react", [
        "useState",
        "useEffect and Fetching Data",
        "Forms and Controlled Inputs",
      ]),
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
    durationLabel: "4 weeks",
    youtubeId: "pQN-pnXPaVg",
    videoDurationSec: 7351,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-2", "Create your first page and learn the essential tags.", "html", [
        "Document Structure",
        "Head and Text",
        "Lists and Links",
        "Images",
      ]),
      nextWeek(2, "Week 3-4", "Structure real pages with semantic tags, tables, and forms.", "html", [
        "Semantic Tags",
        "Tables",
        "Forms and Inputs",
        "Final Project",
      ]),
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
    durationLabel: "6 weeks",
    youtubeId: "1Rs2ND1ryYc",
    videoDurationSec: 22718,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-2", "Foundations of layout.", "css", ["The Box Model", "Flexbox", "CSS Grid"]),
      nextWeek(2, "Week 3-4", "Responsive patterns.", "css", ["Media Queries", "Fluid Typography", "Container Queries"]),
      nextWeek(3, "Week 5-6", "Putting it all together.", "css", ["Landing Page One", "Landing Page Two", "Landing Page Three"]),
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
    durationLabel: "6 weeks",
    youtubeId: "rfscVS0vtbw",
    videoDurationSec: 16012,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-2", "Getting set up and writing your first programs.", "python", [
        "Installing Python",
        "Your First Program",
        "Variables",
        "Strings",
      ]),
      nextWeek(2, "Week 3-4", "Control flow and data structures.", "python", [
        "Lists",
        "Tuples",
        "Functions",
        "If Statements",
        "Dictionaries",
      ]),
      nextWeek(3, "Week 5-6", "Loops, files and classes.", "python", [
        "While and For Loops",
        "Reading Files",
        "Classes and Objects",
      ]),
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
    durationLabel: "4 weeks",
    youtubeId: "30LWjhZzg50",
    videoDurationSec: 17185,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-2", "The type system.", "typescript", ["Basic Types", "Interfaces vs Types"]),
      nextWeek(2, "Week 3-4", "Advanced patterns.", "typescript", ["Generics", "Narrowing", "Utility Types"]),
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
    durationLabel: "4 weeks",
    youtubeId: "RGOj5yH7evk",
    videoDurationSec: 4110,
    seedWatchedPercent: 0,
    weeks: [
      firstWeek("Week 1-2", "Track changes and work with branches.", "git", [
        "What is Git?",
        "Commits and History",
        "Branches and Merging",
      ]),
      nextWeek(2, "Week 3-4", "Collaborate with your team on GitHub.", "git", [
        "Remotes and Pushing",
        "Pull Requests on GitHub",
        "Resolving Conflicts",
      ]),
    ],
  },
];
