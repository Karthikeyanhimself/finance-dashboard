"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationDock } from "@/components/layout/NavigationDock";
import { Header } from "@/components/layout/Header";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const hydrateFromStorage = useFinanceStore((s) => s.hydrateFromStorage);

    useEffect(() => {
        hydrateFromStorage();
    }, [hydrateFromStorage]);

    return (
        <div className="flex min-h-screen w-full bg-background text-foreground">
            <Header />

            <main className="flex-1 relative pb-40 pt-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <NavigationDock />
        </div>
    );
}