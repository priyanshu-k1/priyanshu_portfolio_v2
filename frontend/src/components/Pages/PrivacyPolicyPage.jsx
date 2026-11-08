/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Mail } from "lucide-react";
import bannerImage from "../../assets/Privacy policy.svg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const POLICY_ENDPOINT = `${API_URL}/api/privacy-policy/get`;

const DEFAULT_EMAIL = "priyanshukumar0419@gmail.com";
const DEFAULT_HEADER = "Privacy Policy";
const DEFAULT_SUMMARY =
  "This policy explains how Priyanshu Kumar's portfolio website handles information when you visit the site or contact him.";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400";

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

/* ---------- Shared page frame (background, back link, footer) ---------- */

const PageFrame = ({ children }) => (
  <main className="relative min-h-screen overflow-hidden bg-[#09090f] text-purple-100">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(140,60,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(140,60,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-40 right-0 h-136 w-136 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(115,100,255,0.16) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />

    <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
      <header className="pt-10">
        <Link
          to="/"
          className={`group inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/5 px-4 py-2 text-sm text-violet-300 transition-colors hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-200 ${focusRing}`}
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to portfolio
        </Link>
      </header>

      {children}

      <footer className="border-t border-violet-500/15 py-8 text-sm text-purple-100/50 hover:text-purple-500 transition-colors duration-300">
        © {new Date().getFullYear()} Priyanshu Kumar
      </footer>
    </div>
  </main>
);

/* ---------- Loading and error states ---------- */

const LoadingState = () => (
  <div
    role="status"
    aria-busy="true"
    aria-live="polite"
    className="animate-pulse py-14 lg:py-24"
  >
    <span className="sr-only">Loading privacy policy…</span>
    <div className="h-4 w-48 rounded bg-violet-500/10" />
    <div className="mt-6 h-16 w-72 rounded bg-violet-500/10 sm:h-24 sm:w-96" />
    <div className="mt-8 h-5 w-full max-w-prose rounded bg-violet-500/10" />
    <div className="mt-3 h-5 w-2/3 max-w-prose rounded bg-violet-500/10" />
    <div className="mt-16 space-y-10">
      {[0, 1, 2].map((n) => (
        <div key={n} className="space-y-3">
          <div className="h-6 w-56 rounded bg-violet-500/10" />
          <div className="h-4 w-full max-w-2xl rounded bg-violet-500/10" />
          <div className="h-4 w-5/6 max-w-2xl rounded bg-violet-500/10" />
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div role="alert" className="py-24 text-center">
    <h1 className="text-3xl font-semibold text-[#f0e8ff]">
      We couldn't load the privacy policy
    </h1>
    <p className="mx-auto mt-4 max-w-md leading-7 text-purple-100/70">
      {message}
    </p>
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={onRetry}
        className={`rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-400 ${focusRing}`}
      >
        Try again
      </button>
      <a
        href={`mailto:${DEFAULT_EMAIL}`}
        className={`inline-flex items-center gap-2.5 rounded-full border border-violet-400/40 px-5 py-3 text-sm text-violet-200 transition-colors hover:border-violet-300 hover:bg-violet-500/10 ${focusRing}`}
      >
        <Mail size={16} />
        Contact by email
      </a>
    </div>
  </div>
);

/* ---------- The policy itself ---------- */

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
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const art = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
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
        className="grid items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-24"
      >
        <div>
          {updated && (
            <motion.p variants={item} className="text-sm text-violet-300">
              Last updated{" "}
              <time dateTime={updated.iso} className="text-purple-100/80">
                {updated.label}
              </time>
            </motion.p>
          )}

          <motion.h1
            variants={item}
            className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight text-[#f0e8ff] sm:text-7xl"
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
            className="mt-8 max-w-prose text-lg leading-8 text-purple-100/70"
          >
            {summary}
          </motion.p>

          <motion.a
            variants={item}
            href={`mailto:${email}`}
            className={`mt-8 inline-flex items-center gap-2.5 rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-900/40 transition-colors hover:bg-violet-400 ${focusRing}`}
          >
            <Mail size={16} />
            Email a privacy request
          </motion.a>
        </div>

        <motion.div variants={art} className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2.5rem] bg-violet-600/25 blur-3xl"
          />
          <div
            className="relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-violet-950/60 ring-1 ring-violet-300/40 sm:p-9"
            style={{ background: "linear-gradient(145deg, #f7f4ff, #ddd6ff)" }}
          >
            <img
              src={bannerImage}
              alt="Illustration of a person reviewing a privacy policy"
              width="500"
              height="500"
              className="mx-auto block h-auto w-full"
            />
          </div>
        </motion.div>
      </motion.section>

      {highlights.length > 0 && (
        <dl className="grid divide-y divide-violet-500/15 border-y border-violet-500/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="px-0 py-7 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="text-sm font-semibold text-violet-300">
                {highlight.label}
              </dt>
              <dd className="mt-2 leading-7 text-purple-100/70">
                {highlight.text}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="grid gap-12 py-16 lg:grid-cols-[14rem_1fr] lg:gap-20 lg:py-24">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-12">
            <p className="text-sm font-semibold text-purple-100/50">
              On this page
            </p>
            <ol className="mt-5 space-y-1 border-l border-violet-500/15">
              {sections.map((section, index) => {
                const isActive = activeId === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(event) => goToSection(event, section.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`-ml-px block border-l py-1.5 pl-4 text-sm leading-5 transition-colors duration-300 ${focusRing} ${
                        isActive
                          ? "border-violet-400 text-violet-200"
                          : "border-transparent text-purple-100/50 hover:text-purple-100"
                      }`}
                    >
                      <span className="mr-2 tabular-nums text-violet-400/70">
                        {index + 1}.
                      </span>
                      {section.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <article className="max-w-2xl">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-12 border-t border-violet-500/15 py-10 first:border-t-0 first:pt-0"
            >
              <h2 className="flex items-baseline gap-4 text-2xl font-semibold tracking-tight text-[#f0e8ff]">
                <span className="w-6 shrink-0 text-base tabular-nums text-violet-400">
                  {index + 1}.
                </span>
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 pl-0 sm:pl-10">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={`${section.id}-${pIndex}`}
                    className="leading-8 text-purple-100/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-6 rounded-3xl border border-violet-500/25 bg-violet-500/5 p-8 sm:p-10">
            <h2 className="text-xl font-semibold text-[#f0e8ff]">
              Questions or requests?
            </h2>
            <p className="mt-3 leading-7 text-purple-100/70">
              Write to Priyanshu to ask what is stored, correct it, or have it
              deleted.
            </p>
            <a
              href={`mailto:${email}`}
              className={`mt-6 inline-flex items-center gap-2.5 break-all rounded-full border border-violet-400/40 px-5 py-2.5 text-sm text-violet-200 transition-colors hover:border-violet-300 hover:bg-violet-500/10 ${focusRing}`}
            >
              <Mail size={16} className="shrink-0" />
              {email}
            </a>
          </div>
        </article>
      </div>
    </>
  );
};

/* ---------- Page: fetches data and picks the right state ---------- */

const PrivacyPolicyPage = () => {
  const [policy, setPolicy] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
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
        <ErrorState
          message={errorMessage}
          onRetry={() => loadPolicy()}
        />
      )}
      {status === "success" && <PolicyContent policy={policy} />}
    </PageFrame>
  );
};

export default PrivacyPolicyPage;