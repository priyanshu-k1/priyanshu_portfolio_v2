/* eslint-disable no-unused-vars */
import { motion, useInView, AnimatePresence } from "motion/react"
import { useRef, useState, useCallback,useEffect } from "react"

const useToast = () => {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, type = "success") => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, push, dismiss }
}

const ToastContainer = ({ toasts, dismiss }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
    <AnimatePresence>
      {toasts.map(t => (
        <motion.div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
          style={{
            background: "rgba(15,10,30,0.92)",
            border: "1px solid rgba(139,92,246,0.4)",
            backdropFilter: "blur(16px)",
            minWidth: 240,
          }}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => dismiss(t.id)}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              background:
                t.type === "success"
                  ? "rgba(139,92,246,1)"
                  : t.type === "error"
                  ? "rgba(239,68,68,1)"
                  : "rgba(167,139,250,1)",
            }}
          />
          <span className="font-mono text-[11px] tracking-wide text-purple-200/80">
            {t.message}
          </span>
          <span className="ml-auto font-mono text-[10px] text-violet-500/40">✕</span>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
)

const SectionLabel = ({ children, inView }) => (
  <motion.p
    className="flex items-center gap-2.5 font-mono uppercase tracking-[0.35em] text-violet-400"
    style={{ fontSize: "clamp(9px,1.1vw,11px)" }}
    initial={{ opacity: 0, y: 14 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.1 }}
  >
    <span className="block w-7 h-px bg-violet-400" />
    {children}
  </motion.p>
)

const Divider = ({ inView, delay = 0.5 }) => (
  <motion.div
    className="w-full h-px"
    style={{
      background:
        "linear-gradient(90deg, rgba(140,60,255,0.55) 0%, rgba(140,60,255,0.1) 60%, transparent 100%)",
    }}
    initial={{ opacity: 0 }}
    animate={inView ? { opacity: 1 } : {}}
    transition={{ delay }}
  />
)

