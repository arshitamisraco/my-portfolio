import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arshita.co"),
  title: {
    default: "Arshita Misra — Product Designer",
    template: "%s — Arshita Misra",
  },
  description:
    "Arshita Misra is a product designer working at the intersection of UX, user research, and AI systems.",
  openGraph: {
    siteName: "Arshita Misra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-accent-strong focus:px-5 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
