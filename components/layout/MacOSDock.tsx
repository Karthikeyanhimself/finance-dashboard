"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export interface DockApp {
    id: string
    name: string
    icon: string
    path: string
    onClick?: () => void; // Added for Theme Toggle support
}

interface MacOSDockProps {
    apps: DockApp[]
    className?: string
}

const DEFAULT_CONFIG = { baseIconSize: 56, maxScale: 1.6, effectWidth: 240 }

export const MacOSDock: React.FC<MacOSDockProps> = ({
    apps,
    className = "",
}) => {
    const router = useRouter()
    const pathname = usePathname()

    const [isMounted, setIsMounted] = useState(false)
    const [mouseX, setMouseX] = useState<number | null>(null)

    const [config, setConfig] = useState(DEFAULT_CONFIG)
    const { baseIconSize, maxScale, effectWidth } = config
    const minScale = 1.0
    const baseSpacing = Math.max(8, baseIconSize * 0.12)

    const [currentScales, setCurrentScales] = useState<number[]>(apps.map(() => 1))
    const [currentPositions, setCurrentPositions] = useState<number[]>([])

    const dockRef = useRef<HTMLDivElement>(null)
    const iconRefs = useRef<(HTMLDivElement | null)[]>([])
    const animationFrameRef = useRef<number | undefined>(undefined)
    const lastMouseMoveTime = useRef<number>(0)

    const getResponsiveConfig = useCallback(() => {
        const smallerDimension = Math.min(window.innerWidth, window.innerHeight)
        if (smallerDimension < 480) return { baseIconSize: 42, maxScale: 1.3, effectWidth: 180 }
        return { baseIconSize: 56, maxScale: 1.6, effectWidth: 250 }
    }, [])

    useEffect(() => {
        setIsMounted(true)
        setConfig(getResponsiveConfig())
        const handleResize = () => setConfig(getResponsiveConfig())
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [getResponsiveConfig])

    const calculateTargetMagnification = useCallback(
        (mousePosition: number | null) => {
            if (mousePosition === null) return apps.map(() => minScale)

            return apps.map((_, index) => {
                const normalIconCenter = index * (baseIconSize + baseSpacing) + baseIconSize / 2
                const minX = mousePosition - effectWidth / 2
                const maxX = mousePosition + effectWidth / 2

                if (normalIconCenter < minX || normalIconCenter > maxX) return minScale

                const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI
                const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI)
                const scaleFactor = (1 - Math.cos(cappedTheta)) / 2

                return minScale + scaleFactor * (maxScale - minScale)
            })
        },
        [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale]
    )

    const calculatePositions = useCallback(
        (scales: number[]) => {
            let currentX = 0
            return scales.map(scale => {
                const scaledWidth = baseIconSize * scale
                const centerX = currentX + scaledWidth / 2
                currentX += scaledWidth + baseSpacing
                return centerX
            })
        },
        [baseIconSize, baseSpacing]
    )

    useEffect(() => {
        const initialScales = apps.map(() => minScale)
        const initialPositions = calculatePositions(initialScales)
        setCurrentScales(initialScales)
        setCurrentPositions(initialPositions)
    }, [apps, calculatePositions, minScale, config])

    const animateToTarget = useCallback(() => {
        const targetScales = calculateTargetMagnification(mouseX)
        const targetPositions = calculatePositions(targetScales)
        const lerpFactor = mouseX !== null ? 0.2 : 0.12

        setCurrentScales(prevScales =>
            prevScales.map((currentScale, index) => currentScale + (targetScales[index] - currentScale) * lerpFactor)
        )

        setCurrentPositions(prevPositions =>
            prevPositions.map((currentPos, index) => currentPos + (targetPositions[index] - currentPos) * lerpFactor)
        )

        const needsUpdate = currentScales.some((scale, index) => Math.abs(scale - targetScales[index]) > 0.002) ||
            currentPositions.some((pos, index) => Math.abs(pos - targetPositions[index]) > 0.1)

        if (needsUpdate || mouseX !== null) {
            animationFrameRef.current = requestAnimationFrame(animateToTarget)
        }
    }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions])

    useEffect(() => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = requestAnimationFrame(animateToTarget)
        return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current) }
    }, [animateToTarget])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const now = performance.now()
        if (now - lastMouseMoveTime.current < 16) return
        lastMouseMoveTime.current = now

        if (dockRef.current) {
            const rect = dockRef.current.getBoundingClientRect()
            const padding = Math.max(8, baseIconSize * 0.12)
            setMouseX(e.clientX - rect.left - padding)
        }
    }, [baseIconSize])

    const handleMouseLeave = useCallback(() => setMouseX(null), [])

    const createBounceAnimation = (element: HTMLElement) => {
        const bounceHeight = -15
        element.style.transition = "transform 0.2s ease-out"
        element.style.transform = `translateY(${bounceHeight}px)`
        setTimeout(() => { element.style.transform = "translateY(0px)" }, 200)
    }

    const handleAppClick = (app: DockApp, index: number) => {
        if (iconRefs.current[index]) createBounceAnimation(iconRefs.current[index]!)
        if (app.onClick) {
            app.onClick()
        } else {
            router.push(app.path)
        }
    }

    const contentWidth = currentPositions.length > 0
        ? Math.max(...currentPositions.map((pos, index) => pos + (baseIconSize * currentScales[index]) / 2))
        : apps.length * (baseIconSize + baseSpacing) - baseSpacing

    const padding = Math.max(12, baseIconSize * 0.2)

    if (!isMounted) return null

    return (
        <div
            className={cn("backdrop-blur-xl", className)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            ref={dockRef}
            role="navigation"
            style={{
                width: `${contentWidth + padding * 2}px`,
                background: "rgba(25, 25, 25, 0.4)", // Thinner glass
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                padding: `${padding}px`,
            }}
        >
            <div className="relative" style={{ height: `${baseIconSize}px`, width: "100%" }}>
                {apps.map((app, index) => {
                    const scale = currentScales[index]
                    const position = currentPositions[index] || 0
                    const scaledSize = baseIconSize * scale
                    const isActive = pathname === app.path

                    return (
                        <div
                            className="absolute cursor-pointer flex flex-col items-center justify-end group"
                            key={app.id}
                            onClick={() => handleAppClick(app, index)}
                            ref={el => { iconRefs.current[index] = el }}
                            role="button"
                            tabIndex={0}
                            style={{
                                left: `${position - scaledSize / 2}px`,
                                bottom: "0px",
                                width: `${scaledSize}px`,
                                height: `${scaledSize}px`,
                                transformOrigin: "bottom center",
                                zIndex: Math.round(scale * 10),
                            }}
                        >
                            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 text-white text-[10px] px-2 py-1 rounded-md pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-md">
                                {app.name}
                            </div>

                            <img
                                alt={app.name}
                                className="object-contain"
                                height={scaledSize}
                                src={app.icon}
                                draggable={false}
                                width={scaledSize}
                            />

                            {isActive && (
                                <div
                                    className="absolute"
                                    style={{
                                        bottom: "-10px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: "4px",
                                        height: "4px",
                                        borderRadius: "50%",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 0 8px #fff",
                                    }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}