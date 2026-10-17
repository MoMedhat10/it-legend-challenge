import type { LucideIcon } from "lucide-react";

interface MaterialItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

/** Key/value facts about a course, laid out in two columns from sm up. */
export function CourseMaterials({ title = "Course Materials", items }: { title?: string; items: MaterialItem[] }) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)].filter((column) => column.length > 0);

  return (
    <section aria-labelledby="materials-heading">
      <h2 id="materials-heading" className="mb-5 text-2xl font-semibold text-ink">
        {title}
      </h2>
      <div className="grid gap-x-10 rounded-md bg-white px-6 py-3 shadow-card sm:grid-cols-2">
        {columns.map((column, index) => (
          // When the columns stack on mobile, the first one needs a closing divider.
          <dl key={index} className={index === 0 ? "border-line max-sm:border-b" : undefined}>
            {column.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b border-line py-3.5 text-sm last:border-b-0"
              >
                <dt className="flex items-center gap-2.5 text-ink">
                  <Icon aria-hidden className="size-4 shrink-0" />
                  {label}:
                </dt>
                <dd className="text-right text-body">{value}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
    </section>
  );
}
