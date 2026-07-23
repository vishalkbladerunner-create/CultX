import type { Metadata } from "next";
import { KDramaPage } from "@/components/pages/kdrama/KDramaPage";

export const metadata: Metadata = {
  title: "AI Drama Engine — CultX Pillars",
  description:
    "Reimagining K-Drama production through generative pre-visualization, AI-augmented filmmaking, and direct-to-fan showrunning.",
};

export default function Page() {
  return <KDramaPage />;
}
