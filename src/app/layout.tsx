import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getOrganizationSchema, getServiceSchema, getFAQSchema } from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply the persisted/system theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
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
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
