"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    isMobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Transactions", href: "/transactions", icon: "transactions" },
    { name: "Insights", href: "/insights", icon: "insights" },
];

export function Sidebar({ isMobileOpen, setMobileOpen }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarContent = (
        <div className="flex h-full flex-col bg-card border-r border-border p-4 shadow-sm">
            <div className={cn("flex items-center mb-8", isCollapsed ? "justify-center" : "justify-between")}>
                {!isCollapsed && (
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Finance Tracker
                    </span>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex text-muted-foreground hover:text-foreground"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <Image src="/icons/svg/menu.svg" alt="Toggle Sidebar" width={20} height={20} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-muted-foreground"
                    onClick={() => setMobileOpen(false)}
                >
                    <Image src="/icons/svg/chevron-left.svg" alt="Close Sidebar" width={20} height={20} />
                </Button>
            </div>

            <nav className="flex-1 space-y-2">
                {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}>
                            <div
                                className={cn(
                                    "flex items-center rounded-md px-3 py-2.5 transition-colors group",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                    isCollapsed ? "justify-center" : "justify-start"
                                )}
                            >
                                <div className={cn("shrink-0 transition-opacity", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")}>
                                    <Image src={`/icons/svg/${link.icon}.svg`} alt={link.name} width={20} height={20} />
                                </div>
                                {!isCollapsed && (
                                    <span className="ml-3 font-medium text-sm">{link.name}</span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            <aside
                className={cn(
                    "hidden md:block h-screen sticky top-0 transition-all duration-300 ease-in-out z-20",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {sidebarContent}
            </aside>

            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm md:hidden"
                        >
                            {sidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}