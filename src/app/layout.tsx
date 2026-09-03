import type { Metadata } from "next"
import { Red_Hat_Display, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// The Seasons — high-contrast display serif for the logo, headings, and pull quotes.
const theSeasons = localFont({
  variable: "--font-the-seasons",
  display: "swap",
  src: [
    {
      path: "./fonts/TheSeasons-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/TheSeasons-Bold.woff2", weight: "700", style: "normal" },
  ],
})

// Abramo — all-caps serif reserved for special callouts only.
const abramo = localFont({
  variable: "--font-abramo",
  display: "swap",
  src: [
    { path: "./fonts/Abramo-Regular.woff2", weight: "400", style: "normal" },
  ],
})

const SITE_URL = "https://adrianding.com"
const TITLE = "Coach Adrian Ding — Leadership Development & Corporate Training"
const DESCRIPTION =
  "20+ years, 20,000+ leaders trained across HSBC, Wipro, Petron and more. Corporate training and public workshops from the CEO of Maximum Impact PH."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Coach Adrian Ding",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/mascot/ad-bg-2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/mascot/ad-bg-2.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${redHatDisplay.variable} ${geistMono.variable} ${theSeasons.variable} ${abramo.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="bg-background text-foreground focus-visible:ring-brand sr-only z-50 rounded-sm px-4 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:ring-2 focus-visible:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
