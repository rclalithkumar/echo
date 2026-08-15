import { motion } from "framer-motion";

import { useEchoStore } from "../../store/echo.store";

const nodes = [
  {
    title: "MEMORY",
    description: "Things ECHO remembers",
    position: "left-[18%] top-[28%]",
  },
  {
    title: "PROJECTS",
    description: "Things you are creating",
    position: "right-[18%] top-[28%]",
  },
  {
    title: "DECISIONS",
    description: "Paths you have taken",
    position: "left-[18%] bottom-[28%]",
  },
  {
    title: "POSSIBILITIES",
    description: "Paths that could exist",
    position: "right-[18%] bottom-[28%]",
  },
];

export default function WorldHUD() {
  const view = useEchoStore((state) => state.view);

  const isWorld = view === "world";

  if (!isWorld) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {nodes.map((node, index) => (
        <motion.div
          key={node.title}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8 + index * 0.15,
            duration: 0.8,
          }}
          className={`absolute ${node.position}`}
        >
          <div className="border-l border-white/10 pl-4">
            <div className="text-[10px] tracking-[0.35em] text-white/50">
              {node.title}
            </div>

            <div className="mt-2 text-xs text-white/20">
              {node.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}