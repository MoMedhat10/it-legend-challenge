import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong";

const variants: Record<Variant, string> = {
  primary: "bg-brand-strong text-white hover:bg-brand-stronger",
  outline: "border border-brand-strong text-brand-strong hover:bg-brand-soft",
};

export function buttonStyles(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles(variant, className)} {...props} />;
}
