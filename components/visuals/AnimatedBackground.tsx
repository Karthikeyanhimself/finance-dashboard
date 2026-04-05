"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import dynamic from "next/dynamic";

function Particles() {
    const count = 3000;
    const mesh = useRef<THREE.Points>(null!);

    const particlesPosition = useMemo(
        () => new Float32Array(
            Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 10)
        ),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * 0.03;
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#10b981"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

function BackgroundContent() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none bg-background/50">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div>
    );
}

// Wrap with dynamic inside the client component to satisfy Next.js 16 SSR requirements
export const AnimatedBackground = dynamic(
    () => Promise.resolve(BackgroundContent),
    { ssr: false }
);

// FIXED: Render Purity & SSR Safety: AnimatedBackground.tsx