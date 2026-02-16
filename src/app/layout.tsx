import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoundBadge - Music Taste Card for GitHub",
  description: "Show your vibe, not just your stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
