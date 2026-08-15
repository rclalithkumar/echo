import { motion } from "framer-motion";

import {
  useEchoStore,
  type WorldNodeType,
} from "../../store/echo.store";

interface WorldHUDNode {
  id: WorldNodeType;
  title: string;
  description: string;
  position: string;
}

const nodes: WorldHUDNode[] = [
  {
    id: "memory",
    title: "MEMORY",
    description: "Things ECHO remembers",
    position: "left-[18%] top-[28%]",
  },
  {
    id: "projects",
    title: "PROJECTS",
    description: "Things you are creating",
    position: "right-[18%] top-[28%]",
  },
  {
    id: "decisions",
    title: "DECISIONS",
    description: "Paths you have taken",
    position: "left-[18%] bottom-[28%]",
  },
  {
    id: "possibilities",
    title: "POSSIBILITIES",
    description: "Paths that could exist",
    position: "right-[18%] bottom-[28%]",
  },
];

export default function WorldHUD() {
  const view = useEchoStore(
    (state) => state.view,
  );

  const activeNode = useEchoStore(
    (state) => state.activeNode,
  );

  // HUD should only exist inside the actual world.
  if (view !== "world") {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {nodes.map((node, index) => {
        const isActive =
          activeNode === node.id;

        return (
          <motion.div
            key={node.id}
            initial={{
              opacity: 0,
              y: 12,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: isActive ? 1 : 0.7,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.8 + index * 0.15,
              duration: 0.8,
              ease: "easeOut",
            }}
            className={`absolute ${node.position}`}
          >
            <motion.div
              animate={{
                x: isActive ? 6 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className={`
                border-l
                pl-4
                transition-all
                duration-500
                ${
                  isActive
                    ? "border-violet-400/80"
                    : "border-white/10"
                }
              `}
            >
              {/* Node title */}
              <motion.div
                animate={{
                  letterSpacing: isActive
                    ? "0.45em"
                    : "0.35em",
                }}
                transition={{
                  duration: 0.4,
                }}
                className={`
                  text-[10px]
                  font-medium
                  transition-colors
                  duration-500
                  ${
                    isActive
                      ? "text-white"
                      : "text-white/50"
                  }
                `}
              >
                {node.title}
              </motion.div>

              {/* Description */}
              <motion.div
                animate={{
                  opacity: isActive
                    ? 0.7
                    : 0.2,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="mt-2 text-xs text-white"
              >
                {node.description}
              </motion.div>

              {/* Active indicator */}
              <motion.div
                initial={false}
                animate={{
                  width: isActive ? 32 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="mt-3 h-px bg-violet-400"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}