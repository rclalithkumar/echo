import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useEchoStore } from "../../store/echo.store";

export default function EchoCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const view = useEchoStore((state) => state.view);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const entering = view === "entering";
    const world = view === "world";

    if (coreRef.current) {
      const idleScale =
        1 + Math.sin(time * 1.8) * 0.055;

      const enteringScale =
        1 + Math.sin(time * 8) * 0.12;

      const targetScale = entering
        ? enteringScale
        : idleScale;

      const scale = THREE.MathUtils.lerp(
        coreRef.current.scale.x,
        targetScale,
        1 - Math.exp(-8 * delta),
      );

      coreRef.current.scale.setScalar(scale);

      coreRef.current.rotation.y =
        time * (entering ? 1.8 : 0.35);

      coreRef.current.rotation.x =
        Math.sin(time * 0.7) * 0.15;
    }

    if (shellRef.current) {
      const targetScale = entering
        ? 2.2 + Math.sin(time * 5) * 0.25
        : world
          ? 1.5
          : 1.35 + Math.sin(time * 1.2) * 0.08;

      const scale = THREE.MathUtils.lerp(
        shellRef.current.scale.x,
        targetScale,
        1 - Math.exp(-6 * delta),
      );

      shellRef.current.scale.setScalar(scale);

      shellRef.current.rotation.y =
        -time * (entering ? 1.2 : 0.12);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x =
        Math.PI / 2;

      ring1Ref.current.rotation.z =
        time * (entering ? 2 : 0.35);

      if (entering) {
        ring1Ref.current.scale.setScalar(
          1 + Math.sin(time * 4) * 0.1,
        );
      }
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x =
        Math.PI / 3;

      ring2Ref.current.rotation.y =
        time * (entering ? 1.4 : 0.25);
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x =
        -Math.PI / 4;

      ring3Ref.current.rotation.z =
        -time * (entering ? 1.1 : 0.2);
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

      {/* Core light */}
      <pointLight
        color="#a78bfa"
        intensity={7}
        distance={8}
        decay={2}
      />

      {/* Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry
          args={[1.35, 0.012, 16, 160]}
        />

        <meshBasicMaterial
          color="#c4b5fd"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry
          args={[1.65, 0.008, 16, 160]}
        />

        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry
          args={[1.95, 0.006, 16, 160]}
        />

        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}