import { Container } from "@/components/ui/Container";

const bar = "animate-pulse rounded bg-line";

/** Placeholder with the player page's shape; shown while a navigation resolves the course. */
export function CoursePageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading course">
      <div className="bg-surface py-6 sm:py-8">
        <Container className="flex flex-col gap-4">
          <div className={`${bar} h-4 w-48`} />
          <div className={`${bar} h-8 w-full max-w-md`} />
        </Container>
      </div>
      <Container className="pt-4 lg:pt-6">
        <div className="player-layout">
          <div className="player-layout__video">
            <div className={`${bar} aspect-video w-full rounded-md`} />
          </div>
          <div className="player-layout__actions flex gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`${bar} size-10 rounded-full`} />
            ))}
          </div>
          <div className="player-layout__materials">
            <div className={`${bar} h-48 w-full rounded-md`} />
          </div>
          <div className="player-layout__topics flex flex-col gap-4">
            <div className={`${bar} h-7 w-56`} />
            <div className={`${bar} h-96 w-full rounded-md`} />
          </div>
        </div>
      </Container>
    </div>
  );
}
