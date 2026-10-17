import { CourseCard } from "@/components/courses/CourseCard";
import type { Course } from "@/lib/types";

/** Cards in the first row on wide screens load eagerly (likely LCP). */
const EAGER_CARDS = 4;

export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course, index) => (
        <li key={course.slug}>
          <CourseCard course={course} eager={index < EAGER_CARDS} highPriority={index === 0} />
        </li>
      ))}
    </ul>
  );
}
