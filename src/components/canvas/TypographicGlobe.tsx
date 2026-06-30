"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useIsDark } from "@/hooks/useIsDark";
import { isLand } from "./landMask";

// Candidate points distributed over the sphere; only those that land on a
// continent (per the equirectangular mask) are kept, so the final dot count is
// roughly SAMPLE_COUNT × land-ratio (~33%).
const SAMPLE_COUNT = 20000;
const RADIUS = 2.4;
const RAD2DEG = 180 / Math.PI;

export default function TypographicGlobe() {
  const pointsRef = useRef<THREE.Points>(null);
  const isDark = useIsDark();

  const positions = useMemo(() => {
    // Fibonacci (golden-spiral) sphere — even, gap-free distribution with every
    // point at exactly RADIUS, giving a mathematically perfect spherical shell.
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const coords: number[] = [];

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const y = 1 - (i / (SAMPLE_COUNT - 1)) * 2; // 1 → -1
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * ring;
      const z = Math.sin(theta) * ring;

      const lat = Math.asin(y) * RAD2DEG; // [-90, 90]
      const lon = Math.atan2(z, x) * RAD2DEG; // [-180, 180]

      if (isLand(lon, lat)) {
        coords.push(x * RADIUS, y * RADIUS, z * RADIUS);
      }
    }

    return new Float32Array(coords);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;
    const targetX = -state.pointer.y * 0.3;
    const targetY = state.pointer.x * 0.3 + t * 0.04;

    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      targetX,
      0.04
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      targetY,
      0.04
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
        color={isDark ? "#d4d4d4" : "#a3a3a3"}
      />
    </Points>
  );
}
