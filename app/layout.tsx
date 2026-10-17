import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Courses",
    template: "%s | Courses",
  },
  description: "Browse courses, track your progress and pick up where you left off.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">{children}</body>
    </html>
  );
}
