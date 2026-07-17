import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about/AboutPage";

export const metadata: Metadata = {
  title: "About / AI Center — CultK",
  description:
    "CultK AI Center in Gangnam, Seoul — creator-first culture, Nonce-inspired community, K-digital entertainment for the world.",
};

export default function Page() {
  return <AboutPage />;
}
