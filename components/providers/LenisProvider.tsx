"use client";

import { ReactNode, useEffect, useMemo } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

interface LenisProviderProps {
    children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
    const lenis = useMemo(() => {
        if (typeof window === "undefined") return null;
        return new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });
    }, []);

    useEffect(() => {
        if (!lenis) return;

        const update = (time: number) => lenis.raf(time * 1000);

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, [lenis]);

    return <>{children}</>;
}