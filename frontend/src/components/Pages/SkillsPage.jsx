/* eslint-disable no-unused-vars */
import { motion, useInView } from "motion/react"
import { useEffect, useRef } from "react"

const CATEGORIES = [
  {
    label: "Mobile",
    index: "01",
    color: "from-violet-500 to-purple-600",
    borderColor: "rgba(139,92,246,0.35)",
    glowColor: "rgba(139,92,246,0.12)",
    skills: [
      { name: "Kotlin", level: 90 },
      { name: "Dart / Flutter", level: 85 },
    ],
  },
  {
    label: "AI & ML",
    index: "02",
    color: "from-fuchsia-500 to-violet-500",
    borderColor: "rgba(217,70,239,0.35)",
    glowColor: "rgba(217,70,239,0.12)",
    skills: [
      { name: "Python", level: 80 },
      { name: "TensorFlow", level: 65 },
      {name: "PyTorch", level: 65 },
      {name: "Scikit-learn", level: 65 },
    ],
  },
  {
    label: "Full-Stack",
    index: "03",
    color: "from-purple-400 to-indigo-500",
    borderColor: "rgba(99,102,241,0.35)",
    glowColor: "rgba(99,102,241,0.12)",
    skills: [
      { name: "React", level: 75 },
       { name: "Express.js", level: 70 },
      { name: "Node.js", level: 70 },
      { name: "Tailwind CSS", level: 85 },
      { name: "MongoDB", level: 65 },
    ],
  },
  {
    label: "Tools",
    index: "04",
    color: "from-violet-300 to-purple-500",
    borderColor: "rgba(167,139,250,0.3)",
    glowColor: "rgba(167,139,250,0.1)",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "REST APIs", level: 88 },
    ],
  },
]

const TECHS = [
  { name: "Python",     colored: "devicon-python-plain colored",      mono: false },
  { name: "Flutter",    colored: "devicon-flutter-plain colored",     mono: false },
  { name: "Kotlin",     colored: "devicon-kotlin-plain colored",      mono: false },
  { name: "JavaScript", colored: "devicon-javascript-plain colored",  mono: false },
  { name: "Node.js",    colored: "devicon-nodejs-plain colored",      mono: false },
  { name: "Express.js", colored: "devicon-express-original",          mono: false  },
  { name: "Flask",      colored: "devicon-flask-original",            mono: true  },
  { name: "HTML",       colored: "devicon-html5-plain colored",       mono: false },
  { name: "CSS",        colored: "devicon-css3-plain colored",        mono: false },
  { name: "Dart",       colored: "devicon-dart-plain colored",        mono: false },
  { name: "Android Studio",colored: "devicon-androidstudio-plain colored",    mono: false },
  { name: "Bootstrap",  colored: "devicon-bootstrap-plain colored",   mono: false },
  { name: "Git",        colored: "devicon-git-plain colored",         mono: false },
  { name: "MySQL",      colored: "devicon-mysql-plain colored",       mono: false },
  { name: "React",      colored: "devicon-react-original colored",    mono: false },
  { name: "MongoDB",    colored: "devicon-mongodb-plain colored",     mono: false },
  { name: "Supabase",   colored: "devicon-supabase-plain colored",    mono: false },
  {name:"Github",colored:"devicon-github-original", mono: true}

]


