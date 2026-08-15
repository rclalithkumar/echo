import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEchoStore } from "../../store/echo.store";
const connections = [
  {
    start: [-3, 1.5, -1] as [number, number, number],
    end: [0, 0, 0] as [number, number, number],
  },
  {
    start: [3, 1.2, -1.5] as [number, number, number],
    end: [0, 0, 0] as [number, number, number],
  },
  {
    start: [-3, -1.5, -1] as [number, number, number],
    end: [0, 0, 0] as [number, number, number],
  },
  {
    start: [3, -1.2, -1.5] as [number, number, number],
    end: [0, 0, 0] as [number, number, number],
  },
];

function Connection({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame((state) => {
    if (!lineRef.current) return;

    const time = state.clock.getElapsedTime();

    const material =
      lineRef.current.material as THREE.LineBasicMaterial;

    material.opacity =
      0.12 +
      Math.sin(time * 1.2) * 0.04;
  });

  const startVector = new THREE.Vector3(...start);
  const endVector = new THREE.Vector3(...end);

  const points = [
    startVector,
    endVector,
  ];

  const geometry =
    new THREE.BufferGeometry().setFromPoints(
      points,
    );

  return (
    <primitive
      ref={lineRef}
      object={
        new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: "#8b5cf6",
            transparent: true,
            opacity: 0.12,
          }),
        )
      }
    />
  );
}

export default function WorldConnections() {
      const view = useEchoStore(
    (state) => state.view,
  );

  if (view === "node") {
    return null;
  }
  return (
    <group>
      {connections.map((connection, index) => (
        <Connection
          key={index}
          start={connection.start}
          end={connection.end}
        />
      ))}
    </group>
  );
}