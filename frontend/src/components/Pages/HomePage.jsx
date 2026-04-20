/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

const SKILLS = ["Python","Full-Stack","Kotlin", "Dart", "AI / ML"]

const Orb = ({ className, style }) => (
  <div className={`absolute rounded-full pointer-events-none ${className}`} style={style} />
)

const CursorDot = () => {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setVisible(v => !v), 550)
    return () => clearInterval(id)
  }, [])
  return (
    <span
      className="inline-block w-2 h-2 rounded-full bg-violet-500 align-middle ml-1"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.05s" }}
    />
  )
}

const HomePage = () => {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const orb1X = useTransform(springX, v => v * 0.02)
  const orb1Y = useTransform(springY, v => v * 0.02)
  const orb2X = useTransform(springX, v => v * -0.015)
  const orb2Y = useTransform(springY, v => v * -0.015)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleMove = e => {
      const rect = el.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    el.addEventListener("mousemove", handleMove)
    return () => el.removeEventListener("mousemove", handleMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#09090f]"
      style={{ padding: "clamp(80px,10vw,140px) clamp(24px,6vw,80px) 60px" }}
    >
      <motion.div
        className="absolute -top-30 -right-20 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120,40,220,0.28) 0%, transparent 70%)",
          filter: "blur(80px)",
          x: orb1X,
          y: orb1Y,
        }}
      />
      <motion.div
        className="absolute bottom-15 -left-15 w-85 h-85 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(160,80,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          x: orb2X,
          y: orb2Y,
        }}
      />
      <Orb
        className="top-[40%] right-[20%] w-50 h-50 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(200,120,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,60,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(140,60,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="absolute top-6 right-6 w-20 h-20 border-t border-r border-violet-500/20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-14 h-14 border-b border-l border-violet-500/15 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 right-[4vw] select-none pointer-events-none font-black text-violet-200/6 leading-none hidden sm:block"
        style={{ fontSize: "clamp(80px,13vw,200px)", fontFamily: "sans-serif" }}
      >
       CODE!
      </div>

      <motion.p
        className="flex items-center gap-2.5 font-mono uppercase tracking-[0.35em] text-violet-400 mb-7"
        style={{ fontSize: "clamp(9px,1.1vw,11px)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="block w-7 h-px bg-violet-400" />
        Full-Stack · Android · AI/ML
      </motion.p>

      <div className="overflow-hidden">
        <motion.h1
          className="font-black uppercase leading-[0.92] tracking-tight text-[#f0e8ff]"
          style={{ fontSize: "clamp(40px,10vw,160px)", fontFamily: "sans-serif" }}
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          PRIYANSHU
          <br />
          <motion.span
            className="block bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent"
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          >
            KUMAR
          </motion.span>
        </motion.h1>
      </div>

      <motion.div
        className="w-full h-px my-8"
        style={{
          background:
            "linear-gradient(90deg, rgba(140,60,255,0.55) 0%, rgba(140,60,255,0.1) 60%, transparent 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      />

      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
      >
        <p
          className="font-light leading-[1.75] text-purple-200/70 max-w-md"
          style={{ fontSize: "clamp(14px,1.6vw,16px)" }}
        >
          <span className="text-purple-300 font-medium">Full-stack developer</span> building scalable web
          applications — with a foundation in Kotlin, Flutter &amp; Dart for mobile. Focused on{" "}
          <span className="text-purple-300 font-medium">AI-driven systems and real-world problem solving</span>
          <CursorDot />
        </p>

        <div className="flex flex-row sm:flex-col sm:items-end items-center justify-between gap-5">
          <span className="font-mono text-[11px] tracking-wide text-violet-400/60 flex items-center gap-1.5">
            <span className="text-violet-600 text-[10px]">◈</span>
            Hyderabad, India
          </span>

          <div className="flex gap-2 flex-wrap sm:justify-end justify-start">
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                className="px-3.5 py-1.5 rounded-full border border-violet-500/25 font-mono text-[10px] tracking-wide text-purple-300/75 bg-violet-900/10 cursor-default"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.08 }}
                whileHover={{
                  borderColor: "rgba(180,120,255,0.55)",
                  backgroundColor: "rgba(120,40,220,0.18)",
                  transition: { duration: 0.15 },
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2.5 mt-1">
            <span
              className="font-mono text-[9px] tracking-[0.2em] text-violet-400/45 uppercase flex items-center gap-1"
              style={{ writingMode: "vertical-lr" }}
            >
              Scroll
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <a href="#skills"><ArrowDown size={12} /></a>
              </motion.div>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HomePage