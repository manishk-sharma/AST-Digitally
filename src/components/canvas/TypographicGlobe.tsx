"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useIsDark } from "@/hooks/useIsDark";

const DOT_COUNT = 8000;
const RADIUS = 2.4;

export default function TypographicGlobe() {
  const pointsRef = useRef<THREE.Points>(null);
  const isDark = useIsDark();

  const positions = useMemo(() => {
    const pos = new Float32Array(DOT_COUNT * 3);

    for (let i = 0; i < DOT_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = RADIUS * (0.92 + Math.random() * 0.08);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    return pos;
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
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        color={isDark ? "#d4d4d4" : "#a3a3a3"}
      />
    </Points>
  );
}
