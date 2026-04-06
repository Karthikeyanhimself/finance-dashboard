"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationDock } from "@/components/layout/NavigationDock";
import { Header } from "@/components/layout/Header";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Selector for hydration fix
    const hydrateFromStorage = useFinanceStore((s) => s.hydrateFromStorage);

    // Trigger hydration on mount
    useEffect(() => {
        hydrateFromStorage();
    }, [hydrateFromStorage]);

    return (
        /* w-[100vw] and overflow-x-hidden lock the width to the mobile screen */
        <div className="flex min-h-screen w-[100vw] overflow-x-hidden bg-background text-foreground selection:bg-emerald-500/30">
            <Header />

            <main className="flex-1 relative transition-all duration-300 ease-in-out pt-20 md:pt-28 pb-32 md:pb-48">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        /* Standard container logic with overflow-hidden for safety */
                        className="w-full max-w-[1600px] mx-auto px-4 md:px-10 lg:px-16 overflow-hidden"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <NavigationDock />
        </div>
    );
}