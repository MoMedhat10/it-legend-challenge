import { ProgressSummary } from "@/components/courses/ProgressSummary";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import type { ProgressSeed } from "@/lib/progress";

export function CoursesHero({ seeds }: { seeds: ProgressSeed[] }) {
  return (
    <header className="bg-surface py-8 sm:py-10">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Courses" }]} />
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Explore Courses</h1>
          <p className="text-base leading-relaxed">
            Learn at your own pace with short video lessons, materials and quizzes. Pick a course to
            start, or continue where you left off.
          </p>
        </div>
        <ProgressSummary seeds={seeds} />
      </Container>
    </header>
  );
}
