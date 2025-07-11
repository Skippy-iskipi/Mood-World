import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientOneSignalProvider from "./components/ClientOneSignalProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sheikha's Mood World - Your Personal Emotional Support Space",
  description:
    "A magical, comforting space designed just for Sheikha to explore and nurture emotions with love and care.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>🌸</text></svg>"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Comic+Neue:wght@300;400;700&family=Nunito:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ClientOneSignalProvider />
        {children}
      </body>
    </html>
  )
}
