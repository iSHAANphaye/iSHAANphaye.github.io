import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { PROFILE } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.links.portfolio),
  title: `${PROFILE.name} | ${PROFILE.roleTitle}`,
  description: PROFILE.shortBio,
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.roleTitle}`,
    description: PROFILE.shortBio,
    url: PROFILE.links.portfolio,
    siteName: PROFILE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — ${PROFILE.roleTitle}`,
    description: PROFILE.shortBio,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    url: PROFILE.links.portfolio,
    jobTitle: PROFILE.roleTitle,
    sameAs: [
      PROFILE.links.github,
      PROFILE.links.linkedin,
      PROFILE.links.leetcode,
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-[var(--surface-canvas)] text-[var(--ink-primary)] selection:bg-blue-100 selection:text-blue-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
