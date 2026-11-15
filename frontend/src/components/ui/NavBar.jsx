/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react'
import { FileUser } from 'lucide-react'
import navlogo from '../../assets/logo.png'
import posthog, { isPosthogConfigured } from '../../lib/posthog.js'

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
  { name: 'Testimonials', href: '#testimonials' },
]

const FORMATS = [
  { label: '.pdf', value: 'PDF' },
  { label: '.docx', value: 'DOCX' },
]

const RESUME_URLS = {
  PDF: 'https://res.cloudinary.com/dpmflnpcd/image/upload/v1792766147/Priyanshu_Kumar_resume_akcf9l.pdf',
  DOCX: 'https://res.cloudinary.com/dpmflnpcd/raw/upload/v1792766160/Priyanshu_Kumar_resume_oeuqti.docx',
}

const EASE = [0.2, 0, 0, 1]

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch (error) {
    void error
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formatOpen, setFormatOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  const progress = useMotionValue(0)
  const progressSmooth = useSpring(progress, { stiffness: 140, damping: 24, mass: 0.4 })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      void error
    }
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    if (!formatOpen) return
    const close = () => setFormatOpen(false)
    const onKey = (e) => {
      if (e.key === 'Escape') setFormatOpen(false)
    }
    document.addEventListener('click', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [formatOpen])

  useEffect(() => {
    const scrollContainer = document.querySelector('.snap-y')
    if (!scrollContainer) return

    let frame = 0

    const handleScroll = () => {
      setScrolled(scrollContainer.scrollTop > 50)

      const max = scrollContainer.scrollHeight - scrollContainer.clientHeight
      progress.set(max > 0 ? scrollContainer.scrollTop / max : 0)

      let maxVisibleSection = null
      let maxVisibility = 0

      NAV_ITEMS.forEach((item) => {
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

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        handleScroll()
      })
    }

    scrollContainer.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [progress])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const handleDownload = async (format) => {
    const selectedFormat = format.value.toUpperCase()
    const fileUrl = RESUME_URLS[selectedFormat]
    if (!fileUrl) return

    if (isPosthogConfigured) {
      posthog.capture('resume_download_requested', { format: selectedFormat.toLowerCase() })
    }

    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `Priyanshu_kumar_resume.${format.value.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download failed:', error)
      window.open(fileUrl, '_blank')
    }
  }

  const showBrandName = activeSection !== 'home'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`nav nav--fixed nav--transparent${scrolled || menuOpen ? ' is-scrolled' : ''}`}
      aria-label="Primary"
    >
      <motion.div
        aria-hidden="true"
        initial={false}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '-1px',
          height: 'var(--border-width-accent)',
          transformOrigin: 'left',
          pointerEvents: 'none',
          backgroundColor: 'var(--color-accent)',
          scaleX: progressSmooth,
          opacity: scrolled ? 1 : 0,
          transition: 'opacity var(--duration-theme) var(--ease-standard)',
        }}
      />

      <div
        className="container nav__inner"
        style={{ maxWidth: 'var(--container-width)', marginInline: 'auto', paddingInline: 'var(--container-padding)' }}
      >
        <a href="#home" className="nav__brand" onClick={() => setMenuOpen(false)}>
          <motion.span
            className="nav__brand-mark"
            style={{
              width: '1.75rem',
              height: '1.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              borderRadius: 'var(--border-radius-md)',
              overflow: 'hidden',
            }}
            animate={{ rotate: showBrandName ? 360 : 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 16 }}
          >
            <img src={navlogo} alt="Developer's logo" style={{ width: '100%', height: '100%' }} />
          </motion.span>

          <AnimatePresence initial={false}>
            {showBrandName && (
              <motion.span
                key="brand-name"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{
                  width: { duration: 0.45, ease: EASE },
                  opacity: { duration: 0.25, ease: EASE },
                }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}
              >
                Priyanshu <span className="text-accent">codes.</span>
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav__toggle-bar" />
        </button>

        <div id="primary-menu" className={`nav__menu${menuOpen ? ' is-open' : ''}`}>
          <ul className="nav__links" role="list">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.substring(1)
              const isActive = activeSection === sectionId
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`nav__link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="cluster">
            <button
              type="button"
              className="theme-toggle rounded-3xl"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              <svg
                className="theme-toggle__icon--to-light"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <svg
                className="theme-toggle__icon--to-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>

            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="btn btn--primary btn--sm rounded-3xl"
                aria-haspopup="menu"
                aria-expanded={formatOpen}
                onClick={(e) => {
                  e.stopPropagation()
                  setFormatOpen((o) => !o)
                }}
              >
                <FileUser />
                Resume
                <svg
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    width: '0.625rem',
                    height: '0.625rem',
                    transform: formatOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform var(--duration-fast) var(--ease-standard)',
                  }}
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <AnimatePresence>
                {formatOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15, ease: EASE }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + var(--space-2))',
                      minWidth: '9.5rem',
                      padding: 'var(--space-1)',
                      backgroundColor: 'var(--color-surface-elevated)',
                      border: 'var(--border-width) solid var(--color-border-strong)',
                      borderRadius: 'var(--border-radius-lg)',
                      boxShadow: 'var(--shadow-md)',
                      zIndex: 'var(--z-overlay)',
                    }}
                  >
                    {FORMATS.map((format) => (
                      <button
                        key={format.value}
                        type="button"
                        role="menuitem"
                        className="btn btn--ghost btn--sm btn--block"
                        style={{ justifyContent: 'space-between' }}
                        onClick={() => {
                          handleDownload(format)
                          setFormatOpen(false)
                          setMenuOpen(false)
                        }}
                      >
                        <span>{format.value}</span>
                        <span className="meta">{format.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default NavBar