import EchoCore from "./EchoCore";
import WorldConnections from "./WorldConnections";
import WorldNodes from "./WorldNodes";

import { useEchoStore } from "../../store/echo.store";

export default function EchoWorld() {
  const view = useEchoStore((state) => state.view);

  const isWorld = view === "world";

  return (
    <group>
      {/* ECHO Core exists throughout the experience */}
      <EchoCore />

      {/* Spatial world only exists after entering */}
      {isWorld && (
        <>
          <WorldConnections />
          <WorldNodes />
        </>
      )}
    </group>
  );
}