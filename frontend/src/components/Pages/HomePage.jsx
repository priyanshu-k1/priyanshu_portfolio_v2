/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

const SKILLS = ["Python", "Full-Stack", "Kotlin", "Dart", "AI / ML"]

const MONO = "var(--font-mono)"
const HEADING = "var(--font-heading)"

const tint = (color, percent) => `color-mix(in srgb, ${color} ${percent}%, transparent)`

const GRID_LINE = tint("var(--color-accent)", 8)

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
      className="inline-block w-2 h-2 rounded-full align-middle ml-1"
      style={{
        backgroundColor: "var(--color-accent)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.05s",
      }}
    />
  )
}

const SkillChip = ({ label, index }) => {
  const rest = {
    borderColor: "var(--color-border-strong)",
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text-secondary)",
  }
  const hover = {
    borderColor: "var(--color-accent)",
    backgroundColor: "var(--color-accent-subtle)",
    color: "var(--color-accent)",
  }

  return (
    <motion.span
      className="px-3.5 py-1.5 rounded-full border text-[10px] tracking-wide cursor-default"
      style={{
        fontFamily: MONO,
        transition:
          "background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
        ...rest,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 + index * 0.08 }}
      onMouseEnter={e => Object.assign(e.currentTarget.style, hover)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, rest)}
    >
      {label}
    </motion.span>
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        padding: "clamp(80px,10vw,140px) clamp(24px,6vw,80px) 60px",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
        transition: "background-color var(--duration-theme) var(--ease-standard)",
      }}
    >
      <motion.div
        className="absolute -top-30 -right-20 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${tint("var(--color-accent)", 26)} 0%, transparent 70%)`,
          filter: "blur(80px)",
          x: orb1X,
          y: orb1Y,
        }}
      />
      <motion.div
        className="absolute bottom-15 -left-15 w-85 h-85 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${tint("var(--color-accent-secondary)", 20)} 0%, transparent 70%)`,
          filter: "blur(80px)",
          x: orb2X,
          y: orb2Y,
        }}
      />
      <Orb
        className="top-[40%] right-[20%] w-50 h-50 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${tint("var(--color-accent-secondary)", 14)} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GRID_LINE} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="absolute top-6 right-6 w-20 h-20 border-t border-r pointer-events-none"
        style={{ borderColor: tint("var(--color-accent)", 30) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-14 h-14 border-b border-l pointer-events-none"
        style={{ borderColor: tint("var(--color-accent-secondary)", 35) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 right-[4vw] select-none pointer-events-none leading-none hidden sm:block"
        style={{
          fontSize: "clamp(80px,13vw,200px)",
          fontFamily: HEADING,
          fontWeight: "var(--weight-semibold)",
          color: tint("var(--color-text-primary)", 6),
        }}
      >
        CODE!
      </div>

      <motion.p
        className="flex items-center gap-2.5 uppercase tracking-[0.35em] mb-7"
        style={{
          fontSize: "clamp(9px,1.1vw,11px)",
          fontFamily: MONO,
          color: "var(--color-accent)",
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="block w-7 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
        Full-Stack · Android · AI/ML
      </motion.p>

      <div className="overflow-hidden">
        <motion.h1
          className="uppercase leading-[0.92] tracking-tight"
          style={{
            fontSize: "clamp(40px,10vw,160px)",
            fontFamily: HEADING,
            fontWeight: "var(--weight-semibold)",
            color: "var(--color-text-primary)",
          }}
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          PRIYANSHU
          <br />
          <motion.span
            className="block"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-secondary) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
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
          background: `linear-gradient(90deg, ${tint("var(--color-accent)", 60)} 0%, ${tint("var(--color-accent)", 12)} 60%, transparent 100%)`,
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
          className="font-light leading-[1.75] max-w-md "
          style={{
            fontSize: "clamp(14px,1.6vw,16px)",
            color: "var(--color-text-secondary)",
          }}
        >
          <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
            Full-stack developer
          </span>{" "}
          building scalable web applications — with a foundation in Kotlin, Flutter &amp; Dart for mobile.
          Focused on{" "}
          <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
            AI-driven systems and real-world problem solving
          </span>
          <CursorDot />
        </p>

        <div className="flex flex-row sm:flex-col sm:items-end items-center justify-between gap-5
          mb-3">
          <span
            className="text-[11px] tracking-wide flex items-center gap-1.5"
            style={{ fontFamily: MONO, color: "var(--color-text-muted)" }}
          >
            <span className="text-[10px]" style={{ color: "var(--color-accent)" }}>
              ◈
            </span>
            Hyderabad, India
          </span>

          <div className="flex gap-2 flex-wrap sm:justify-end justify-start ">
            {SKILLS.map((s, i) => (
              <SkillChip key={s} label={s} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HomePage