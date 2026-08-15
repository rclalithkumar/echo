import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2500;

function createParticlePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    positions[i3] = (Math.random() - 0.5) * 18;
    positions[i3 + 1] = (Math.random() - 0.5) * 12;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
  }

  return positions;
}

const PARTICLE_POSITIONS = createParticlePositions();

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.y = time * 0.015;

    pointsRef.current.rotation.x =
      Math.sin(time * 0.08) * 0.03;

    pointsRef.current.position.y =
      Math.sin(time * 0.15) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}