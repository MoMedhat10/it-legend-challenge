# Course Platform — Courses Page → Course Player

A small course platform built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.
The experience starts on the courses page and ends inside the course player: watching a course video
unlocks its lessons one by one, and progress, quiz answers and comments are saved in the browser.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /courses)

npm run build      # production build
npm run start      # serve the production build
npm run lint
```

## Features

### Courses page — `/courses`

- 8 mock courses. Each card shows a YouTube thumbnail, category, level, title, instructor, short description, video length and lesson count.
- Status badge (**Not started / In progress / Completed**), progress bar with %, and a matching button (**Start course / Continue / Review course**).
- The whole card links to the course player.
- The data is deliberately varied (short and very long titles and descriptions, 5–12 lessons) to test the layout.

### Course player — `/courses/[slug]`

Built to match the Course Player reference (desktop and mobile):

- **Video:** one YouTube video per course through Video.js. The poster and a play button render first. On desktop, YouTube loads only after **Play** is pressed; on touch devices it loads behind the poster once the page is idle, so one tap starts playback with sound. The button resumes from where the student stopped.
- **Fullscreen on iPhone:** iPhone Safari can't put a YouTube iframe in fullscreen, so there the player's fullscreen button stretches the video over the whole screen instead.
- **Lessons are chapters of the video:**
  - Each lesson is a slice of the course video, and a lesson counts as **completed at 90%** watched.
  - Lessons **unlock one by one**. Seeking past the end of the current lesson snaps back.
  - Playback flows straight into the next chapter (auto-next).
  - Clicking an unlocked lesson jumps the video to it.
- **Topics panel:** week cards with lesson rows (**✓ completed / ▶ current / 🔒 locked**), a progress bar with a moving "You" marker, a **Course Summary (PDF)** row and a **Week quiz** row. On desktop the panel is sticky and scrolls on its own.
- **Quiz modal:** countdown timer, numbered question steps, Previous/Next, and a score screen with an answer review and **Retry**. Answers, the current question and time left are saved when the modal closes.
- **PDF modal:** shows the course summary inline, with an "Open in new tab" fallback.
- **Course Materials:** reusable key/value card (instructor, duration, lessons, enrolled, language, level).
- **Comments:** 3 starter comments plus the student's own. New comments are validated (3–500 characters) and saved.
- **Action icons:**
  - Curriculum / Comments scroll to their sections.
  - **Ask a Question** opens a modal whose draft is kept if it's closed by mistake.
  - **Leaderboard** opens a static modal with the instructor's message.
- **Layout:**
  - **Wide mode** (desktop) makes the video full width and moves the topics below it.
  - On **mobile** the video sticks to the top while the content scrolls underneath.

### Other

- `/` redirects to `/courses`; unknown URLs and unknown course slugs show a styled **404** page.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16.4 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, design tokens in `app/globals.css` |
| Video | `@videojs/react` 10 + `@videojs/youtube-video` |
| Icons | `lucide-react` |
| Fonts | Jost via `next/font` (self-hosted, no layout shift) |
| State | React state + `localStorage` (no state library) |

## Project structure

```text
app/
  layout.tsx                 root layout, font, metadata
  globals.css                Tailwind, design tokens, player grid areas
  not-found.tsx              404 page
  courses/
    page.tsx                 courses page (static)
    [slug]/page.tsx          course player page (pre-rendered for every course)
components/
  ui/                        generic building blocks: Modal, Button, Badge, ProgressBar,
                             Breadcrumb, Container, MessageForm
  courses/                   CourseCard, CourseGrid, CourseMeta, CourseProgress, CoursesHero
  player/
    PlayerLayout.tsx         client shell: page grid, wide mode, shared player state
    PlayerContext.tsx        shared player state (started, current chapter, jump to lesson)
    WideMode.tsx             wide-mode state
    PlayerActions.tsx        icon row under the video
    CourseMaterials.tsx      reusable materials card
  video/                     CourseVideo (poster + play), CoursePlayer (Video.js), PlayerSync
  topics/                    CourseTopics, TopicsProgress, LessonRow, PdfRow, QuizRow
  modals/                    QuizModal, PdfModal, AskQuestion, Leaderboard
  comments/                  CourseComments, CommentItem
