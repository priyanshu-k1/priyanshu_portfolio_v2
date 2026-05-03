/* eslint-disable no-unused-vars */
import { motion, useInView, AnimatePresence } from "motion/react"
import { useRef, useState } from "react"
import projectData from "./project.json"
import {Zap} from "lucide-react"

const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
]

const TagPill = ({ label }) => (
  <span
    className="font-mono text-[9px] tracking-wide uppercase px-2.5 py-1 rounded-full"
    style={{
      border: "1px solid rgba(139,92,246,0.3)",
      background: "rgba(139,92,246,0.1)",
      color: "rgba(192,168,255,0.75)",
    }}
  >
    {label}
  </span>
)

const ProjectModal = ({ project, onClose }) => {
  const tech = project.modalcontent?.techStack ?? []
  const content = project.modalcontent?.content ?? project.description

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(5,3,15,0.88)", backdropFilter: "blur(16px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          border: "1px solid rgba(139,92,246,0.3)",
          background: "rgba(9,9,15,0.98)",
          maxHeight: "90vh",
        }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-52 shrink-0 overflow-hidden">
          <img
            src={project._bannerUrl}
            alt={project.alt}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.65)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(9,9,15,1) 0%, rgba(9,9,15,0.25) 60%, transparent 100%)" }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-white/60 hover:text-white transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.4)" }}
          >
            ✕
          </button>
          {project.isUnderDevelopment && (
            <span
              className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
              style={{ border: "1px solid rgba(217,70,239,0.5)", background: "rgba(9,9,15,0.7)", color: "rgba(240,171,252,0.9)" }}
            >
              ◈ {project.progressTag ?? "In Dev"}
            </span>
          )}
          <div className="absolute bottom-4 left-6">
            <span
              className="font-black uppercase tracking-tight text-white"
              style={{ fontSize: "clamp(20px,3.5vw,28px)", fontFamily: "sans-serif" }}
            >
              {project.name}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-6 overflow-y-auto">
          <p className="font-light leading-relaxed text-purple-200/65" style={{ fontSize: 14 }}>
            {content}
          </p>

          {tech.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-violet-400/70">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {tech.map(t => <TagPill key={t} label={t} />)}
              </div>
            </div>
          )}

          <div
            className="w-full h-px"
            style={{ background: "linear-gradient(90deg, rgba(140,60,255,0.3) 0%, transparent 100%)" }}
          />

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 font-mono text-[11px] tracking-wide text-violet-400 hover:text-violet-200 transition-colors self-start group"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

