import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useEchoStore } from "../../store/echo.store";
const ENTER_POSITION =
  new THREE.Vector3(0, 0, 0);

const LANDING_POSITION =
  new THREE.Vector3(0, 0, 8);

const WORLD_POSITION =
  new THREE.Vector3(0, 0, 4.5);

const NODE_POSITIONS = {
  memory: new THREE.Vector3(-3, 1.5, 3),
  projects: new THREE.Vector3(3, 1.2, 3),
  decisions: new THREE.Vector3(-3, -1.5, 3),
  possibilities: new THREE.Vector3(3, -1.2, 3),
};

export default function WorldCamera() {
  const { camera } = useThree();

  const view = useEchoStore(
    (state) => state.view,
  );

  const selectedNode = useEchoStore(
    (state) => state.selectedNode,
  );

  const currentPosition = useRef(
    LANDING_POSITION.clone(),
  );

  useFrame((_, delta) => {
    let targetPosition =
      LANDING_POSITION;

    if (view === "entering") {
      targetPosition =
  ENTER_POSITION;
    }

    if (view === "world") {
      targetPosition =
        WORLD_POSITION;
    }

    if (
      view === "node" &&
      selectedNode
    ) {
      targetPosition =
        NODE_POSITIONS[selectedNode];
    }

    currentPosition.current.lerp(
      targetPosition,
      1 - Math.exp(-2.2 * delta),
    );

    camera.position.copy(
      currentPosition.current,
    );

    if (
      view === "node" &&
      selectedNode
    ) {
      const target =
        NODE_POSITIONS[selectedNode];

      camera.lookAt(
        target.x,
        target.y,
        0,
      );
    } else {
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}