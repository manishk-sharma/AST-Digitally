"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Camera controller with mouse parallax, idle breathing, and scroll zoom.
 * All movements use spring interpolation for smooth transitions.
 */
export default function CameraController() {
  const { camera } = useThree();
  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  // Listen for mouse movement
  useFrame((state) => {
    const { pointer } = state;

    // Update mouse target with dampened values
    mouseTarget.current.set(pointer.x * 0.3, pointer.y * 0.2);

    // Smooth interpolation (spring-like)
    currentMouse.current.lerp(mouseTarget.current, 0.05);

    // Apply mouse parallax to camera position
    camera.position.x = currentMouse.current.x * 0.8;
    camera.position.y = currentMouse.current.y * 0.5;

    // Idle breathing animation
    camera.position.z =
      5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;

    // Look at center with slight offset
    camera.lookAt(0, 0, 0);
  });

  return null;
}
