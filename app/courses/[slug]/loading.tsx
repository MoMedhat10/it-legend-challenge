import { CoursePageSkeleton } from "@/components/player/CoursePageSkeleton";

/** Suspense fallback for the course page: shows instantly while the course params resolve. */
export default function Loading() {
  return (
    <main id="main" className="flex-1 pb-16">
      <CoursePageSkeleton />
    </main>
  );
}
