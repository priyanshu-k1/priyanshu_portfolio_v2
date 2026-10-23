import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
        <stop stopColor="#35205E" />
        <stop offset="1" stopColor="#151021" />
      </linearGradient>
      <linearGradient id="robot-face" x1="215" x2="340" y1="180" y2="267" gradientUnits="userSpaceOnUse">
        <stop stopColor="#21143B" />
        <stop offset="1" stopColor="#100E1B" />
      </linearGradient>
      <linearGradient id="beam" x1="280" x2="280" y1="265" y2="415" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A78BFA" stopOpacity=".27" />
        <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="planet" cx="0" cy="0" r="1" gradientTransform="matrix(100 0 0 100 280 373)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#52289B" />
        <stop offset="1" stopColor="#1D1530" />
      </radialGradient>
      <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>

    <circle cx="282" cy="230" r="176" stroke="#A78BFA" strokeDasharray="3 11" strokeOpacity=".2" />
    <circle cx="282" cy="230" r="132" stroke="#A78BFA" strokeOpacity=".08" />
    <path d="M228 258h104l90 157H138l90-157Z" fill="url(#beam)" />

    <g fill="#DDD6FE">
      <circle cx="119" cy="126" r="2" opacity=".7" />
      <circle cx="414" cy="105" r="2" opacity=".8" />
      <circle cx="442" cy="270" r="1.5" opacity=".6" />
      <circle cx="144" cy="300" r="1.5" opacity=".6" />
      <path d="M391 164v12m-6-6h12" stroke="#C4B5FD" strokeLinecap="round" strokeOpacity=".65" />
      <path d="M157 204v10m-5-5h10" stroke="#C4B5FD" strokeLinecap="round" strokeOpacity=".55" />
    </g>

    <g className="nf-drift-a" transform="rotate(-11 145 222)">
      <rect x="91" y="192" width="92" height="62" rx="12" fill="#151020" stroke="#8B5CF6" strokeOpacity=".6" />
      <path d="M108 212h31m-31 10h20m-20 10h27" stroke="#C4B5FD" strokeLinecap="round" strokeOpacity=".5" strokeWidth="3" />
      <circle cx="163" cy="222" r="6" fill="#A78BFA" fillOpacity=".7" />
    </g>
    <g className="nf-drift-b" transform="rotate(10 415 212)">
      <rect x="384" y="187" width="78" height="51" rx="11" fill="#151020" stroke="#8B5CF6" strokeOpacity=".45" />
      <path d="M402 205h41m-41 11h25" stroke="#C4B5FD" strokeLinecap="round" strokeOpacity=".42" strokeWidth="3" />
    </g>

    <ellipse cx="280" cy="414" rx="142" ry="18" fill="#09070F" />
    <path d="M142 407c18-25 45-39 76-39h124c31 0 58 14 76 39" fill="url(#planet)" stroke="#A78BFA" strokeOpacity=".35" strokeWidth="2" />
    <path d="M184 400c23-11 47-16 75-16 24 0 48 4 69 13" stroke="#C4B5FD" strokeLinecap="round" strokeOpacity=".2" strokeWidth="3" />

    <g className="nf-float">
      <path d="M279 134V108" stroke="#C4B5FD" strokeLinecap="round" strokeWidth="5" />
      <circle cx="279" cy="99" r="13" fill="#A78BFA" fillOpacity=".28" filter="url(#soft-glow)" />
      <circle cx="279" cy="99" r="6" fill="#DDD6FE" />
      <path d="M228 150c0-17 14-31 31-31h40c17 0 31 14 31 31v29H228v-29Z" fill="url(#robot-shell)" stroke="#C4B5FD" strokeWidth="2" />
      <rect x="213" y="164" width="133" height="105" rx="34" fill="url(#robot-face)" stroke="#A78BFA" strokeWidth="2.5" />
      <rect x="226" y="177" width="107" height="78" rx="25" stroke="#A78BFA" strokeOpacity=".22" />
      <circle cx="250" cy="211" r="7" fill="#EDE9FE" />
      <circle cx="309" cy="211" r="7" fill="#EDE9FE" />
      <circle cx="250" cy="211" r="14" fill="#A78BFA" fillOpacity=".25" filter="url(#soft-glow)" />
      <circle cx="309" cy="211" r="14" fill="#A78BFA" fillOpacity=".25" filter="url(#soft-glow)" />
      <path d="M266 231c8 8 20 8 28 0" stroke="#C4B5FD" strokeLinecap="round" strokeWidth="3" />
      <path d="M220 190h-12m138 0h-12" stroke="#DDD6FE" strokeLinecap="round" strokeWidth="4" />

      <path d="M231 274c0-9 7-16 16-16h66c9 0 16 7 16 16v56h-98v-56Z" fill="url(#robot-shell)" stroke="#A78BFA" strokeWidth="2" />
      <rect x="263" y="278" width="34" height="24" rx="8" fill="#100E1B" stroke="#A78BFA" strokeOpacity=".7" />
      <circle cx="280" cy="290" r="4" fill="#C4B5FD" />
      <path d="M231 281 207 299v24l24-10m98-32 24 18v24l-24-10" fill="#24173D" stroke="#A78BFA" strokeLinejoin="round" strokeWidth="2" />
      <path d="M251 330v19m58-19v19" stroke="#A78BFA" strokeLinecap="round" strokeWidth="13" />
      <path d="M239 351h24m39 0h24" stroke="#C4B5FD" strokeLinecap="round" strokeWidth="8" />
    </g>

    <g transform="translate(365 315)">
      <path d="M0 0h44v33H0z" fill="#171123" stroke="#A78BFA" strokeOpacity=".55" />
      <path d="M11 11h8m6 0h8M11 21h8m6 0h8" stroke="#C4B5FD" strokeLinecap="round" strokeOpacity=".8" strokeWidth="3" />
    </g>
  </svg>
);

const NotFoundPage = () => (
  <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090f] px-5 py-10 text-purple-100 sm:px-8 sm:py-14 lg:px-12">
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
        backgroundImage:
          "linear-gradient(rgba(140,60,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(140,60,255,0.035) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-violet-600/15 blur-[90px] sm:h-80 sm:w-80 sm:blur-[100px]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-[90px] sm:h-72 sm:w-72"
    />

    <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="order-1 mx-auto w-full max-w-[280px] sm:max-w-[400px] lg:order-2 lg:max-w-[540px]">
        <NotFoundIllustration />
      </div>

      <section className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
        <p className="flex flex-wrap items-center justify-center gap-x-2 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-300 sm:text-xs sm:tracking-[0.3em] lg:justify-start">
          <span>Error 404</span>
          <span className="text-violet-500/60">/</span>
          <span>Lost in space</span>
        </p>

        <h1 className="mt-4 text-[2.5rem] font-black uppercase leading-[1] tracking-tight text-[#f0e8ff] sm:mt-5 sm:text-6xl lg:text-7xl">
          This page
          <br />
          <span
            className="text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #c4b5fd, #f0abfc 50%, #a78bfa)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            wandered off.
          </span>
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-7 text-purple-100/70 sm:mt-6 sm:max-w-lg sm:text-lg sm:leading-8">
          Looks like this link took a wrong turn. The page you’re looking for
          doesn’t exist or may have moved.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            to="/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-violet-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition-all hover:-translate-y-0.5 hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 sm:w-auto"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to home
          </Link>
          <a
            href="mailto:priyanshukumar0419@gmail.com"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-violet-200/75 transition-colors hover:text-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            Report a broken link
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-purple-200/50 sm:mt-12 sm:tracking-[0.25em]">
          Priyanshu Kumar <span className="mx-2 text-violet-500/60">·</span> Portfolio
        </p>
      </section>
    </div>
  </main>
);

export default NotFoundPage;