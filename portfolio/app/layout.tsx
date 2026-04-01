import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Camila Copo Amador",
  description:
    "Learner, developer & visual storyteller — building, creating, and learning.",
  openGraph: {
    title: "Camila Copo Amador",
    description: "Learner, developer & visual storyteller.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}