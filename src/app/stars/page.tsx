import type { Metadata } from "next";
import { StarsPage } from "@/components/pages/stars/StarsPage";

export const metadata: Metadata = {
  title: "Star IPs — CultK",
  description:
    "Iconic characters on CultK: Pucca, B.Duck, Ponke, Mew — plus USDT cards, IP robots, and merch.",
};

export default function Page() {
  return <StarsPage />;
}
