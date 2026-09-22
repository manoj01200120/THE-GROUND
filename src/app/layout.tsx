import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "THE GROUND — Learn. Build. Lead. Guide.",
  description:
    "A student-driven builder ecosystem for people who want to learn by building real things with real people.",
  keywords: [
    "student builders",
    "software engineering",
    "ecosystem",
    "THE GROUND",
    "open source",
    "product development",
    "proof of work",
  ],
  authors: [{ name: "THE GROUND" }],
  openGraph: {
    title: "THE GROUND — Learn. Build. Lead. Guide.",
    description:
      "A student-driven builder ecosystem for people who want to learn by building real things with real people.",
    type: "website",
    locale: "en_US",
    siteName: "THE GROUND",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GROUND — Learn. Build. Lead. Guide.",
    description:
      "A student-driven builder ecosystem for people who want to learn by building real things with real people.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#060608] text-[#ededf2] antialiased min-h-screen flex flex-col bg-noise selection:bg-violet-500/30 selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
