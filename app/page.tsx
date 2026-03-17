'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [social, setSocial] = useState('');
  const [software, setSoftware] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [library, setLibrary] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleMulti = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email) {
      setErrorMsg('Please fill in your name and email.');
      return;
    }
    setFormState('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('beta_signups').insert({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase().trim(),
        city: city || null,
        social_handle: social || null,
        dj_software: software,
        event_types: events,
        library_size: library || null,
        signed_up_at: new Date().toISOString(),
      });

      if (error) {
        if (error.code === '23505') {
          setErrorMsg('This email is already on the beta list!');
          setFormState('idle');
        } else {
          throw error;
        }
      } else {
        setFormState('success');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setFormState('idle');
    }
  };

  const softwareOptions = ['Serato', 'VirtualDJ', 'Rekordbox', 'Traktor', 'Other'];
  const eventOptions = ['Weddings', 'Corporate', 'Club', 'Private Events', 'Festivals'];
  const libraryOptions = ['<5K', '5K–15K', '15K–30K', '30K–50K', '50K+'];

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">Cue<span>Habibi</span></div>
        <div className="nav-links">
          <a href="#problems">The Problem</a>
          <a href="#pillars">Features</a>
          <a href="#habibi">Ask Habibi</a>
          <a href="#waitlist" className="nav-cta">Join the Beta</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="dot" />
          Built by <a href="https://instagram.com/djofresh" target="_blank" rel="noopener">@djofresh</a>&nbsp;·&nbsp;Battle-tested on real gigs
        </div>
        <h1>Your DJ software plays your music.<br /><span className="highlight">Habibi understands it.</span></h1>
        <p className="hero-sub">CueHabibi is the intelligent music library platform for working DJs. Clean your metadata. Mine insights from your library and gig history. Match client playlists to what you actually own. Prep smarter — with data, not guesswork.</p>
        <p className="hero-tagline">When you prep for a gig — Cue Habibi.</p>
        <div className="hero-ctas">
          <a href="#waitlist" className="btn-primary">Join the Beta</a>
          <a href="#pillars" className="btn-secondary">See What Habibi Does</a>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="pain-section" id="problems">
        <div className="section-label">Sound familiar?</div>
        <h2 className="section-title">DJs spend more time managing music than making moments.</h2>
        <div className="pain-grid">
          {[
            { icon: '😤', title: 'Messy metadata everywhere', desc: "Duplicate genres. Inconsistent artist names. Missing BPMs and keys. Your 50K library is a mess and no tool actually fixes it properly.", solve: "Habibi cleans, merges, and enriches your metadata from 3 sources" },
            { icon: '🤷', title: 'No insights from your own library', desc: "You have 50,000 tracks and no idea what's stale, what's rising, what gaps you have, or which tracks actually work at gigs.", solve: "Habibi mines your library data and gig history for rich intelligence" },
            { icon: '📋', title: "Client sends a Spotify playlist and you're on your own", desc: "Manually cross-referencing a 50-song client playlist against your library. Checking for clean edits, intros, versions. It takes hours.", solve: "Habibi matches it in seconds with version detection and gap analysis" },
            { icon: '🧠', title: 'Your gig knowledge lives in your head', desc: "What you played at the last sangeet, which transitions killed, what cleared the floor — it's all memory. Nothing structured. Nothing searchable.", solve: "Habibi captures structured gig data and learns from every set you play" },
            { icon: '📂', title: 'Building playlists from scratch every time', desc: "Every wedding, every corporate gig — you're starting from zero. No recommendations from YOUR catalog based on what actually works.", solve: "Habibi recommends from your library based on vibe match, gig history, and tags" },
            { icon: '🌍', title: 'No tool understands multicultural events', desc: "Sangeet, Baraat, Reception, Cocktail Hour — your DJ software doesn't know these exist. You prep ceremony-specific sets with zero help.", solve: "Habibi has ceremony-aware tagging and segment intelligence built in" },
          ].map((p, i) => (
            <div className="pain-card" key={i}>
              <div className="pain-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p className="pain-desc">{p.desc}</p>
              <div className="pain-solve">→ {p.solve}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <p className="manifesto-line">
          50,000 tracks is not a library. <em>It&apos;s a dataset.</em><br />
          <span className="habibi">Habibi</span> mines it, learns from it, and turns it<br />
          into <em>intelligence you can act on.</em>
        </p>
      </section>

      {/* FOUR PILLARS */}
      <section className="pillars" id="pillars">
        <div className="section-label">Four pillars of music intelligence</div>
        <h2 className="section-title">Clean it. Mine it. Match it. Ask Habibi.</h2>
        <p className="section-desc">CueHabibi isn&apos;t one feature — it&apos;s four integrated systems that make your library, your gig history, and your client workflows dramatically smarter.</p>
        <div className="pillar-grid">
          <div className="pillar-card">
            <div className="pillar-number">01 — Clean</div>
            <h3>Metadata Intelligence</h3>
            <p className="pillar-desc">Your library is only as good as its tags. Habibi doesn&apos;t just read metadata — she cleans, merges, enriches, and organizes it at scale.</p>
            <div className="pillar-features">
              {['Genre cleanup — merge "Hip-Hop" + "Hip Hop" + "Hip-Hop/Rap" in one click', 'Artist cleanup — consolidate name variants across your entire library', '3-source enrichment — MusicBrainz + Discogs + Spotify filling missing data', 'Duplicate detection with DJ-specific normalization (Intro, Clean, Remix aware)', 'Title parser — separates remixer credits, version tags, record pool sources', 'Auto-snapshots before every batch operation — your safety net'].map((f, i) => (
                <div className="pillar-feat" key={i}><span className="bullet">●</span> {f}</div>
              ))}
            </div>
          </div>
          <div className="pillar-card">
            <div className="pillar-number">02 — Mine</div>
            <h3>Library &amp; Gig Insights</h3>
            <p className="pillar-desc">Your library and gig history are a goldmine of patterns. Habibi mines them so you can see what no other DJ tool shows you.</p>
            <div className="pillar-features">
              {['Track Intelligence — rising, signature, declining, and deep cuts from real gig data', 'Freshness Score — every track rated 0-100 on gig readiness', 'Dashboard analytics — BPM distribution, genre coverage, key gaps, play frequency', 'Playlist intelligence — staple tracks, orphans, overlap matrix, missing versions', 'Discover — forgotten gems, never-played tracks, genre roulette, deep in the crate', 'Trending from YouTube, Spotify, Billboard, Shazam — cross-referenced with your library'].map((f, i) => (
                <div className="pillar-feat" key={i}><span className="bullet">●</span> {f}</div>
              ))}
            </div>
          </div>
          <div className="pillar-card">
            <div className="pillar-number">03 — Match</div>
            <h3>Playlist Matching &amp; Building</h3>
            <p className="pillar-desc">Client playlists, trending charts, vibe analysis — Habibi matches them all to what you actually own and builds set-ready crates.</p>
            <div className="pillar-features">
              {['Spotify playlist → instant library match with fuzzy scoring (0-100)', 'Multi-version display — see Clean, Dirty, Intro, Extended, Remix variants', 'Vibe analysis — radar chart profiling + 30 smart recommendations from YOUR catalog', "Gap analysis — what's missing, with YouTube links to find and download", 'Export matched playlists directly to Music.app with one click', 'Keyboard review mode — arrow keys navigate, A/R approve/reject at speed'].map((f, i) => (
                <div className="pillar-feat" key={i}><span className="bullet">●</span> {f}</div>
              ))}
            </div>
          </div>
          <div className="pillar-card">
            <div className="pillar-number">04 — Ask</div>
            <h3>Ask Habibi — AI Intelligence</h3>
            <p className="pillar-desc">The AI layer that ties it all together. Habibi learns from your library, your gigs, your clients, and your decisions to give you answers no other tool can.</p>
            <div className="pillar-features">
              {['"Build me a cocktail hour set for 200 guests, ages 25-35"', 'Recommendations weighted by YOUR crowd-tested data and gig history', "Decision Intelligence Logger — every prep choice trains Habibi's understanding", 'Custom tags with provenance — Habibi knows WHERE every tag came from', 'Event intelligence — structured ceremony, venue, crowd data per gig', 'The more you use CueHabibi, the smarter Habibi gets. That\'s the flywheel.'].map((f, i) => (
                <div className="pillar-feat" key={i}><span className="bullet">●</span> {f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ASK HABIBI TERMINAL */}
      <section className="ask-habibi" id="habibi">
        <div className="ask-habibi-label">Ask Habibi</div>
        <h2 className="ask-habibi-title">See Habibi in action.</h2>
        <p className="ask-habibi-desc">Habibi knows your library, your gig history, and your clients. Just ask.</p>
        <div className="habibi-terminal">
          <div className="habibi-terminal-header">
            <div className="dots"><div className="dot-r" /><div className="dot-y" /><div className="dot-g" /></div>
            <span>Ask Habibi</span>
            <div style={{ width: 42 }} />
          </div>
          <div className="habibi-messages">
            <div className="habibi-msg">
              <div className="avatar avatar-user">DJ</div>
              <div className="text">Habibi, I have a sangeet this Saturday. 200 guests, ages 25-35. What should I prep?</div>
            </div>
            <div className="habibi-msg">
              <div className="avatar avatar-habibi">H</div>
              <div className="text">
                <strong>Based on your last 12 sangeet sets, this client&apos;s playlist, and your library:</strong><br /><br />
                You own 34 of their 47 requested tracks. I found 8 better versions in your library (intros and clean edits). 5 tracks are missing — I&apos;ve queued YouTube links for download.<br /><br />
                Your top sangeet openers from past gigs: &quot;Kala Chashma&quot; → &quot;London Thumakda&quot; → &quot;Gallan Goodiyaan.&quot; That sequence has a 92% crowd-tested rating across 4 events.<br /><br />
                3 tracks in your library are tagged &quot;Sangeet&quot; but you haven&apos;t played them in 6+ months. Want me to add them as deep cuts?<br /><br />
                Shall I build the prep crate?
              </div>
            </div>
          </div>
          <div className="habibi-input">
            <input type="text" placeholder="Ask Habibi anything about your library..." disabled />
            <button className="send">↑</button>
          </div>
        </div>
      </section>

      {/* SPOTIFY/HABIBI CALLOUT */}
      <section className="manifesto" style={{ padding: '100px 24px' }}>
        <p className="manifesto-line" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}>
          Spotify knows what people <em>listen to.</em><br />
          <span className="habibi">Habibi</span> knows what makes people <em>dance.</em>
        </p>
      </section>

      {/* THE LOOP */}
      <section className="loop">
        <h2 className="loop-title">The intelligence loop.</h2>
        <div className="loop-steps">
          {[
            { num: '01', title: 'Habibi reads your library', desc: '50K+ tracks analyzed. Metadata cleaned. BPM, key, genre, versions, gaps — all mined from day one.' },
            { num: '02', title: 'Client sends playlist', desc: 'Spotify link drops in. Habibi matches it in seconds with version detection and gap analysis.' },
            { num: '03', title: 'You play the gig', desc: 'Habibi captures what you played, for whom, in what order, and in which ceremony segment.' },
            { num: '04', title: 'Habibi learns', desc: 'Every gig feeds the intelligence. Your library data gets richer. Your prep gets faster.' },
          ].map((s, i) => (
            <div className="loop-step" key={i}>
              <div className="number">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        {[
          { num: '50K+', label: 'Tracks managed' },
          { num: '560+', label: 'Playlists synced' },
          { num: '500+', label: 'Gig sessions imported' },
          { num: '30MB', label: 'Desktop app — no bloat' },
        ].map((s, i) => (
          <div key={i}><div className="stat-number">{s.num}</div><div className="stat-label">{s.label}</div></div>
        ))}
      </section>

      {/* POSITIONING */}
      <section className="positioning">
        <div className="pos-grid">
          <div className="pos-col">
            <h3>CueHabibi is not</h3>
            {['DJ performance software', 'A Serato or Rekordbox replacement', 'A streaming service', 'An "AI for DJs" gimmick', 'Cloud-dependent'].map((p, i) => (
              <div className="pos-item" key={i}><span className="x">✕</span> {p}</div>
            ))}
          </div>
          <div className="pos-col">
            <h3 className="is-h">CueHabibi is</h3>
            {['An intelligent music library management platform', 'A data engine that mines intelligence from your collection', 'A metadata cleaner that actually fixes your library', 'A playlist matcher that builds set-ready crates from any source', 'An AI prep brain that learns from every gig you play', 'Local-first — your music, your data, your machine', 'Built by a working DJ, for working DJs'].map((p, i) => (
              <div className="pos-item" key={i}><span className="check">✓</span> {p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* BETA FORM */}
      <section className="final-cta" id="waitlist">
        <h2>Ready to Cue Habibi?</h2>
        <p>Join the beta. Be one of the first 100 DJs to experience intelligent set prep.</p>

        {formState === 'success' ? (
          <div className="form-success">
            <div className="checkmark">✓</div>
            <h3>You&apos;re in, {firstName}.</h3>
            <p>Welcome to the CueHabibi beta. We&apos;ll be in touch with early access soon.<br />Habibi&apos;s already warming up.</p>
            <a href="https://instagram.com/djofresh" target="_blank" rel="noopener" className="follow-btn">Follow @djofresh for updates</a>
          </div>
        ) : (
          <div className="waitlist-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" placeholder="Omar" value={firstName} onChange={e => setFirstName(e.target.value)} style={{ borderColor: errorMsg && !firstName ? '#ef4444' : '' }} />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" placeholder="Fresh" value={lastName} onChange={e => setLastName(e.target.value)} style={{ borderColor: errorMsg && !lastName ? '#ef4444' : '' }} />
              </div>
            </div>
            <div className="form-group full">
              <label>Email *</label>
              <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ borderColor: errorMsg && !email ? '#ef4444' : '' }} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="New York" value={city} onChange={e => setCity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Social Handle</label>
                <input type="text" placeholder="@djofresh" value={social} onChange={e => setSocial(e.target.value)} />
              </div>
            </div>
            <div className="form-group full">
              <label>DJ Software</label>
              <div className="pill-group">
                {softwareOptions.map(s => (
                  <button key={s} className={`pill ${software.includes(s) ? 'active' : ''}`} onClick={() => toggleMulti(software, setSoftware, s)}>{s}</button>
                ))}
              </div>
            </div>
            <div className="form-group full">
              <label>What Events Do You Play?</label>
              <div className="pill-group">
                {eventOptions.map(e => (
                  <button key={e} className={`pill ${events.includes(e) ? 'active' : ''}`} onClick={() => toggleMulti(events, setEvents, e)}>{e}</button>
                ))}
              </div>
            </div>
            <div className="form-group full">
              <label>Library Size</label>
              <div className="pill-group">
                {libraryOptions.map(l => (
                  <button key={l} className={`pill ${library === l ? 'active' : ''}`} onClick={() => setLibrary(library === l ? '' : l)}>{l}</button>
                ))}
              </div>
            </div>
            <button className="btn-primary submit-btn" onClick={handleSubmit} disabled={formState === 'submitting'}>
              {formState === 'submitting' ? 'Joining...' : 'Join the Beta'}
            </button>
            <p className="form-note">Beta access for the first 100 DJs. Founding member pricing locked in for life.</p>
            {errorMsg && <p className="form-error">{errorMsg}</p>}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer>
        <div className="left">
          <span>CueHabibi</span> — Built by <a href="https://instagram.com/djofresh" target="_blank" rel="noopener">@djofresh</a> · A FRSH GROUP LLC product
        </div>
        <div className="right">
          <a href="https://instagram.com/djofresh" target="_blank" rel="noopener">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </>
  );
}
