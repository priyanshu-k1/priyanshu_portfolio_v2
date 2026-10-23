/* eslint-disable no-unused-vars */
import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Mail, ArrowUp, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram,FaWhatsapp } from "react-icons/fa6";

import navlogo from "../../assets/logo.png";
import FooterTypedHeroText from "./FooterTypedHeroText";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: FaGithub, href: "https://github.com/priyanshu-k1", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/priyanshu-kumar-97898424a/",
    label: "LinkedIn",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/KPriyanshu011",
    label: "Twitter",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/why.not.priyanshuuuu/",
    label: "Instagram",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/+919302771737",
    label: "WhatsApp",
  },

];

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, push, dismiss };
};

const ToastContainer = ({ toasts, dismiss }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
    <AnimatePresence>
      {toasts.map((t) => (
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
          <span className="ml-auto font-mono text-[10px] text-violet-500/40">
            ✕
          </span>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { toasts, push, dismiss } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText("priyanshukumar0419@gmail.com")
      .then(() => {
        push("Email copied to clipboard");
      })
      .catch(() => {
        push("Failed to copy email", "error");
      });
  };

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".snap-y");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={ref}
      className="relative w-full bg-[#09090f] overflow-hidden snap-start snap-always"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
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
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "clamp(300px,60vw,700px)",
          height: "clamp(150px,30vw,350px)",
          background:
            "radial-gradient(ellipse, rgba(120,40,220,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "clamp(150px,25vw,280px)",
          height: "clamp(150px,25vw,280px)",
          background:
            "radial-gradient(circle, rgba(160,80,255,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <motion.div
        className="absolute top-6 right-6 w-20 h-20 border-t border-r border-violet-500/20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-14 h-14 border-b border-l border-violet-500/15 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      />

      <div
        className="absolute bottom-0 right-[4vw] select-none pointer-events-none font-black text-violet-500/4 leading-none"
        style={{
          fontSize: "clamp(100px,16vw,200px)",
          fontFamily: "sans-serif",
        }}
      >
        END
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{
          padding:
            "clamp(80px,10vw,140px) clamp(24px,6vw,80px) clamp(40px,6vw,80px)",
        }}
      >
        <motion.p
          className="flex items-center gap-2.5 font-mono uppercase tracking-[0.35em] text-violet-400 mb-7"
          style={{ fontSize: "clamp(9px,1.1vw,11px)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="block w-7 h-px bg-violet-400" />
          That's a wrap
        </motion.p>

        <motion.h2
          className="font-black uppercase leading-[0.88] tracking-tight text-[#f0e8ff] mb-8"
          style={{
            fontSize: "clamp(52px,10vw,130px)",
            fontFamily: "sans-serif",
          }}
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          LET'S
          <br />
          <motion.span
            className="block bg-linear-to-br from-purple-300 via-violet-500 to-purple-400 bg-clip-text text-transparent"
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={
              inView
                ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
                : {}
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          >
            CONNECT
          </motion.span>
        </motion.h2>

        <motion.div
          className="w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, rgba(140,60,255,0.55) 0%, rgba(140,60,255,0.1) 60%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center  overflow-hidden ">
                <img
                  src={navlogo}
                  alt="Developer's logo"
                  className="w-full h-full transition-all ease-in-out"
                />
              </div>
                <FooterTypedHeroText/>
              {/* <div className="flex flex-col ">
                <p>A developer all you need</p>
              
              </div> */}
            </div>

            <p
              className="font-light leading-[1.75] text-purple-200/55"
              style={{ fontSize: "clamp(13px,1.4vw,14px)" }}
            >
              Full-stack developer building scalable web applications — with a
              foundation in mobile and a focus on AI-driven systems.
            </p>

            <span className="font-mono text-[10px] tracking-wide text-violet-400/60 flex items-center gap-1.5">
              <MapPin size={11} className="text-violet-600" />
              Hyderabad, India
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-400/60 mb-1">
              Navigation
            </span>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-3 w-fit"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.07 }}
                >
                  <span
                    className="block h-px bg-violet-500/30 group-hover:bg-violet-400 group-hover:w-6 transition-all duration-300"
                    style={{ width: "16px" }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-purple-200/50 group-hover:text-violet-400 transition-colors duration-300">
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-400/60 mb-1">
              Reach out
            </span>
            <button
              onClick={handleCopyEmail}
              className="group flex items-center gap-3 w-fit bg-transparent border-none p-0 cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-full border border-violet-500/20 bg-violet-500/5 flex items-center justify-center group-hover:bg-violet-500/15 group-hover:border-violet-500/40 transition-all duration-300">
                <Mail
                  size={15}
                  className="text-purple-200/50 group-hover:text-violet-400 transition-colors duration-300"
                />
              </div>
              <span className="font-mono text-[11px] text-purple-200/50 group-hover:text-violet-400 transition-colors duration-300 tracking-wide">
                priyanshukumar0419@gmail.com
              </span>
            </button>

              <a
                href="tel:+919302771737"
                className="group flex items-center gap-3 w-fit bg-transparent border-none p-0 cursor-pointer text-left no-underline"
              >
                <div
                  className="w-9 h-9 rounded-full border border-violet-500/20 bg-violet-500/5 flex items-center justify-center group-hover:bg-violet-500/15 group-hover:border-violet-500/40 transition-all duration-300"
                >
                  <Phone
                    size={15}
                    className="text-purple-200/50 group-hover:text-violet-400 transition-colors duration-300"
                  />
                </div>
                <span className="font-mono text-[11px] text-purple-200/50 group-hover:text-violet-400 transition-colors duration-300 tracking-wide">
                  +91 9302771737
                </span>
              </a>

            <div className="flex flex-col gap-3 mt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-400/60">
                Socials
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.07 }}
                    className="w-10 h-10 rounded-full border border-violet-500/20 bg-violet-500/5 flex items-center justify-center text-purple-200/50 hover:text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/40 transition-all duration-300"
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(140,60,255,0.2) 30%, rgba(140,60,255,0.2) 70%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        />

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-purple-200/30 uppercase tracking-widest">
              © {new Date().getFullYear()} Priyanshu Kumar
            </span>
            <span className="w-px h-3 bg-violet-500/20" />
            <span className="font-mono text-[10px] text-violet-400/60 uppercase tracking-widest">
              All rights reserved
            </span>
            <span className="w-px h-3 bg-violet-500/20" />
            <Link
              to="/privacy-policy"
              className="font-mono text-[10px] text-purple-200/30 hover:text-violet-400 uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border
             border-violet-500/20 bg-violet-500/5 font-mono text-[10px]
              text-purple-200/50 uppercase tracking-widest hover:text-violet-400
               hover:bg-violet-500/10 hover:border-violet-500/40 transition-all duration-300
               animate-bounce"
          >
            Back to top
            <ArrowUp
              size={13}
              className="text-violet-400 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </motion.button>
        </motion.div>
      </div>
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </footer>
  );
};

export default Footer;
