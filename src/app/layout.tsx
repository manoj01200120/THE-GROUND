import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CurrencyProvider } from "@/lib/utils/currency";

export const metadata: Metadata = {
  title: "THE GROUND — Where Ideas Take Shape",
  description:
    "THE GROUND is a student-driven builder ecosystem where people learn by building real things with real people.",
  keywords: [
    "THE GROUND",
    "builder ecosystem",
    "student builders",
    "Where ideas take shape",
    "engineering",
    "product development",
    "real world building",
  ],
  authors: [{ name: "THE GROUND" }],
  openGraph: {
    title: "THE GROUND — Where Ideas Take Shape",
    description:
      "THE GROUND is a student-driven builder ecosystem where people learn by building real things with real people.",
    type: "website",
    locale: "en_US",
    siteName: "THE GROUND",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GROUND — Where Ideas Take Shape",
    description:
      "THE GROUND is a student-driven builder ecosystem where people learn by building real things with real people.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ground-gradient bg-noise-subtle text-ground-text antialiased min-h-screen flex flex-col">
        <CurrencyProvider>
          <SmoothScroll>
            <Navbar />

            <main className="flex-1 min-w-0">
              {children}
            </main>

            <Footer />
          </SmoothScroll>
        </CurrencyProvider>
      </body>
    </html>
  );
}