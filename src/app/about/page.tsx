import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about/AboutPage";

export const metadata: Metadata = {
  title: "About / AI Center — CultX",
  description:
    "CultX AI Center in Gangnam, Seoul — creator-first culture, Nonce-inspired community, K-digital entertainment for the world.",
};

export default function Page() {
  return <AboutPage />;
}
