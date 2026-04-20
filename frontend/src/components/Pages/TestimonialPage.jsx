/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {HeartCrack,FlameKindling} from 'lucide-react'


const testimonials =[
  {
    name: "Sarah Chen",
    role: "Engineering Lead",
    company: "Vercel",
    image: "https://i.pravatar.cc/150?img=47",
    text: "Working with this developer was an absolute game-changer for our team. The attention to detail and depth of technical knowledge is truly rare. Every problem was solved with elegance and precision.",
    tag: "Full Stack",
  },
  {
    name: "Marcus Williams",
    role: "CTO",
    company: "Stripe",
    image: "https://i.pravatar.cc/150?img=12",
    text: "Delivered a complex distributed system on time and under budget. The code quality was exceptional — clean, well-documented, and a pleasure to maintain. Would hire again without hesitation.",
    tag: "Architecture",
  },
  {
    name: "Priya Mehta",
    role: "Product Manager",
    company: "Linear",
    image: "https://i.pravatar.cc/150?img=32",
    text: "Rare combination of technical brilliance and strong communication. Bridged the gap between engineering and product perfectly, turning ambiguous requirements into polished, intuitive features.",
    tag: "Collaboration",
  },
  {
    name: "James Okafor",
    role: "Founder",
    company: "Acme Labs",
    image: "https://i.pravatar.cc/150?img=68",
    text: "Took our MVP from idea to launch in record time. The UI was stunning, the performance was blazing fast, and the codebase was structured in a way that let us scale effortlessly afterward.",
    tag: "Startup",
  },
  {
    name: "Lena Hoffmann",
    role: "Design Director",
    company: "Figma",
    image: "https://i.pravatar.cc/150?img=56",
    text: "The pixel-perfect implementation of our designs was astonishing. Every micro-interaction, every transition — brought to life exactly as we envisioned, often even better.",
    tag: "UI / UX",
  },
  {
    name: "Rafael Torres",
    role: "Senior Developer",
    company: "GitHub",
    image: "https://i.pravatar.cc/150?img=15",
    text: "Exceptional problem solver. Handed off the most gnarly legacy codebase and it came back refactored, documented, and humming. This is the kind of engineer you want on your critical path.",
    tag: "Refactor",
  },
]


const QuoteIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 14V8.4C0 5.6 0.666667 3.33333 2 1.6C3.33333 0.533333 4.93333 0 6.8 0L7.6 1.2C6.13333 1.46667 5 2.06667 4.2 3C3.4 3.93333 3 5.06667 3 6.4H5.6V14H0ZM12.4 14V8.4C12.4 5.6 13.0667 3.33333 14.4 1.6C15.7333 0.533333 17.3333 0 19.2 0L20 1.2C18.5333 1.46667 17.4 2.06667 16.6 3C15.8 3.93333 15.4 5.06667 15.4 6.4H18V14H12.4Z" fill="rgba(139,92,246,0.35)"/>
  </svg>
)

