import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ParticleScene from "./components/effects/ParticleScene";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030305] text-white">
      <ParticleScene />
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute left-[20%] top-[30%] h-[250px] w-[250px] rounded-full bg-cyan-400/5 blur-[100px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Navigation */}
      <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-8 py-7 md:px-12">
        <div className="text-sm font-medium tracking-[0.45em] text-white/70">
          ECHO
        </div>

        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          SYSTEM ONLINE
        </div>
      </nav>

      {/* Main content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex max-w-5xl flex-col items-center text-center">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-10 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.9)]" />

            <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">
              A living digital world
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="select-none text-[clamp(5rem,16vw,13rem)] font-light leading-[0.75] tracking-[-0.07em]"
          >
            ECHO
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 max-w-xl text-sm leading-7 tracking-wide text-white/40 md:text-base"
          >
            A persistent digital world where your ideas, decisions,
            memories, and possible futures come alive.
          </motion.p>

          {/* Enter button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group mt-12 flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-400/40 hover:bg-white/[0.08]"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              Enter the world
            </span>

            <ArrowRight
              size={16}
              className="text-white/50 transition-transform duration-500 group-hover:translate-x-1"
            />
          </motion.button>
        </div>
      </section>

      {/* Bottom information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-20 flex justify-center"
      >
        <div className="text-[9px] uppercase tracking-[0.4em] text-white/20">
          Memory · Reality · Possibility
        </div>
      </motion.div>

      {/* Decorative orbital rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.018]" />
    </main>
  );
}

export default App;