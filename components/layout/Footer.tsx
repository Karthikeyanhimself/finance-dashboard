"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Italianno } from "next/font/google";

const italianno = Italianno({
    weight: "400",
    subsets: ["latin"],
    display: "swap"
});

export function Footer() {
    return (
        <footer className="relative bg-card/30 backdrop-blur-md pt-20 lg:pt-32 overflow-hidden border-t border-border mt-auto">

            <div className="absolute top-10 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-10">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="font-mono text-[4rem] md:text-[8rem] font-bold leading-none tracking-tighter text-transparent will-change-transform"
                    style={{ WebkitTextStroke: "1px hsl(var(--foreground))" }}
                >
                    FINANCE DASHBOARD • TEMPLATE • FINANCE DASHBOARD • TEMPLATE •
                </motion.div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-16 relative z-10 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-foreground tracking-tight">
                            Need a custom <br /> digital solution?
                        </h2>
                        <Button
                            onClick={() => window.location.href = 'mailto:karthikeyanhimself@gmail.com'}
                            size="lg"
                            className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            Contact Developer
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground">
                        <div>
                            <h4 className="text-foreground mb-4 uppercase tracking-wider font-bold">Navigation</h4>
                            <ul className="space-y-2 font-medium">
                                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                                <li><Link href="/transactions" className="hover:text-foreground transition-colors">Transactions</Link></li>
                                <li><Link href="/insights" className="hover:text-foreground transition-colors">Insights</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-foreground mb-4 uppercase tracking-wider font-bold">Developer</h4>
                            <ul className="space-y-2 font-medium">
                                <li>Hyderabad, India</li>
                                <li>
                                    <a href="https://karthikeyanhimself.vercel.app/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                                        Profile
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CRITICAL FIX: Created a new full-width wrapper with the border-t */}
            <div className="w-full border-t border-border relative z-10">
                {/* Re-applied the max-w container constraints inside the bordered box */}
                <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-16 py-8 pb-32 md:pb-16 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-6 text-center">
                    <p>© {new Date().getFullYear()} Finance Dashboard. All Rights Reserved.</p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-foreground/5 px-4 py-2 rounded-xl border border-border shadow-xl">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            <span className="text-muted-foreground font-medium">
                                Open Source Template by
                            </span>
                            <a
                                href="https://karthikeyanhimself.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${italianno.className} text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 hover:brightness-125 transition-all pl-1 leading-none pt-1`}
                            >
                                Karthikeyan
                            </a>
                        </div>

                        <div className="hidden sm:block w-px h-4 bg-border"></div>

                        <a
                            href="https://github.com/Karthikeyanhimself/finance-dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="group-hover:underline decoration-border underline-offset-4 font-medium">View Repo</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}