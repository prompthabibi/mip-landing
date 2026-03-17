"use client";

import { useState, useEffect, useRef } from "react";

// ─── CONFIG (one-variable rebrand) ───────────────────────────
const BRAND = {
  name: "MIP",
  full: "Music Intelligence Platform",
  tagline: "Your DJ software cleans metadata. MIP understands it.",
  subtitle: "The intelligence layer for open-format, wedding, and multicultural event DJs.",
  cta: "Join the Beta",
  accent: "#E06B8E",
  accentDark: "#C9527A",
  accentLight: "#F2B5C8",
  accentGlow: "rgba(224, 107, 142, 0.12)",
  accentGlow2: "rgba(224, 107, 142, 0.25)",
  handle: "@djofresh",
};

// ─── FORM OPTIONS ────────────────────────────────────────────
const DJ_SOFTWARE = ["Serato", "VirtualDJ", "Rekordbox", "Traktor", "Other"];
const EVENT_TYPES = ["Weddings", "Corporate", "Club", "Private Events", "Festivals", "Multicultural"];
const LIBRARY_SIZES = ["Under 5K tracks", "5K – 15K", "15K – 30K", "30K – 50K", "50K+"];
const GENRES = [
  "Hip-Hop & R&B", "House", "Pop", "Dance / EDM", "Latin",
  "Bollywood", "Punjabi", "Desi Fusion", "Afrobeats", "Reggaeton",
  "Rock", "Country", "Dancehall", "Amapiano", "Top 40 / Open Format",
];

// ─── FEATURES ────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "🎯",
    title: "Client Playlist Matching",
    desc: "Paste a Spotify playlist → instantly see what you own, what's missing, and get vibe-matched recommendations from YOUR library.",
  },
  {
    icon: "📊",
    title: "Gig Intelligence",
    desc: "Every gig makes MIP smarter. Track what's rising, what's signature, what crowds respond to — across weddings, clubs, and corporate.",
  },
  {
    icon: "🏷️",
    title: "Ceremony-Aware Tags",
    desc: "Sangeet, Baraat, Cocktail Hour — tags that understand your workflow. Auto-generated from your playlists and crates.",
  },
  {
    icon: "💎",
    title: "Freshness Score",
    desc: "Every track scored 0-100 on gig-readiness. Know what's crowd-tested, set-ready, trending, and still fresh.",
  },
  {
    icon: "🔒",
    title: "Local-First Trust",
    desc: "Your music stays on your machine. No cloud dependency. Music.app is source of truth. MIP reads, enriches, writes back.",
  },
  {
    icon: "🧠",
    title: "Gets Smarter Every Weekend",
    desc: "Setlist segments, crowd demographics, event context — MIP learns from every gig. The future: ask MIP to build your next set.",
  },
];

const STATS = [
  { value: "50000", display: "50,000+", label: "Tracks supported" },
  { value: "560", display: "560+", label: "Playlists synced" },
  { value: "500", display: "500+", label: "Sessions analyzed" },
  { value: "30", display: "30MB", label: "App size" },
];

// ─── COMPONENTS ──────────────────────────────────────────────

function AnimatedCounter({ stat }) {
  const [text, setText] = useState("");
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const target = parseInt(stat.value);
          const duration = 1400;
          const steps = 35;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setText(stat.display);
              clearInterval(timer);
            } else {
              const val = Math.floor(current);
              if (target >= 1000) {
                setText(val.toLocaleString());
              } else {
                setText(String(val));
              }
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat]);

  return <span ref={ref}>{text || stat.display}</span>;
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "7px 16px",
        borderRadius: 20,
        border: `1.5px solid ${selected ? BRAND.accent : "rgba(255,255,255,0.10)"}`,
        background: selected ? BRAND.accentGlow : "transparent",
        color: selected ? BRAND.accentLight : "rgba(255,255,255,0.50)",
        fontSize: 13,
        fontWeight: 400,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "'League Spartan', sans-serif",
        letterSpacing: "0.005em",
      }}
    >
      {label}
    </button>
  );
}

