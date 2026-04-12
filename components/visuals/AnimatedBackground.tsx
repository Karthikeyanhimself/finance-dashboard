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
                color="#8494FF"
                transparent
                opacity={0.3}
                sizeAttenuation
            />
        </points>
    );
}

function BackgroundContent() {
    return (
        < div className="fixed inset-0 -z-10 pointer-events-none bg-background/50 transform-gpu translate-z-0" >
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div >
    );
}

export const AnimatedBackground = dynamic(
    () => Promise.resolve(BackgroundContent),
    { ssr: false }
);

// FIXED: Pointer-events passthrough for background visuals