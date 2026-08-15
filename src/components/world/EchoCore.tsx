import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function EchoCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      const scale =
        1 + Math.sin(time * 1.8) * 0.055;

      coreRef.current.scale.setScalar(scale);

      coreRef.current.rotation.y =
        time * 0.35;

      coreRef.current.rotation.x =
        Math.sin(time * 0.7) * 0.15;
    }

    if (shellRef.current) {
      const scale =
        1.35 + Math.sin(time * 1.2) * 0.08;

      shellRef.current.scale.setScalar(scale);

      shellRef.current.rotation.y =
        -time * 0.12;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x =
        Math.PI / 2;

      ring1Ref.current.rotation.z =
        time * 0.35;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x =
        Math.PI / 3;

      ring2Ref.current.rotation.y =
        time * 0.25;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x =
        -Math.PI / 4;

      ring3Ref.current.rotation.z =
        -time * 0.2;
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 3]} />

        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#8b5cf6"
          emissiveIntensity={3}
          roughness={0.15}
          metalness={0.25}
        />
      </mesh>

      {/* Energy shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.9, 2]} />

        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.09}
          wireframe
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow */}
      <pointLight
        color="#a78bfa"
        intensity={7}
        distance={8}
        decay={2}
      />

      {/* Orbital ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.012, 16, 160]} />

        <meshBasicMaterial
          color="#c4b5fd"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.008, 16, 160]} />

        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Orbital ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.95, 0.006, 16, 160]} />

        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}