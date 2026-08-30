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

export const metadata: Metadata = {
  title: "Coach Adrian Ding — Leadership Development & Corporate Training",
  description:
    "20+ years, 20,000+ leaders trained across HSBC, Wipro, Petron and more. Corporate training and public workshops from the CEO of Maximum Impact PH.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} ${geistMono.variable} ${theSeasons.variable} ${abramo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
