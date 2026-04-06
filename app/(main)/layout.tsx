"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationDock } from "@/components/layout/NavigationDock";
import { Header } from "@/components/layout/Header";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hydrateFromStorage = useFinanceStore((s) => s.hydrateFromStorage);

    useEffect(() => {
        hydrateFromStorage();
    }, [hydrateFromStorage]);

    return (
        <div className="relative z-0 flex min-h-screen w-full bg-background text-foreground selection:bg-emerald-500/30">
            <Header />

            {/* CRITICAL FIX: Added `min-w-0 w-full` to prevent flex blowout */}
            <main className="flex-1 min-w-0 w-full relative z-10 transition-all duration-300 ease-in-out pt-20 md:pt-28 pb-32 md:pb-48">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        /* Removed overflow-x-clip, returning to standard contained width */
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