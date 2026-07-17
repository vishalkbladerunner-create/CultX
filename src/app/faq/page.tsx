import type { Metadata } from "next";
import { SubPage } from "@/components/page/SubPage";

export const metadata: Metadata = {
  title: "FAQ — CultK",
  description: "Frequently asked questions about the CultK platform.",
};

export default function FaqPage() {
  return (
    <SubPage
      title="FAQ"
      eyebrow="Answers"
      description="Common questions about CultK. Placeholder page — full FAQ content next (home still carries the accordion)."
    />
  );
}
