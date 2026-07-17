import type { Metadata } from "next";
import { SubPage } from "@/components/page/SubPage";

export const metadata: Metadata = {
  title: "Platform — CultK",
  description:
    "CultK platform overview — AI-native IP creation and monetization.",
};

export default function PlatformPage() {
  return (
    <SubPage
      title="Platform"
      eyebrow="Create · Publish · Grow · Earn"
      description="The all-in-one CultK platform loop. Placeholder page — product sections will land here."
    />
  );
}
