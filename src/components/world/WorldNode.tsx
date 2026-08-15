import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useEchoStore } from "../../store/echo.store";

export type WorldNodeType =
  | "memory"
  | "projects"
  | "decisions"
  | "possibilities";

interface WorldNodeProps {
  type: WorldNodeType;
  position: [number, number, number];
  color: string;
}

export default function WorldNode({
  type,
  position,
  color,
}: WorldNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const { pointer } = useThree();

  const setActiveNode = useEchoStore(
    (state) => state.setActiveNode,
  );

  const selectNode = useEchoStore(
  (state) => state.selectNode,
);

  useFrame((state, delta) => {
    if (!groupRef.current || !ringRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime();

    // Convert pointer coordinates into approximate world-space values.
    const mouseX = pointer.x * 4.5;
    const mouseY = pointer.y * 3;

    const dx = position[0] - mouseX;
    const dy = position[1] - mouseY;

    const distance = Math.sqrt(
      dx * dx + dy * dy,
    );

    // Distance at which the node reacts to the cursor.
    const interactionRadius = 2.2;

    let influence = 0;

    if (distance < interactionRadius) {
      influence =
        1 - distance / interactionRadius;

      // Smoothstep.
      influence =
        influence *
        influence *
        (3 - 2 * influence);
    }

    // Natural floating animation.
    const floatY =
      position[1] +
      Math.sin(
        time * 0.7 + position[0],
      ) *
        0.08;

    // Slightly pull the node toward the cursor.
    const targetX =
      position[0] -
      dx * influence * 0.08;

    const targetY =
      floatY -
      dy * influence * 0.08;

    groupRef.current.position.x =
      THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        1 - Math.exp(-6 * delta),
      );

    groupRef.current.position.y =
      THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        1 - Math.exp(-6 * delta),
      );

    // Increase node size when the cursor gets close.
    const targetScale =
      1 + influence * 0.45;

    const scale =
      THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        targetScale,
        1 - Math.exp(-8 * delta),
      );

    groupRef.current.scale.setScalar(
      scale,
    );

    // Ring becomes faster when interacting.
    ringRef.current.rotation.z +=
      delta *
      (0.35 + influence * 3);

    // Very subtle rotation.
    groupRef.current.rotation.y =
      Math.sin(time * 0.4) *
      0.08;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      userData={{ type }}
      onPointerOver={(event) => {
        event.stopPropagation();

        setActiveNode(type);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();

        setActiveNode(null);
      }}

      onClick={(event) => {
        event.stopPropagation();

        selectNode(type);
        }}
    >
      {/* Main energy node */}
      <mesh>
        <sphereGeometry
          args={[0.16, 24, 24]}
        />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>

      {/* Orbital energy ring */}
      <mesh ref={ringRef}>
        <torusGeometry
          args={[
            0.28,
            0.006,
            12,
            64,
          ]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Local node glow */}
      <pointLight
        color={color}
        intensity={1.5}
        distance={3}
        decay={2}
      />
    </group>
  );
}