const FeaturedCard = ({ project, onOpen }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const tags = project.techStack.split(",").map(t => t.trim()).slice(0, 5)

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer group w-full"
      style={{ border: "1px solid rgba(139,92,246,0.22)", minHeight: 360 }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
    >
      <img
        src={project._bannerUrl}
        alt={project.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "brightness(0.4)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(120deg, rgba(9,9,15,0.95) 0%, rgba(9,9,15,0.55) 55%, rgba(9,9,15,0.15) 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.18) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 h-full p-8 md:p-12" style={{ minHeight: 360 }}>
        <div className="flex flex-col justify-between gap-6 max-w-lg">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 
              py-1.5 rounded-full flex flex-row items-center align-center gap-1  group 
              hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
              style={{ border: "1px solid rgba(139,92,246,0.5) ", 
                background: "rgba(139,92,246,0.15)", color: "rgba(192,168,255,0.9)" }}
            >
              <Zap size={15} className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-30"/> 
              <p  className="transition-all duration-300 ease-in-out group-hover:font-bold">Featured</p>
            </span>
            {project.isUnderDevelopment && (
              <span
                className="font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1.5 rounded-full"
                style={{ border: "1px solid rgba(217,70,239,0.4)", background: "rgba(217,70,239,0.1)", color: "rgba(240,171,252,0.85)" }}
              >
                ◈ {project.progressTag ?? "In Dev"}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h3
              className="font-black uppercase tracking-tight leading-[0.88] text-[#f0e8ff]"
              style={{ fontSize: "clamp(36px,6vw,72px)", fontFamily: "sans-serif" }}
            >
              {project.name}
            </h3>
            <p className="font-light leading-relaxed text-purple-200/60 text-sm max-w-sm">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => <TagPill key={t} label={t} />)}
              {project.techStack.split(",").length > 5 && (
                <span className="font-mono text-[9px] px-2 py-1 text-violet-500/40">
                  +{project.techStack.split(",").length - 5} more
                </span>
              )}
            </div>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[10px] tracking-wide text-violet-400/70 group-hover:text-violet-300 transition-colors duration-200">
                View Details ↗
              </span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-wide text-violet-400/70 hover:text-violet-300 transition-colors duration-200"
                onClick={e => e.stopPropagation()}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end flex-1">
          <div
            className="w-56 h-56 rounded-2xl overflow-hidden flex-shrink-0"
            style={{ border: "1px solid rgba(139,92,246,0.25)" }}
          >
            <img
              src={project._bannerUrl}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ filter: "brightness(0.8) saturate(0.9)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const StandardCard = ({ project, index, onOpen }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const tags = project.techStack.split(",").map(t => t.trim()).slice(0, 3)

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
      style={{ border: "1px solid rgba(139,92,246,0.18)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onClick={() => onOpen(project)}
    >
      <div className="relative h-44 shrink-0 overflow-hidden">
        <img
          src={project._bannerUrl}
          alt={project.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          style={{ filter: "brightness(0.5)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(9,9,15,1) 0%, rgba(9,9,15,0.15) 65%, transparent 100%)" }}
        />
        {project.isUnderDevelopment && (
          <span
            className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-1 rounded-full"
            style={{ border: "1px solid rgba(217,70,239,0.4)", background: "rgba(9,9,15,0.65)", color: "rgba(240,171,252,0.85)" }}
          >
            ◈ {project.progressTag ?? "In Dev"}
          </span>
        )}
      </div>

      <div
        className="flex flex-col gap-3 p-5 flex-1"
        style={{ background: "radial-gradient(ellipse at top, rgba(139,92,246,0.05) 0%, rgba(9,9,15,0) 70%), rgba(9,9,15,0.98)" }}
      >
        <h3
          className="font-black uppercase tracking-tight text-[#f0e8ff] leading-tight"
          style={{ fontSize: "clamp(15px,2vw,19px)", fontFamily: "sans-serif" }}
        >
          {project.name}
        </h3>
        <p className="font-light text-purple-200/50 text-[12px] leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => <TagPill key={t} label={t} />)}
          {project.techStack.split(",").length > 3 && (
            <span className="font-mono text-[9px] px-1 py-1 text-violet-500/35">
              +{project.techStack.split(",").length - 3}
            </span>
          )}
        </div>
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}
        >
          <span className="font-mono text-[9px] tracking-wide text-violet-500/40 group-hover:text-violet-400/70 transition-colors duration-200">
            View Details ↗
          </span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-wide text-violet-500/35 hover:text-violet-300 transition-colors duration-200"
            onClick={e => e.stopPropagation()}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </motion.div>
  )
}

const MinorProjectRow = ({ project, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 py-4 group"
      style={{ borderBottom: "1px solid rgba(139,92,246,0.1)" }}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ x: 4, transition: { duration: 0.15 } }}
    >
      <span className="font-mono text-[10px] text-violet-400/70 w-6 shrink-0 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className="font-black uppercase tracking-tight text-purple-200/60 group-hover:text-[#f0e8ff] transition-colors duration-200"
        style={{ fontSize: "clamp(13px,1.8vw,17px)", fontFamily: "sans-serif" }}
      >
        {project.name}
      </span>
      <div className="flex-1 h-px mx-3" style={{ background: "rgba(139,92,246,0.08)" }} />
      <span className="font-mono text-[10px] text-violet-400/70 group-hover:text-violet-300/80 transition-colors duration-200 shrink-0">
        GitHub ↗
      </span>
    </motion.a>
  )
}

const ProjectPage = () => {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const minorRef = useRef(null)
  const minorInView = useInView(minorRef, { once: true, margin: "-80px" })
  const [activeModal, setActiveModal] = useState(null)

  const projects = 
  projectData.projects.map((p, i) => ({
    ...p,
    _bannerUrl: DUMMY_IMAGES[i % DUMMY_IMAGES.length],
  }))

  const featured = projects[0]
  const rest = projects.slice(1)
  const { minorProjects } = projectData

  return (
    <>
      <AnimatePresence>
        {activeModal && (
          <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>

      <section
        className="relative min-h-screen bg-[#09090f] overflow-hidden"
        style={{ padding: "clamp(80px,10vw,140px) clamp(24px,6vw,80px) 80px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(140,60,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(140,60,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(120,40,220,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-100 h-100 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(100,30,180,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          className="absolute top-6 right-6 w-20 h-20 border-t border-r border-violet-500/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-6 left-6 w-14 h-14 border-b border-l border-violet-500/15 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
        <div
          className="absolute top-1/2 right-[4vw] -translate-y-1/2 select-none pointer-events-none font-black text-violet-500/4 leading-none"
          style={{ fontSize: "clamp(100px,16vw,200px)", fontFamily: "sans-serif" }}
        >
          03
        </div>

        <div ref={headerRef} className="flex flex-col gap-6 mb-16 max-w-2xl">
          <motion.p
            className="flex items-center gap-2.5 font-mono uppercase tracking-[0.35em] text-violet-400"
            style={{ fontSize: "clamp(9px,1.1vw,11px)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="block w-7 h-px bg-violet-400" />
            Selected Work
          </motion.p>

          <motion.h2
            className="font-black uppercase leading-[0.92] tracking-tight text-[#f0e8ff]"
            style={{ fontSize: "clamp(52px,9vw,120px)", fontFamily: "sans-serif" }}
            initial={{ opacity: 0, x: -24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            PROJ
            <span className="bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent">
              ECTS
            </span>
          </motion.h2>

          <motion.div
            className="w-full h-px"
            style={{
              background: "linear-gradient(90deg, rgba(140,60,255,0.55) 0%, rgba(140,60,255,0.1) 60%, transparent 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          />

          <motion.p
            className="font-light leading-relaxed text-purple-200/60"
            style={{ fontSize: "clamp(14px,1.5vw,15px)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {projectData.pageConfig.devDescription}
          </motion.p>
        </div>

        <div className="flex flex-col gap-5 mb-24">
          <FeaturedCard project={featured} onOpen={setActiveModal} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((project, i) => (
              <StandardCard key={project.name} project={project} index={i} onOpen={setActiveModal} />
            ))}
          </div>
        </div>

        <div ref={minorRef} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <motion.p
              className="flex items-center gap-2.5 font-mono uppercase tracking-[0.35em] text-violet-400"
              style={{ fontSize: "clamp(9px,1.1vw,11px)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={minorInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="block w-7 h-px bg-violet-400" />
              Other Builds
            </motion.p>

            <motion.h3
              className="font-black uppercase leading-[0.92] tracking-tight text-[#f0e8ff]"
              style={{ fontSize: "clamp(32px,5vw,60px)", fontFamily: "sans-serif" }}
              initial={{ opacity: 0, x: -20 }}
              animate={minorInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              MINOR{" "}
              <span className="bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent">
                PROJECTS
              </span>
            </motion.h3>

            <motion.div
              className="w-full h-px"
              style={{ background: "linear-gradient(90deg, rgba(140,60,255,0.4) 0%, transparent 100%)" }}
              initial={{ opacity: 0 }}
              animate={minorInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            />
          </div>

          <div className="max-w-2xl">
            {minorProjects.map((p, i) => (
              <MinorProjectRow key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectPage