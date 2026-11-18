import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const mix = (token, percent) =>
  `color-mix(in srgb, var(--color-${token}) ${percent}%, transparent)`;

const NotFoundIllustration = () => (
  <svg
    aria-labelledby="lost-robot-title"
    className="h-auto w-full"
    fill="none"
    role="img"
    viewBox="0 0 560 460"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="lost-robot-title">A little robot lost in space</title>
    <defs>
      <linearGradient id="robot-shell" x1="195" x2="357" y1="163" y2="332" gradientUnits="userSpaceOnUse">
        <stop style={{ stopColor: "var(--color-surface-elevated)" }} />
        <stop offset="1" style={{ stopColor: "var(--color-surface)" }} />
      </linearGradient>
      <linearGradient id="robot-face" x1="215" x2="340" y1="180" y2="267" gradientUnits="userSpaceOnUse">
        <stop style={{ stopColor: "var(--color-surface)" }} />
        <stop offset="1" style={{ stopColor: "var(--color-bg)" }} />
      </linearGradient>
      <linearGradient id="beam" x1="280" x2="280" y1="265" y2="415" gradientUnits="userSpaceOnUse">
        <stop style={{ stopColor: "var(--color-accent)", stopOpacity: 0.27 }} />
        <stop offset="1" style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }} />
      </linearGradient>
      <radialGradient id="planet" cx="0" cy="0" r="1" gradientTransform="matrix(100 0 0 100 280 373)" gradientUnits="userSpaceOnUse">
        <stop style={{ stopColor: "color-mix(in srgb, var(--color-accent) 45%, var(--color-surface))" }} />
        <stop offset="1" style={{ stopColor: "var(--color-surface-elevated)" }} />
      </radialGradient>
      <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>

    <circle cx="282" cy="230" r="176" strokeDasharray="3 11" style={{ stroke: mix("accent", 28) }} />
    <circle cx="282" cy="230" r="132" style={{ stroke: mix("accent", 12) }} />
    <path d="M228 258h104l90 157H138l90-157Z" fill="url(#beam)" />

    <g style={{ fill: "var(--color-text-secondary)" }}>
      <circle cx="119" cy="126" r="2" opacity=".7" />
      <circle cx="414" cy="105" r="2" opacity=".8" />
      <circle cx="442" cy="270" r="1.5" opacity=".6" />
      <circle cx="144" cy="300" r="1.5" opacity=".6" />
      <path d="M391 164v12m-6-6h12" strokeLinecap="round" style={{ stroke: mix("accent-secondary", 75) }} />
      <path d="M157 204v10m-5-5h10" strokeLinecap="round" style={{ stroke: mix("accent-secondary", 65) }} />
    </g>

    <g className="nf-drift-a" transform="rotate(-11 145 222)">
      <rect x="91" y="192" width="92" height="62" rx="12" style={{ fill: "var(--color-surface)", stroke: mix("accent", 60) }} />
      <path d="M108 212h31m-31 10h20m-20 10h27" strokeLinecap="round" strokeWidth="3" style={{ stroke: mix("text-secondary", 60) }} />
      <circle cx="163" cy="222" r="6" style={{ fill: mix("accent", 75) }} />
    </g>
    <g className="nf-drift-b" transform="rotate(10 415 212)">
      <rect x="384" y="187" width="78" height="51" rx="11" style={{ fill: "var(--color-surface)", stroke: mix("accent", 50) }} />
      <path d="M402 205h41m-41 11h25" strokeLinecap="round" strokeWidth="3" style={{ stroke: mix("text-secondary", 50) }} />
    </g>

    <ellipse cx="280" cy="414" rx="142" ry="18" style={{ fill: mix("text-primary", 10) }} />
    <path d="M142 407c18-25 45-39 76-39h124c31 0 58 14 76 39" fill="url(#planet)" strokeWidth="2" style={{ stroke: mix("accent", 40) }} />
    <path d="M184 400c23-11 47-16 75-16 24 0 48 4 69 13" strokeLinecap="round" strokeWidth="3" style={{ stroke: mix("accent-secondary", 35) }} />

    <g className="nf-float">
      <path d="M279 134V108" strokeLinecap="round" strokeWidth="5" style={{ stroke: "var(--color-accent-secondary)" }} />
      <circle cx="279" cy="99" r="13" filter="url(#soft-glow)" style={{ fill: mix("accent", 35) }} />
      <circle cx="279" cy="99" r="6" style={{ fill: "var(--color-accent)" }} />
      <path d="M228 150c0-17 14-31 31-31h40c17 0 31 14 31 31v29H228v-29Z" fill="url(#robot-shell)" strokeWidth="2" style={{ stroke: "var(--color-accent-secondary)" }} />
      <rect x="213" y="164" width="133" height="105" rx="34" fill="url(#robot-face)" strokeWidth="2.5" style={{ stroke: "var(--color-accent)" }} />
      <rect x="226" y="177" width="107" height="78" rx="25" style={{ stroke: mix("accent", 28) }} />
      <circle cx="250" cy="211" r="7" style={{ fill: "var(--color-text-primary)" }} />
      <circle cx="309" cy="211" r="7" style={{ fill: "var(--color-text-primary)" }} />
      <circle cx="250" cy="211" r="14" filter="url(#soft-glow)" style={{ fill: mix("accent", 35) }} />
      <circle cx="309" cy="211" r="14" filter="url(#soft-glow)" style={{ fill: mix("accent", 35) }} />
      <path d="M266 231c8 8 20 8 28 0" strokeLinecap="round" strokeWidth="3" style={{ stroke: "var(--color-accent-secondary)" }} />
      <path d="M220 190h-12m138 0h-12" strokeLinecap="round" strokeWidth="4" style={{ stroke: "var(--color-text-secondary)" }} />

      <path d="M231 274c0-9 7-16 16-16h66c9 0 16 7 16 16v56h-98v-56Z" fill="url(#robot-shell)" strokeWidth="2" style={{ stroke: "var(--color-accent)" }} />
      <rect x="263" y="278" width="34" height="24" rx="8" style={{ fill: "var(--color-bg)", stroke: mix("accent", 70) }} />
      <circle cx="280" cy="290" r="4" style={{ fill: "var(--color-accent-secondary)" }} />
      <path d="M231 281 207 299v24l24-10m98-32 24 18v24l-24-10" strokeLinejoin="round" strokeWidth="2" style={{ fill: "var(--color-surface-elevated)", stroke: "var(--color-accent)" }} />
      <path d="M251 330v19m58-19v19" strokeLinecap="round" strokeWidth="13" style={{ stroke: "var(--color-accent)" }} />
      <path d="M239 351h24m39 0h24" strokeLinecap="round" strokeWidth="8" style={{ stroke: "var(--color-accent-secondary)" }} />
    </g>

    <g transform="translate(365 315)">
      <path d="M0 0h44v33H0z" style={{ fill: "var(--color-surface)", stroke: mix("accent", 55) }} />
      <path d="M11 11h8m6 0h8M11 21h8m6 0h8" strokeLinecap="round" strokeWidth="3" style={{ stroke: mix("text-secondary", 80) }} />
    </g>
  </svg>
);

