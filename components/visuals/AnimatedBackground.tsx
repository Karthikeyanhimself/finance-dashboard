"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
    const count = 3000;
    const mesh = useRef<THREE.Points>(null!);

    // Generate random 3D coordinates for our particles
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread particles out over a 10x10x10 area
            positions[i * 3] = (Math.random() - 0.5) * 10;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }
        return positions;
    }, []);

    // Animate the entire point cloud rotating slowly on every frame
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * 0.03;
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                {/* FIX: Passed array and itemSize into the args array for the BufferAttribute constructor */}
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            {/* Using Emerald (Income color) for the particles. 
        Size Attenuation makes particles further away look smaller.
      */}
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

export function AnimatedBackground() {
    return (
        // Fixed inset-0 covers the whole screen. -z-10 puts it behind everything.
        // pointer-events-none ensures it doesn't block clicks on your buttons!
        <div className="fixed inset-0 -z-10 pointer-events-none bg-background/50">
            <Canvas camera={{ position: [0, 0, 3] }}>
                {/* Subtle ambient light */}
                <ambientLight intensity={0.5} />
                <Particles />
            </Canvas>
        </div>
    );
}