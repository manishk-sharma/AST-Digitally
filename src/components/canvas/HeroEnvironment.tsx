"use client";

import { useIsDark } from "@/hooks/useIsDark";

/**
 * Clean neutral lighting and theme-aware fog for the typographic globe.
 * The fog colour matches the page background so distant dots fade into it
 * instead of toward white in dark mode.
 */
export default function HeroEnvironment() {
  const isDark = useIsDark();

  return (
    <>
      {/* High neutral ambient light */}
      <ambientLight intensity={0.7} color="#ffffff" />

      {/* Main directional light for clean shading */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        color="#ffffff"
      />

      {/* Subtle fill point light */}
      <pointLight
        position={[-5, -5, 5]}
        intensity={0.4}
        color="#f0f0f0"
      />

      {/* Fog colour matches the page background (light vs dark) */}
      <fog attach="fog" args={[isDark ? "#212121" : "#ffffff", 8, 20]} />
    </>
  );
}
