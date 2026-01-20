import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zyntrex - Your Long-Term Design Partner",
    template: "%s | Zyntrex",
  },
  description:
    "Your long-term design partner for agencies, startups, enterprises, brands, and SaaS. Set ambitious growth targets with data-backed strategies and optimized campaigns.",
  keywords: [
    "design agency",
    "long-term design partner",
    "brand design",
    "SaaS design",
    "startup design",
    "enterprise design",
  ],
  authors: [{ name: "Zyntrex" }],
  creator: "Zyntrex",
  publisher: "Zyntrex",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zyntrex.com"),
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Zyntrex",
    title: "Zyntrex - Your Long-Term Design Partner",
    description:
      "Your long-term design partner for agencies, startups, enterprises, brands, and SaaS.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zyntrex - Design Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zyntrex - Your Long-Term Design Partner",
    description:
      "Your long-term design partner for agencies, startups, enterprises, brands, and SaaS.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4169E1] focus:text-white focus:rounded-md focus:font-semibold"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <Navbar />
          <main id="main-content">
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