const StarRow = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M5.5 0.5L6.84 3.88L10.5 4.27L7.91 6.67L8.66 10.5L5.5 8.65L2.34 10.5L3.09 6.67L0.5 4.27L4.16 3.88L5.5 0.5Z" fill="rgba(139,92,246,0.8)"/>
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
      className="relative flex flex-col gap-5 p-7 rounded-2xl"
      style={{
        border: '1px solid rgba(139,92,246,0.2)',
        background: 'radial-gradient(ellipse at top left, rgba(139,92,246,0.08) 0%, rgba(9,9,15,0) 70%), rgba(255,255,255,0.02)',
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      whileHover={{
        borderColor: 'rgba(167,139,250,0.45)',
        background: 'rgba(139,92,246,0.07)',
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-start justify-between">
        <QuoteIcon />
        <span
          className="font-mono text-[9px] tracking-wide uppercase px-2.5 py-1 rounded-full"
          style={{
            border: '1px solid rgba(139,92,246,0.3)',
            background: 'rgba(139,92,246,0.1)',
            color: 'rgba(192,168,255,0.75)',
          }}
        >
          {testimonial.tag}
        </span>
      </div>

      <p
        className="font-light leading-relaxed text-purple-200/60 flex-1"
        style={{ fontSize: 'clamp(13px,1.4vw,14.5px)' }}
      >
        "{testimonial.text}"
      </p>

      <StarRow />

      <div
        className="w-full h-px"
        style={{
          background: 'linear-gradient(90deg, rgba(140,60,255,0.3) 0%, rgba(140,60,255,0.05) 60%, transparent 100%)',
        }}
      />

      <div className="flex items-center gap-3.5">
        <div className="relative flex-shrink-0">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
              filter: 'blur(6px)',
              transform: 'scale(1.2)',
            }}
          />
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="relative w-10 h-10 rounded-full object-cover"
            style={{ border: '1px solid rgba(139,92,246,0.35)' }}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <span
            className="font-black uppercase tracking-tight text-[#f0e8ff] leading-none"
            style={{ fontSize: 'clamp(12px,1.3vw,14px)', fontFamily: 'sans-serif' }}
          >
            {testimonial.name}
          </span>
          <span
            className="font-mono text-[10px] tracking-wide uppercase"
            style={{ color: 'rgba(192,168,255,0.55)' }}
          >
            {testimonial.role} · {testimonial.company}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const TestimonialPage = () => {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      className="relative min-h-screen bg-[#09090f] overflow-hidden"
      style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px) 80px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(140,60,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(140,60,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(120,40,220,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        className="absolute -top-30 -right-20 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(120,40,220,0.28) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        className="absolute -bottom-20 -left-15 w-100 h-100 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(160,80,255,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
        style={{ fontSize: 'clamp(100px,16vw,200px)', fontFamily: 'sans-serif' }}
      >
        05
      </div>

      <div ref={headerRef} className="flex flex-col gap-6 mb-16 max-w-2xl">
        <motion.p
          className="flex items-center gap-2.5 font-mono uppercase tracking-[0.35em] text-violet-400"
          style={{ fontSize: 'clamp(9px,1.1vw,11px)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="block w-7 h-px bg-violet-400" />
          Social Proof
        </motion.p>

        <motion.h2
          className="font-black uppercase leading-[0.92] tracking-tight text-[#f0e8ff]"
          style={{ fontSize: 'clamp(52px,9vw,120px)', fontFamily: 'sans-serif' }}
          initial={{ opacity: 0, x: -24 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          WHAT THEY  
          <span className="bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent">
            &nbsp;SAY
          </span>
        </motion.h2>

        <motion.div
          className="w-full h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(140,60,255,0.55) 0%, rgba(140,60,255,0.1) 60%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        />

        <motion.p
          className="font-light leading-relaxed text-purple-200/60"
          style={{ fontSize: 'clamp(14px,1.5vw,15px)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          Kind words from the people I've had the privilege to build with. Every collaboration is an opportunity to leave something better than I found it.
        </motion.p>
      </div>

      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        }}
      >
        {testimonials.length === 0 || testimonials === null ? (
         <div className='w-full  flex items-center justify-center flex-col p-10 rounded-lg
          border border-red-400 transition-colors duration-300 
           hover:border-red-500 ease-in-out group gap-1'>
           <div className='flex flex-row items-center gap-2'>
            <h1 className="text-purple-200/60 align-center group-hover:text-red-400 font-large ease-in-out text-sm duration-300 ">
            No testimonials available
           </h1>
           <HeartCrack  size={16} className='text-purple-200/60 group-hover:text-red-400 transition-all ease-in-out duration-300 '/>
           </div>
            <span className='flex gap-1 items-center justify-center'>
              <p>Proof of work first, testimonials next.</p>
              <FlameKindling size={16}/>
            </span>
          </div>
        ) : (
          testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))
        )}
      </div>
    </section>
  )
}

export default TestimonialPage