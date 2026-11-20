/* eslint-disable no-unused-vars */
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react"

const TILT_SPRING = { stiffness: 170, damping: 20, mass: 0.6 }
const HOVER_SPRING = { stiffness: 140, damping: 22, mass: 0.7 }

const clamp01 = (value) => Math.min(1, Math.max(0, value))

const TiltCard = ({
  children,
  className = "",
  radius = "1.5rem",
  maxTilt = 10,
  hoverScale = 1.025,
  lift = 6,
  perspective = 1000,
  glare = true,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const hover = useMotionValue(0)

  const x = useSpring(pointerX, TILT_SPRING)
  const y = useSpring(pointerY, TILT_SPRING)
  const h = useSpring(hover, HOVER_SPRING)

  const rotateY = useTransform(x, [0, 1], [-maxTilt, maxTilt])
  const rotateX = useTransform(y, [0, 1], [maxTilt, -maxTilt])
  const scale = useTransform(h, [0, 1], [1, hoverScale])
  const translateY = useTransform(h, [0, 1], [0, -lift])

  const boxShadow = useTransform([rotateX, rotateY, h], ([rx, ry, hv]) => {
    const offsetX = -ry * 1.5
    const offsetY = 8 + hv * 16 + rx * 0.8
    const blur = 14 + hv * 30
    const alpha = hv * 0.28
    return `${offsetX}px ${offsetY}px ${blur}px rgba(0, 0, 0, ${alpha})`
  })

  const glareX = useTransform(x, (v) => v * 100)
  const glareY = useTransform(y, (v) => v * 100)
  const glareOpacity = useTransform(h, [0, 1], [0, 1])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 35%, transparent 65%)`

  const canTilt = (event) => !prefersReducedMotion && event.pointerType === "mouse"

  const updatePointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    pointerX.set(clamp01((event.clientX - rect.left) / rect.width))
    pointerY.set(clamp01((event.clientY - rect.top) / rect.height))
  }

  const handlePointerEnter = (event) => {
    if (!canTilt(event)) return
    updatePointer(event)
    hover.set(1)
  }

  const handlePointerMove = (event) => {
    if (!canTilt(event)) return
    updatePointer(event)
    hover.set(1)
  }

  const handlePointerLeave = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
    hover.set(0)
  }

  return (
    <div
      className={className}
      style={{ perspective }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    >
      <motion.div
        style={{
          position: "relative",
          rotateX,
          rotateY,
          scale,
          y: translateY,
          boxShadow,
          borderRadius: radius,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
        {glare && !prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              z: 1,
              zIndex: 20,
              borderRadius: radius,
              pointerEvents: "none",
              background: glareBackground,
              opacity: glareOpacity,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}

export default TiltCard