const NotFoundPage = () => (
  <main
    className="relative flex min-h-screen items-center justify-center overflow-hidden"
    style={{
      backgroundColor: "var(--color-bg)",
      color: "var(--color-text-primary)",
      paddingBlock: "clamp(40px,6vw,56px)",
      paddingInline: 0,
      transition:
        "background-color var(--duration-theme) var(--ease-standard), color var(--duration-theme) var(--ease-standard)",
    }}
  >
    <style>{`
      @keyframes nf-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes nf-drift {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(6px); }
      }
      .nf-float { animation: nf-float 5s ease-in-out infinite; }
      .nf-drift-a { animation: nf-drift 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      .nf-drift-b { animation: nf-drift 7s ease-in-out infinite reverse; transform-box: fill-box; transform-origin: center; }
      @media (prefers-reduced-motion: reduce) {
        .nf-float, .nf-drift-a, .nf-drift-b { animation: none; }
      }
    `}</style>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${mix("accent", 7)} 1px, transparent 1px), linear-gradient(90deg, ${mix("accent", 7)} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full blur-[90px] sm:h-80 sm:w-80 sm:blur-[100px]"
      style={{ background: mix("accent", 18) }}
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full blur-[90px] sm:h-72 sm:w-72"
      style={{ background: mix("accent-secondary", 14) }}
    />

    <div
      className="container relative grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16"
      style={{
        width: "100%",
        maxWidth: 1280,
        marginInline: "auto",
        paddingInline: "clamp(20px,5vw,48px)",
      }}
    >
      <div className="order-1 mx-auto w-full max-w-[280px] sm:max-w-[400px] lg:order-2 lg:max-w-[540px]">
        <NotFoundIllustration />
      </div>

      <section className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
        <p
          className="meta flex flex-wrap items-center justify-center gap-x-2 lg:justify-start"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--color-accent)",
            maxWidth: "none",
          }}
        >
          <span>Error 404</span>
          <span style={{ color: "var(--color-text-muted)" }}>/</span>
          <span>Lost in space</span>
        </p>

        <h1
          className="mt-4 text-[2.5rem] uppercase sm:mt-5 sm:text-6xl lg:text-7xl"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "var(--weight-semibold)",
            letterSpacing: "var(--tracking-display)",
            lineHeight: 1,
          }}
        >
          This page
          <br />
          <span style={{ color: "var(--color-accent)" }}>wandered off.</span>
        </h1>

        <p
          className="mt-5 max-w-md text-[15px] leading-7 sm:mt-6 sm:max-w-lg sm:text-lg sm:leading-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Looks like this link took a wrong turn. The page you’re looking for
          doesn’t exist or may have moved.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            to="/"
            className="btn btn--primary w-full hover:-translate-y-0.5 sm:w-auto"
            style={{
              minHeight: "3rem",
              paddingInline: "var(--space-7)",
              borderRadius: "var(--border-radius-full)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to home
          </Link>
          <a
            href="mailto:priyanshukumar0419@gmail.com"
            className="btn btn--ghost"
            style={{
              minHeight: "3rem",
              borderRadius: "var(--border-radius-full)",
            }}
          >
            Report a broken link
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>

        <p
          className="meta mt-10 sm:mt-12"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--color-text-muted)",
            maxWidth: "none",
          }}
        >
          Priyanshu Kumar <span className="mx-2">·</span> Portfolio
        </p>
      </section>
    </div>
  </main>
);

export default NotFoundPage;