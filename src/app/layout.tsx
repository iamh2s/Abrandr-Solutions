import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CinematicCursor from "@/components/CinematicCursor";
import SmoothScroll from "@/components/SmoothScroll";
import AOSProvider from "@/components/AOSProvider";
import FilmGrain from "@/components/FilmGrain";
import ScanLines from "@/components/ScanLines";
import Vignette from "@/components/Vignette";
import PageSplash from "@/components/PageSplash";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "aBrandr Solutions — We Don't Just Build. We Ignite Brands.",
    template: "%s | aBrandr Solutions",
  },
  description:
    "aBrandr Solutions is a bold, results-obsessed digital agency serving 30+ countries since 2016. Strategy, design, and technology — fused to build what's next.",
  keywords: [
    "digital agency",
    "branding",
    "UI/UX design",
    "web development",
    "mobile app development",
    "digital marketing",
    "Chennai",
    "India",
    "careers",
  ],
  openGraph: {
    title: "aBrandr Solutions — We Don't Just Build. We Ignite Brands.",
    description:
      "Strategy. Design. Technology. Fused into one unstoppable force. Serving 30+ countries since 2016.",
    url: "https://abrandr.com",
    siteName: "aBrandr Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "aBrandr Solutions",
    description:
      "We don't just build. We ignite brands. Strategy, design, and technology — fused. Since 2016.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "aBrandr Solutions",
  url: "https://abrandr.com",
  logo: "https://abrandr.com/logo.png",
  description:
    "Bold, results-obsessed digital agency serving 30+ countries since 2016.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Spencer Plaza",
    addressLocality: "Chennai",
    addressCountry: "IN",
  },
  email: "hello@abrandr.com",
  foundingDate: "2016",
  sameAs: [],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-dark text-dark-text antialiased">
        <PageSplash />
        <FilmGrain />
        <ScanLines />
        <Vignette />
        <AOSProvider />
        <CinematicCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
