import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarPage from "@/components/navbar/page";
import FooterPage from "@/components/Footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazzar",
  description: "A freeport for trading in blackzone",
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen">
          <NavbarPage />
            {children}
          <FooterPage />
        </div>
      </body>
    </html>
  );
}
