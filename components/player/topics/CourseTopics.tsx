import { LessonRow } from "@/components/player/topics/LessonRow";
import { PdfRow } from "@/components/player/topics/PdfRow";
import { QuizRow } from "@/components/player/topics/QuizRow";
import { TopicsProgress } from "@/components/player/topics/TopicsProgress";
import { getQuiz } from "@/data/quizzes";
import { getProgressSeed } from "@/lib/courses";
import type { Course, TopicItem, Week } from "@/lib/types";

export function CourseTopics({ course }: { course: Course }) {
  return (
    <section id="curriculum" aria-labelledby="curriculum-heading" className="player-anchor">
      <h2 id="curriculum-heading" className="text-2xl font-semibold text-ink">
        Topics for This Course
      </h2>
      <TopicsProgress seed={getProgressSeed(course)} />
      <div className="mt-4 flex flex-col gap-6">
        {course.weeks.map((week) => (
          <WeekCard key={week.id} week={week} course={course} />
        ))}
      </div>
    </section>
  );
}

function WeekCard({ week, course }: { week: Week; course: Course }) {
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
          <TopicRow key={item.id} item={item} course={course} />
        ))}
      </ol>
    </section>
  );
}

function TopicRow({ item, course }: { item: TopicItem; course: Course }) {
  switch (item.type) {
    case "lesson":
      return <LessonRow lesson={item} />;
    case "pdf":
      return <PdfRow title={item.title} file={item.file} courseTitle={course.title} />;
    case "quiz": {
      const quiz = getQuiz(item.quizId);
      if (!quiz) return null;
      return <QuizRow title={item.title} quiz={quiz} storageKey={`quiz:${course.slug}:${item.id}`} />;
    }
  }
}
