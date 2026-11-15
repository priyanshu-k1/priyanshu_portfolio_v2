/* eslint-disable no-unused-vars */
import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Mail, ArrowUp, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

import navlogo from "../../assets/logo.png";
import FooterTypedHeroText from "./FooterTypedHeroText";

const EMAIL = "priyanshukumar0419@gmail.com";
const PHONE_DISPLAY = "+91 9302771737";
const PHONE_HREF = "tel:+919302771737";
const EASE = [0.2, 0, 0, 1];

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
  { icon: FaXTwitter, href: "https://x.com/KPriyanshu011", label: "Twitter" },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/why.not.priyanshuuuu/",
    label: "Instagram",
  },
  { icon: FaWhatsapp, href: "https://wa.me/+919302771737", label: "WhatsApp" },
];

const containerStyle = {
  maxWidth: "var(--container-width)",
  marginInline: "auto",
  paddingInline: "var(--container-padding)",
};

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
  <div
    style={{
      position: "fixed",
      right: "var(--space-6)",
      bottom: "var(--space-6)",
      zIndex: "var(--z-overlay)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      pointerEvents: "none",
    }}
    aria-live="polite"
  >
    <AnimatePresence>
      {toasts.map((t) => (
        <motion.button
          type="button"
          key={t.id}
          className="meta"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            minWidth: "15rem",
            padding: "var(--space-3) var(--space-4)",
            textAlign: "left",
            color: "var(--color-text-primary)",
            backgroundColor: "var(--color-surface-elevated)",
            border: "var(--border-width) solid var(--color-border-strong)",
            borderRadius: "var(--border-radius-md)",
            boxShadow: "var(--shadow-md)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={() => dismiss(t.id)}
        >
          <span
            className={`badge__dot${t.type === "success" ? " badge__dot--secondary" : ""}`}
            aria-hidden="true"
          />
          <span>{t.message}</span>
          <span style={{ marginLeft: "auto", color: "var(--color-text-muted)" }} aria-hidden="true">
            ✕
          </span>
        </motion.button>
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
      .writeText(EMAIL)
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

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <footer
      ref={ref}
      className="footer snap-start snap-always"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ ...containerStyle, width: "100%" }}>
        <div className="stack stack--lg" style={{ paddingBottom: "var(--space-10)" }}>
          <motion.p className="eyebrow" {...reveal(0)}>
            That's a wrap
          </motion.p>

          <motion.h2 className="display display--lg" {...reveal(0.1)}>
            Let's
            <br />
            <span className="text-accent">connect.</span>
          </motion.h2>

          <motion.p className="lead" {...reveal(0.2)}>
            Open to full-stack roles, freelance projects and interesting problems. The fastest way to
            reach me is a quick email.
          </motion.p>

          <motion.div className="cluster" {...reveal(0.3)}>
            <button type="button" className="btn btn--primary btn--l rounded-3xl" onClick={handleCopyEmail}>
              <Mail />
              {EMAIL}
            </button>
            <a href={PHONE_HREF} className="btn btn--secondary btn--l rounded-3xl">
              <Phone />
              {PHONE_DISPLAY}
            </a>
          </motion.div>
        </div>

        <hr />

        <motion.div
          className="footer__grid"
          style={{ paddingTop: "var(--space-9)" }}
          {...reveal(0.4)}
        >
          <div className="footer__brand">
            <div className="cluster">
              <img
                src={navlogo}
                alt="Developer's logo"
                style={{ width: "2rem", height: "2rem", borderRadius: "var(--border-radius-md)" }}
              />
              <FooterTypedHeroText />
            </div>
            <p className="text-sm text-muted">
              Full-stack developer building scalable web applications, with a foundation in mobile and
              a focus on AI-driven systems.
            </p>
            <span className="meta cluster" style={{ "--cluster-space": "var(--space-2)" }}>
              <MapPin size={13} style={{ color: "var(--color-accent)" }} />
              Hyderabad, India
            </span>
          </div>

          <nav aria-label="Footer">
            <h3 className="footer__heading">Navigation</h3>
            <ul className="footer__links" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="footer__heading">Elsewhere</h3>
            <ul className="footer__links" role="list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)" }}
                  >
                    <social.icon size={14} aria-hidden="true" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div className="footer__bottom" {...reveal(0.5)}>
          <div className="cluster cluster--lg">
            <span>© {new Date().getFullYear()} Priyanshu Kumar</span>
            <Link to="/privacy-policy" className="link">
              Privacy Policy
            </Link>
          </div>

          <button type="button" className="btn btn--ghost btn--sm rounded-3xl" onClick={scrollToTop}>
            Back to top
            <ArrowUp />
          </button>
        </motion.div>
      </div>

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </footer>
  );
};

export default Footer;