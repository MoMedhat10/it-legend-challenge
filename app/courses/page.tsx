import type { Metadata } from "next";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { Container } from "@/components/ui/Container";
import { getAllCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse all courses and continue where you left off.",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <main id="main" className="flex-1 pb-16">
      <Container>
        <section aria-labelledby="all-courses-heading" className="pt-10">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="all-courses-heading" className="text-2xl font-semibold text-ink">
              All Courses
            </h2>
            <p className="text-sm text-muted">{courses.length} courses</p>
          </div>
          <CourseGrid courses={courses} />
        </section>
      </Container>
    </main>
  );
}
