/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'

const mix = (token, percent) =>
  `color-mix(in srgb, var(--color-${token}) ${percent}%, transparent)`

const accentText = { color: 'var(--color-accent)' }

const eyebrowStyle = {
  fontSize: 'clamp(10px,1.1vw,12px)',
  textTransform: 'uppercase',
  letterSpacing: '0.3em',
}

const roundedCard = { borderRadius: '1.5rem' }

const QuoteIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 14V8.4C0 5.6 0.666667 3.33333 2 1.6C3.33333 0.533333 4.93333 0 6.8 0L7.6 1.2C6.13333 1.46667 5 2.06667 4.2 3C3.4 3.93333 3 5.06667 3 6.4H5.6V14H0ZM12.4 14V8.4C12.4 5.6 13.0667 3.33333 14.4 1.6C15.7333 0.533333 17.3333 0 19.2 0L20 1.2C18.5333 1.46667 17.4 2.06667 16.6 3C15.8 3.93333 15.4 5.06667 15.4 6.4H18V14H12.4Z"
      style={{ fill: mix('accent', 40) }}
    />
  </svg>
)

const StarRow = ({ count = 5 }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
          d="M5.5 0.5L6.84 3.88L10.5 4.27L7.91 6.67L8.66 10.5L5.5 8.65L2.34 10.5L3.09 6.67L0.5 4.27L4.16 3.88L5.5 0.5Z"
          style={{ fill: i < count ? 'var(--color-accent)' : mix('text-secondary', 30) }}
        />
      </svg>
    ))}
  </div>
)

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="card card--interactive rounded-3xl"
      style={{
        ...roundedCard,
        position: 'relative',
        gap: 'var(--space-5)',
        background: `radial-gradient(ellipse at top left, ${mix('accent', 8)} 0%, transparent 70%), var(--color-surface)`,
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between">
        <QuoteIcon />
        <span className="tag tag--accent rounded-2xl" style={{ textTransform: 'uppercase' }}>
          {testimonial.project_meta?.project_type}
        </span>
      </div>

      <p
        className="flex-1"
        style={{
          fontSize: 'clamp(13px,1.4vw,14.5px)',
          lineHeight: 'var(--leading-body)',
          color: 'var(--color-text-secondary)',
          maxWidth: 'none',
        }}
      >
        "{testimonial.description}"
      </p>

      <StarRow count={testimonial.project_meta?.feedback_stars ?? 5} />

      <div
        className="divider"
        style={{
          height: 1,
          border: 0,
          background: `linear-gradient(90deg, ${mix('accent', 35)} 0%, ${mix('accent', 6)} 60%, transparent 100%)`,
        }}
      />

      <div className="flex items-center gap-3.5">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${mix('accent', 50)} 0%, transparent 70%)`,
              filter: 'blur(6px)',
              transform: 'scale(1.2)',
            }}
          />
          <img
            src={testimonial.image_url}
            alt={testimonial.project_meta?.client_name}
            className="relative w-10 h-10 rounded-full object-cover"
            style={{ border: `1px solid ${mix('accent', 45)}` }}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <span
            className="card__title"
            style={{
              fontSize: 'clamp(12px,1.3vw,14px)',
              textTransform: 'uppercase',
              fontWeight: 'var(--weight-semibold)',
              lineHeight: 1,
            }}
          >
            {testimonial.project_meta?.client_name}
          </span>
          <span className="meta" style={{ textTransform: 'uppercase' }}>
            {testimonial.title}
            {testimonial.project_meta?.project_link && (
              <>
                {' · '}
                <a
                  href={testimonial.project_meta.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={accentText}
                >
                  View Project
                </a>
              </>
            )}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const backupData = [{
  "title": "Excellent experience with a reliable and talented web developer.",
  "description": "Working with Priyanshu was a great experience. He created a clean, modern, and professional website exactly the way I wanted. The design, speed, and overall user experience are excellent. He was very responsive, understood all my requirements clearly, and completed the work on time. I highly recommend Priyanshu to anyone looking for a reliable and talented web developer.",
  "status": "published",
  "image_url": "https://res.cloudinary.com/dpmflnpcd/image/upload/v1779520538/portfolio/testimonial-profiles/ddufuzk2wtip27kajfra.jpg",
  "project_meta": {
    "project_type": "Frontend",
    "project_link": "https://www.ifixproapple.com/",
    "client_name": "Nitin (iFix_Pro)",
    "feedback_stars": 5
  },
  "testimonial_id": "14402231-2526-45fc-aec4-bd06cdbc9961",
}]

const TestimonialPage = () => {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/fetchTestimonials/`)

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }

        const json = await response.json()

        if (json.success && Array.isArray(json.data)) {
          const published = json.data.filter(t => t.status === 'published')
          setTestimonials(published)
          setError(null)
        } else {
          setTestimonials(backupData)
          setError(null)
        }
      } catch (err) {
        console.error('Error fetching testimonials, falling back to backup data:', err)
        setTestimonials(backupData)
        setError(null)
      } finally {
        setLoading(false)
      }
    }
    setTimeout(fetchTestimonials, 500)
  }, [API_URL])

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        paddingBlock: 'clamp(80px,10vw,140px) 80px',
        paddingInline: 0,
        transition:
          'background-color var(--duration-theme) var(--ease-standard), color var(--duration-theme) var(--ease-standard)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${mix('accent', 7)} 1px, transparent 1px), linear-gradient(90deg, ${mix('accent', 7)} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${mix('accent', 18)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        className="absolute -top-30 -right-20 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mix('accent', 22)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        className="absolute -bottom-20 -left-15 w-100 h-100 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mix('accent-secondary', 16)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        className="absolute top-6 right-6 w-20 h-20 pointer-events-none"
        style={{
          borderTop: `1px solid ${mix('accent', 35)}`,
          borderRight: `1px solid ${mix('accent', 35)}`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-14 h-14 pointer-events-none"
        style={{
          borderBottom: `1px solid ${mix('accent-secondary', 40)}`,
          borderLeft: `1px solid ${mix('accent-secondary', 40)}`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      />

      <div
        className="absolute top-1/2 right-[4vw] -translate-y-1/2 select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(100px,16vw,200px)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--weight-semibold)',
          color: mix('text-primary', 5),
        }}
      >
        05
      </div>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'clamp(20px,5vw,48px)',
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
            Social Proof
          </motion.p>

          <motion.h2
            className="display"
            style={{
              fontSize: 'clamp(52px,9vw,120px)',
              textTransform: 'uppercase',
              lineHeight: 0.92,
              fontWeight: 'var(--weight-semibold)',
            }}
            initial={{ opacity: 0, x: -24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            WHAT THEY
            <span style={accentText}>&nbsp;SAY</span>
          </motion.h2>

          <motion.div
            className="divider"
            style={{
              height: 1,
              border: 0,
              background: `linear-gradient(90deg, ${mix('accent', 55)} 0%, ${mix('accent', 10)} 60%, transparent 100%)`,
            }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          />

          <motion.p
            className="lead"
            style={{ fontSize: 'clamp(14px,1.5vw,16px)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Kind words from the people I've had the privilege to build with. Every collaboration is an opportunity to leave something better than I found it.
          </motion.p>
        </div>

        <div
          className="grid"
          style={{
            gap: 'var(--space-5)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          }}
        >
          {loading ? (
            <motion.div
              className="col-span-full flex items-center justify-center p-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span
                className="meta"
                style={{
                  fontSize: 'clamp(10px,1.1vw,12px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  color: 'var(--color-text-muted)',
                }}
              >
                Loading testimonials...
              </span>
            </motion.div>
          ) : error || testimonials.length === 0 ? (
            <motion.div
              className="card card--interactive rounded-3xl col-span-full"
              style={{
                ...roundedCard,
                position: 'relative',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-6)',
                padding: '3.5rem',
                overflow: 'hidden',
                background: `radial-gradient(ellipse at top left, ${mix('accent', 8)} 0%, transparent 70%), var(--color-surface)`,
              }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes orbitA {
                    from { transform: rotate(0deg) translateX(38px) rotate(0deg); }
                    to   { transform: rotate(360deg) translateX(38px) rotate(-360deg); }
                  }
                  @keyframes orbitB {
                    from { transform: rotate(180deg) translateX(24px) rotate(-180deg); }
                    to   { transform: rotate(540deg) translateX(24px) rotate(-540deg); }
                  }
                  @keyframes corePulse {
                    0%, 100% { opacity: 0.35; r: 5; }
                    50%       { opacity: 0.9;  r: 6.5; }
                  }
                  @keyframes shimmer {
                    0%   { stroke-dashoffset: 283; }
                    100% { stroke-dashoffset: 0; }
                  }
                  @keyframes blink {
                    0%, 100% { opacity: 0; }
                    50%       { opacity: 1; }
                  }
                  .orbit-a { animation: orbitA 5s linear infinite; transform-origin: 60px 60px; }
                  .orbit-b { animation: orbitB 3.5s linear infinite; transform-origin: 60px 60px; }
                  .core    { animation: corePulse 2.4s ease-in-out infinite; }
                  .ring    { animation: shimmer 3s ease-in-out infinite alternate; stroke-dasharray: 283; }
                  .cursor  { animation: blink 1.2s step-start infinite; }
                `}</style>

                <circle cx="60" cy="60" r="45" strokeWidth="1" style={{ stroke: mix('accent', 15) }} />
                <circle cx="60" cy="60" r="45" strokeWidth="1" strokeLinecap="round" className="ring" style={{ stroke: mix('accent', 60) }} />
                <circle cx="60" cy="60" r="28" strokeWidth="1" strokeDasharray="4 6" style={{ stroke: mix('accent', 15) }} />
                <g className="orbit-a">
                  <circle cx="60" cy="60" r="5" className="core" style={{ fill: 'var(--color-accent)' }} />
                  <circle cx="60" cy="60" r="10" style={{ fill: mix('accent', 15) }} />
                </g>
                <g className="orbit-b">
                  <circle cx="60" cy="60" r="3" style={{ fill: 'var(--color-accent-secondary)' }} />
                  <circle cx="60" cy="60" r="6" style={{ fill: mix('accent-secondary', 15) }} />
                </g>
                <rect x="44" y="55" width="32" height="20" rx="3" strokeWidth="1" style={{ fill: 'var(--color-surface-elevated)', stroke: mix('accent', 40) }} />
                <rect x="48" y="59" width="10" height="1.5" rx="1" style={{ fill: mix('text-secondary', 45) }} />
                <rect x="48" y="63" width="16" height="1.5" rx="1" style={{ fill: mix('text-secondary', 35) }} />
                <rect x="48" y="67" width="7" height="1.5" rx="1" style={{ fill: mix('text-secondary', 25) }} />
                <rect x="56" y="67" width="1.5" height="5" rx="0.75" className="cursor" style={{ fill: 'var(--color-accent)' }} />
              </svg>

              <div className="flex flex-col gap-2 items-center">
                <span
                  className="card__title"
                  style={{
                    fontSize: 'clamp(14px,2vw,18px)',
                    textTransform: 'uppercase',
                    fontWeight: 'var(--weight-semibold)',
                  }}
                >
                  No Testimonials Yet
                </span>
                <span
                  className="meta text-center"
                  style={{
                    fontSize: 'clamp(10px,1.1vw,12px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Proof of work first — testimonials next.
                </span>
              </div>

              <div
                className="w-24"
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${mix('accent', 55)}, transparent)`,
                }}
              />
            </motion.div>
          ) : (
            testimonials.map((t, i) => (
              <TestimonialCard key={t.testimonial_id} testimonial={t} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialPage