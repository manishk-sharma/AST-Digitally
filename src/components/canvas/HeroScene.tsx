"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import TypographicGlobe from "./TypographicGlobe";
import HeroEnvironment from "./HeroEnvironment";
import CameraController from "./CameraController";
import SceneLoader from "@/components/ui/SceneLoader";

/**
 * Main hero 3D scene.
 * Wraps all canvas components in a Canvas with performance optimizations.
 * Must be loaded with `dynamic(() => import(...), { ssr: false })`.
 */
export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <AdaptiveDpr pixelated />
          <CameraController />
          <TypographicGlobe />
          <HeroEnvironment />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
