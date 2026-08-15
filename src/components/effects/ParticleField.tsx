import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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

// Generated once when this module loads.
// Safe for React rendering because it is not created inside the component.
const BASE_POSITIONS = createParticlePositions();

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { pointer } = useThree();

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    const geometry = pointsRef.current.geometry;

    const positionAttribute =
      geometry.attributes.position as THREE.BufferAttribute;

    const array = positionAttribute.array as Float32Array;

    const mouseX = pointer.x * 8;
    const mouseY = pointer.y * 5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const baseX = BASE_POSITIONS[i3];
      const baseY = BASE_POSITIONS[i3 + 1];
      const baseZ = BASE_POSITIONS[i3 + 2];

      const dx = baseX - mouseX;
      const dy = baseY - mouseY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const radius = 4;

      let influence = 0;

      if (distance < radius) {
        influence = 1 - distance / radius;

        influence =
          influence *
          influence *
          (3 - 2 * influence);
      }

      const pushStrength = influence * 0.9;

      let targetX = baseX;
      let targetY = baseY;

      if (distance > 0.001) {
        targetX += (dx / distance) * pushStrength;
        targetY += (dy / distance) * pushStrength;
      }

      targetX +=
        Math.sin(time * 0.25 + baseZ) * 0.025;

      targetY +=
        Math.cos(time * 0.2 + baseX) * 0.025;

      array[i3] +=
        (targetX - array[i3]) * 0.045;

      array[i3 + 1] +=
        (targetY - array[i3 + 1]) * 0.045;

      array[i3 + 2] +=
        (baseZ - array[i3 + 2]) * 0.02;
    }

    positionAttribute.needsUpdate = true;

    pointsRef.current.rotation.y =
      time * 0.012;

    pointsRef.current.rotation.x =
      Math.sin(time * 0.08) * 0.025;

    pointsRef.current.position.y =
      Math.sin(time * 0.15) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[BASE_POSITIONS, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.028}
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}