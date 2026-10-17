import type { Quiz, QuizQuestion } from "@/lib/types";

const q = (id: string, text: string, options: string[], answerIndex: number): QuizQuestion => ({
  id,
  text,
  options,
  answerIndex,
});

const TEN_MINUTES = 10 * 60;

const quizzes: Record<string, Quiz> = {
  seo: {
    id: "seo",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "What does SEO stand for?", ["Search Engine Optimization", "Site Engagement Output", "Search Entry Order", "Social Engine Operations"], 0),
      q("q2", "Which tag is most important for a page's search title?", ["<h6>", "<title>", "<footer>", "<span>"], 1),
      q("q3", "What is a backlink?", ["A broken link", "A link from another site to yours", "A link in the footer", "An internal anchor"], 1),
      q("q4", "Long-tail keywords are usually…", ["More competitive", "Shorter", "More specific with less competition", "Ignored by Google"], 2),
      q("q5", "Which file tells crawlers which pages not to visit?", ["sitemap.xml", "robots.txt", "index.html", ".htaccess"], 1),
    ],
  },
  javascript: {
    id: "javascript",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "Which keyword declares a block-scoped constant?", ["var", "let", "const", "static"], 2),
      q("q2", "What does typeof null return?", ['"null"', '"object"', '"undefined"', '"number"'], 1),
      q("q3", "Which method adds an item to the end of an array?", ["shift()", "unshift()", "push()", "concat()"], 2),
      q("q4", "What is the result of 2 + '2'?", ["4", '"22"', "NaN", "TypeError"], 1),
      q("q5", "Which runs first?", ["setTimeout(fn, 0)", "A resolved Promise's then()", "They run at the same time", "Depends on the browser"], 1),
    ],
  },
  react: {
    id: "react",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "Which hook stores local component state?", ["useEffect", "useState", "useRef", "useMemo"], 1),
      q("q2", "Props are…", ["Mutable by the child", "Read-only inputs to a component", "Global variables", "Only strings"], 1),
      q("q3", "What should every list item have?", ["An id attribute", "A key prop", "A ref", "A className"], 1),
      q("q4", "When does useEffect with [] run?", ["On every render", "Never", "After the first render", "Before the first render"], 2),
      q("q5", "JSX compiles to…", ["HTML strings", "Function calls that create elements", "CSS", "Web Components"], 1),
    ],
  },
  html: {
    id: "html",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "What does HTML stand for?", ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlinks and Text Manipulation Language", "Home Tool Markup Language"], 0),
      q("q2", "Which element is used for the largest heading?", ["<head>", "<h6>", "<h1>", "<header>"], 2),
      q("q3", "Which attribute provides alternative text for an image?", ["title", "alt", "src", "longdesc"], 1),
      q("q4", "Which element creates a hyperlink?", ["<link>", "<a>", "<href>", "<nav>"], 1),
      q("q5", "Which element groups form controls with a caption?", ["<fieldset>", "<section>", "<div>", "<label>"], 0),
    ],
  },
  css: {
    id: "css",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "Which property makes an element a flex container?", ["position: flex", "display: flex", "flex: 1", "float: flex"], 1),
      q("q2", "box-sizing: border-box includes… in the width", ["Only content", "Padding and border", "Margin", "Nothing"], 1),
      q("q3", "Which unit is relative to the root font size?", ["em", "px", "rem", "vh"], 2),
      q("q4", "Which property defines grid columns?", ["grid-template-columns", "grid-columns", "columns", "grid-auto-flow"], 0),
      q("q5", "Media queries let you…", ["Load images", "Apply styles based on viewport features", "Animate elements", "Import fonts"], 1),
    ],
  },
  python: {
    id: "python",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "Which function prints output?", ["echo()", "print()", "console.log()", "write()"], 1),
      q("q2", "Which type is immutable?", ["list", "dict", "set", "tuple"], 3),
      q("q3", "How do you start a function definition?", ["function", "def", "fn", "lambda:"], 1),
      q("q4", "What does len('hello') return?", ["4", "5", "6", "Error"], 1),
      q("q5", "Which keyword handles exceptions?", ["catch", "except", "rescue", "handle"], 1),
    ],
  },
  typescript: {
    id: "typescript",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "Which type accepts any value but forces checks before use?", ["any", "unknown", "never", "void"], 1),
      q("q2", "What does Partial<T> do?", ["Makes all properties optional", "Removes properties", "Makes properties readonly", "Picks one property"], 0),
      q("q3", "Generics let you…", ["Write untyped code", "Write reusable code that works with many types", "Compile faster", "Avoid interfaces"], 1),
      q("q4", "Which operator narrows by property existence?", ["typeof", "in", "as", "keyof"], 1),
      q("q5", "A function that never returns has return type…", ["void", "undefined", "never", "null"], 2),
    ],
  },
  git: {
    id: "git",
    timeLimitSec: TEN_MINUTES,
    questions: [
      q("q1", "Which command creates a new commit?", ["git push", "git commit", "git add", "git save"], 1),
      q("q2", "What does git pull do?", ["Uploads commits", "Fetches and merges remote changes", "Deletes a branch", "Creates a tag"], 1),
      q("q3", "Which command creates and switches to a branch?", ["git branch -d", "git switch -c", "git merge", "git log"], 1),
      q("q4", "Where are changes placed before committing?", ["The remote", "The staging area", "The stash only", "The reflog"], 1),
      q("q5", "A pull request is…", ["A git command", "A request to merge changes, reviewed on GitHub", "A merge conflict", "A fork"], 1),
    ],
  },
};

export function getQuiz(id: string): Quiz | undefined {
  return quizzes[id];
}
