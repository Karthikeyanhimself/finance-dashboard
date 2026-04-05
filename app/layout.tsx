import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnimatedBackground } from "@/components/visuals/AnimatedBackground";
import { LenisProvider } from "@/components/providers/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Personal finance dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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