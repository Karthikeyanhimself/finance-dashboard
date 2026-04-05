"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRoleStore } from "@/store/useRoleStore";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, User } from "lucide-react";

export function Header() {
    const pathname = usePathname();
    const role = useRoleStore((s) => s.role);
    const setRole = useRoleStore((s) => s.setRole);
    const [mounted, setMounted] = useState(false);

    const pageTitle = pathname.split("/").pop() || "Dashboard";

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleRole = () => {
        setRole(role === "admin" ? "viewer" : "admin");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-background/20 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold tracking-widest uppercase opacity-50 hidden md:block">
                        Finance Tracker
                    </span>
                    <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                    <motion.h1
                        key={pageTitle}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-medium capitalize"
                    >
                        {pageTitle}
                    </motion.h1>
                </div>

                <div className="flex items-center gap-6">
                    {mounted && (
                        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 transition-colors hover:bg-white/10">
                            <div className="flex items-center gap-2">
                                {role === "admin" ? (
                                    <Shield size={14} className="text-emerald-500 dark:text-emerald-400" />
                                ) : (
                                    <User size={14} className="text-sky-500 dark:text-sky-400" />
                                )}
                                <Label
                                    htmlFor="role-mode"
                                    className="text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                                >
                                    {role}
                                </Label>
                            </div>
                            <Switch
                                id="role-mode"
                                checked={role === "admin"}
                                onCheckedChange={toggleRole}
                                className="scale-75 data-[state=checked]:bg-emerald-500 dark:data-[state=checked]:bg-emerald-400 data-[state=unchecked]:bg-sky-500 dark:data-[state=unchecked]:bg-sky-400 border-transparent transition-colors"
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}