"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useRoleStore } from "@/store/useRoleStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
    setMobileOpen: (open: boolean) => void;
}

export function Navbar({ setMobileOpen }: NavbarProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { role, setRole } = useRoleStore();

    const pageTitle = pathname.split("/")[1]
        ? pathname.split("/")[1].charAt(0).toUpperCase() + pathname.split("/")[1].slice(1)
        : "Dashboard";

    return (
        <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 md:px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-muted-foreground"
                    onClick={() => setMobileOpen(true)}
                >
                    <Image src="/icons/svg/menu.svg" alt="Menu" width={24} height={24} />
                </Button>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                    {pageTitle}
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <Badge variant={role === "admin" ? "default" : "secondary"} className="hidden sm:inline-flex capitalize">
                        {role}
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="hidden sm:flex">
                                Switch Role
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setRole("viewer")}>
                                Viewer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRole("admin")}>
                                Admin
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <div className="relative h-5 w-5">
                        <Image
                            src="/icons/svg/sun.svg"
                            alt="Light Mode"
                            fill
                            className="dark:hidden transition-all"
                        />
                        <Image
                            src="/icons/svg/moon.svg"
                            alt="Dark Mode"
                            fill
                            className="hidden dark:block transition-all"
                        />
                    </div>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </header>
    );
}