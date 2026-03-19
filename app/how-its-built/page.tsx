export const metadata = {
  title: "How CueHabibi is Built — Tech Stack",
  description: "A transparent look at every tool, language, and framework powering CueHabibi — explained for DJs, not just developers.",
};

export default function HowItIsBuilt() {
  return (
    <>
      <style>{`
        .hib-wrap{--bg:#050506;--bg2:#0c0c0e;--card:#13131a;--border:rgba(255,255,255,.06);--border-h:rgba(255,255,255,.1);--text:#e4e4e7;--text2:rgba(255,255,255,.55);--text3:rgba(255,255,255,.3);--accent:#8B7CF6;--accent2:#6B5DD3;--accent-bg:rgba(139,124,246,.08);--teal:#0D9373;--amber:#E5900B;--rose:#E06B8E;--blue:#3B9BF5;background:var(--bg);color:var(--text);font-family:'DM Sans',system-ui,-apple-system,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased;min-height:100vh}
        .hib-wrap *{margin:0;padding:0;box-sizing:border-box}
        .hib-wrap a{color:var(--accent);text-decoration:none;transition:opacity .2s}
        .hib-wrap a:hover{opacity:.8}
        .hib-container{max-width:1080px;margin:0 auto;padding:0 24px}

        .hib-nav{position:sticky;top:0;z-index:50;background:rgba(5,5,6,.85);backdrop-filter:blur(20px);border-bottom:0.5px solid var(--border)}
        .hib-nav .inner{max-width:1080px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between}
        .hib-nav .logo{font-size:15px;font-weight:500;color:var(--accent);letter-spacing:-.02em}
        .hib-nav .back{font-size:13px;color:var(--text2);display:flex;align-items:center;gap:6px}
        .hib-nav .back svg{width:16px;height:16px;opacity:.5}

        .hib-hero{padding:80px 0 60px;text-align:center}
        .hib-hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:100px;background:var(--accent-bg);border:.5px solid rgba(139,124,246,.15);font-size:12px;color:var(--accent);font-weight:500;margin-bottom:24px}
        .hib-hero h1{font-size:clamp(28px,4vw,42px);font-weight:500;letter-spacing:-.03em;line-height:1.15;margin-bottom:16px}
        .hib-hero h1 span{background:linear-gradient(135deg,var(--accent),#b8a9fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .hib-hero p{font-size:15px;color:var(--text2);max-width:560px;margin:0 auto;line-height:1.7}

        .hib-section{padding:48px 0}
        .hib-section-label{font-size:11px;font-weight:500;color:var(--accent);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
        .hib-section-title{font-size:22px;font-weight:500;letter-spacing:-.02em;margin-bottom:8px;color:var(--text)}
        .hib-section-desc{font-size:14px;color:var(--text2);max-width:520px;margin-bottom:32px;line-height:1.7}

        .hib-card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
        .hib-card-grid.cols-2{grid-template-columns:repeat(auto-fill,minmax(400px,1fr))}
        .hib-card{background:var(--card);border:.5px solid var(--border);border-radius:12px;padding:24px;transition:border-color .2s,transform .15s}
        .hib-card:hover{border-color:var(--border-h);transform:translateY(-1px)}

        .hib-card-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-size:18px;font-weight:500}
        .hib-card-icon.rust{background:rgba(222,111,46,.12);color:#DE6F2E}
        .hib-card-icon.ts{background:rgba(49,120,198,.12);color:#3178C6}
        .hib-card-icon.swift{background:rgba(240,81,56,.12);color:#F05138}
        .hib-card-icon.apple{background:rgba(255,255,255,.06);color:var(--text2)}
        .hib-card-icon.css{background:rgba(38,77,228,.12);color:#264DE4}
        .hib-card-icon.html{background:rgba(227,79,38,.12);color:#E34F26}
        .hib-card-icon.tauri{background:rgba(36,200,235,.1);color:#24C8EB}
        .hib-card-icon.react{background:rgba(97,218,251,.1);color:#61DAFB}
        .hib-card-icon.next{background:rgba(255,255,255,.06);color:var(--text)}
        .hib-card-icon.aggrid{background:rgba(0,128,255,.1);color:#0080FF}
        .hib-card-icon.tailwind{background:rgba(56,189,248,.1);color:#38BDF8}
        .hib-card-icon.json{background:rgba(255,255,255,.06);color:var(--text2)}
        .hib-card-icon.api{background:rgba(139,124,246,.1);color:var(--accent)}
        .hib-card-icon.ipc{background:rgba(13,147,115,.1);color:var(--teal)}
        .hib-card-icon.oauth{background:rgba(224,107,142,.1);color:var(--rose)}
        .hib-card-icon.cache{background:rgba(229,144,11,.1);color:var(--amber)}
        .hib-card-icon.memo{background:rgba(59,155,245,.1);color:var(--blue)}
        .hib-card-icon.atomic{background:rgba(34,197,94,.1);color:#22c55e}
        .hib-card-icon.debounce{background:rgba(139,124,246,.1);color:var(--accent)}
        .hib-card-icon.rate{background:rgba(229,144,11,.1);color:var(--amber)}

        .hib-card h3{font-size:14px;font-weight:500;margin-bottom:6px;letter-spacing:-.01em;color:var(--text)}
        .hib-card p{font-size:13px;color:var(--text2);line-height:1.65}
        .hib-card .tag{display:inline-block;margin-top:10px;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:500;background:rgba(255,255,255,.04);color:var(--text3);letter-spacing:.02em}

        .hib-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border-radius:12px;overflow:hidden;margin:48px 0}
        .hib-stat{background:var(--bg2);padding:24px;text-align:center}
        .hib-stat-val{font-size:28px;font-weight:500;letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:var(--text)}
        .hib-stat-val.accent{color:var(--accent)}
        .hib-stat-label{font-size:12px;color:var(--text3);margin-top:4px}

        .hib-divider{height:.5px;background:var(--border);margin:16px 0}

        .hib-footer{padding:48px 0;text-align:center;border-top:.5px solid var(--border)}
        .hib-footer p{font-size:13px;color:var(--text3)}

        .hib-ext-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px}
        .hib-ext{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;background:var(--bg2);border:.5px solid var(--border)}
        .hib-ext code{font-family:'SF Mono',ui-monospace,monospace;font-size:12px;color:var(--accent);min-width:48px}
        .hib-ext span{font-size:12px;color:var(--text2)}

        @media(max-width:680px){
          .hib-card-grid,.hib-card-grid.cols-2{grid-template-columns:1fr}
          .hib-stats{grid-template-columns:repeat(2,1fr)}
          .hib-hero{padding:48px 0 36px}
          .hib-ext-grid{grid-template-columns:1fr 1fr}
        }
      `}</style>

      <div className="hib-wrap">
        {/* Nav */}
        <nav className="hib-nav">
          <div className="inner">
            <a href="/" className="logo">CueHabibi</a>
            <a href="/" className="back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to home
            </a>
          </div>
        </nav>

        <div className="hib-container">
          {/* Hero */}
          <section className="hib-hero">
            <div className="hib-hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Under the hood
            </div>
            <h1>How <span>CueHabibi</span> is built</h1>
            <p>A transparent look at every tool, language, and framework powering the intelligent music library platform — explained for DJs, not just developers.</p>
          </section>

          {/* Stats */}
          <div className="hib-stats">
            <div className="hib-stat"><div className="hib-stat-val accent">~30MB</div><div className="hib-stat-label">Desktop app size</div></div>
            <div className="hib-stat"><div className="hib-stat-val">31K+</div><div className="hib-stat-label">Tracks managed</div></div>
            <div className="hib-stat"><div className="hib-stat-val">130+</div><div className="hib-stat-label">Backend tests</div></div>
            <div className="hib-stat"><div className="hib-stat-val">100%</div><div className="hib-stat-label">Local-first</div></div>
          </div>

          {/* Languages */}
          <section className="hib-section">
            <div className="hib-section-label">The languages</div>
            <div className="hib-section-title">What we write code in</div>
            <div className="hib-section-desc">Six languages, each with a specific job. Think of them as specialists on a crew — the bouncer, the designer, the translator.</div>
            <div className="hib-card-grid">
              <div className="hib-card">
                <div className="hib-card-icon rust">Rs</div>
                <h3>Rust</h3>
                <p>The bouncer. Fast, safe, and strict — handles all the heavy lifting: reading files, calling APIs, protecting your data. The compiler literally won&apos;t let you make certain mistakes. Like the DJ who never drops a beat.</p>
                <span className="tag">Backend engine</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon ts">TS</div>
                <h3>TypeScript</h3>
                <p>JavaScript&apos;s responsible older sibling. Builds everything you see — buttons, grids, pages. The &quot;Type&quot; part means every piece of data has a label, so bugs get caught before the app runs, not after.</p>
                <span className="tag">Frontend + UI</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon swift">Sw</div>
                <h3>Swift</h3>
                <p>Apple&apos;s language. We use a tiny Swift program to read your Music.app library because Apple only lets Swift talk to its database directly. The translator between Apple&apos;s world and ours.</p>
                <span className="tag">Music.app reads</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon apple">AS</div>
                <h3>AppleScript</h3>
                <p>Apple&apos;s old automation language — like writing a script that says &quot;hey Music.app, create this playlist.&quot; Clunky but it&apos;s the only way Apple lets you modify playlists programmatically.</p>
                <span className="tag">Music.app writes</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon css">{"{}"}</div>
                <h3>CSS</h3>
                <p>The styling language — controls colors, fonts, spacing, layout. When you pick &quot;Lavender&quot; as your accent theme, CSS variables swap instantly across the entire app. Dark mode? One variable flip.</p>
                <span className="tag">Visual design</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon html">&lt;&gt;</div>
                <h3>HTML</h3>
                <p>The skeleton of every screen. Defines what&apos;s on the page — a button, a heading, a track list. CSS makes it pretty, TypeScript makes it interactive. The bones under the skin.</p>
                <span className="tag">Structure</span>
              </div>
            </div>
          </section>

          <div className="hib-divider" />

          {/* Frameworks */}
          <section className="hib-section">
            <div className="hib-section-label">The frameworks</div>
            <div className="hib-section-title">Pre-built toolkits we build on top of</div>
            <div className="hib-section-desc">Why reinvent the wheel? These battle-tested tools handle the hard problems so we can focus on DJ intelligence.</div>
            <div className="hib-card-grid">
              <div className="hib-card">
                <div className="hib-card-icon tauri">T1</div>
                <h3>Tauri</h3>
                <p>The magic glue. Lets us build a native Mac app using web technologies for the interface with Rust for the engine. The alternative (Electron, what Spotify uses) would make our app 300MB. Tauri keeps it at 30.</p>
                <span className="tag">Desktop framework</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon react">Re</div>
                <h3>React</h3>
                <p>Meta&apos;s toolkit for building UIs. Instead of manually updating every pixel, you describe what the screen should look like and React figures out the minimum changes needed. Click a playlist, 500 tracks appear — instantly.</p>
                <span className="tag">UI engine</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon next">Nx</div>
                <h3>Next.js</h3>
                <p>A framework on top of React that handles routing (clicking &quot;Dashboard&quot; loads the dashboard page), build optimization, and project structure. The stage manager that organizes all the React performers.</p>
                <span className="tag">App framework</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon aggrid">AG</div>
                <h3>AG Grid</h3>
                <p>A specialized library just for data tables. It only renders the ~30 rows you can see, not all 31K. Called &quot;virtual scrolling.&quot; Like a DJ who only loads the next 5 tracks in the queue, not the entire library.</p>
                <span className="tag">Data grid</span>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon tailwind">Tw</div>
                <h3>Tailwind CSS</h3>
                <p>A shortcut system for CSS. Instead of writing custom style rules, you add small utility classes like &quot;text-sm&quot; (small text) or &quot;bg-blue&quot; (blue background) directly in the code. Faster to build, faster to change.</p>
                <span className="tag">Style utilities</span>
              </div>
            </div>
          </section>

          <div className="hib-divider" />

          {/* Key Concepts */}
          <section className="hib-section">
            <div className="hib-section-label">Key concepts</div>
            <div className="hib-section-title">Terms that unlock the conversation</div>
            <div className="hib-section-desc">Understanding these concepts means you can talk shop with any developer — and make better product decisions for your music.</div>
            <div className="hib-card-grid cols-2">
              <div className="hib-card">
                <div className="hib-card-icon json">{"{ }"}</div>
                <h3>JSON</h3>
                <p>&quot;JavaScript Object Notation&quot; — a universal format for storing data. Basically a labeled list: <code style={{fontSize:12,color:'var(--accent)',fontFamily:'ui-monospace,monospace'}}>{"{ \"name\": \"Amplifier\", \"bpm\": 126 }"}</code>. Every config file, every API response, every saved setting is JSON. A really organized spreadsheet in text form.</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon api">API</div>
                <h3>API</h3>
                <p>&quot;Application Programming Interface&quot; — a way for two programs to talk. When CueHabibi asks Spotify &quot;what&apos;s in this playlist?&quot;, it calls Spotify&apos;s API. Think of it like a restaurant menu — tells you what you can order (endpoints) and what you&apos;ll get back (responses).</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon ipc">IPC</div>
                <h3>IPC</h3>
                <p>&quot;Inter-Process Communication&quot; — how the frontend (what you see) talks to the Rust backend (the engine). Click &quot;Sync&quot; and the UI sends a message to Rust saying &quot;go read Music.app.&quot; Like a waiter taking your order to the kitchen.</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon oauth">OAuth</div>
                <h3>OAuth</h3>
                <p>A secure login system. When CueHabibi connects to Spotify, OAuth gives us a temporary &quot;access token&quot; (like a VIP wristband) instead of your actual password. The wristband expires and can be revoked anytime.</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon memo">Mm</div>
                <h3>Memoization</h3>
                <p>&quot;If I already computed this and nothing changed, reuse the old answer.&quot; The track table uses this — don&apos;t re-render 31K rows unless data actually changed. Like not re-analyzing a track&apos;s BPM if it hasn&apos;t been modified.</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon cache">Ca</div>
                <h3>Cache</h3>
                <p>Saving a copy of expensive results so you don&apos;t refetch them. The library cache loads 31K tracks once, then every tab reads from memory. Like pre-loading your entire set into RAM instead of reading from USB every time you play.</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon atomic">At</div>
                <h3>Atomic Write</h3>
                <p>Writing files safely: write to a temp file first, then rename it in one instant operation. If the app crashes mid-write, you have either the old file or the new file — never a corrupted half-written file. This is how we protect your data.</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon debounce">Db</div>
                <h3>Debounce</h3>
                <p>&quot;Wait a moment before acting.&quot; Type in the search box and we don&apos;t search after every keystroke — we wait until you stop typing, then search once. Saves resources, feels smoother. Patience as a performance strategy.</p>
              </div>
              <div className="hib-card">
                <div className="hib-card-icon rate">Rt</div>
                <h3>Rate Limiting</h3>
                <p>A speed limit on how often something can happen. Ask Habibi has a cap of 20 questions per hour and $5/month — so one enthusiastic DJ doesn&apos;t accidentally run up the AI bill. Guardrails, not restrictions.</p>
              </div>
            </div>
          </section>

          <div className="hib-divider" />

          {/* Architecture */}
          <section className="hib-section">
            <div className="hib-section-label">Architecture</div>
            <div className="hib-section-title">How the pieces connect</div>
            <div className="hib-section-desc">Two layers working together — the frontend you see and the backend engine that powers it.</div>
            <div className="hib-card-grid">
              <div className="hib-card" style={{borderLeft:'2px solid var(--accent)'}}>
                <h3>Frontend — What you see</h3>
                <p>Everything you interact with — the track grid, sidebar, waveform, buttons. Built with React + TypeScript, rendered inside WKWebView (basically a mini Safari browser inside the app). That&apos;s why M4A files play natively — Safari knows how to play them.</p>
              </div>
              <div className="hib-card" style={{borderLeft:'2px solid var(--teal)'}}>
                <h3>Backend — The engine room</h3>
                <p>Does the real work — reading your library, calling APIs, analyzing audio frequencies, protecting data. Built with Rust. You never see it directly, but it powers everything. API keys live here, never in the frontend.</p>
              </div>
            </div>
          </section>

          <div className="hib-divider" />

          {/* File Types */}
          <section className="hib-section">
            <div className="hib-section-label">File types</div>
            <div className="hib-section-title">What&apos;s in the codebase</div>
            <div className="hib-section-desc">Every file extension you&apos;d see if you opened CueHabibi&apos;s source code.</div>
            <div className="hib-ext-grid">
              <div className="hib-ext"><code>.rs</code><span>Rust (backend)</span></div>
              <div className="hib-ext"><code>.tsx</code><span>React components</span></div>
              <div className="hib-ext"><code>.ts</code><span>TypeScript logic</span></div>
              <div className="hib-ext"><code>.css</code><span>Styles &amp; themes</span></div>
              <div className="hib-ext"><code>.json</code><span>Data &amp; config</span></div>
              <div className="hib-ext"><code>.jsonl</code><span>Append-only logs</span></div>
              <div className="hib-ext"><code>.toml</code><span>Rust config</span></div>
              <div className="hib-ext"><code>.swift</code><span>Apple bridge</span></div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="hib-footer">
          <div className="hib-container">
            <p style={{marginBottom:8}}>CueHabibi — Built by <a href="https://instagram.com/djofresh" target="_blank" rel="noopener noreferrer">@djofresh</a></p>
            <p>Your DJ software plays your music. Habibi understands it.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
