import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { AnimatedBackground } from "@/components/visuals/AnimatedBackground";

const InterFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Modern financial dashboard",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${InterFont.className} overflow-x-hidden`}>
        <ThemeProvider>
          <LenisProvider>
            <AnimatedBackground />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}