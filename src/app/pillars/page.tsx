import type { Metadata } from "next";
import { SubPage } from "@/components/page/SubPage";

export const metadata: Metadata = {
  title: "Pillars — CultK",
  description:
    "Four entertainment pillars: AI Comic, Star IP, Short, and Drama.",
};

export default function PillarsPage() {
  return (
    <SubPage
      title="Pillars"
      eyebrow="Four entertainment formats"
      description="AI Comic / Webtoon, AI Star IP Universe, AI Short, and AI Drama. Placeholder page — format deep-dives next."
    />
  );
}
