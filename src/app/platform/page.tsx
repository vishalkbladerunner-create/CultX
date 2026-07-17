import type { Metadata } from "next";
import { PlatformPage } from "@/components/pages/platform/PlatformPage";

export const metadata: Metadata = {
  title: "Platform — CultK",
  description:
    "Create IP → publish → grow → engage → monetize. One platform for AI entertainment and CultX earn paths.",
};

export default function Page() {
  return <PlatformPage />;
}
