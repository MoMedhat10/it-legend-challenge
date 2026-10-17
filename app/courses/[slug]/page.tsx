import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlayerLayout } from "@/components/player/PlayerLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  return { title: course?.title ?? "Course not found", description: course?.description };
}

export default async function CoursePlayerPage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <main id="main" className="flex-1 pb-16">
      <header className="bg-surface py-6 sm:py-8">
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
      </header>

      <Container className="pt-4 lg:pt-6">
        <PlayerLayout
          video={<div className="aspect-video rounded-md bg-ink" />}
          actions={null}
          materials={null}
          topics={null}
          comments={null}
        />
      </Container>
    </main>
  );
}
