import type { Metadata } from "next";
import { SubPage } from "@/components/page/SubPage";

export const metadata: Metadata = {
  title: "Monetize — CultK",
  description:
    "Creator earn paths on CultK — direct sales, IP tokens, and ad revenue.",
};

export default function MonetizePage() {
  return (
    <SubPage
      title="Monetize"
      eyebrow="Create IP → Earn"
      description="Direct sales, community IP tokens, and ad revenue. Placeholder page — monetization detail next."
    />
  );
}
