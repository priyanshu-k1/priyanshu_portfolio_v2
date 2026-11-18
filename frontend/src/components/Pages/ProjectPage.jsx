/* eslint-disable no-unused-vars */
import { motion, useInView, AnimatePresence } from "motion/react"
import { useEffect, useRef, useState } from "react"
import projectData from "./project.json"
import { Zap } from "lucide-react"
import posthog, { isPosthogConfigured } from "../../lib/posthog.js"

const mix = (token, percent) =>
  `color-mix(in srgb, var(--color-${token}) ${percent}%, transparent)`

const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
]

const normalizeProject = (p, index) => ({
  _id: p._id ?? p.project_name,
  name: p.project_name ?? p.name,
  description: p.project_description ?? p.description,
  link: p.project_url ?? p.link,
  imageUrl: p.project_image_url ?? p.imageUrl ?? "",
  isMajor: p.project_type?.is_major_project ?? p.isMajor ?? false,
  isFeatured: p.project_type?.is_featured_project ?? p.isFeatured ?? false,
  techStack: Array.isArray(p.tech_stack)
    ? p.tech_stack
    : typeof p.techStack === "string"
    ? p.techStack.split(",").map(t => t.trim())
    : [],
  isUnderDevelopment: p.isUnderDevelopment ?? false,
  progressTag: p.progressTag ?? "In Dev",
  modalcontent: p.modalcontent ?? null,
  alt: p.project_name ?? p.name ?? "",
  _bannerUrl: p.project_image_url || p._bannerUrl || DUMMY_IMAGES[index % DUMMY_IMAGES.length],
})

const accentText = { color: "var(--color-accent)" }

const eyebrowStyle = {
  fontSize: "clamp(10px,1.1vw,12px)",
  textTransform: "uppercase",
  letterSpacing: "0.3em",
}

const headerRule = (strength) => ({
  height: 1,
  border: 0,
  background: `linear-gradient(90deg, ${mix("accent", strength)} 0%, ${mix("accent", 10)} 60%, transparent 100%)`,
})

const roundedCard = { borderRadius: "1.5rem" }

const TagPill = ({ label }) => <span className="tag rounded-2xl transition hover:bg-accent/10 hover:text-accent hover:border-accent/30">{label}</span>

