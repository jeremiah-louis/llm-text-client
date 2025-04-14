import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL('https://wetrocloud.com'),
  title: {
    default: "URL to Markdown | Wetrocloud",
    template: "%s | Wetrocloud"
  },
  description: "Convert any webpage into clean, formatted Markdown with one click. Powered by Wetrocloud's advanced text processing.",
  keywords: ["url to markdown", "markdown converter", "webpage to markdown", "content converter", "wetrocloud", "markdown generator", "text extraction", "web scraping"],
  authors: [{ name: "Wetrocloud" }],
  creator: "Wetrocloud",
  publisher: "Wetrocloud",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/Logo-wetrocloud.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/Logo-wetrocloud.svg",
      },
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wetrocloud.com",
    title: "URL to Markdown | Wetrocloud",
    description: "Convert any webpage into clean, formatted Markdown with one click. Powered by Wetrocloud's advanced text processing.",
    siteName: "Wetrocloud",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Wetrocloud URL to Markdown Converter",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL to Markdown | Wetrocloud",
    description: "Convert any webpage into clean, formatted Markdown with one click. Powered by Wetrocloud's advanced text processing.",
    images: ["/og-image.png"],
    creator: "@wetrocloud",
    site: "@wetrocloud",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://wetrocloud.com" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/svg+xml" href="/Logo-wetrocloud.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/Logo-wetrocloud.svg" color="#000000" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "URL to Markdown | Wetrocloud",
              "description": "Convert any webpage into clean, formatted Markdown with one click. Powered by Wetrocloud's advanced text processing.",
              "url": "https://wetrocloud.com",
              "applicationCategory": "Utility",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "provider": {
                "@type": "Organization",
                "name": "Wetrocloud",
                "url": "https://wetrocloud.com"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
