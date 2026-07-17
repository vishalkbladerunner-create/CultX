import type { Metadata } from "next";
import { PillarsPage } from "@/components/pages/pillars/PillarsPage";

export const metadata: Metadata = {
  title: "Four Experiences — CultK",
  description:
    "AI Comic / Webtoon, Star IP Universe, AI Short, and AI Drama — every major AI entertainment format on one platform.",
};

export default function Page() {
  return <PillarsPage />;
}
