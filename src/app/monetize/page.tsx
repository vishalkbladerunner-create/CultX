import type { Metadata } from "next";
import { MonetizePage } from "@/components/pages/monetize/MonetizePage";

export const metadata: Metadata = {
  title: "Monetize — CultX",
  description:
    "CultX: direct sales, community IP tokens, and ad revenue. Turn AI creations into income.",
};

export default function Page() {
  return <MonetizePage />;
}
