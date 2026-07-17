import type { Metadata } from "next";
import { Space_Grotesk, Archivo_Narrow } from "next/font/google";
import { ScrollBackground } from "@/components/background/ScrollBackground";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CultX — Where IPs Become Legends",
  description:
    "AI-native IP creation and monetization. Webtoon, Star IP, Shorts, Drama — create, publish, grow, and earn. Built in Korea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${archivoNarrow.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <ScrollBackground />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
