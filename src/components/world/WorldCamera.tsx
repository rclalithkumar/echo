import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useEchoStore } from "../../store/echo.store";

const LANDING_POSITION = new THREE.Vector3(0, 0, 8);

const CORE_POSITION = new THREE.Vector3(0, 0, 0);

export default function WorldCamera() {
  const { camera } = useThree();

  const view = useEchoStore((state) => state.view);

  const currentPosition = useRef(
    LANDING_POSITION.clone(),
  );

  useFrame((_, delta) => {
    if (view === "landing") {
      currentPosition.current.lerp(
        LANDING_POSITION,
        1 - Math.exp(-4 * delta),
      );
    }

    if (view === "entering") {
      currentPosition.current.lerp(
        CORE_POSITION,
        1 - Math.exp(-1.8 * delta),
      );
    }

    if (view === "world") {
      currentPosition.current.lerp(
        new THREE.Vector3(0, 0, 4.5),
        1 - Math.exp(-2 * delta),
      );
    }

    camera.position.copy(
      currentPosition.current,
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}