data/                        mock data: courses, quizzes, comments, leaderboard
lib/
  types.ts                   Course, Week, TopicItem, Quiz, Comment…
  courses.ts                 course lookups, lesson count, thumbnail/poster URLs
  chapters.ts                lessons as chapters, completion and locking rules
  progress.ts                saved progress (furthest second per course), status labels
  storage.ts                 safe localStorage read/write + change subscription
  format.ts                  duration, date and plural formatting
hooks/
  useStoredState.ts          useState that persists to localStorage and syncs across components
  useProgress.ts             useCourseProgress: completed lessons, %, status
  usePreloadOnTouch.ts       loads the video player early on touch devices
  usePseudoFullscreen.ts     fullscreen fallback for iPhone Safari
public/pdfs/                 course summary PDF
```

Generic UI lives in `components/ui`, each feature has its own folder under `components/` (`courses`, `player`, `video`, `topics`, `modals`, `comments`), data lives in `data/`, and logic lives in `lib/` and `hooks/`.

## Architecture decisions

### Rendering and routing

- `/courses` is **static**. Every course page is **pre-rendered at build time** with `generateStaticParams`, so all pages are plain HTML served instantly.
- `/` → `/courses` is a redirect in `next.config.ts`, so no page renders for it.
- `notFound()` handles unknown slugs and returns a real 404.
- **Cache Components (`cacheComponents`) is intentionally off.** With it on, Next.js keeps visited pages mounted but hidden (React `<Activity>`), so the YouTube iframe kept playing audio after navigating away. With it off, leaving the course page removes the player. It also keeps the setup simpler, and every page is still pre-rendered.

### Server vs Client Components

Everything is a Server Component unless it needs the browser:

| Server | Client (and why) |
| --- | --- |
| `courses/page.tsx`, `CourseGrid`, `CourseCard`, `CourseMeta` | `CourseProgress`: reads saved progress |
| `[slug]/page.tsx`, `CourseMaterials`, `CourseTopics` (week cards) | `PlayerLayout`: wide mode + shared player state |
| `Breadcrumb`, `Container`, `CoursesHero` | `CourseVideo`, `CoursePlayer`, `PlayerSync`: the video player |
| | `LessonRow`, `TopicsProgress`, `PdfRow`, `QuizRow`: progress and modals |
| | `CourseComments`, `AskQuestion`, `Leaderboard`, modals: user input |

- `PlayerLayout` is a client component, but it receives the page's sections as **props (slots)**, so `CourseMaterials` and `CourseTopics` stay Server Components inside it.
- The mock data is only imported by Server Components; client components receive small props (e.g. the chapter list).

### Lessons as chapters of one video

- `lib/chapters.ts` turns a course's lessons into chapters. The video length is split evenly across the lessons, or a lesson can set an exact `startSec`.
- Progress is **one saved number per course: the furthest second reached**. Everything else is derived from it:
  - a lesson is **completed** when the furthest second passes 90% of its chapter
  - **unlocked** lessons are the completed ones plus the next one
  - **course %** = completed lessons ÷ total lessons
  - the **seek limit** is the end of the first unfinished lesson
- `PlayerSync` lives inside the Video.js player. It saves the furthest second, snaps back seeks past the limit, applies "jump to lesson" requests, and reports the current chapter.
- `PlayerContext` connects the player and the topics panel, which are separate parts of the page.

### Saved state

- `hooks/useStoredState` works like `useState` but persists to `localStorage`. It's built on `useSyncExternalStore`, which gives two things:
  - **No hydration mismatch:** the server renders the fallback, then the stored value appears after hydration.
  - **Everything stays in sync:** `writeStorage` fires an `app-storage-change` event in the current tab, and the browser's `storage` event covers other tabs.
- Saved keys: `course-progress:v5`, `comments:{slug}`, `quiz:{slug}:{week}`, `ask-question-draft:{slug}`, `player-wide-mode`.
- All storage access is wrapped in `try/catch`, so a blocked `localStorage` (e.g. private mode) never breaks the page.

### UI building blocks

- **One `Modal`** built on the native `<dialog>` element:
  - focus trapping, Esc to close and the backdrop come from the browser
  - the component adds scroll locking, a click on the backdrop to close, and returning focus to the trigger
  - it's used for the quiz, PDF, Ask a Question and the leaderboard
- **One `MessageForm`** (textarea, validation, character counter, status messages) is shared by comments and Ask a Question.
- **Layout:** the player grid uses CSS grid areas in `globals.css`. This gives the mobile reading order from the design (video → materials → topics → comments) and the wide-mode layout without duplicating markup.

### Images and performance

- **Thumbnails and posters** come from YouTube's image CDN through `next/image`:
  - `remotePatterns` is restricted to `i.ytimg.com/vi/**`
  - images are served as AVIF/WebP with accurate `sizes`
- **Cards** use `hqdefault`, which exists for every video, cropped to 16:9. **Player posters** use `maxresdefault`, checked to exist for every course.
- **LCP image:** only the first card thumbnail and the player poster get `fetchPriority="high"`; everything else lazy-loads.
- **CLS:** fixed `aspect-video` boxes keep layout shift at 0.
- **Video facade:** Video.js and the YouTube embed (~1 MB) are in their own chunk (`next/dynamic`, `ssr: false`). On desktop they load only after **Play** is pressed.
- **Touch devices:** iOS only allows sound if playback starts within about a second of the tap, and loading the player takes longer. So `usePreloadOnTouch` loads the player behind the poster after the page is idle (`requestIdleCallback`), and the tap then plays immediately.
- **Font:** a single family (Jost), self-hosted with `next/font`.
- **Data:** every YouTube id was checked with YouTube's oEmbed endpoint (exists and allows embedding), and every video length is the real one.

**Lighthouse, production build:**

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| `/courses` — mobile | 97 | 100 | 100 | 100 | 2.5 s | 0 |
| `/courses` — desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 |
| `/courses/[slug]` — mobile | 98 | 100 | 96 | 100 | 2.3 s | 0 |
| `/courses/[slug]` — desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 |

Total blocking time is 0 ms, except 20 ms on the mobile course page. There, Best practices is 96 because the preloaded YouTube player sets third-party cookies, which Lighthouse reports as an issue.

### Accessibility

- **Semantic structure:** `main`, `header`, `nav[aria-label=Breadcrumb]`, sections with headings, lists, `article` cards, and `dl` for facts.
- **One link per card:** the button's overlay stretches across the whole card, so there are no nested or duplicate links.
- **Lessons:** lesson rows are real buttons. Locked ones are `disabled`, the current one has `aria-current="step"`, and each row has screen-reader text for its state.
- **Progress bars** use `role="progressbar"` with values and labels.
- **Forms** use labels, `aria-invalid`, error messages, and live status text.
- **Quiz** answers are real radio inputs inside a `fieldset`/`legend`.
- **Colour contrast:** text and controls pass WCAG AA. The reference teal `#41b69d` reaches only 2.5:1 with white text, so it's used only for decorative fills; buttons and text use `#237a65` (5.2:1). The quiz's selected answer uses `#5366e0` (4.8:1).
- **Interaction:** visible focus rings, `prefers-reduced-motion` support, and tap targets of at least 44px for buttons and 24px for small links.

### Responsive

- **Breakpoints:** courses grid of 1 → 2 → 3 → 4 columns; the player is one column on mobile and two columns from `lg`.
- **Tested** at 320, 375/390, 768/820, 1024 and 1440px with no horizontal scroll. Long titles and descriptions are clamped.

