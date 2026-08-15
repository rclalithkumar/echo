import WorldNode from "./WorldNode";

import { useEchoStore } from "../../store/echo.store";

export default function WorldNodes() {
  const view = useEchoStore(
    (state) => state.view,
  );

  const selectedNode =
    useEchoStore(
      (state) => state.selectedNode,
    );

  if (view === "node") {
    return (
      <group>
        {selectedNode && (
          <WorldNode
            type={selectedNode}
            position={
              selectedNode === "memory"
                ? [-3, 1.5, -1]
                : selectedNode === "projects"
                  ? [3, 1.2, -1.5]
                  : selectedNode ===
                      "decisions"
                    ? [-3, -1.5, -1]
                    : [3, -1.2, -1.5]
            }
            color={
              selectedNode === "memory"
                ? "#a78bfa"
                : selectedNode === "projects"
                  ? "#67e8f9"
                  : selectedNode ===
                      "decisions"
                    ? "#c4b5fd"
                    : "#818cf8"
            }
          />
        )}
      </group>
    );
  }

  return (
    <group>
      <WorldNode
        type="memory"
        position={[-3, 1.5, -1]}
        color="#a78bfa"
      />

      <WorldNode
        type="projects"
        position={[3, 1.2, -1.5]}
        color="#67e8f9"
      />

      <WorldNode
        type="decisions"
        position={[-3, -1.5, -1]}
        color="#c4b5fd"
      />

      <WorldNode
        type="possibilities"
        position={[3, -1.2, -1.5]}
        color="#818cf8"
      />
    </group>
  );
}