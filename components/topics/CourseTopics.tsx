import { LessonRow } from "@/components/topics/LessonRow";
import { PdfRow } from "@/components/topics/PdfRow";
import { QuizRow } from "@/components/topics/QuizRow";
import { TopicsProgress } from "@/components/topics/TopicsProgress";
import { getQuiz } from "@/data/quizzes";
import { getChapters, type Chapter } from "@/lib/chapters";
import type { Course, TopicItem, Week } from "@/lib/types";

export function CourseTopics({ course }: { course: Course }) {
  const chapters = getChapters(course);
  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="player-anchor lg:sticky lg:top-6 lg:flex lg:max-h-[calc(100dvh-7rem)] lg:flex-col"
    >
      <h2 id="curriculum-heading" className="text-2xl font-semibold text-ink">
        Topics for This Course
      </h2>
      <TopicsProgress slug={course.slug} chapters={chapters} />
      <div
        role="region"
        aria-label="Course topics"
        tabIndex={0}
        className="mt-4 flex flex-col gap-6 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
      >
        {course.weeks.map((week) => (
          <WeekCard key={week.id} week={week} course={course} chapters={chapters} />
        ))}
      </div>
    </section>
  );
}

function WeekCard({ week, course, chapters }: { week: Week; course: Course; chapters: Chapter[] }) {
  const headingId = `${week.id}-title`;
  return (
    <section aria-labelledby={headingId} className="rounded-md border border-line bg-white px-3 pb-2 pt-5">
      <div className="px-3 pb-3">
        <h3 id={headingId} className="text-lg font-semibold text-ink">
          {week.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{week.description}</p>
      </div>
      <ol className="divide-y divide-line border-t border-line">
        {week.items.map((item) => (
          <TopicRow key={item.id} item={item} course={course} chapters={chapters} />
        ))}
      </ol>
    </section>
  );
}

function TopicRow({ item, course, chapters }: { item: TopicItem; course: Course; chapters: Chapter[] }) {
  switch (item.type) {
    case "lesson":
      return <LessonRow slug={course.slug} chapters={chapters} index={chapters.findIndex((c) => c.id === item.id)} />;
    case "pdf":
      return <PdfRow title={item.title} file={item.file} courseTitle={course.title} />;
    case "quiz": {
      const quiz = getQuiz(item.quizId);
      if (!quiz) return null;
      return <QuizRow title={item.title} quiz={quiz} storageKey={`quiz:${course.slug}:${item.id}`} />;
    }
  }
}
