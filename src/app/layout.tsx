import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoRad | AI Radiology Reporting",
  description:
    "AutoRad speeds up chest X-ray interpretation with AI-generated, clinician-ready reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
