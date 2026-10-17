import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded-sm hover:text-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-medium">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight aria-hidden className="size-3.5 text-muted" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
