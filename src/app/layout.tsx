import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { getOrganizationSchema, getServiceSchema, getFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "AST Digitally — AI-First Digital Growth Partner",
    template: "%s | AST Digitally",
  },
  description:
    "Transform your business with AI-powered digital solutions. We build intelligent web experiences, custom ML models, and data-driven growth strategies that deliver measurable results.",
  keywords: [
    "AI agency",
    "digital transformation",
    "web development",
    "machine learning",
    "growth marketing",
    "Next.js",
    "React",
    "3D web experiences",
  ],
  authors: [{ name: "AST Digitally" }],
  creator: "AST Digitally",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://astdigitally.com",
    title: "AST Digitally — AI-First Digital Growth Partner",
    description:
      "Transform your business with AI-powered digital solutions. Intelligent web experiences, custom ML models, and data-driven growth strategies.",
    siteName: "AST Digitally",
  },
  twitter: {
    card: "summary_large_image",
    title: "AST Digitally — AI-First Digital Growth Partner",
    description:
      "Transform your business with AI-powered digital solutions.",
    creator: "@astdigitally",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Syne:wght@400..800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getServiceSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFAQSchema()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2SM6C2EZTG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2SM6C2EZTG');
          `}
        </Script>
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
