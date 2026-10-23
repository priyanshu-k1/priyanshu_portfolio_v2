/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Mail } from "lucide-react";
import bannerImage from "../../assets/Privacy policy.svg";

const EMAIL = "priyanshukumar0419@gmail.com";
const LAST_UPDATED = "October 23, 2026";

const sections = [
  {
    id: "information-you-provide",
    title: "Information you provide",
    paragraphs: [
      "If you use the contact form, it asks for your name, email address, phone number, and message. This information is sent to the portfolio's backend so Priyanshu can read and respond to your enquiry.",
      "Please avoid including sensitive personal information in your message. Contact details are kept only as long as needed to handle the enquiry and for reasonable record keeping, subject to any applicable legal requirements.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    paragraphs: [
      "This site loads Umami Analytics from Umami Cloud to understand general site usage and improve the portfolio. Analytics may process information such as pages visited, referring pages, browser and device details, and approximate location derived from network information. Umami's handling of this data is also subject to its own privacy practices.",
    ],
  },
  {
    id: "how-information-is-used-and-shared",
    title: "How information is used and shared",
    paragraphs: [
      "Contact form information is used to respond to you. Analytics information is used to understand site traffic. Information may be processed by service providers that operate the portfolio's hosting, backend, or analytics. It is not sold. It may also be disclosed when required by law or to protect the site and its users.",
    ],
  },
  {
    id: "external-websites",
    title: "External websites",
    paragraphs: [
      "The portfolio links to third-party websites and services. Their privacy practices are controlled by those providers, so please review their policies when you visit them.",
    ],
  },
  {
    id: "your-choices-and-requests",
    title: "Your choices and requests",
    paragraphs: [
      "You can choose not to submit the contact form. You may also request access to, correction of, or deletion of information you sent through it, subject to applicable requirements. Use the email address below to make a request.",
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to this policy",
    paragraphs: [
      "This policy may be updated as the site or its services change. The date at the top indicates when this version was last updated.",
    ],
  },
];

const highlights = [
  {
    label: "What is collected",
    text: "Contact form details, plus general usage data from Umami Analytics.",
  },
  {
    label: "Who can see it",
    text: "Priyanshu and the providers that run this site. It is never sold.",
  },
  {
    label: "Your control",
    text: "Ask for access, correction, or deletion by email.",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400";

const PrivacyPolicyPage = () => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
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
  }, []);

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

        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-24"
        >
          <div>
            <motion.p
              variants={item}
              className="text-sm text-violet-300"
            >
              Last updated{" "}
              <time dateTime="2026-10-23" className="text-purple-100/80">
                {LAST_UPDATED}
              </time>
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight text-[#f0e8ff] sm:text-7xl"
            >
              Privacy
              <br />
              Policy
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-prose text-lg leading-8 text-purple-100/70"
            >
              This policy explains how Priyanshu Kumar's portfolio website
              handles information when you visit the site or contact him.
            </motion.p>

            <motion.a
              variants={item}
              href={`mailto:${EMAIL}`}
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

        <dl className="grid divide-y divide-violet-500/15 border-y border-violet-500/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {highlights.map((highlight) => (
            <div key={highlight.label} className="px-0 py-7 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <dt className="text-sm font-semibold text-violet-300">
                {highlight.label}
              </dt>
              <dd className="mt-2 leading-7 text-purple-100/70">
                {highlight.text}
              </dd>
            </div>
          ))}
        </dl>

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
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-8 text-purple-100/70">
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
                href={`mailto:${EMAIL}`}
                className={`mt-6 inline-flex items-center gap-2.5 break-all rounded-full border border-violet-400/40 px-5 py-2.5 text-sm text-violet-200 transition-colors hover:border-violet-300 hover:bg-violet-500/10 ${focusRing}`}
              >
                <Mail size={16} className="shrink-0" />
                {EMAIL}
              </a>
            </div>
          </article>
        </div>

        <footer className="border-t border-violet-500/15 py-8 text-sm text-purple-100/50 hover:text-purple-500  transition-colors duration-300">
          © {new Date().getFullYear()} Priyanshu Kumar
        </footer>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;