const ProjectModal = ({ project, onClose }) => {
  const tech = project.modalcontent?.techStack ?? project.techStack ?? []
  const content = project.modalcontent?.content ?? project.description

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
      style={{
        background: "var(--color-overlay)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col"
        style={{
          ...roundedCard,
          border: "1px solid var(--color-border-strong)",
          background: "var(--color-surface)",
          boxShadow: "var(--shadow-md)",
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
            style={{ filter: "brightness(0.75)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, var(--color-surface) 0%, ${mix("surface", 30)} 60%, transparent 100%)`,
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="theme-toggle absolute top-4 right-4"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "0.75rem",
              background: mix("bg", 70),
              fontFamily: "var(--font-mono)",
            }}
          >
            ✕
          </button>
          {project.isUnderDevelopment && (
            <span
              className="tag tag--secondary absolute top-4 left-4"
              style={{ background: mix("bg", 75), letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              ◈ {project.progressTag ?? "In Dev"}
            </span>
          )}
          <div className="absolute bottom-4 left-6">
            <span
              className="card__title"
              style={{
                fontSize: "clamp(20px,3.5vw,28px)",
                fontWeight: "var(--weight-semibold)",
                textTransform: "uppercase",
                color: "var(--color-text-primary)",
              }}
            >
              {project.name}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-6 overflow-y-auto">
          <p className="card__body" style={{ fontSize: 14, maxWidth: "none" }}>
            {content}
          </p>

          {tech.length > 0 && (
            <div className="flex flex-col gap-3">
              <span
                className="meta"
                style={{ textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--color-text-muted)" }}
              >
                Tech Stack
              </span>
              <div className="badge-list">
                {tech.map(t => <TagPill key={t} label={t} />)}
              </div>
            </div>
          )}

          <div className="divider" />

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => isPosthogConfigured && posthog.capture("project_repository_opened", { source: "project_modal" })}
            className="project-link self-start"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
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
  const tags = project.techStack.slice(0, 5)

  return (
    <motion.div
      ref={ref}
      className="project-card rounded-3xl cursor-pointer group w-full"
      style={{ ...roundedCard, minHeight: 360 }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        if (isPosthogConfigured) posthog.capture("project_details_opened", { layout: "featured" })
        onOpen(project)
      }}
    >
      <img
        src={project._bannerUrl}
        alt={project.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "brightness(0.6)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, ${mix("surface", 96)} 0%, ${mix("surface", 62)} 55%, ${mix("surface", 18)} 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 80% 80%, ${mix("accent", 18)} 0%, transparent 60%)` }}
      />

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 h-full p-8 md:p-12" style={{ minHeight: 360 }}>
        <div className="flex flex-col justify-between gap-6 max-w-lg">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="tag tag--accent group hover:-translate-y-1.5 rounded-3xl"
              style={{
                padding: "var(--space-2) var(--space-3)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                transition: "all 300ms ease-in-out",
              }}
            >
              <Zap size={15} className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-30" />
              <p className="transition-all duration-300 ease-in-out group-hover:font-bold">Featured</p>
            </span>
            {project.isUnderDevelopment && (
              <span
                className="tag tag--secondary"
                style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                ◈ {project.progressTag ?? "In Dev"}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h3
              className="display"
              style={{
                fontSize: "clamp(36px,6vw,72px)",
                textTransform: "uppercase",
                lineHeight: 0.9,
                fontWeight: "var(--weight-semibold)",
              }}
            >
              {project.name}
            </h3>
            <p className="project-card__description max-w-sm">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="badge-list">
              {tags.map(t => <TagPill key={t} label={t} />)}
            </div>
            <div className="flex items-center gap-6">
              <span className="meta group-hover:text-(--color-accent) transition-colors duration-200">
                View Details ↗
              </span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="meta"
                onClick={e => {
                  e.stopPropagation()
                  if (isPosthogConfigured) posthog.capture("project_repository_opened", { source: "featured_card" })
                }}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end flex-1">
          <div
            className="w-56 h-56 rounded-3xl overflow-hidden shrink-0"
            style={{ ...roundedCard, border: "1px solid var(--color-border-strong)" }}
          >
            <img
              src={project._bannerUrl}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ filter: "brightness(0.85) saturate(0.9)" }}
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
  const tags = project.techStack.slice(0, 3)

  return (
    <motion.div
      ref={ref}
      className="project-card rounded-3xl cursor-pointer group"
      style={roundedCard}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onClick={() => {
        if (isPosthogConfigured) posthog.capture("project_details_opened", { layout: "standard" })
        onOpen(project)
      }}
    >
      <div className="relative h-44 shrink-0 overflow-hidden">
        <img
          src={project._bannerUrl}
          alt={project.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          style={{ filter: "brightness(0.7)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, var(--color-surface) 0%, ${mix("surface", 15)} 65%, transparent 100%)`,
          }}
        />
        {project.isUnderDevelopment && (
          <span
            className="tag tag--secondary absolute top-3 left-3"
            style={{ background: mix("bg", 70), letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            ◈ {project.progressTag ?? "In Dev"}
          </span>
        )}
      </div>

      <div
        className="flex flex-col gap-3 p-5 flex-1"
        style={{
          background: `radial-gradient(ellipse at top, ${mix("accent", 6)} 0%, transparent 70%), var(--color-surface)`,
        }}
      >
        <h3
          className="project-card__title"
          style={{
            fontSize: "clamp(15px,2vw,19px)",
            textTransform: "uppercase",
            fontWeight: "var(--weight-semibold)",
          }}
        >
          {project.name}
        </h3>
        <p className="project-card__description line-clamp-2 flex-1" style={{ fontSize: 12 }}>
          {project.description}
        </p>
        <div className="badge-list">
          {tags.map(t => <TagPill key={t} label={t} />)}
          {project.techStack.length > 3 && (
            <span className="meta" style={{ padding: "var(--space-1)", color: "var(--color-text-muted)" }}>
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <span className="meta group-hover:text-(--color-accent) transition-colors duration-200">
            View Details ↗
          </span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="meta"
            onClick={e => {
              e.stopPropagation()
              if (isPosthogConfigured) posthog.capture("project_repository_opened", { source: "standard_card" })
            }}
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
      style={{ borderBottom: "1px solid var(--color-border)" }}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ x: 4, transition: { duration: 0.15 } }}
      onClick={() => isPosthogConfigured && posthog.capture("project_repository_opened", { source: "minor_project" })}
    >
      <span className="meta w-6 shrink-0 tabular-nums" style={accentText}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className="card__title text-(--color-text-secondary) group-hover:text-(--color-text-primary) transition-colors duration-200"
        style={{
          fontSize: "clamp(13px,1.8vw,17px)",
          textTransform: "uppercase",
          fontWeight: "var(--weight-semibold)",
        }}
      >
        {project.name}
      </span>
      <div className="flex-1 h-px mx-3" style={{ background: "var(--color-border)" }} />
      <span className="meta shrink-0 group-hover:text-(--color-accent) transition-colors duration-200">
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
  const [isLiveData, setIsLiveData] = useState(false)
  const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`

  const [projects, setProjects] = useState(
    projectData.map((p, i) => normalizeProject(p, i))
  )

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await fetch(`${API_URL}/fetchProjects/getprojects`)
        if (projectResponse.ok) {
          const json = await projectResponse.json()
          if (json.success) {
            setProjects(json.data.map((p, i) => normalizeProject(p, i)))
            setIsLiveData(true)
          }
        }
      } catch (error) {
        console.error(`Failed to fetch project data:\n${error}`)
      }
    }
    fetchProjectData()
  }, [])

  const featuredProjects = projects.filter(p => p.isFeatured)
  const majorProjects = projects.filter(p => p.isMajor && !p.isFeatured)
  const minorProjects = projects.filter(p => !p.isMajor)

  return (
    <>
      <AnimatePresence>
        {activeModal && (
          <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>

      <section
        className="relative min-h-screen overflow-hidden"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text-primary)",
          paddingBlock: "clamp(80px,10vw,140px) 80px",
          paddingInline: 0,
          transition:
            "background-color var(--duration-theme) var(--ease-standard), color var(--duration-theme) var(--ease-standard)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${mix("accent", 7)} 1px, transparent 1px), linear-gradient(90deg, ${mix("accent", 7)} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${mix("accent", 18)} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-100 h-100 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${mix("accent-secondary", 14)} 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <motion.div
          className="absolute top-6 right-6 w-20 h-20 pointer-events-none"
          style={{
            borderTop: `1px solid ${mix("accent", 35)}`,
            borderRight: `1px solid ${mix("accent", 35)}`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-6 left-6 w-14 h-14 pointer-events-none"
          style={{
            borderBottom: `1px solid ${mix("accent-secondary", 40)}`,
            borderLeft: `1px solid ${mix("accent-secondary", 40)}`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
        <div
          className="absolute top-1/2 right-[4vw] -translate-y-1/2 select-none pointer-events-none leading-none"
          style={{
            fontSize: "clamp(100px,16vw,200px)",
            fontFamily: "var(--font-heading)",
            fontWeight: "var(--weight-semibold)",
            color: mix("text-primary", 5),
          }}
        >
          03
        </div>

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 1280,
            marginInline: "auto",
            paddingInline: "clamp(20px,5vw,48px)",
          }}
        >
          <div ref={headerRef} className="flex flex-col gap-6 mb-16 max-w-2xl">
            <motion.p
              className="eyebrow"
              style={eyebrowStyle}
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Selected Work
            </motion.p>

            <motion.h2
              className="display"
              style={{
                fontSize: "clamp(52px,9vw,120px)",
                textTransform: "uppercase",
                lineHeight: 0.92,
                fontWeight: "var(--weight-semibold)",
              }}
              initial={{ opacity: 0, x: -24 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              PROJ
              <span style={accentText}>ECTS</span>
            </motion.h2>

            <motion.div
              className="divider"
              style={headerRule(55)}
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            />

            <motion.p
              className="lead"
              style={{ fontSize: "clamp(14px,1.5vw,16px)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              I turn ideas into production-ready applications with a focus on performance, scalability, and usability. Every project is built to be functional, not just visually appealing.
            </motion.p>
          </div>

          <div className="flex flex-col gap-5 mb-24">
            {featuredProjects.map(project => (
              <FeaturedCard key={project._id} project={project} onOpen={setActiveModal} />
            ))}
            {majorProjects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {majorProjects.map((project, i) => (
                  <StandardCard key={project._id} project={project} index={i} onOpen={setActiveModal} />
                ))}
              </div>
            )}
          </div>

          <div ref={minorRef} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <motion.p
                className="eyebrow"
                style={eyebrowStyle}
                initial={{ opacity: 0, y: 14 }}
                animate={minorInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Other Builds
              </motion.p>

              <motion.h3
                className="display"
                style={{
                  fontSize: "clamp(32px,5vw,60px)",
                  textTransform: "uppercase",
                  lineHeight: 0.92,
                  fontWeight: "var(--weight-semibold)",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={minorInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                MINOR <span style={accentText}>PROJECTS</span>
              </motion.h3>

              <motion.div
                className="divider"
                style={headerRule(40)}
                initial={{ opacity: 0 }}
                animate={minorInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              />
            </div>

            <div className="max-w-2xl">
              {minorProjects.map((p, i) => (
                <MinorProjectRow key={p._id} project={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectPage