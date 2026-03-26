'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [social, setSocial] = useState('');
  const [city, setCity] = useState('');
  const [software, setSoftware] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [library, setLibrary] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleMulti = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !social) {
      setErrorMsg('Please fill in your name, email, and social handle.');
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

  const softwareOptions = ['Serato', 'VirtualDJ', 'Rekordbox', 'Other'];
  const eventOptions = ['Weddings', 'Corporate', 'Club', 'Private Events', 'Festivals'];
  const libraryOptions = ['<5K', '5K–15K', '15K–30K', '30K–50K', '50K+'];

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">Cue<span>Habibi</span></div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#sync">How It Works</a>
          <a href="#waitlist" className="nav-cta">Join the Beta</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="dot" />
          Built by <a href="https://instagram.com/djofresh" target="_blank" rel="noopener">@djofresh</a>&nbsp;·&nbsp;Battle-tested on 200+ gigs
        </div>
        <h1>
          30,000 tracks. <span className="dim">Half tagged wrong.</span><br />
          <span className="warn">And one bad tool can ruin your whole library.</span>
        </h1>
        <p className="hero-sub">
          CueHabibi cleans your metadata, matches client playlists in seconds, and learns what actually works at your gigs — <strong>nothing writes until you hit <span className="sync-word">SYNC</span>.</strong>
        </p>
        <div className="hero-ctas">
          <a href="#waitlist" className="btn-primary">Join the Beta →</a>
          <a href="#features" className="btn-secondary">See How It Works</a>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="pain-section">
        <div className="section-label">Sound familiar?</div>
        <h2 className="pain-title">You spend more time managing music than making moments.</h2>
        <div className="pain-grid">
          {[
            { title: 'Your metadata is a disaster', desc: 'Duplicate genres. "Hip-Hop" vs "Hip Hop" vs "Hip-Hop/Rap." Missing BPMs. Inconsistent artist names. 30K tracks and it\'s getting worse.' },
            { title: 'Client playlists eat hours', desc: 'They send a Spotify link. You cross-reference 50 songs by hand. Check for clean edits, intros, versions. It\'s Wednesday and the wedding is Saturday.' },
            { title: 'Your gig knowledge is in your head', desc: 'What you played at the last sangeet, which transitions killed, what cleared the floor — it\'s all memory. Nothing structured. Nothing searchable.' },
            { title: "You're afraid of breaking things", desc: 'Every batch edit tool feels like playing Russian roulette with your library. One wrong click and you\'re restoring from a backup you maybe made.' },
          ].map((p, i) => (
            <div className="pain-card" key={i}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-label">What CueHabibi Does</div>
        <h2 className="features-title">Match it. Clean it. Learn from it.</h2>

        {/* MATCH */}
        <div className="feature-block">
          <div className="feature-text">
            <div className="feature-num">01 — Match</div>
            <h3>Client playlist → matched crate in seconds</h3>
            <p>Paste a Spotify link. CueHabibi matches every track against your local library with fuzzy scoring, version detection, and gap analysis. Done before your coffee gets cold.</p>
            <div className="feature-details">
              <div className="feature-detail"><span className="bullet">●</span> Fuzzy matching with 0-100 confidence scores</div>
              <div className="feature-detail"><span className="bullet">●</span> Detects Clean, Dirty, Intro, Extended, Remix variants</div>
              <div className="feature-detail"><span className="bullet">●</span> Gap analysis shows what&apos;s missing — with links to find it</div>
              <div className="feature-detail"><span className="bullet">●</span> Export matched crate to Music.app in one click</div>
            </div>
          </div>
          <div className="feature-visual">
            <div className="match-header"><span className="spotify-dot" /> SPOTIFY → YOUR LIBRARY</div>
            <div className="match-row matched">
              <div className="match-track">
                <span className="title">Kala Chashma</span>
                <span className="artist">Amar Arshi, Badshah</span>
                <div className="match-versions">Clean · Intro · Extended</div>
              </div>
              <span className="match-score high">97</span>
            </div>
            <div className="match-row matched">
              <div className="match-track">
                <span className="title">The Motto</span>
                <span className="artist">Drake, Lil Wayne</span>
                <div className="match-versions">Clean · Dirty</div>
              </div>
              <span className="match-score high">94</span>
            </div>
            <div className="match-row matched">
              <div className="match-track">
                <span className="title">I&apos;m Good (Blue)</span>
                <span className="artist">David Guetta, Bebe Rexha</span>
              </div>
              <span className="match-score high">91</span>
            </div>
            <div className="match-row missing">
              <div className="match-track">
                <span className="title">Titi Me Preguntó</span>
                <span className="artist">Bad Bunny</span>
              </div>
              <span className="match-score low">—</span>
            </div>
          </div>
        </div>

        {/* CLEAN */}
        <div className="feature-block reverse">
          <div className="feature-text">
            <div className="feature-num">02 — Clean</div>
            <h3>Your genres are a mess. We fix them.</h3>
            <p>CueHabibi merges duplicate genres, consolidates artist name variants, and enriches missing data from three sources — MusicBrainz, Discogs, and Spotify. Across your entire library. In minutes.</p>
            <div className="feature-details">
              <div className="feature-detail"><span className="bullet">●</span> One-click genre merge: &quot;Hip-Hop&quot; + &quot;Hip Hop&quot; + &quot;Hip-Hop/Rap&quot; → done</div>
              <div className="feature-detail"><span className="bullet">●</span> Artist consolidation across your entire library</div>
              <div className="feature-detail"><span className="bullet">●</span> 3-source enrichment fills missing BPM, key, year, genre</div>
              <div className="feature-detail"><span className="bullet">●</span> DJ-aware duplicate detection (Intro ≠ Clean ≠ Extended)</div>
            </div>
          </div>
          <div className="feature-visual">
            <div className="clean-group">
              <div className="clean-before">
                <div className="clean-label">Before</div>
                <div className="clean-tags">
                  <span className="clean-tag bad">Hip-Hop</span>
                  <span className="clean-tag bad">Hip Hop</span>
                  <span className="clean-tag bad">Hip-Hop/Rap</span>
                  <span className="clean-tag bad">Hiphop</span>
                  <span className="clean-tag bad">hip hop</span>
                </div>
              </div>
              <div className="clean-arrow">↓</div>
              <div className="clean-after">
                <div className="clean-label">After</div>
                <div className="clean-tags">
                  <span className="clean-tag good">Hip-Hop</span>
                  <span className="clean-count">247 tracks merged</span>
                </div>
              </div>
            </div>
            <div className="clean-group">
              <div className="clean-before">
                <div className="clean-label">Before</div>
                <div className="clean-tags">
                  <span className="clean-tag bad">The Weeknd</span>
                  <span className="clean-tag bad">Weeknd</span>
                  <span className="clean-tag bad">The Weekend</span>
                </div>
              </div>
              <div className="clean-arrow">↓</div>
              <div className="clean-after">
                <div className="clean-label">After</div>
                <div className="clean-tags">
                  <span className="clean-tag good">The Weeknd</span>
                  <span className="clean-count">34 tracks fixed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GIG INTELLIGENCE */}
        <div className="feature-block">
          <div className="feature-text">
            <div className="feature-num">03 — Learn</div>
            <h3>Your gig history is a goldmine. Start mining it.</h3>
            <p>Import your VirtualDJ or Serato session history. CueHabibi tracks which songs are rising, which are overplayed, which are hidden gems — and scores every track on gig-readiness.</p>
            <div className="feature-details">
              <div className="feature-detail"><span className="bullet">●</span> Freshness Score: every track rated 0-100 on gig readiness</div>
              <div className="feature-detail"><span className="bullet">●</span> Track Intelligence: rising, signature, declining, deep cuts</div>
              <div className="feature-detail"><span className="bullet">●</span> Set Flow Timeline: see your BPM/energy arc per gig</div>
              <div className="feature-detail"><span className="bullet">●</span> Discover forgotten gems and never-played tracks</div>
            </div>
          </div>
          <div className="feature-visual">
            <div className="gig-header">Track Intelligence</div>
            <div className="gig-track-row" style={{ background: 'rgba(34,197,94,0.04)' }}>
              <span className="gig-badge rising">Rising</span>
              <div className="gig-info">
                <span className="title">Calm Down</span>
                <span className="meta">Rema, Selena Gomez · 8 gigs, trending ↑</span>
              </div>
              <span className="gig-score">92</span>
            </div>
            <div className="gig-track-row" style={{ background: 'rgba(139,124,246,0.06)' }}>
              <span className="gig-badge signature">Signature</span>
              <div className="gig-info">
                <span className="title">Kala Chashma</span>
                <span className="meta">Amar Arshi · 24 gigs, crowd tested</span>
              </div>
              <span className="gig-score">97</span>
            </div>
            <div className="gig-track-row" style={{ background: 'rgba(168,85,247,0.04)' }}>
              <span className="gig-badge gem">Hidden Gem</span>
              <div className="gig-info">
                <span className="title">Rang De Basanti</span>
                <span className="meta">A.R. Rahman · 1 gig, killed it</span>
              </div>
              <span className="gig-score">78</span>
            </div>
            <div className="gig-track-row">
              <span className="gig-badge stale">Stale</span>
              <div className="gig-info">
                <span className="title">Despacito</span>
                <span className="meta">Luis Fonsi · 31 gigs, overplayed</span>
              </div>
              <span className="gig-score">34</span>
            </div>
          </div>
        </div>
      </section>

      {/* SYNC SECTION */}
      <section className="sync-section" id="sync">
        <div className="sync-inner">
          <div className="sync-word">SYNC</div>
          <h2 className="sync-headline">Edit everything. Break nothing.</h2>
          <p className="sync-desc">
            Rename genres across 30,000 tracks. Fix artist tags. Clean metadata at scale.
            Every change is instant inside CueHabibi — and invisible to your files until you&apos;re ready.<br /><br />
            Auto-snapshots before every batch operation. Full preview of what changes.
            One-click rollback if anything feels wrong.
          </p>
          <div className="sync-steps">
            <div className="sync-step">
              <div className="sync-step-icon">✏️</div>
              <span className="sync-step-label">Edit freely</span>
            </div>
            <span className="sync-connector">→</span>
            <div className="sync-step">
              <div className="sync-step-icon">👁</div>
              <span className="sync-step-label">Preview changes</span>
            </div>
            <span className="sync-connector">→</span>
            <div className="sync-step">
              <div className="sync-step-icon">📸</div>
              <span className="sync-step-label">Auto-snapshot</span>
            </div>
            <span className="sync-connector">→</span>
            <div className="sync-step">
              <div className="sync-step-icon">⚡</div>
              <span className="sync-step-label">Hit SYNC</span>
            </div>
          </div>
          <div className="sync-software">
            <p>Works with your DJ software</p>
            <div className="sync-logos">
              <span className="logo-pill">Serato</span>
              <span className="logo-pill">VirtualDJ</span>
              <span className="logo-pill">Rekordbox</span>
              <span className="logo-pill">Music.app</span>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="positioning-line">
        <p>CueHabibi <strong>doesn&apos;t replace your DJ software</strong> — it makes your library better.</p>
        <p className="positioning-credit">Built by a working DJ, not a startup. · <a href="https://instagram.com/djofresh" target="_blank" rel="noopener">@djofresh</a></p>
      </section>

      {/* ASK HABIBI */}
      <section className="habibi-mention">
        <div className="habibi-mention-inner">
          <h3>Your library has answers. <span>Ask Habibi.</span></h3>
          <p>A built-in assistant that understands your tracks, your gigs, and your clients. Not a gimmick — a genuinely useful prep brain that gets smarter the more you use CueHabibi.</p>
          <div className="habibi-queries">
            <span className="habibi-query">&quot;Build me a sangeet set for 200 guests, ages 25-35&quot;</span>
            <span className="habibi-query">&quot;What tracks are rising in my library?&quot;</span>
            <span className="habibi-query">&quot;Find me cocktail hour music I haven&apos;t played in 6 months&quot;</span>
          </div>
        </div>
      </section>

      {/* BETA FORM */}
      <section className="final-cta" id="waitlist">
        <h2>Ready to Cue <span className="hl">Habibi</span>?</h2>
        <p>Join the beta. Be one of the first 25 DJs to experience set prep that actually works.</p>

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
                <label>Social Handle *</label>
                <input type="text" placeholder="@djofresh" value={social} onChange={e => setSocial(e.target.value)} style={{ borderColor: errorMsg && !social ? '#ef4444' : '' }} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="New York" value={city} onChange={e => setCity(e.target.value)} />
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
            <p className="form-note">Beta access for the first 25 DJs. Founding member pricing locked in for life.</p>
            {errorMsg && <p className="form-error">{errorMsg}</p>}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer>
        <div className="left">
          <span>CueHabibi</span> — Built by <a href="https://instagram.com/djofresh" target="_blank" rel="noopener">@djofresh</a>
        </div>
        <div className="right">
          <a href="https://instagram.com/djofresh" target="_blank" rel="noopener">Instagram</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </>
  );
}
