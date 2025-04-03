import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";
import Script from "next/script";

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
        {/* Smartsupp Live Chat script */}
        <Script id="smartsupp-chat" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '6ff94339125ddd75cbaf65b74a68e29b8707a9a6';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>
        <noscript>
          Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a>
        </noscript>
      </head>
      <body className={`${inter.className} antialiased w-full min-h-screen overflow-x-hidden bg-soft`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
