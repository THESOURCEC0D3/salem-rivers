import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";
import { church } from "./content/church";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

// Warm, reverent serif for headings; warm, readable humanist sans for body.
// Both are variable fonts — self-hosted by next/font, subset to latin, display: swap.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${church.name}, a Pentecostal family in ${church.city}`,
    template: `%s · ${church.name}`,
  },
  description:
    "A warm Pentecostal church in Port Harcourt. New here? Find service times, plan your first visit, and come as you are. There's a seat saved for you.",
  keywords: [
    "church in Port Harcourt",
    "Pentecostal church Port Harcourt",
    "Rivers State church",
    church.name,
  ],
  openGraph: {
    title: `${church.name}: Come and see`,
    description:
      "A warm Pentecostal family in Port Harcourt. Plan your first visit.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Church structured data (local SEO + rich results). Rendered on every page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: church.name,
    description: church.identity,
    address: {
      "@type": "PostalAddress",
      streetAddress: church.address,
      addressLocality: church.city,
      addressRegion: church.state,
      addressCountry: "NG",
    },
    telephone: church.phone,
    sameAs: [
      church.socials.facebook,
      church.socials.youtube,
      church.socials.instagram,
    ],
  };

  return (
    <html
      lang="en" data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${nunito.variable} h-full antialiased`} 
    >
      <body className="flex min-h-full flex-col">
        {/*
          The <noscript> opacity override that used to live here is gone, and
          deliberately so. `Reveal` no longer renders opacity:0 server-side at
          all — it waits for a successful hydration before hiding anything (see
          the comment block in Reveal.tsx). With nothing hidden in the SSR
          output there is nothing for a fallback to un-hide, and a rule that only
          covered the JS-disabled case never helped the failure that actually
          bit us: JS enabled but broken.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
