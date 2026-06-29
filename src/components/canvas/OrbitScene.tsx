"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, AdaptiveDpr } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { TECH_NODES } from "@/constants";

function OrbitNode({
  node,
  index,
  total,
}: {
  node: (typeof TECH_NODES)[0];
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * node.orbitSpeed + angle;
      const r = node.orbitRadius;
      meshRef.current.position.x = Math.cos(t) * r;
      meshRef.current.position.z = Math.sin(t) * r;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
    if (textRef.current && meshRef.current) {
      textRef.current.position.copy(meshRef.current.position);
      textRef.current.position.y += 0.4;
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      <Text
        ref={textRef}
        fontSize={0.16}
        color="#111111"
        anchorX="center"
        anchorY="bottom"
        font="/fonts/inter-medium.woff"
        fontWeight="bold"
        fillOpacity={0.8}
      >
        {node.label}
      </Text>
    </>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#a3a3a3" transparent opacity={0.25} />
    </line>
  );
}

function CenterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color="#111111"
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function OrbitSceneContent() {
  return (
    <>
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[0, 10, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />

      <CenterSphere />
      <OrbitRing radius={3} />

      {TECH_NODES.map((node, i) => (
        <OrbitNode
          key={node.id}
          node={node}
          index={i}
          total={TECH_NODES.length}
        />
      ))}
    </>
  );
}

export default function OrbitScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 3, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <OrbitSceneContent />
      </Suspense>
    </Canvas>
  );
}
