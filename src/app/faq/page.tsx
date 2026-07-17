import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/faq/FaqPage";

export const metadata: Metadata = {
  title: "FAQ — CultK",
  description:
    "What CultK is, how creators earn, star IPs, the Gangnam AI Center, and how to join the waitlist.",
};

export default function Page() {
  return <FaqPage />;
}
