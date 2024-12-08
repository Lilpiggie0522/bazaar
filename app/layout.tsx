import type { Metadata } from "next"
import "./globals.css"
import NavbarPage from "@/components/Navbar/page"
import FooterPage from "@/components/Footer/page"
export const metadata: Metadata = {
  title: "Bazzar",
  description: "A freeport for trading in blackzone",
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png"
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <NavbarPage />
          {children}
          <FooterPage />
        </main>
      </body>
    </html>
  )
}
