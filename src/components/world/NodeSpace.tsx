import { AnimatePresence, motion } from "framer-motion";

import { useEchoStore } from "../../store/echo.store";

const content = {
  memory: {
    eyebrow: "MEMORY SPACE",
    title: "What ECHO remembers",
    description:
      "Moments, experiences and information preserved inside your digital world.",
  },

  projects: {
    eyebrow: "PROJECT SPACE",
    title: "What you are creating",
    description:
      "Ideas, experiments and unfinished things moving toward reality.",
  },

  decisions: {
    eyebrow: "DECISION SPACE",
    title: "Paths you have taken",
    description:
      "Important choices and the consequences connected to them.",
  },

  possibilities: {
    eyebrow: "POSSIBILITY SPACE",
    title: "What could exist",
    description:
      "Alternative futures generated from your ideas, decisions and intentions.",
  },
};

export default function NodeSpace() {
  const view = useEchoStore(
    (state) => state.view,
  );

  const selectedNode =
    useEchoStore(
      (state) => state.selectedNode,
    );

  const closeNode =
    useEchoStore(
      (state) => state.closeNode,
    );

  return (
    <AnimatePresence>
      {view === "node" &&
        selectedNode && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="pointer-events-none absolute inset-0 z-30"
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.7,
              }}
              className="absolute left-[10%] top-1/2 max-w-md -translate-y-1/2"
            >
              <div className="border-l border-violet-400/50 pl-6">
                <div className="text-[10px] tracking-[0.45em] text-violet-300/70">
                  {content[selectedNode].eyebrow}
                </div>

                <h1 className="mt-4 text-4xl font-light tracking-tight text-white">
                  {content[selectedNode].title}
                </h1>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
                  {content[selectedNode].description}
                </p>

                <div className="pointer-events-auto mt-8">
                  <button
                    type="button"
                    onClick={closeNode}
                    className="border border-white/10 px-5 py-2 text-[10px] tracking-[0.3em] text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white"
                  >
                    RETURN TO WORLD
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
    </AnimatePresence>
  );
}