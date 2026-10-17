import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getCourseBySlug(slug)?.title ?? "Course not found" };
}

// Placeholder until the Course Player is built.
export default async function CoursePlayerPage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <main id="main" className="flex-1">
      <div className="bg-surface py-6">
        <Container className="flex flex-col gap-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: "Course Details" },
            ]}
          />
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{course.title}</h1>
        </Container>
      </div>
      <Container className="flex flex-col items-start gap-4 py-10">
        <p>The course player is coming next.</p>
        <ButtonLink href="/courses" variant="outline">
          Back to courses
        </ButtonLink>
      </Container>
    </main>
  );
}