const CategoryCard = ({ cat, cardIndex }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
 
  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col gap-4 p-2 rounded-2xl"
      style={{
        border: `1px solid ${cat.borderColor}`,
        background: `radial-gradient(ellipse at top left, ${cat.glowColor} 0%, rgba(9,9,15,0) 70%), rgba(255,255,255,0.02)`,
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: cardIndex * 0.1 }}
      whileHover={{
        borderColor: cat.borderColor.replace("0.35", "0.6").replace("0.3", "0.55"),
        transition: { duration: 0.2 },
      }}
    >
       <div className="flex items-center justify-between">
        <span
          className="font-black uppercase tracking-tight"
          style={{ fontSize: "clamp(16px,1.4vw,22px)", fontFamily: "sans-serif" }}
        >
          <span className={`bg-linear-to-r ${cat.color} bg-clip-text text-transparent`}>
            {cat.label}
          </span>
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-violet-500/30">
          {cat.index}
        </span>
      </div>
 
      <div
        className="w-full h-px"
        style={{ background: `linear-gradient(90deg, ${cat.borderColor} 0%, transparent 100%)` }}
      />
 
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map(skill => (
          <span
            key={skill.name}
            className="font-mono text-[9px] tracking-wide uppercase px-2 py-1 rounded-full"
            style={{
              border: `1px solid ${cat.borderColor}`,
              background: cat.glowColor,
              color: "rgba(192,168,255,0.75)",
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
     
    </motion.div>
  )
}

const TechCard = ({ tech, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl cursor-default"
      style={{
        border: "1px solid rgba(139,92,246,0.18)",
        background: "rgba(255,255,255,0.02)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.045 }}
      whileHover={{
        borderColor: "rgba(167,139,250,0.45)",
        background: "rgba(139,92,246,0.07)",
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      <i
        className={tech.colored}
        style={{
          fontSize: 36,
          filter: tech.mono
            ? "brightness(0) invert(1) opacity(0.5)"
            : "saturate(0.75) brightness(1.05)",
        }}
      />
      <span className="font-mono text-[10px] tracking-wide uppercase text-purple-200/55">
        {tech.name}
      </span>
    </motion.div>
  )
}

const SkillsPage = () => {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const techHeaderRef = useRef(null)
  const techHeaderInView = useInView(techHeaderRef, { once: true, margin: "-80px" })

  useEffect(() => {
    if (document.querySelector('link[data-devicon]')) return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
    link.setAttribute("data-devicon", "true")
    document.head.appendChild(link)
  }, [])

  return (
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
        className="absolute top-1/2 right-[4vw] -translate-y-1/2 select-none pointer-events-none font-black text-violet-400/8 leading-none "
        style={{ fontSize: "clamp(100px,16vw,200px)", fontFamily: "sans-serif" }}
      >
        Let's build!
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
          Capabilities
        </motion.p>

        <motion.h2
          className="font-black uppercase leading-[0.92] tracking-tight text-[#f0e8ff]"
          style={{ fontSize: "clamp(52px,9vw,120px)", fontFamily: "sans-serif" }}
          initial={{ opacity: 0, x: -24 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          SKILL
          <br />
          <span className="bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            STACK
          </span>
        </motion.h2>

        <motion.div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(140,60,255,0.55) 0%, rgba(140,60,255,0.1) 60%, transparent 100%)",
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
          Technologies I build with — from native Android to AI pipelines and modern web stacks.
        </motion.p>
      </div>

      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.label} cat={cat} cardIndex={i} />
        ))}
      </div>

      <div ref={techHeaderRef} className="flex flex-col gap-4 mt-15 mb-10 max-w-2xl">
        <motion.p
          className="flex items-center gap-2.5 font-mono uppercase tracking-[0.35em] text-violet-400"
          style={{ fontSize: "clamp(9px,1.1vw,11px)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={techHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="block w-7 h-px bg-violet-400" />
          Technologies
        </motion.p>

        <motion.h3
          className="font-black uppercase leading-[0.92] tracking-tight text-[#f0e8ff]"
          style={{ fontSize: "clamp(36px,6vw,72px)", fontFamily: "sans-serif" }}
          initial={{ opacity: 0, x: -24 }}
          animate={techHeaderInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          TECH
          <span className="bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            {" "}STACK
          </span>
        </motion.h3>

        <motion.div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(140,60,255,0.55) 0%, rgba(140,60,255,0.1) 60%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={techHeaderInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        />
      </div>

      {/* Changed grid-cols-1 → grid-cols-2 so mobile shows 2 cards per row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {TECHS.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} />
        ))}
      </div>
    </section>
  )
}

export default SkillsPage