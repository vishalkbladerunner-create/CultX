import type { Metadata } from "next";
import { SubPage } from "@/components/page/SubPage";

export const metadata: Metadata = {
  title: "Star IPs — CultK",
  description: "CultK star IPs — Pucca, B.Duck, Ponke, Mew, and more.",
};

export default function StarsPage() {
  return (
    <SubPage
      title="Star IPs"
      eyebrow="Partners & legends"
      description="Pucca, B.Duck, Ponke, Mew — and more to come. Placeholder page — partner stories next."
    />
  );
}
