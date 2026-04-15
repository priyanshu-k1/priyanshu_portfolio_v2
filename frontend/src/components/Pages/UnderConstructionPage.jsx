/* eslint-disable no-unused-vars */
// this page if for re
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REDIRECT_URL = "https://priyanshu-k1.github.io/Portfolio_Priyanshu/";
const DELAY_MS = 2000;

const UnderConstructionPage = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / DELAY_MS) * 100, 100);
      setProgress(pct);

      if (elapsed < DELAY_MS) {
        requestAnimationFrame(tick);
      } else {
        setPhase("done");
        setTimeout(() => {
          window.location.href = REDIRECT_URL;
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-150 h-150 bg-white/1.5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-zinc-800/30 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center mb-1"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-zinc-300" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
            </svg>
          </motion.div>

          <div className="text-center">
            <h1 className="text-white text-2xl font-bold tracking-tight mb-1.5">
              Under Construction
            </h1>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Redirecting you to the developer's portfolio…
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="relative w-full h-0.75 bg-white/6 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
            <motion.div
              className="absolute inset-y-0 w-16 bg-linear-to-r from-transparent via-white/60 to-transparent rounded-full"
              style={{ left: `${progress - 8}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-zinc-600 text-[11px] tracking-wide"
              >
                {phase === "done" ? "Redirecting…" : "Loading…"}
              </motion.p>
            </AnimatePresence>
            <p className="text-zinc-600 text-[11px] tabular-nums">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 border border-white/6">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-zinc-600 text-[11px] tracking-wide truncate max-w-60">
            {REDIRECT_URL}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstructionPage;