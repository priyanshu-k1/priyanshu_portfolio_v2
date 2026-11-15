import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const STRINGS = [
  'Android App Developer',
  'MERN-Stack Developer',
  'AI/ML Enthusiast',
]

const FooterTypedHeroText = () => {
  const el = useRef(null)
  const typed = useRef(null)

  useEffect(() => {
    typed.current = new Typed(el.current, {
      strings: STRINGS,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      cursorChar: '/>',
    })

    return () => {
      if (typed.current) typed.current.destroy()
    }
  }, [])

  return (
    <span
      className="meta"
      aria-label={STRINGS.join(', ')}
      style={{
        display: 'inline-block',
        minHeight: '1.5em',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'var(--color-text-primary)',
        transition: 'color var(--duration-base) var(--ease-standard)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)' }}
    >
      <span ref={el} aria-hidden="true" />
    </span>
  )
}

export default FooterTypedHeroText