import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aryzz-Storezz | Secure Digital Commerce Suite",
    template: "%s | Aryzz-Storezz",
  },
  description:
    "Aryzz-Storezz delivers a secure digital commerce platform with modern identity flows, an intelligence-rich admin console, and referral-driven growth.",
  keywords: [
    "Aryzz-Storezz",
    "e-commerce",
    "admin dashboard",
    "secure onboarding",
    "referral platform",
  ],
  authors: [{ name: "Aryzz-Storezz" }],
  creator: "Aryzz-Storezz",
  publisher: "Aryzz-Storezz",
  openGraph: {
    title: "Aryzz-Storezz | Secure Digital Commerce Suite",
    description:
      "Modern commerce infrastructure with enterprise-grade security, identity orchestration, and growth automation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryzz-Storezz | Secure Digital Commerce Suite",
    description:
      "Modern commerce infrastructure with enterprise-grade security, identity orchestration, and growth automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
