/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Mail } from "lucide-react";
import bannerImage from "../../assets/privacy-policy-animate.svg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const POLICY_ENDPOINT = `${API_URL}/api/privacy-policy/get`;

const DEFAULT_EMAIL = "priyanshukumar0419@gmail.com";
const DEFAULT_HEADER = "Privacy Policy";
const DEFAULT_SUMMARY =
  "This policy explains how Priyanshu Kumar's portfolio website handles information when you visit the site or contact him.";

const HEADING = "var(--font-heading)";
const EASE = [0.16, 1, 0.3, 1];

const tint = (color, percent) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const GRID_LINE = tint("var(--color-accent)", 6);

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return {
    label: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }),
    iso: date.toISOString().slice(0, 10),
  };
};

const PageFrame = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-theme")) return;
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        root.setAttribute("data-theme", saved);
      }
    } catch (error) {
      void error;
    }
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
        transition: "background-color var(--duration-theme) var(--ease-standard)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${GRID_LINE} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-136 w-136 rounded-full"
        style={{
          background: `radial-gradient(circle, ${tint("var(--color-accent)", 18)} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <header className="pt-10">
          <Link to="/" className="group btn btn--secondary btn--sm">
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to portfolio
          </Link>
        </header>

        {children}

        <footer
          className="meta py-8 transition-colors duration-300"
          style={{
            borderTop: "var(--border-width) solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          © {new Date().getFullYear()} Priyanshu Kumar
        </footer>
      </div>
    </main>
  );
};

const LoadingState = () => (
  <div role="status" aria-busy="true" aria-live="polite" className="py-14 lg:py-24">
    <span className="sr-only">Loading privacy policy…</span>
    <div className="skeleton h-4 w-48" />
    <div className="skeleton mt-6 h-16 w-72 sm:h-24 sm:w-96" />
    <div className="skeleton mt-8 h-5 w-full max-w-prose" />
    <div className="skeleton mt-3 h-5 w-2/3 max-w-prose" />
    <div className="mt-16 space-y-10">
      {[0, 1, 2].map((n) => (
        <div key={n} className="space-y-3">
          <div className="skeleton h-6 w-56" />
          <div className="skeleton h-4 w-full max-w-2xl" />
          <div className="skeleton h-4 w-5/6 max-w-2xl" />
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div role="alert" className="py-24 text-center">
    <h1
      className="text-3xl"
      style={{
        fontFamily: HEADING,
        fontWeight: "var(--weight-semibold)",
        color: "var(--color-text-primary)",
      }}
    >
      We couldn't load the privacy policy
    </h1>
    <p
      className="mx-auto mt-4 max-w-md leading-7"
      style={{ color: "var(--color-text-secondary)" }}
    >
      {message}
    </p>
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <button type="button" onClick={onRetry} className="btn btn--primary">
        Try again
      </button>
      <a href={`mailto:${DEFAULT_EMAIL}`} className="btn btn--secondary">
        <Mail />
        Contact by email
      </a>
    </div>
  </div>
);

const TocLink = ({ section, index, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <a
        href={`#${section.id}`}
        onClick={onClick}
        aria-current={isActive ? "location" : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="-ml-px block border-l py-1.5 pl-4 text-sm leading-5 transition-colors duration-300"
        style={{
          borderColor: isActive ? "var(--color-accent)" : "transparent",
          color:
            isActive || hovered
              ? "var(--color-text-primary)"
              : "var(--color-text-muted)",
        }}
      >
        <span
          className="mr-2 tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
        >
          {index + 1}.
        </span>
        {section.title}
      </a>
    </li>
  );
};

const PolicyContent = ({ policy }) => {
  const reduceMotion = useReducedMotion();

  const sections = policy.sections ?? [];
  const highlights = policy.highlights ?? [];
  const email = policy.email || DEFAULT_EMAIL;
  const summary = policy.summary || DEFAULT_SUMMARY;
  const headerWords = (policy.header || DEFAULT_HEADER).split(" ");
  const updated = formatDate(policy.lastUpdated || policy.updatedAt);

  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const goToSection = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    setActiveId(id);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE },
    },
  };

  const art = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.9,
        ease: EASE,
        delay: reduceMotion ? 0 : 0.25,
      },
    },
  };

  return (
    <>
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid items-center gap-14 pb-14 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-8"
      >
        <div>
          {updated && (
            <motion.p
              variants={item}
              className="meta"
              style={{ color: "var(--color-accent)" }}
            >
              Last updated{" "}
              <time
                dateTime={updated.iso}
                style={{ color: "var(--color-text-secondary)" }}
              >
                {updated.label}
              </time>
            </motion.p>
          )}

          <motion.h1
            variants={item}
            className="mt-4 text-5xl uppercase leading-[0.95] tracking-tight sm:text-7xl"
            style={{
              fontFamily: HEADING,
              fontWeight: "var(--weight-semibold)",
              color: "var(--color-text-primary)",
            }}
          >
            {headerWords.map((word, index) => (
              <span key={`${word}-${index}`}>
                {word}
                {index < headerWords.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-prose text-lg leading-8"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {summary}
          </motion.p>

          <motion.a
            variants={item}
            href={`mailto:${email}`}
            className="btn btn--primary mt-8 rounded-3xl"
          >
            <Mail />
            Email a privacy request
          </motion.a>
        </div>

        <motion.div variants={art} className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full"
            style={{
              background: `radial-gradient(circle, ${tint("var(--color-accent)", 22)} 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
          <img
            src={bannerImage}
            alt="Illustration of a person reviewing a privacy policy"
            width="500"
            height="500"
            className="relative mx-auto block h-auto w-full"
            style={{ filter: "drop-shadow(0 24px 40px rgb(0 0 0 / 0.35))" }}
          />
        </motion.div>
      </motion.section>

      {highlights.length > 0 && (
        <dl
          className="grid border-y sm:grid-cols-3"
          style={{ borderColor: "var(--color-border)" }}
        >
          {highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="border-t px-0 py-7 first:border-t-0 sm:border-t-0 sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
              style={{ borderColor: "var(--color-border)" }}
            >
              <dt
                className="meta"
                style={{ color: "var(--color-accent)", textTransform: "uppercase" }}
              >
                {highlight.label}
              </dt>
              <dd
                className="mt-2 leading-7"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {highlight.text}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="grid gap-12 py-16 lg:grid-cols-[14rem_1fr] lg:gap-20 lg:py-24">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-12">
            <p
              className="meta"
              style={{ color: "var(--color-text-muted)", textTransform: "uppercase" }}
            >
              On this page
            </p>
            <ol
              className="mt-5 space-y-1 border-l"
              style={{ borderColor: "var(--color-border)" }}
            >
              {sections.map((section, index) => (
                <TocLink
                  key={section.id}
                  section={section}
                  index={index}
                  isActive={activeId === section.id}
                  onClick={(event) => goToSection(event, section.id)}
                />
              ))}
            </ol>
          </nav>
        </aside>

        <article className="max-w-2xl">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-12 border-t py-10 first:border-t-0 first:pt-0"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h2
                className="flex items-baseline gap-4 text-2xl tracking-tight"
                style={{
                  fontFamily: HEADING,
                  fontWeight: "var(--weight-medium)",
                  color: "var(--color-text-primary)",
                }}
              >
                <span
                  className="w-6 shrink-0 text-base tabular-nums"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
                >
                  {index + 1}.
                </span>
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 pl-0 sm:pl-10">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={`${section.id}-${pIndex}`}
                    className="leading-8"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div
            className="mt-6 p-8 sm:p-10"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "var(--border-width) solid var(--color-border-strong)",
              borderTop: "var(--border-width-accent) solid var(--color-accent)",
              borderRadius: "var(--border-radius-lg)",
            }}
          >
            <h2
              className="text-xl"
              style={{
                fontFamily: HEADING,
                fontWeight: "var(--weight-medium)",
                color: "var(--color-text-primary)",
              }}
            >
              Questions or requests?
            </h2>
            <p
              className="mt-3 leading-7"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Write to Priyanshu to ask what is stored, correct it, or have it
              deleted.
            </p>
            <a
              href={`mailto:${email}`}
              className="btn btn--secondary mt-6 break-all rounded-l"
              style={{ whiteSpace: "normal" }}
            >
              <Mail className="shrink-0" />
              {email}
            </a>
          </div>
        </article>
      </div>
    </>
  );
};

const PrivacyPolicyPage = () => {
  const [policy, setPolicy] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const loadPolicy = useCallback(async (signal) => {
    setStatus("loading");
    try {
      const response = await fetch(POLICY_ENDPOINT, { signal });
      const json = await response.json().catch(() => null);

      if (!response.ok || !json?.success || !json.data) {
        throw new Error(
          response.status === 404
            ? "The privacy policy hasn't been published yet."
            : json?.message || "The server returned an unexpected response."
        );
      }

      setPolicy(json.data);
      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") return;
      setErrorMessage(
        error instanceof TypeError
          ? "Please check your connection and try again."
          : error.message
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadPolicy(controller.signal);
    return () => controller.abort();
  }, [loadPolicy]);

  return (
    <PageFrame>
      {status === "loading" && <LoadingState />}
      {status === "error" && (
        <ErrorState message={errorMessage} onRetry={() => loadPolicy()} />
      )}
      {status === "success" && <PolicyContent policy={policy} />}
    </PageFrame>
  );
};

export default PrivacyPolicyPage;