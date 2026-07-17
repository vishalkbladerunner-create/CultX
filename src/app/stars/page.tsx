import type { Metadata } from "next";
import { StarsPage } from "@/components/pages/stars/StarsPage";

export const metadata: Metadata = {
  title: "Star IPs — CultX",
  description:
    "Iconic characters on CultX: Pucca, B.Duck, Ponke, Mew — plus USDT cards, IP robots, and merch.",
};

export default function Page() {
  return <StarsPage />;
}