const ContactPage = () => {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const infoRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" })
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: "-60px" })
  const { toasts, push, dismiss } = useToast()
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sending, setSending] = useState(false)
  const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`
  const [customBorderColor, setBorderColor] = useState("1px solid rgba(139,92,246,0.2)");
  const messageBoxVisiblity = true

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("priyanshukumar0419@gmail.com").then(() => {
      push("Email copied to clipboard")
    }).catch(() => {
      push("Failed to copy email", "error")
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message ,!form.phone) {
      push("Please fill all required fields", "error")
      return
    }
    setSending(true)
    try {
      const response = await fetch(`${API_URL}/message/postmessage`,
        {
          method:'POST',
          headers: {'Content-Type': 'application/json',},
          body:JSON.stringify({
            fname:form.name,
            email:form.email,
            pnumber:form.phone,
            message:form.message
         })
        }
      )
      const data = await response.json()
      if(data.success){
        setBorderColor("1px solid rgba(111, 250, 132, 0.2)")
        setForm({ name: "", email: "", phone: "", message: "" })
        push("Message sent successfully!")
        setTimeout(() => {
          setBorderColor("1px solid rgba(139,92,246,0.2)")
        }, 2000)
      }
      else{
         setBorderColor("1px solid rgba(248, 79, 79, 0.2)")
         push("Failed to send the message!", data.message)
         setTimeout(() => {
          setBorderColor("1px solid rgba(139,92,246,0.2)")
          }, 2000)
      }
    }
    catch (error) {
      setBorderColor("1px solid rgba(248, 79, 79, 0.2)")
      push("Failed to send message", `${error.message || "error"}`)
      setTimeout(() => {
           setBorderColor("1px solid rgba(139,92,246,0.2)")
      }, 2000)
    }
    finally {
      setSending(false)
    }

  }
  const SOCIALS = [
    {
      label: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: "https://wa.me/919302771737?text=Hi%20Priyanshu%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect!",
      accent: "rgba(37,211,102,0.7)",
      border: "rgba(37,211,102,0.2)",
    },
    {
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: "https://www.instagram.com/why.not.priyanshuuuu/",
      accent: "rgba(225,48,108,0.7)",
      border: "rgba(225,48,108,0.2)",
    },
    {
      label: "X / Twitter",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "https://x.com/KPriyanshu011",
      accent: "rgba(255,255,255,0.6)",
      border: "rgba(255,255,255,0.15)",
    },
    {
      label: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://www.linkedin.com/in/priyanshu-kumar-97898424a/",
      accent: "rgba(10,102,194,0.8)",
      border: "rgba(10,102,194,0.25)",
    },
  ]

  const inputClass =
    "w-full bg-transparent font-mono text-[13px] text-purple-100/80 placeholder-white-900 outline-none py-3 px-0 border-b border-violet-500/20 focus:border-violet-500/60 transition-colors duration-200"

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismiss} />
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
          className="absolute bottom-0 right-0 w-100 h-100 pointer-events-none"
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
          04
        </div>

        <div ref={headerRef} className="flex flex-col gap-6 mb-16 max-w-2xl">
          <SectionLabel inView={headerInView}>Get In Touch</SectionLabel>

          <motion.h2
            className="font-black uppercase leading-[0.92] tracking-tight text-[#f0e8ff]"
            style={{ fontSize: "clamp(52px,9vw,120px)", fontFamily: "sans-serif" }}
            initial={{ opacity: 0, x: -24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            LET'S
            <br />
            <span className="bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent">
              TALK
            </span>
          </motion.h2>

          <Divider inView={headerInView} />

          <motion.p
            className="font-light leading-relaxed text-purple-200/60"
            style={{ fontSize: "clamp(14px,1.5vw,15px)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Open to freelance, full-time roles, or just a good conversation. Reach out — I respond fast.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          <div ref={infoRef} className="flex flex-col gap-10">

            <div className="flex flex-col gap-5">
              <motion.p
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-violet-400/70"
                initial={{ opacity: 0 }}
                animate={infoInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 }}
              >
                Contact Info
              </motion.p>

              <motion.a
                href="tel:+919302771737"
                className="flex items-center gap-4 group"
                initial={{ opacity: 0, x: -16 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ border: "1px solid rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-violet-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-wide text-violet-400/70 uppercase mb-0.5">Phone</span>
                  <span
                    className="font-mono text-[15px] text-purple-100/80 group-hover:text-violet-300 transition-colors duration-200"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    +91 93027 71737
                  </span>
                </div>
                <span className="ml-auto font-mono text-[10px] text-violet-400/70 group-hover:text-violet-300 transition-colors duration-200">
                  CALL ↗
                </span>
              </motion.a>

              <motion.button
                onClick={handleCopyEmail}
                className="flex items-center gap-4 group text-left w-full"
                initial={{ opacity: 0, x: -16 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ border: "1px solid rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-violet-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-wide text-violet-400/70 uppercase mb-0.5">Email</span>
                  <span
                    className="font-mono text-[13px] text-purple-100/80 group-hover:text-violet-300 transition-colors duration-200"
                    style={{ letterSpacing: "0.03em" }}
                  >
                    priyanshukumar0419@gmail.com
                  </span>
                </div>
                <span className="ml-auto font-mono text-[10px] text-violet-400/70 group-hover:text-violet-300 transition-colors duration-200">
                  COPY ↗
                </span>
              </motion.button>
            </div>

            <motion.div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, rgba(140,60,255,0.3) 0%, transparent 100%)" }}
              initial={{ opacity: 0 }}
              animate={infoInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            />

            <div className="flex flex-col gap-5">
              <motion.p
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-violet-400/70"
                initial={{ opacity: 0 }}
                animate={infoInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.45 }}
              >
                Connect With Me
              </motion.p>

              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl group transition-all duration-200"
                    style={{
                      border: `1px solid ${s.border}`,
                      background: "rgba(255,255,255,0.02)",
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={infoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
                    whileHover={{
                      background: `${s.accent.replace("0.7", "0.08").replace("0.6", "0.06").replace("0.8", "0.08")}`,
                      borderColor: s.accent,
                      y: -2,
                      transition: { duration: 0.15 },
                    }}
                  >
                    <span style={{ color: s.accent }}>{s.icon}</span>
                    <span className="font-mono text-[11px] tracking-wide text-purple-200/60 group-hover:text-purple-200/90 transition-colors duration-150">
                      {s.label}
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-violet-500/30">↗</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          {
            messageBoxVisiblity && (
              <motion.div
            ref={formRef}
            className="flex flex-col gap-8 p-8 rounded-2xl"
            style={{
              border: customBorderColor,
              background: "radial-gradient(ellipse at top right, rgba(139,92,246,0.06) 0%, rgba(9,9,15,0) 70%), rgba(255,255,255,0.02)",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={messageBoxVisiblity ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="flex flex-col gap-1">
              <span
                className="font-black uppercase tracking-tight text-[#f0e8ff]"
                style={{ fontSize: "clamp(22px,3vw,32px)", fontFamily: "sans-serif" }}
              >
                Send a{" "}
                <span className="bg-linear-to-r from-purple-300 to-violet-500 bg-clip-text text-transparent">
                  Message
                </span>
              </span>
              <span className="font-mono text-[11px] tracking-wide text-violet-400/70">
                I'll get back within 24 hours
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-violet-400/70">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                  style={{ border: customBorderColor,
                    padding: "12px",
                    borderRadius: "8px",
                   }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-violet-500/40">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={inputClass}
                  style={{ border: customBorderColor,
                    padding: "12px",
                    borderRadius: "8px",
                   }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-violet-500/40">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className={inputClass}
                  style={{ border: customBorderColor,
                    padding: "12px",
                    borderRadius: "8px", }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-violet-500/40">
                  Message *
                </label>
                <textarea
                  placeholder="Tell me about your project, idea, or problem you're trying to solve..."
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  style={{ border: customBorderColor,
                    padding: "12px",
                    borderRadius: "8px", }}
                />
              </div>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={sending}
              className="relative flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-mono text-[12px] tracking-[0.2em] uppercase overflow-hidden"
              style={{
                background: sending
                  ? "rgba(139,92,246,0.15)"
                  : "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(109,40,217,0.9))",
                border: customBorderColor,
                color: sending ? "rgba(167,139,250,0.5)" : "#f0e8ff",
                cursor: sending ? "not-allowed" : "pointer",
              }}
              whileHover={sending ? {} : { scale: 1.02, transition: { duration: 0.15 } }}
              whileTap={sending ? {} : { scale: 0.98 }}
            >
              {sending ? (
                <>
                  <motion.span
                    className="w-3 h-3 rounded-full border border-violet-400/50 border-t-violet-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{ display: "block" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </>
              )}
            </motion.button>
              </motion.div>
            )
          }
        </div>
      </section>
    </>
  )
}

export default ContactPage