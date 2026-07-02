import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = {
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
  Backend: ["Node.js", "NestJS", "Spring Boot", "Express.js", "Flask", "Python", "Java", "PHP", "Laravel"],
  "AI & ML": ["LLMs", "RAG Pipelines", "Fine-Tuning", "Pinecone", "Prompt Engineering"],
  Database: ["MongoDB", "MySQL", "PostgreSQL", "Pinecone (Vector DB)"],
  Mobile: ["Flutter", "Dart"],
  Tools: ["Git", "GitHub", "Postman", "VS Code", "Maven", "Eclipse", "Agile/Scrum"],
  "QA & Testing": ["Manual Testing", "Test Case Design", "Bug Reporting", "Regression Testing", "API Testing (Postman)", "UAT", "QA Documentation"],
  Languages: ["JavaScript", "Python", "Java", "C++", "C", "Ruby"],
};

const PROJECTS = [
  {
    id: 1,
    name: "PJOW – Private Jet One Ways",
    tagline: "Live aviation marketplace",
    url: "https://privatejetoneways.com",
    tag: "Live · Aviation · MERN",
    stack: ["React.js", "Node.js", "NestJS", "MongoDB", "REST APIs", "QA Testing"],
    desc: "A production multi-role aviation marketplace connecting private jet operators with flyers for empty-leg flights. Built 4-role dashboards (Admin, Broker, Operator, Flyer) with real-time availability, transparent pricing, and complex booking workflows. Actively performed QA — designed test cases, conducted manual and regression testing, reported bugs, and validated features before production releases.",
    metrics: ["4 user roles", "Live in production", "QA tested"],
    color: "#C8A84B",
    icon: "✈️",
  },
  {
    id: 2,
    name: "Nomino AI",
    tagline: "Document automation with AI",
    url: null,
    tag: "AI · Full-Stack",
    stack: ["Node.js", "NestJS", "React.js", "Next.js", "Pinecone", "MySQL", "QA Testing"],
    desc: "Full-stack AI platform automating document processing and workflow management. Features an intelligent chatbot powered by Pinecone vector database for fast semantic search over large-scale document collections. Conducted QA including test case design, manual testing of API endpoints, regression testing, and bug reporting across features.",
    metrics: ["Pinecone vector search", "AI chatbot", "QA verified"],
    color: "#5B8AF0",
    icon: "🧠",
  },
  {
    id: 3,
    name: "Worklytics",
    tagline: "Smart work tracking & analytics",
    url: null,
    tag: "Ruby · Rails · Analytics",
    stack: ["Ruby on Rails", "PostgreSQL", "Chart.js", "Authentication", "Role Management"],
    desc: "Smart productivity and work-tracking analytics platform built with Ruby on Rails. Features multi-role authentication, real-time dashboards, advanced analytics charts, time tracking, and team performance insights.",
    metrics: ["Multi-role auth", "Analytics dashboards", "Time tracking"],
    color: "#A78BFA",
    icon: "📊",
  },
  {
    id: 4,
    name: "DRAP HRM + AI Bot",
    tagline: "Enterprise HR with intelligent automation",
    url: null,
    tag: "MERN · AI · Enterprise",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "AI"],
    desc: "Full-stack MERN enterprise HRM system managing employee profiles, attendance, leave requests, and multi-level approval workflows for 50+ employees. Includes DRAP Bot — an AI assistant automating HR queries and workflows, reducing manual effort by 60%.",
    metrics: ["50+ employees", "60% effort reduced", "AI-powered bot"],
    color: "#34D399",
    icon: "🏢",
  },
  {
    id: 5,
    name: "Onward Ticket",
    tagline: "AI-enhanced flight reservations",
    url: "https://www.onwardticket.us/",
    tag: "AI · Travel · RAG",
    stack: ["React.js", "Node.js", "RAG", "LLM Fine-Tuning", "AI"],
    desc: "Flight reservation platform for travelers needing verifiable PNR codes for visa applications. Enhanced with RAG pipelines and fine-tuned language models for intelligent customer query handling and improved response accuracy.",
    metrics: ["RAG pipelines", "LLM fine-tuning", "Visa-ready PNRs"],
    color: "#FB923C",
    icon: "🎫",
  },
  {
    id: 6,
    name: "TheCloudOps Website",
    tagline: "Corporate web presence",
    url: null,
    tag: "Live · Next.js · SEO",
    stack: ["React.js", "Next.js", "Tailwind CSS"],
    desc: "Designed and developed the official TheCloudOps company website — a live SEO-optimized production site showcasing AI and automation services to enterprise clients worldwide.",
    metrics: ["Live production", "SEO optimized", "Enterprise clients"],
    color: "#F472B6",
    icon: "🌐",
  },
  {
    id: 7,
    name: "Visa to Cambodia",
    tagline: "Cambodia eVisa application platform",
    url: "https://visatocambodia.com/",
    tag: "Live · Travel-Tech",
    stack: ["Next.js", "React.js", "Node.js", "REST APIs", "Payment Integration"],
    desc: "Built key flows for a production travel-tech platform that lets travelers apply for a Cambodia eVisa entirely online — implementing passport and photo uploads, secure payment checkout, and real-time application status tracking, with guided support for the mandatory e-Arrival step.",
    metrics: ["Live in production", "Real-time tracking", "Document upload"],
    color: "#2DD4BF",
    icon: "🌏",
  },
  {
    id: 8,
    name: "Azerbaijan Visa",
    tagline: "Azerbaijan eVisa application platform",
    url: "https://azerbaijanvisa.cc/",
    tag: "Live · Travel-Tech",
    stack: ["Next.js", "React.js", "Node.js", "Stripe", "REST APIs"],
    desc: "Built core features of a production eVisa platform for Azerbaijan serving travelers from 90+ countries — implementing tiered processing-speed plans, multi-traveler group applications, and secure Stripe-powered checkout.",
    metrics: ["90+ countries supported", "Live in production", "Group applications"],
    color: "#EF4444",
    icon: "🛂",
  },
  {
    id: 9,
    name: "ZERUVMED",
    tagline: "Premium medical scrubs e-commerce",
    url: "https://zeruvmed.com/",
    tag: "Live · E-Commerce · Next.js",
    stack: ["Next.js", "React.js", "Node.js", "Tailwind CSS", "REST APIs", "Payment Integration"],
    desc: "Built the storefront for a production e-commerce platform selling premium medical scrubs and lab coats to 15,000+ clinicians — implementing the product catalog, collections, cart, wishlist, and account management, plus custom name-embroidery ordering, multi-currency checkout, and order tracking.",
    metrics: ["Live in production", "15,000+ clinicians", "Cart & checkout"],
    color: "#8B5CF6",
    icon: "🥼",
  },
];

const NAV = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

// ── Contact form delivery ──────────────────────────────────────────────
// 1. Create a free form at https://formspree.io (connects to your inbox)
// 2. Set VITE_FORMSPREE_ENDPOINT in a .env file, OR paste the endpoint below.
//    It looks like https://formspree.io/f/abcdwxyz
// Until a real endpoint is set, the form falls back to opening the user's email client.
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/your_form_id";
const CONTACT_EMAIL = "fatymanoor20@gmail.com";

// True only once a real Formspree endpoint has been configured.
const FORMSPREE_READY =
  FORMSPREE_ENDPOINT.startsWith("https://formspree.io/f/") &&
  !FORMSPREE_ENDPOINT.includes("your_form_id");

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useTyped(words, speed = 80) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1600);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setWi(i => i + 1); }
      }
    }, del ? 40 : speed);
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed]);
  return text;
}

// ─── Components ───────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={className} style={{
      transition: `opacity 0.75s ${delay}ms, transform 0.75s ${delay}ms`,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
    }}>
      {children}
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "3px 9px", borderRadius: 99,
      background: color + "22", color, border: `1px solid ${color}44`,
    }}>
      {label}
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | fallback

  const typed = useTyped(["Software Engineer", "Full-Stack Developer", "Backend Engineer", "QA Engineer", "API Architect"]);

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id); setMobileMenu(false);
  };

  // Scroll-spy: keep the active nav item in sync with the section in view.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 80; // offset for the fixed navbar
      let current = NAV[0];
      for (const n of NAV) {
        const el = document.getElementById(n.toLowerCase());
        if (el && el.offsetTop <= y) current = n;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async e => {
    e.preventDefault();

    // If no real Formspree endpoint is configured, fall back to the email client.
    if (!FORMSPREE_READY) {
      mailtoFallback();
      setStatus("fallback");
      setTimeout(() => setStatus("idle"), 6000);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.msg,
          _subject: `Portfolio enquiry from ${form.name}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", msg: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Theme tokens
  const bg = dark ? "#070B11" : "#F8F9FA";
  const surf = dark ? "#0E1420" : "#FFFFFF";
  const surf2 = dark ? "#141B28" : "#F1F3F6";
  const bord = dark ? "#1E2A3A" : "#E2E8F0";
  const txt = dark ? "#EDF2FF" : "#0F172A";
  const muted = dark ? "#8899BB" : "#64748B";
  const accent = "#4FFFB0"; // electric mint — use for fills, borders, glows, on-dark surfaces
  // Readable accent for TEXT sitting on the page/card background. Bright mint fails
  // WCAG contrast on the light theme's near-white bg, so darken it there.
  // #0B7A55 = 4.84:1 on #F8F9FA — clears AA (4.5:1) even for the 11px section labels.
  const accentText = dark ? accent : "#0B7A55";

  const tags = ["All", ...new Set(PROJECTS.flatMap(p => p.stack.slice(0, 2)))].slice(0, 8);
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.stack.includes(filter));

  return (
    <div style={{ background: bg, color: txt, fontFamily: "'Outfit', sans-serif", minHeight: "100vh", transition: "all 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${accent}; border-radius: 99px; }
        a { text-decoration: none; color: inherit; }
        .card-hover { transition: transform 0.25s, box-shadow 0.25s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .pill-hover { transition: all 0.2s; cursor: default; }
        .pill-hover:hover { transform: translateY(-2px); }
        .nav-dot::after { content: ''; position: absolute; bottom: -3px; left: 50%; transform: translateX(-50%); width: 0; height: 2px; background: ${accent}; border-radius: 99px; transition: width 0.3s; }
        .nav-dot:hover::after, .nav-dot.active::after { width: 100%; }
        .glow { box-shadow: 0 0 0 1px ${accent}44, 0 4px 24px ${accent}22; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin-slow 20s linear infinite; }
        .fade-in-1 { animation: fadeUp 0.7s 0.1s both; }
        .fade-in-2 { animation: fadeUp 0.7s 0.25s both; }
        .fade-in-3 { animation: fadeUp 0.7s 0.4s both; }
        .fade-in-4 { animation: fadeUp 0.7s 0.55s both; }
        .fade-in-5 { animation: fadeUp 0.7s 0.7s both; }
        .cursor { animation: blink 1s step-end infinite; }
        .btn-primary { background: ${accent}; color: #050B14; border: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; font-family: 'Outfit',sans-serif; cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; }
        .btn-primary:hover { background: #6FFFBC; transform: scale(1.03); }
        .btn-ghost { background: transparent; color: ${txt}; border: 1.5px solid ${bord}; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; font-family: 'Outfit',sans-serif; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { border-color: ${accentText}; color: ${accentText}; }
        .inp { width: 100%; padding: 12px 16px; background: ${surf2}; border: 1.5px solid ${bord}; border-radius: 10px; color: ${txt}; font-family: 'Outfit',sans-serif; font-size: 14px; outline: none; transition: border 0.2s; }
        .inp:focus { border-color: ${accent}; }
        .inp::placeholder { color: ${muted}; }
        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${accentText}; margin-bottom: 10px; }
        .section-title { font-size: clamp(28px,4vw,40px); font-weight: 800; line-height: 1.1; margin-bottom: 32px; }
        .max-w { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .section { padding: 56px 0; }

        /* Hamburger is mobile-only; hidden on desktop where the full nav shows. */
        .nav-burger { display: none; }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-burger { display: inline-flex !important; align-items: center; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-terminal { display: none !important; }
          .hero-section { padding-top: 80px !important; padding-bottom: 40px !important; min-height: auto !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .timeline-wrap { padding-left: 16px !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; }
          .section { padding: 48px 0 !important; }
          .section-inner { padding: 40px 16px !important; }
          .max-w { padding: 0 16px !important; }
          .btn-primary { padding: 11px 20px !important; font-size: 13px !important; }
          .btn-ghost { padding: 10px 16px !important; font-size: 13px !important; }
          .hero-stats { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 14px !important; margin-top: 8px !important; }
          .filter-bar { flex-wrap: nowrap !important; overflow-x: auto !important; padding-bottom: 8px !important; -webkit-overflow-scrolling: touch !important; }
          .filter-bar::-webkit-scrollbar { height: 2px; }
          .contact-links { flex-direction: column !important; gap: 10px !important; }
          .section-title { margin-bottom: 24px !important; font-size: clamp(24px, 5vw, 32px) !important; }
          .section-label { margin-bottom: 6px !important; }
          h2, .section-title { letter-spacing: -0.01em !important; }
        }
        @media (max-width: 480px) {
          .hero-badge { font-size: 10px !important; padding: 4px 10px !important; }
          .btn-group { flex-direction: column !important; gap: 8px !important; }
          .btn-group a, .btn-group button { width: 100% !important; text-align: center !important; justify-content: center !important; display: flex !important; }
          .hero-stats { gap: 10px !important; }
          .section { padding: 40px 0 !important; }
          .section-inner { padding: 32px 14px !important; }
          .max-w { padding: 0 14px !important; }
          .card-hover:hover { transform: none !important; }
        }

        /* ── Keyboard focus visibility (accessibility) ── */
        a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid ${accent};
          outline-offset: 2px;
          border-radius: 6px;
        }

        /* ── Respect reduced-motion preference (accessibility) ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* ── Skip link (accessibility) ── */}
      <a href="#projects" style={{
        position: "absolute", left: -9999, top: 8, zIndex: 200, background: accent, color: "#050B14",
        padding: "10px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14,
      }}
        onFocus={e => { e.currentTarget.style.left = "16px"; }}
        onBlur={e => { e.currentTarget.style.left = "-9999px"; }}>
        Skip to projects
      </a>

      {/* ── Background grid ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: dark ? 0.04 : 0.02 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke={accent} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Floating orbs ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${accent}18, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, #5B8AF044, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "55%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, #A78BFA22, transparent 70%)" }} />
      </div>

      {/* ── NAV ── */}
      <nav aria-label="Primary" style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, background: dark ? "rgba(7,11,17,0.85)" : "rgba(248,249,250,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${bord}`, transition: "all 0.3s" }}>
        <div className="max-w" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => scrollTo("Home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 18, color: txt, letterSpacing: "-0.02em" }}>
            Noor <span style={{ color: accentText }}>Fatima</span>
          </button>
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)} className={`nav-dot ${active === n ? "active" : ""}`}
                style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 500, fontSize: 14, color: active === n ? accentText : muted, transition: "color 0.2s" }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setDark(!dark)} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Switch to light theme" : "Switch to dark theme"} style={{ background: surf2, border: `1px solid ${bord}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16, color: txt }}>
              <span aria-hidden="true">{dark ? "☀️" : "🌙"}</span>
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="nav-burger" aria-label={mobileMenu ? "Close menu" : "Open menu"} aria-expanded={mobileMenu} aria-controls="mobile-menu" style={{ background: "none", border: "none", cursor: "pointer", color: txt, fontSize: 20 }}>
              <span aria-hidden="true">{mobileMenu ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div id="mobile-menu" style={{ background: surf, borderTop: `1px solid ${bord}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Outfit',sans-serif", fontSize: 15, color: muted, padding: "4px 0" }}>{n}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="home" className="hero-section" style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <div className="max-w" style={{ width: "100%" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div className="fade-in-1 hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: dark ? `${accent}12` : `${accent}20`, border: `1px solid ${accent}44`, borderRadius: 99, padding: "6px 16px", marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, animation: "blink 1.5s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: accentText, letterSpacing: "0.1em", textTransform: "uppercase" }}>Open to opportunities · 2026</span>
              </div>

              <div className="fade-in-2">
                <h1 style={{ fontSize: "clamp(42px,6vw,72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 8 }}>
                  Noor Fatima
                </h1>
                <h2 style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 500, color: accentText, marginBottom: 20, fontFamily: "'JetBrains Mono',monospace", minHeight: 36 }}>
                  &lt; <span>{typed}</span><span className="cursor" style={{ color: accentText }}>_</span>/&gt;
                </h2>
              </div>

              <div className="fade-in-3">
                <p style={{ fontSize: 16, color: muted, maxWidth: 560, lineHeight: 1.75, marginBottom: 36 }}>
                  Software Engineer specializing in full-stack web development, scalable APIs, and AI-powered systems.
                  I build production-grade applications that ship — from live aviation marketplaces to intelligent HR automation.
                  <span style={{ color: txt }}> Currently at TheCloudOps, Lahore.</span>
                </p>
              </div>

              <div className="fade-in-4 btn-group" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
                <button className="btn-primary" onClick={() => scrollTo("Projects")} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>View Projects →</button>
                <button className="btn-ghost" onClick={() => scrollTo("Contact")}>Get in Touch</button>
                <a href="https://github.com/bsef20a020" target="_blank" rel="noreferrer">
                  <button className="btn-ghost" style={{ padding: "12px 18px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>GitHub ↗</span>
                  </button>
                </a>
              </div>

              <div className="fade-in-5 hero-stats" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { n: "9", l: "Projects Shipped" },
                  { n: "5", l: "Live Products" },
                  { n: "6+", l: "Tech Stacks" },
                  { n: "60%", l: "HR Effort Saved" },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: accentText }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code terminal decoration */}
            <div className="fade-in-3 hero-terminal" style={{ background: dark ? "#0A1220" : "#1E2A3A", border: `1px solid ${bord}`, borderRadius: 16, padding: 24, width: 320, fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              </div>
              {[
                { k: "const", n: "engineer", v: null },
                { k: null, n: "  .name", v: '"Noor Fatima"' },
                { k: null, n: "  .role", v: '"Software Engineer"' },
                { k: null, n: "  .stack", v: '["MERN","Java","AI"]' },
                { k: null, n: "  .status", v: '"hiring_ready ✓"' },
              ].map((l, i) => (
                <div key={i} style={{ marginBottom: 6, color: "#8899BB" }}>
                  {l.k && <span style={{ color: "#C792EA" }}>{l.k} </span>}
                  <span style={{ color: accent }}>{l.n}</span>
                  {l.v && <span> = <span style={{ color: "#F78C6C" }}>{l.v}</span></span>}
                  {i === 0 && <span style={{ color: "#8899BB" }}> {"{"}</span>}
                  {i === 4 && <span style={{ color: "#8899BB" }}>{"}"}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.4 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${accent}, transparent)`, animation: "fadeUp 1.5s infinite" }} />
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ background: dark ? `${accent}06` : `${accent}08`, borderTop: `1px solid ${bord}`, borderBottom: `1px solid ${bord}`, paddingTop: 0, paddingBottom: 0 }}>
          <div className="section-inner" style={{ padding: "52px 24px" }}>
            <Reveal><p className="section-label">About Me</p></Reveal>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
              <div>
                <Reveal>
                  <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 28, letterSpacing: "-0.02em" }}>
                    Building software that <span style={{ color: accentText }}>matters.</span>
                  </h2>
                  <p style={{ color: muted, lineHeight: 1.85, marginBottom: 20, fontSize: 15 }}>
                    I'm a Software Engineer and Full-Stack Developer based in <strong style={{ color: txt }}>Lahore, Pakistan</strong>, with a BS in Software Engineering from PUCIT. I specialize in designing and shipping scalable web applications, clean RESTful APIs, and AI-powered features.
                  </p>
                  <p style={{ color: muted, lineHeight: 1.85, marginBottom: 20, fontSize: 15 }}>
                    Currently at <strong style={{ color: accentText }}>TheCloudOps</strong>, I've delivered live products including a private aviation marketplace, enterprise HRM systems with AI assistants, and document automation platforms using Pinecone vector databases and RAG pipelines.
                  </p>
                  <p style={{ color: muted, lineHeight: 1.85, fontSize: 15 }}>
                    I care deeply about clean code, thoughtful system design, and building interfaces people actually want to use.
                  </p>
                </Reveal>
              </div>
              <div>
                <Reveal delay={120}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                    {[
                      { icon: "🎓", label: "Education", val: "BS Software Engineering, PUCIT" },
                      { icon: "🏢", label: "Current", val: "TheCloudOps, Lahore" },
                      { icon: "📍", label: "Location", val: "Lahore, Pakistan" },
                      { icon: "⚡", label: "Focus", val: "Full-Stack + AI Systems" },
                    ].map(s => (
                      <div key={s.label} className="card-hover" style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 12, padding: "16px 18px" }}>
                        <div aria-hidden="true" style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: txt }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: surf, border: `1px solid ${accent}44`, borderRadius: 12, padding: "20px 20px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: accentText, marginBottom: 12 }}>Connect</div>
                    {[
                      { label: "fatymanoor20@gmail.com", href: "mailto:fatymanoor20@gmail.com", icon: "✉️" },
                      { label: "linkedin.com/in/noor-fatima-a80026372", href: "https://linkedin.com/in/noor-fatima-a80026372", icon: "💼" },
                      { label: "github.com/bsef20a020", href: "https://github.com/bsef20a020", icon: "⚡" },
                    ].map(l => (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 13, color: muted, transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = accentText}
                        onMouseLeave={e => e.currentTarget.style.color = muted}>
                        <span>{l.icon}</span>{l.label}
                      </a>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SKILLS ═══════════ */}
      <section id="skills" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-w">
          <Reveal><p className="section-label">Technical Skills</p></Reveal>
          <Reveal delay={60}><h2 className="section-title">My tech arsenal.</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {Object.entries(SKILLS).map(([cat, items], ci) => (
              <Reveal key={cat} delay={ci * 60}>
                <div className="card-hover" style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 14, padding: "22px 24px", height: "100%" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accentText, marginBottom: 14 }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map(s => (
                      <span key={s} className="pill-hover" style={{ fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 99, background: surf2, color: muted, border: `1px solid ${bord}` }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${accent}18`; e.currentTarget.style.color = accentText; e.currentTarget.style.borderColor = `${accent}44`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = surf2; e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = bord; }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ background: dark ? `${accent}05` : `${accent}06`, borderTop: `1px solid ${bord}`, borderBottom: `1px solid ${bord}` }}>
          <div className="section-inner" style={{ padding: "52px 24px" }}>
            <Reveal><p className="section-label">Featured Projects</p></Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
                <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Things I've shipped.</h2>
                <div className="filter-bar" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {tags.map(t => (
                    <button key={t} onClick={() => setFilter(t)} style={{
                      padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s",
                      background: filter === t ? accent : surf, color: filter === t ? "#050B14" : muted, border: `1px solid ${filter === t ? accent : bord}`
                    }}>{t}</button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <div className="card-hover" style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 16, padding: "28px", height: "100%", display: "flex", flexDirection: "column", borderTop: `3px solid ${p.color}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span role="img" aria-label={`${p.name} icon`} style={{ fontSize: 20 }}>{p.icon}</span>
                          <Tag label={p.tag} color={p.color} />
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", marginTop: 8 }}>{p.name}</h3>
                        <p style={{ fontSize: 12, color: p.color, fontWeight: 600, marginTop: 2 }}>{p.tagline}</p>
                      </div>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer" style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}44`, borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                          Live ↗
                        </a>
                      )}
                    </div>
                    <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.75, marginBottom: 18, flex: 1 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                      {p.stack.map(s => (
                        <span key={s} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: surf2, color: muted, border: `1px solid ${bord}` }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 14, borderTop: `1px solid ${bord}` }}>
                      {p.metrics.map(m => (
                        <span key={m} style={{ fontSize: 11, fontWeight: 600, color: p.color, background: `${p.color}14`, padding: "3px 10px", borderRadius: 99 }}>✓ {m}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="experience" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-w">
          <Reveal><p className="section-label">Experience & Education</p></Reveal>
          <Reveal delay={60}><h2 className="section-title">My journey.</h2></Reveal>
          <div className="timeline-wrap" style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 2, background: `linear-gradient(${accent}, ${bord})` }} />
            {[
              {
                type: "work", icon: "💼", title: "Software Engineer", org: "TheCloudOps", loc: "Lahore, Pakistan",
                date: "December 2025 – Present", color: accent,
                points: ["Shipped full-stack web applications to production across MERN and Next.js stacks.", "Built an AI chatbot using a Pinecone vector database for semantic search over large document sets.", "Developed RESTful APIs with Node.js and NestJS powering document-processing workflows.", "Contributed engineering and QA to PJOW aviation marketplace — live at privatejetoneways.com."],
              },
              {
                type: "work", icon: "☕", title: "Java Developer Intern", org: "Soliton Technologies", loc: "Lahore, Pakistan",
                date: "October 2024 – November 2024", color: "#5B8AF0",
                points: ["Developed enterprise Java apps with Spring Boot, Hibernate ORM, and Spring Data JPA.", "Implemented RESTful APIs with robust validation; managed codebase with Git and Maven.", "Followed SOLID principles in an Agile team environment."],
              },
              {
                type: "edu", icon: "🎓", title: "BS Software Engineering", org: "PUCIT", loc: "Lahore, Pakistan",
                date: "2020 – 2024", color: "#A78BFA",
                points: ["Punjab University College of Information & Technology.", "Strong foundation in algorithms, OOP, databases, and software design patterns."],
              },
            ].map((e, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ position: "relative", marginBottom: 36, paddingLeft: 28 }}>
                  <div style={{ position: "absolute", left: -40, top: 4, width: 20, height: 20, borderRadius: "50%", background: e.color, border: `3px solid ${bg}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }} />
                  <div className="card-hover" style={{ background: surf, border: `1px solid ${bord}`, borderRadius: 14, padding: "22px 26px", borderLeft: `3px solid ${e.color}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{e.title}</div>
                        <div style={{ fontSize: 13, color: e.color === accent ? accentText : e.color, fontWeight: 600, marginTop: 2 }}>{e.org} · {e.loc}</div>
                      </div>
                      <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: muted, background: surf2, padding: "4px 12px", borderRadius: 99, border: `1px solid ${bord}` }}>{e.date}</span>
                    </div>
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {e.points.map((p, pi) => (
                        <li key={pi} style={{ fontSize: 13.5, color: muted, lineHeight: 1.7, marginBottom: 4 }}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ background: dark ? `${accent}05` : `${accent}06`, borderTop: `1px solid ${bord}` }}>
          <div className="max-w" style={{ padding: "52px 24px", maxWidth: 700 }}>
            <Reveal><p className="section-label">Contact</p></Reveal>
            <Reveal delay={60}>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Let's build something great.</h2>
              <p style={{ color: muted, fontSize: 15, marginBottom: 40, lineHeight: 1.75 }}>
                Open to associate/junior engineering roles, freelance projects, and interesting collaborations. Let's talk.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label htmlFor="cf-name" style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 8 }}>Name</label>
                    <input id="cf-name" name="name" required className="inp" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="cf-email" style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 8 }}>Email</label>
                    <input id="cf-email" name="email" required type="email" className="inp" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-msg" style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 8 }}>Message</label>
                  <textarea id="cf-msg" name="message" required rows={5} className="inp" placeholder="Tell me about your project or role..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} style={{ resize: "none" }} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ padding: "14px 36px", fontSize: 15, opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "wait" : "pointer" }}>
                    {status === "sending" ? "Sending…" : status === "success" ? "✓ Message sent" : "Send Message →"}
                  </button>

                  {status === "success" && (
                    <span role="status" style={{ fontSize: 13.5, color: accentText, fontWeight: 600 }}>
                      Thanks — I'll get back to you soon.
                    </span>
                  )}
                  {status === "error" && (
                    <span role="alert" style={{ fontSize: 13.5, color: "#FB7185", fontWeight: 600 }}>
                      Something went wrong.{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: accentText, textDecoration: "underline" }}>Email me directly ↗</a>
                    </span>
                  )}
                  {status === "fallback" && (
                    <span role="status" style={{ fontSize: 13.5, color: muted, fontWeight: 600 }}>
                      Opening your email app…{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: accentText, textDecoration: "underline" }}>or email me directly ↗</a>
                    </span>
                  )}
                </div>

                <p style={{ fontSize: 13, color: muted, marginTop: 4 }}>
                  Prefer email? Reach me directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: accentText, fontWeight: 600 }}>{CONTACT_EMAIL}</a>
                </p>
              </form>
            </Reveal>
            <Reveal delay={200}>
              <div className="contact-links" style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${bord}`, display: "flex", gap: 28, flexWrap: "wrap" }}>
                {[
                  { l: "fatymanoor20@gmail.com", h: "mailto:fatymanoor20@gmail.com" },
                  { l: "+92 308 5233717", h: "tel:+923085233717" },
                  { l: "linkedin.com/in/noor-fatima", h: "https://linkedin.com/in/noor-fatima-a80026372" },
                  { l: "github.com/bsef20a020", h: "https://github.com/bsef20a020" },
                ].map(l => (
                  <a key={l.l} href={l.h} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: muted, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = accentText}
                    onMouseLeave={e => e.currentTarget.style.color = muted}>
                    {l.l}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${bord}`, padding: "24px 0", position: "relative", zIndex: 1 }}>
        <div className="max-w footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16, color: accentText }}>Noor Fatima</span>
          <span style={{ fontSize: 13, color: muted }}>© 2026 Noor Fatima · Software Engineer · Lahore, Pakistan</span>
          <span style={{ fontSize: 12, color: muted, fontFamily: "'JetBrains Mono',monospace" }}>Built with React + Vite</span>
        </div>
      </footer>
    </div>
  );
}
