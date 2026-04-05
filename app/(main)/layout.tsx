"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationDock } from "@/components/layout/NavigationDock";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-emerald-500/30">
            <Header />

            {/* 1. pt-20 to pt-28: Dynamically pushes content below Header.
          2. pb-32 to pb-48: Adjusts bottom space so the Dock never overlaps content.
          3. transition-all: Smoothly resizes if the user rotates their phone.
      */}
            <main className="flex-1 relative transition-all duration-300 ease-in-out pt-20 md:pt-28 pb-32 md:pb-48">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        /* The 'Magic' Wrapper: 
                           - px-4 for mobile (maximum screen usage)
                           - md:px-10 for tablet
                           - lg:px-16 for desktop
                           - max-w-[1600px] ensures the dashboard doesn't look 'stretched' on Ultrawide monitors
                        */
                        className="w-full max-w-[1600px] mx-auto px-4 md:px-10 lg:px-16"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <NavigationDock />
        </div>
    );
}