function Input({ label, type = "text", placeholder, value, onChange, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.40)",
        letterSpacing: "0.06em", textTransform: "uppercase",
        fontFamily: "'League Spartan', sans-serif",
      }}>
        {label} {required && <span style={{ color: BRAND.accent }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
          color: "#e4e4e7",
          fontSize: 14,
          fontFamily: "'League Spartan', sans-serif",
          fontWeight: 400,
          outline: "none",
          transition: "border-color 0.2s ease, background 0.2s ease",
          width: "100%",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.style.borderColor = BRAND.accent; e.target.style.background = "rgba(224,107,142,0.03)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
      />
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────

export default function MIPBetaLanding() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    social: "",
    software: [],
    events: [],
    genres: [],
    librarySize: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const toggleChip = (field, value) => {
    setForm((p) => ({
      ...p,
      [field]: p[field].includes(value) ? p[field].filter((v) => v !== value) : [...p[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);

    // ── SUPABASE INTEGRATION ──
    // Replace with your Supabase URL + anon key:
    const SUPABASE_URL = "https://xkaoyynjymbmkiqzcyhb.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYW95eW5qeW1ibWtpcXpjeWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MTEyOTcsImV4cCI6MjA4OTI4NzI5N30.-bG7D186hmfaWxr07j866ngYFY-OgsZNTir0jVR4060";
    await fetch(`${SUPABASE_URL}/rest/v1/beta_signups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        city: form.city,
        social_handle: form.social,
        dj_software: form.software,
        event_types: form.events,
        genres: form.genres,
        library_size: form.librarySize,
        signed_up_at: new Date().toISOString(),
      }),
    });

    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#09090b", color: "#e4e4e7",
      fontFamily: "'League Spartan', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@200;300;400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes heroGlow {
          0%, 100% { opacity: 0.35; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.55; transform: scale(1.08) rotate(1deg); }
        }
        
        @keyframes heroGlow2 {
          0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.35; transform: scale(1.04) rotate(-1deg); }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(224, 107, 142, 0.35); }
          50% { box-shadow: 0 0 0 10px rgba(224, 107, 142, 0); }
        }
        
        @keyframes subtleDrift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        .hero-section { animation: fadeUp 0.7s ease both; }
        .feature-card { animation: fadeUp 0.5s ease both; }
        .feature-card:nth-child(1) { animation-delay: 0.05s; }
        .feature-card:nth-child(2) { animation-delay: 0.1s; }
        .feature-card:nth-child(3) { animation-delay: 0.15s; }
        .feature-card:nth-child(4) { animation-delay: 0.2s; }
        .feature-card:nth-child(5) { animation-delay: 0.25s; }
        .feature-card:nth-child(6) { animation-delay: 0.3s; }
        
        .stat-item { animation: slideIn 0.5s ease both; }
        .stat-item:nth-child(1) { animation-delay: 0.15s; }
        .stat-item:nth-child(2) { animation-delay: 0.25s; }
        .stat-item:nth-child(3) { animation-delay: 0.35s; }
        .stat-item:nth-child(4) { animation-delay: 0.45s; }
        
        .cta-btn { transition: all 0.25s ease; }
        .cta-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 40px rgba(224, 107, 142, 0.25) !important; }
        .feature-card { transition: all 0.3s ease; }
        .feature-card:hover { border-color: rgba(224, 107, 142, 0.2) !important; background: rgba(224, 107, 142, 0.03) !important; transform: translateY(-3px); }
        
        .nav-handle { transition: color 0.2s ease; }
        .nav-handle:hover { color: rgba(255,255,255,0.6) !important; }
        
        ::selection { background: rgba(224, 107, 142, 0.3); }
        
        input::placeholder { color: rgba(255,255,255,0.2); }
        
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 20px !important; }
          .hero-title { font-size: 36px !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .hero-pad { padding: 72px 20px 48px !important; }
        }
      `}</style>

      {/* ─── HERO GLOW (dual orbs) ─── */}
      <div style={{
        position: "fixed", top: "-35%", left: "45%", transform: "translateX(-50%)",
        width: "700px", height: "700px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(224,107,142,0.12) 0%, transparent 65%)`,
        animation: "heroGlow 10s ease-in-out infinite", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", top: "-20%", left: "60%", transform: "translateX(-50%)",
        width: "500px", height: "500px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(201,82,122,0.08) 0%, transparent 60%)`,
        animation: "heroGlow2 12s ease-in-out infinite", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ─── NAV ─── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50, padding: "14px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px) saturate(1.2)", background: "rgba(9,9,11,0.82)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 6,
            background: `linear-gradient(135deg, ${BRAND.accent}, ${BRAND.accentDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em",
            fontFamily: "'League Spartan', sans-serif",
          }}>M</div>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em", color: "#f4f4f5" }}>{BRAND.name}</span>
          <span style={{
            fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: "-0.01em", fontWeight: 300,
          }}>by</span>
          <a
            href="https://instagram.com/djofresh"
            target="_blank"
            rel="noopener"
            className="nav-handle"
            style={{
              fontSize: 12, color: "rgba(255,255,255,0.40)", textDecoration: "none",
              fontWeight: 400, letterSpacing: "-0.01em",
            }}
          >{BRAND.handle}</a>
          <span style={{
            fontSize: 9, color: BRAND.accent, marginLeft: 4,
            letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase",
            padding: "2px 6px", borderRadius: 4,
            background: BRAND.accentGlow, border: `1px solid rgba(224,107,142,0.15)`,
          }}>BETA</span>
        </div>
        <button
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="cta-btn"
          style={{
            padding: "8px 20px", borderRadius: 8, border: "none",
            background: BRAND.accent, color: "#fff", fontSize: 13,
            fontWeight: 500, cursor: "pointer", fontFamily: "'League Spartan', sans-serif",
            letterSpacing: "-0.01em",
          }}
        >{BRAND.cta}</button>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero-section hero-pad" style={{
        position: "relative", zIndex: 1,
        maxWidth: 860, margin: "0 auto", padding: "96px 24px 56px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block", padding: "5px 14px", borderRadius: 20,
          background: BRAND.accentGlow, border: `1px solid rgba(224,107,142,0.18)`,
          fontSize: 12, fontWeight: 400, color: BRAND.accentLight,
          marginBottom: 28, letterSpacing: "0.01em",
        }}>
          Now accepting beta applications
        </div>

        <h1 className="hero-title" style={{
          fontSize: 54, fontWeight: 300, lineHeight: 1.1,
          letterSpacing: "-0.04em", marginBottom: 20,
          color: "rgba(255,255,255,0.92)",
        }}>
          Your DJ software cleans metadata.
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${BRAND.accentLight} 0%, ${BRAND.accent} 50%, ${BRAND.accentDark} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontWeight: 600,
          }}>{BRAND.name} understands it.</span>
        </h1>

        <p style={{
          fontSize: 17, color: "rgba(255,255,255,0.42)", lineHeight: 1.65,
          maxWidth: 560, margin: "0 auto 44px", fontWeight: 300,
          letterSpacing: "-0.01em",
        }}>
          {BRAND.subtitle}
          <br />Client playlists → library matching → gig intelligence → smarter set prep.
        </p>

        {/* ─── STATS ─── */}
        <div className="stats-row" style={{
          display: "flex", justifyContent: "center", gap: 52,
          padding: "28px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-item" style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 30, fontWeight: 300,
                color: "#f4f4f5", letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
              }}>
                <AnimatedCounter stat={s} />
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 4,
                fontWeight: 400, letterSpacing: "0.02em",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{
        maxWidth: 960, margin: "0 auto", padding: "52px 24px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{
            fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em",
            marginBottom: 8, color: "rgba(255,255,255,0.88)",
          }}>
            Built for working DJs
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.32)", fontWeight: 300 }}>
            Not another Rekordbox clone. The intelligence layer above your performance tools.
          </p>
        </div>

        <div className="features-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12,
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{
              padding: "22px 20px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.015)",
              cursor: "default",
            }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
              <h3 style={{
                fontSize: 15, fontWeight: 500, marginBottom: 6,
                letterSpacing: "-0.02em", color: "rgba(255,255,255,0.85)",
              }}>{f.title}</h3>
              <p style={{
                fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.6, fontWeight: 300,
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div style={{
        maxWidth: 120, margin: "20px auto 20px", height: 1,
        background: `linear-gradient(90deg, transparent, ${BRAND.accent}40, transparent)`,
      }} />

      {/* ─── SIGNUP FORM ─── */}
      <section ref={formRef} style={{
        maxWidth: 600, margin: "0 auto", padding: "48px 24px 100px",
        position: "relative", zIndex: 1,
      }}>
        {submitted ? (
          <div style={{
            textAlign: "center", padding: "56px 24px",
            animation: "fadeUp 0.5s ease both",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, margin: "0 auto 20px",
              background: BRAND.accentGlow, border: `1px solid rgba(224,107,142,0.2)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, animation: "subtleDrift 3s ease-in-out infinite",
            }}>🎧</div>
            <h2 style={{
              fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em",
              marginBottom: 10, color: "rgba(255,255,255,0.9)",
            }}>
              You're on the list.
            </h2>
            <p style={{
              fontSize: 15, color: "rgba(255,255,255,0.42)", lineHeight: 1.65, fontWeight: 300,
            }}>
              We'll reach out when your beta invite is ready.
              <br />Welcome to the future of DJ prep.
            </p>
            <div style={{
              marginTop: 28, padding: "14px 20px", borderRadius: 10,
              background: BRAND.accentGlow, border: `1px solid rgba(224,107,142,0.12)`,
              fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 300,
            }}>
              Follow <a href="https://instagram.com/djofresh" target="_blank" rel="noopener" style={{ color: BRAND.accentLight, textDecoration: "none", fontWeight: 500 }}>@djofresh</a> for build updates
            </div>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2 style={{
                fontSize: 26, fontWeight: 300, letterSpacing: "-0.03em",
                marginBottom: 8, color: "rgba(255,255,255,0.88)",
              }}>
                Request beta access
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", fontWeight: 300 }}>
                macOS only · Free during beta · Your library stays local
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Name + Email */}
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="Name" placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
              </div>

              {/* City + Social */}
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="City" placeholder="Where you're based" value={form.city} onChange={(e) => update("city", e.target.value)} />
                <Input label="Social Handle" placeholder="@yourhandle" value={form.social} onChange={(e) => update("social", e.target.value)} />
              </div>

              {/* DJ Software */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{
                  fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.40)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  fontFamily: "'League Spartan', sans-serif",
                }}>
                  DJ Software
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {DJ_SOFTWARE.map((s) => (
                    <Chip key={s} label={s} selected={form.software.includes(s)} onClick={() => toggleChip("software", s)} />
                  ))}
                </div>
              </div>

              {/* Event Types */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{
                  fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.40)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  fontFamily: "'League Spartan', sans-serif",
                }}>
                  What events do you play?
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {EVENT_TYPES.map((t) => (
                    <Chip key={t} label={t} selected={form.events.includes(t)} onClick={() => toggleChip("events", t)} />
                  ))}
                </div>
              </div>

              {/* Genres */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{
                  fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.40)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  fontFamily: "'League Spartan', sans-serif",
                }}>
                  Favorite Genres
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {GENRES.map((g) => (
                    <Chip key={g} label={g} selected={form.genres.includes(g)} onClick={() => toggleChip("genres", g)} />
                  ))}
                </div>
              </div>

              {/* Library Size */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{
                  fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.40)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  fontFamily: "'League Spartan', sans-serif",
                }}>
                  Library size
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {LIBRARY_SIZES.map((s) => (
                    <Chip key={s} label={s} selected={form.librarySize === s} onClick={() => update("librarySize", s)} />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !form.name || !form.email}
                className="cta-btn"
                style={{
                  padding: "14px 32px", borderRadius: 10, border: "none",
                  background: (!form.name || !form.email)
                    ? "rgba(255,255,255,0.06)"
                    : `linear-gradient(135deg, ${BRAND.accent}, ${BRAND.accentDark})`,
                  color: (!form.name || !form.email) ? "rgba(255,255,255,0.2)" : "#fff",
                  fontSize: 15, fontWeight: 500,
                  cursor: (!form.name || !form.email) ? "not-allowed" : "pointer",
                  fontFamily: "'League Spartan', sans-serif", marginTop: 4, letterSpacing: "-0.01em",
                  animation: (form.name && form.email) ? "pulse 2.5s ease-in-out infinite" : "none",
                }}
              >
                {submitting ? "Submitting..." : BRAND.cta}
              </button>

              <p style={{
                fontSize: 11, color: "rgba(255,255,255,0.18)", textAlign: "center", fontWeight: 300,
              }}>
                No spam. Just a beta invite when it's ready.
              </p>
            </form>
          </>
        )}
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: "20px 28px", borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 1, flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>
          © 2026 FRSH GROUP LLC
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>
          Built by{" "}
          <a href="https://instagram.com/djofresh" target="_blank" rel="noopener" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
            DJ O Fresh
          </a>
        </div>
      </footer>
    </div>
  );
}