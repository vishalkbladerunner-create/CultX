import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import { ScrollBackground } from "@/components/background/ScrollBackground";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CultK — Where IPs Become Legends",
  description:
    "AI-native IP creation and monetization platform. Create, publish, grow, and earn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoNarrow.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <ScrollBackground />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
