import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Greenway Logistics - Sustainable Shipping Solutions",
  description: "Professional eco-friendly logistics and shipping solutions for businesses worldwide",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  icons: {
    icon: [
      { url: '/images/greenway_logo.png' },
      { url: '/images/greenway_logo.png', type: 'image/png' }
    ],
    apple: '/images/greenway_favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/images/greenway_favicon.png" />
      </head>
      <body className={`${inter.className} antialiased w-full min-h-screen overflow-x-hidden bg-soft`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
