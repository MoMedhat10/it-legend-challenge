import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChartNoAxesColumn, Clock, Globe, GraduationCap, Library, UserRound } from "lucide-react";
import { CourseMaterials } from "@/components/player/CourseMaterials";
import { PlayerActions } from "@/components/player/PlayerActions";
import { PlayerLayout } from "@/components/player/PlayerLayout";
import { CourseVideo } from "@/components/player/video/CourseVideo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import {
  getAllCourses,
  getCourseBySlug,
  getLessonCount,
  getPosterUrl,
  getProgressSeed,
  getYouTubeUrl,
} from "@/lib/courses";

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
          video={
            <CourseVideo
              title={course.title}
              src={getYouTubeUrl(course)}
              poster={getPosterUrl(course)}
              seed={getProgressSeed(course)}
            />
          }
          actions={<PlayerActions />}
          materials={
            <CourseMaterials
              items={[
                { icon: UserRound, label: "Instructor", value: course.instructor },
                { icon: Clock, label: "Duration", value: course.durationLabel },
                { icon: Library, label: "Lessons", value: String(getLessonCount(course)) },
                { icon: GraduationCap, label: "Enrolled", value: `${course.enrolled.toLocaleString("en-US")} students` },
                { icon: Globe, label: "Language", value: course.language },
                { icon: ChartNoAxesColumn, label: "Level", value: course.level },
              ]}
            />
          }
          topics={null}
          comments={null}
        />
      </Container>
    </main>
  );
}
