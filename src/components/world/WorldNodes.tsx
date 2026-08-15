import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type WorldNodeProps = {
  position: [number, number, number];
  color: string;
};

function WorldNode({
  position,
  color,
}: WorldNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] +
        Math.sin(time * 0.7 + position[0]) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z =
        time * 0.35;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
    >
      {/* Core node */}
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          roughness={0.2}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef}>
        <torusGeometry
          args={[0.28, 0.006, 12, 64]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        color={color}
        intensity={1.5}
        distance={3}
        decay={2}
      />
    </group>
  );
}

export default function WorldNodes() {
  return (
    <group>
      <WorldNode
        position={[-3, 1.5, -1]}
        color="#a78bfa"
      />

      <WorldNode
        position={[3, 1.2, -1.5]}
        color="#67e8f9"
      />

      <WorldNode
        position={[-3, -1.5, -1]}
        color="#c4b5fd"
      />

      <WorldNode
        position={[3, -1.2, -1.5]}
        color="#818cf8"
      />
    </group>
  );
}