"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 40;
const CONNECTION_DISTANCE = 2.5;

/**
 * Procedural neural network visualization with instanced nodes and animated connections.
 */
export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate random node positions in a spherical distribution
  const nodes = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.5;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return positions;
  }, []);

  // Create instanced mesh matrix
  const instanceMatrix = useMemo(() => {
    const dummy = new THREE.Object3D();
    const matrix = new Float32Array(NODE_COUNT * 16);
    nodes.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.04 + Math.random() * 0.03);
      dummy.updateMatrix();
      dummy.matrix.toArray(matrix, i * 16);
    });
    return matrix;
  }, [nodes]);

  // Create connection lines between nearby nodes
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < CONNECTION_DISTANCE) {
          positions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (linesRef.current && linesRef.current.material instanceof THREE.LineBasicMaterial) {
      linesRef.current.material.opacity =
        0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Instanced nodes */}
      <instancedMesh args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
        <instancedBufferAttribute
          attach="instanceMatrix"
          args={[instanceMatrix, 16]}
        />
      </instancedMesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}
