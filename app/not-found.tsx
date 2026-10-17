import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main id="main" className="flex-1 pb-16">
      <header className="bg-surface py-8 sm:py-10">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-strong">Error 404</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Page not found</h1>
        </Container>
      </header>
      <Container className="flex flex-col items-start gap-6 pt-10">
        <p className="max-w-xl text-base leading-relaxed">
          The page you are looking for does not exist or may have been moved. Browse the catalogue to find a
          course.
        </p>
        <ButtonLink href="/courses">
          <ArrowLeft aria-hidden className="size-4" />
          Back to courses
        </ButtonLink>
      </Container>
    </main>
  );
}
