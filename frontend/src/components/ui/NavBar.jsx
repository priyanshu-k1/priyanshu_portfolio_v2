/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { House, SquareChevronRight, BriefcaseBusiness, Mail, Quote, FileUser, X, Menu } from 'lucide-react'
import navlogo from '../../assets/logo.png'

const NAV_ITEMS = [
  { name: 'Home', href: '#home', icon: House },
  { name: 'Skills', href: '#skills', icon: SquareChevronRight },
  { name: 'Projects', href: '#projects', icon: BriefcaseBusiness },
  { name: 'Contact', href: '#contact', icon: Mail },
  { name: 'Testimonials', href: '#testimonials', icon: Quote },
]

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selected, setSelected] = useState({ label: '.pdf', value: 'PDF' })

  const options = [
    { label: '.pdf', value: 'PDF' },
    { label: '.docx', value: 'DOCX' },
  ]

  useEffect(() => {
    const close = () => setOpen(false)
    if (open) document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const scrollContainer = document.querySelector('.snap-y')

    const handleScroll = () => {
      if (!scrollContainer) return

      setScrolled(scrollContainer.scrollTop > 50)

      let maxVisibleSection = null
      let maxVisibility = 0

      NAV_ITEMS.forEach(item => {
        const sectionId = item.href.substring(1)
        const element = document.getElementById(sectionId)
        if (element) {
          const containerRect = scrollContainer.getBoundingClientRect()
          const rect = element.getBoundingClientRect()
          const visibleTop = Math.max(rect.top, containerRect.top)
          const visibleBottom = Math.min(rect.bottom, containerRect.bottom)
          const visibleHeight = visibleBottom - visibleTop
          const visibilityRatio = visibleHeight / containerRect.height

          if (visibilityRatio > maxVisibility && visibilityRatio > 0.25) {
            maxVisibility = visibilityRatio
            maxVisibleSection = sectionId
          }
        }
      })
      
      if (maxVisibleSection) setActiveSection(maxVisibleSection)
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

const handleDownload = () => {
  const url = [
    "https://drive.google.com/uc?export=download&id=15ieD4jv084hTzCNaUVzqm-XfwKSKaB39",
  
    "https://docs.google.com/document/d/14PFTBZEKTudl59RrXisxL3-aHh-4QxQk/export?format=docx"
  ]
  
  const link = document.createElement('a')
  link.href = selected.value === 'PDF' ? url[0] : url[1]
  link.download = `Priyanshu_kumar_resume.${selected.value.toLowerCase()}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'py-2 sm:py-3 bg-[#09090f]/80 backdrop-blur-md border-violet-500/10 shadow-2xl'
            : 'py-4 sm:py-6 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 bg-transparent">

          <motion.div
            className="flex items-center gap-2  cursor-pointer shrink-0 "
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center  overflow-hidden bg-transparent">
              <img src={navlogo} alt="Developer's logo" className={`w-full h-full transition-all duration-900 ease-in-out ${activeSection !== "home"?"rotate-360":"rotate-0"}`}/>
            </div>
            <AnimatePresence mode="wait">
              {activeSection !== "home" && (
                <motion.span
                  key="brand-name"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-purple-100 block"
                >
                  Priyanshu <span className="text-violet-500">codes.</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="hidden md:flex items-center gap-0 sm:gap-2 md:gap-4">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.substring(1)
              const isActive = activeSection === sectionId
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-1.5 xs:px-2 sm:px-3 py-2 group"
                >
                  <div className="flex items-center gap-1.5 relative z-10">
                    <item.icon
                      size={15}
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-violet-400' : 'text-purple-200/50 group-hover:text-purple-100'
                      }`}
                    />
                    <span className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors duration-300 hidden lg:block ${
                      isActive ? 'text-violet-400' : 'text-purple-200/50 group-hover:text-purple-100'
                    }`}>
                      {item.name}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-violet-500/5 rounded-lg border border-violet-500/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >
                      <div className="absolute -bottom-3.25 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-px bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    </motion.div>
                  )}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border
             border-violet-500/30 bg-violet-500/10 font-mono text-[9px] sm:text-[10px]
              text-purple-200 uppercase tracking-widest hover:bg-violet-500/20 transition-all 
              duration-300"
              onClick={handleDownload}>
              <motion.button
                className="flex items-center gap-1.5 font-mono"
                onClick={handleDownload}
              >
                <FileUser size={15} />
                <span className="hidden md:inline">Resume</span>
              </motion.button>

              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
                  className="flex items-center gap-1.5 py-1.5 px-0.5 rounded-full font-mono text-[9px] sm:text-[10px] text-purple-200 uppercase tracking-widest transition-all duration-200"
                >
                  {selected.label}
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 rounded-xl overflow-hidden z-999"
                      style={{
                        border: '1px solid rgba(139,92,246,0.25)',
                        background: 'rgba(15,10,30,0.95)',
                        backdropFilter: 'blur(16px)',
                        minWidth: '80px',
                      }}
                    >
                      {options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={(e) => { e.stopPropagation(); setSelected(opt); setOpen(false) }}
                          className="w-full text-left px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-150"
                          style={{
                            color: selected.value === opt.value ? 'rgba(192,168,255,1)' : 'rgba(192,168,255,0.5)',
                            background: selected.value === opt.value ? 'rgba(139,92,246,0.12)' : 'transparent',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.background = selected.value === opt.value ? 'rgba(139,92,246,0.12)' : 'transparent'}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-violet-500/30 bg-violet-500/10 text-purple-200/70 hover:text-purple-100 hover:bg-violet-500/20 transition-all duration-200"
              onClick={() => setMobileOpen(o => !o)}
              whileTap={{ scale: 0.93 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(5,3,15,0.6)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 z-40 md:hidden w-72 flex flex-col"
              style={{
                background: 'rgba(9,9,15,0.97)',
                borderLeft: '1px solid rgba(139,92,246,0.2)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(140,60,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(140,60,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(120,40,220,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="relative flex flex-col h-full px-6 pt-20 pb-8 gap-8">

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-violet-500/40 mb-3">
                    Navigation
                  </span>
                  {NAV_ITEMS.map((item, i) => {
                    const sectionId = item.href.substring(1)
                    const isActive = activeSection === sectionId
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-4 py-3 group"
                        style={{ borderBottom: '1px solid rgba(139,92,246,0.08)' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                          style={{
                            border: isActive ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(139,92,246,0.15)',
                            background: isActive ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.05)',
                          }}
                        >
                          <item.icon
                            size={14}
                            className={isActive ? 'text-violet-400' : 'text-purple-200/40 group-hover:text-purple-200/70'}
                            style={{ transition: 'color 0.2s' }}
                          />
                        </div>
                        <span
                          className="font-mono text-[11px] uppercase tracking-widest transition-colors duration-200"
                          style={{ color: isActive ? 'rgba(192,168,255,0.95)' : 'rgba(192,168,255,0.45)' }}
                        >
                          {item.name}
                        </span>
                        {isActive && (
                          <div
                            className="ml-auto w-1 h-4 rounded-full"
                            style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.9), rgba(217,70,239,0.6))' }}
                          />
                        )}
                      </motion.a>
                    )
                  })}
                </div>

                <motion.div
                  className="mt-auto flex flex-col gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-violet-500/40">
                    Resume
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSelected(opt)}
                        className="py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
                        style={{
                          border: selected.value === opt.value ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(139,92,246,0.15)',
                          background: selected.value === opt.value ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.05)',
                          color: selected.value === opt.value ? 'rgba(192,168,255,0.95)' : 'rgba(192,168,255,0.4)',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { handleDownload(); setMobileOpen(false) }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-200 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.9), rgba(109,40,217,0.9))',
                      border: '1px solid rgba(139,92,246,0.5)',
                      color: '#f0e8ff',
                    }}
                  >
                    <FileUser size={14} />
                    Download
                  </button>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar
