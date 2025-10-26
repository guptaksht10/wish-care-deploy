import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Poppins} from "next/font/google";
import { Providers } from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400"
});


// ✅ TooltipProvider import
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "WishCare | Social E-Commerce Platform",
  description:
    "Connect, explore, and shop smarter with WishCare — where your friends’ favorites meet your personalized wishlist.",
  icons: {
    icon: "/logofull_wishcare-removebg-preview.png", 
  },
  openGraph: {
    title: "WishCare | Social E-Commerce Platform",
    description:
      "Discover trending products, share wishlists, and see what your friends love — all in one place.",
    url: "http://localhost:3000/",
    siteName: "WishCare",
    images: [
      {
        url: "/logo_wishcaref.png", 
        width: 1200,
        height: 630,
        alt: "WishCare logo and banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WishCare | Social E-Commerce Platform",
    description:
      "Connect, explore, and shop smarter with your friends on WishCare.",
    images: ["/logo_wishcaref.png"],
    creator: "@wishcare",
  },
  keywords: ["WishCare", "social commerce", "wishlist", "shopping", "friends"],
  authors: [{ name: "Akshat Gupta" }],
};

 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* ✅ Wrap all children with TooltipProvider */}
        <TooltipProvider>
          <Providers>{children}</Providers>
        </TooltipProvider>
      </body>
    </html>
  );
}
