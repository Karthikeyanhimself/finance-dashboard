"use client"

import { useTheme } from "next-themes"
import { MacOSDock, DockApp } from "./MacOSDock"

export function NavigationDock() {
    const { theme, setTheme } = useTheme()

    const navigationApps: DockApp[] = [
        {
            id: "dashboard",
            name: "Dashboard",
            icon: "/icons/png/Home.png",
            path: "/dashboard",
        },
        {
            id: "transactions",
            name: "Transactions",
            icon: "/icons/png/transaction.png",
            path: "/transactions",
        },
        {
            id: "insights",
            name: "Insights",
            icon: "/icons/png/insights.png",
            path: "/insights",
        },
        {
            id: "theme-toggle",
            name: "Toggle Theme",
            icon: "/icons/png/theme.png",
            path: "#",
            onClick: () => setTheme(theme === "dark" ? "light" : "dark")
        },
    ]

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="pointer-events-auto">
                <MacOSDock apps={navigationApps} />
            </div>
        </div>
    )
}