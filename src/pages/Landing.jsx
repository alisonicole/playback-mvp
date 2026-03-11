import { useEffect, useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Jost:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --periwinkle: #7FA8E8; --sky: #C8DFFE; --mist: #EEF4FF;
    --champagne: #E8D5A3; --ivory: #FDFAF4; --navy: #1A2744;
    --navy-60: rgba(26,39,68,0.6); --navy-30: rgba(26,39,68,0.3);
  }
  html { scroll-behavior: smooth; }
  .pb-body { font-family: 'Jost', sans-serif; background: var(--ivory); color: var(--navy); overflow-x: hidden; }
  .pb-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 18px 52px; display: flex; align-items: center; justify-content: space-between;
    background: rgba(253,250,244,0.88); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(200,223,254,0.25);
  }
  .pb-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; }
  .pb-logo-text { font-family: 'DM Serif Display', serif; font-size: 21px; color: var(--navy); }
  .pb-nav-cta {
    font-size: 13px; font-weight: 500; color: var(--ivory);
    background: var(--navy); padding: 10px 24px; border-radius: 100px;
    text-decoration: none; border: none; cursor: pointer; transition: background 0.2s;
  }
  .pb-nav-cta:hover { background: var(--periwinkle); }
  .pb-hero {
    min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; padding: 120px 52px 80px; gap: 60px; position: relative; overflow: hidden;
  }
  .pb-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
  .pb-orb-a { width: 600px; height: 600px; background: radial-gradient(circle, rgba(127,168,232,0.18) 0%, transparent 70%); top: -200px; right: -200px; }
  .pb-orb-b { width: 400px; height: 400px; background: radial-gradient(circle, rgba(232,213,163,0.15) 0%, transparent 70%); bottom: -100px; left: 10%; }
  .pb-hero-left { position: relative; z-index: 1; }
  .pb-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--periwinkle); margin-bottom: 28px;
    background: rgba(127,168,232,0.1); padding: 6px 14px; border-radius: 100px;
    border: 1px solid rgba(127,168,232,0.25);
  }
  .pb-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--periwinkle); }
  .pb-headline {
    font-family: 'DM Serif Display', serif; font-size: clamp(42px, 5.5vw, 74px);
    line-height: 1.05; letter-spacing: -1.5px; color: var(--navy); margin-bottom: 24px;
  }
  .pb-headline em { font-style: italic; color: var(--periwinkle); }
  .pb-sub { font-size: 18px; font-weight: 300; line-height: 1.75; color: var(--navy-60); max-width: 480px; margin-bottom: 44px; }
  .pb-form { display: flex; gap: 10px; max-width: 420px; }
  .pb-input {
    flex: 1; padding: 15px 22px; border: 1.5px solid rgba(127,168,232,0.3);
    border-radius: 100px; background: rgba(253,250,244,0.95);
    font-family: 'Jost', sans-serif; font-size: 15px; color: var(--navy); outline: none;
  }
  .pb-input::placeholder { color: var(--navy-30); }
  .pb-input:focus { border-color: var(--periwinkle); box-shadow: 0 0 0 4px rgba(127,168,232,0.1); }
  .pb-btn {
    padding: 15px 28px; border-radius: 100px; border: none;
    background: var(--navy); color: var(--ivory);
    font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; white-space: nowrap; transition: background 0.2s;
  }
  .pb-btn:hover { background: var(--periwinkle); }
  .pb-success { display: flex; align-items: center; gap: 10px; color: var(--periwinkle); font-size: 15px; font-weight: 500; margin-top: 4px; }
  .pb-note { margin-top: 18px; font-size: 12px; color: var(--navy-30); }
  .pb-hero-right { position: relative; z-index: 1; }
  .pb-tc {
    background: white; border-radius: 28px; padding: 32px;
    box-shadow: 0 24px 80px rgba(26,39,68,0.1); border: 1px solid rgba(200,223,254,0.4);
    max-width: 360px; margin-left: auto;
  }
  .pb-tc-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .pb-tc-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--periwinkle); }
  .pb-tc-date { font-size: 11px; color: var(--navy-30); }
  .pb-year-row { display: flex; gap: 8px; align-items: stretch; margin-bottom: 12px; }
  .pb-year-tag { font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--navy-30); width: 36px; flex-shrink: 0; padding-top: 14px; }
  .pb-year-content { flex: 1; background: var(--mist); border-radius: 16px; padding: 14px 16px; border-left: 3px solid var(--sky); }
  .pb-year-content.active { border-left-color: var(--periwinkle); background: rgba(127,168,232,0.07); }
  .pb-yc-song { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .pb-yc-art { width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 13px; }
  .pb-yc-art-1 { background: linear-gradient(135deg, #C8DFFE, #7FA8E8); }
  .pb-yc-art-2 { background: linear-gradient(135deg, #E8D5A3, #d4b87a); }
  .pb-yc-art-3 { background: linear-gradient(135deg, #b8d4c8, #7aaa94); }
  .pb-yc-title { font-size: 12px; font-weight: 600; color: var(--navy); }
  .pb-yc-artist { font-size: 10px; color: var(--navy-60); margin-top: 2px; }
  .pb-yc-photos { display: flex; gap: 6px; margin-top: 8px; }
  .pb-yc-photo { height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .pb-yc-photo-a { flex: 2; background: linear-gradient(135deg, #dce8f5, #c8dffe); }
  .pb-yc-photo-b { flex: 1; background: linear-gradient(135deg, #f5ead0, #edd9a3); }
  .pb-yc-prompt { font-family: 'DM Serif Display', serif; font-size: 12px; font-style: italic; color: var(--navy-60); line-height: 1.5; padding-top: 8px; border-top: 1px solid rgba(26,39,68,0.07); }
  .pb-tc-insight { margin-top: 20px; padding: 16px; background: var(--navy); border-radius: 16px; display: flex; gap: 12px; align-items: flex-start; }
  .pb-tc-insight-text { font-size: 12px; font-weight: 300; line-height: 1.6; color: rgba(253,250,244,0.7); }
  .pb-tc-insight-text strong { color: var(--sky); font-weight: 600; }
  .pb-section { padding: 120px 52px; }
  .pb-inner { max-width: 1080px; margin: 0 auto; }
  .pb-section-eyebrow { display: block; font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--periwinkle); margin-bottom: 20px; }
  .pb-section-headline { font-family: 'DM Serif Display', serif; font-size: clamp(36px, 4.5vw, 56px); line-height: 1.1; color: var(--navy); max-width: 680px; margin-bottom: 20px; }
  .pb-section-sub { font-size: 17px; font-weight: 300; line-height: 1.8; color: var(--navy-60); max-width: 540px; margin-bottom: 64px; }
  .pb-diff { background: var(--navy); }
  .pb-diff .pb-section-headline { color: var(--ivory); max-width: 800px; }
  .pb-diff .pb-section-eyebrow { color: var(--champagne); }
  .pb-diff .pb-section-sub { color: rgba(253,250,244,0.5); }
  .pb-diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
  .pb-diff-cell { padding: 40px 36px; background: rgba(255,255,255,0.03); }
  .pb-diff-cell:hover { background: rgba(127,168,232,0.08); }
  .pb-diff-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
  .pb-diff-label.them { color: rgba(253,250,244,0.2); }
  .pb-diff-label.us { color: var(--champagne); }
  .pb-diff-cell h4 { font-family: 'DM Serif Display', serif; font-size: 22px; margin-bottom: 12px; line-height: 1.2; }
  .pb-them-cell h4 { color: rgba(253,250,244,0.3); }
  .pb-us-cell h4 { color: var(--ivory); }
  .pb-diff-cell p { font-size: 14px; font-weight: 300; line-height: 1.7; }
  .pb-them-cell p { color: rgba(253,250,244,0.25); }
  .pb-us-cell p { color: rgba(253,250,244,0.55); }
  .pb-moat { background: var(--mist); }
  .pb-moat-timeline { display: flex; flex-direction: column; max-width: 680px; position: relative; }
  .pb-moat-timeline::before { content: ''; position: absolute; left: 23px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--sky), var(--periwinkle), var(--navy)); }
  .pb-moat-item { display: flex; gap: 28px; align-items: flex-start; padding: 28px 0; }
  .pb-moat-dot { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 18px; z-index: 1; }
  .pb-moat-dot-1 { background: var(--sky); }
  .pb-moat-dot-2 { background: var(--periwinkle); }
  .pb-moat-dot-3 { background: var(--navy); }
  .pb-moat-text h4 { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--navy); margin-bottom: 8px; }
  .pb-moat-text p { font-size: 15px; font-weight: 300; line-height: 1.75; color: var(--navy-60); }
  .pb-moat-tag { display: inline-block; margin-top: 10px; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 100px; }
  .pb-moat-tag-1 { background: rgba(200,223,254,0.6); color: #4A7AC7; }
  .pb-moat-tag-2 { background: rgba(127,168,232,0.2); color: #4A7AC7; }
  .pb-moat-tag-3 { background: var(--navy); color: var(--sky); }
  .pb-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .pb-step { padding: 36px 32px; border-radius: 24px; background: var(--ivory); border: 1px solid rgba(127,168,232,0.15); transition: transform 0.25s, box-shadow 0.25s; }
  .pb-step:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(26,39,68,0.09); }
  .pb-step-num { font-family: 'DM Serif Display', serif; font-size: 56px; color: var(--sky); line-height: 1; margin-bottom: 16px; }
  .pb-step-icon { font-size: 28px; margin-bottom: 14px; }
  .pb-step h3 { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--navy); margin-bottom: 10px; }
  .pb-step p { font-size: 14px; font-weight: 300; line-height: 1.75; color: var(--navy-60); }
  .pb-insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .pb-insight-card { padding: 32px; border-radius: 22px; background: white; border: 1px solid rgba(127,168,232,0.12); box-shadow: 0 4px 24px rgba(26,39,68,0.05); }
  .pb-insight-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(26,39,68,0.08); }
  .pb-insight-year { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--periwinkle); margin-bottom: 16px; }
  .pb-insight-quote { font-family: 'DM Serif Display', serif; font-size: 17px; font-style: italic; line-height: 1.55; color: var(--navy); margin-bottom: 16px; }
  .pb-insight-source { font-size: 12px; font-weight: 300; color: var(--navy-30); display: flex; align-items: center; gap: 8px; }
  .pb-cta { background: var(--navy); text-align: center; padding: 140px 52px; position: relative; overflow: hidden; }
  .pb-cta .pb-section-eyebrow { color: var(--champagne); }
  .pb-cta .pb-section-headline { color: var(--ivory); margin: 0 auto 20px; max-width: 640px; }
  .pb-cta .pb-section-sub { color: rgba(253,250,244,0.45); margin: 0 auto 52px; }
  .pb-cta-form { display: flex; gap: 10px; justify-content: center; max-width: 440px; margin: 0 auto; }
  .pb-cta-form .pb-input { background: rgba(253,250,244,0.07); border-color: rgba(253,250,244,0.15); color: var(--ivory); }
  .pb-cta-form .pb-input::placeholder { color: rgba(253,250,244,0.3); }
  .pb-cta-form .pb-btn { background: var(--periwinkle); }
  .pb-cta-form .pb-btn:hover { background: var(--sky); color: var(--navy); }
  .pb-footer { padding: 36px 52px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(127,168,232,0.15); }
  .pb-footer-note { font-size: 12px; color: var(--navy-30); font-weight: 300; }
  @media (max-width: 900px) {
    .pb-nav { padding: 16px 24px; }
    .pb-hero { grid-template-columns: 1fr; padding: 100px 24px 60px; }
    .pb-hero-right { display: none; }
    .pb-section { padding: 80px 24px; }
    .pb-diff-grid, .pb-steps, .pb-insights-grid { grid-template-columns: 1fr; }
    .pb-footer { flex-direction: column; gap: 12px; text-align: center; padding: 28px 24px; }
    .pb-cta-form { flex-direction: column; }
  }
`;

function LogoSVG({ id = "lg1", size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#C8DFFE"/><stop offset="100%" stopColor="#4A7AC7"/></linearGradient></defs>
      <path d="M4 2 L4 30 L30 16 Z" fill={`url(#${id})`}/>
      <rect x="4" y="20" width="4" height="10" fill="#FDFAF4"/>
      <rect x="10" y="14" width="4" height="16" fill="#FDFAF4"/>
      <rect x="16" y="22" width="4" height="8" fill="#FDFAF4"/>
    </svg>
  );
}

export default function Landing({ onEnterApp }) {
  const [heroEmail, setHeroEmail] = useState('');
  const [ctaEmail, setCtaEmail] = useState('');
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [ctaSuccess, setCtaSuccess] = useState(false);

  const joinWaitlist = (source) => {
    const email = source === 'hero' ? heroEmail : ctaEmail;
    if (!email || !email.includes('@')) return;
    if (source === 'hero') setHeroSuccess(true);
    else setCtaSuccess(true);
    console.log('Waitlist signup:', email);
    // → Wire to Back4App or Loops.so
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-body">
      <style>{styles}</style>
      <style>{`.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; } .reveal.visible { opacity: 1; transform: translateY(0); }`}</style>

      {/* NAV */}
      <nav className="pb-nav">
        <div className="pb-logo">
          <LogoSVG id="nav-lg" size={30} />
          <span className="pb-logo-text">Playback</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {onEnterApp && (
            <button onClick={onEnterApp} className="pb-nav-cta" style={{ background: 'var(--periwinkle)', marginRight: 4 }}>
              Open app →
            </button>
          )}
          <a href="#waitlist" className="pb-nav-cta">Join waitlist</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pb-hero">
        <div className="pb-orb pb-orb-a" />
        <div className="pb-orb pb-orb-b" />
        <div className="pb-hero-left">
          <div className="pb-eyebrow"><span className="pb-eyebrow-dot" />Now building · Early access open</div>
          <h1 className="pb-headline">Your memories deserve <em>more</em> than a scroll.</h1>
          <p className="pb-sub">Playback turns your music, photos, and reflections into a living record of your life — so you can revisit where you've been, understand who you're becoming, and build the next chapter with intention.</p>
          {heroSuccess ? (
            <div className="pb-success"><span>✦</span> You're on the list. We'll be in touch.</div>
          ) : (
            <div className="pb-form">
              <input className="pb-input" type="email" placeholder="your@email.com" value={heroEmail} onChange={e => setHeroEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && joinWaitlist('hero')} />
              <button className="pb-btn" onClick={() => joinWaitlist('hero')}>Get early access</button>
            </div>
          )}
          <p className="pb-note">No spam, ever. Just your memories waiting.</p>
        </div>
        <div className="pb-hero-right">
          <div className="pb-tc">
            <div className="pb-tc-header">
              <span className="pb-tc-label">✦ Your growth timeline</span>
              <span className="pb-tc-date">March 11</span>
            </div>
            {[
              { year: '2023', art: 'pb-yc-art-2', title: 'Unwritten', artist: 'Natasha Bedingfield', photo: '🌆', photoClass: 'pb-yc-photo-b' },
              { year: '2024', art: 'pb-yc-art-3', title: 'Espresso', artist: 'Sabrina Carpenter', photo: '☕', photoClass: 'pb-yc-photo-a' },
            ].map(row => (
              <div className="pb-year-row" key={row.year}>
                <div className="pb-year-tag">{row.year}</div>
                <div className="pb-year-content">
                  <div className="pb-yc-song">
                    <div className={`pb-yc-art ${row.art}`}>♪</div>
                    <div><div className="pb-yc-title">{row.title}</div><div className="pb-yc-artist">{row.artist}</div></div>
                  </div>
                  <div className="pb-yc-photos"><div className={`pb-yc-photo ${row.photoClass}`} style={{ flex: 1 }}>{row.photo}</div></div>
                </div>
              </div>
            ))}
            <div className="pb-year-row">
              <div className="pb-year-tag">2025</div>
              <div className="pb-year-content active">
                <div className="pb-yc-song">
                  <div className="pb-yc-art pb-yc-art-1">♪</div>
                  <div><div className="pb-yc-title">Cinnamon Girl</div><div className="pb-yc-artist">Lana Del Rey</div></div>
                </div>
                <div className="pb-yc-photos">
                  <div className="pb-yc-photo pb-yc-photo-a">🌅</div>
                  <div className="pb-yc-photo pb-yc-photo-b">✈️</div>
                </div>
                <div className="pb-yc-prompt">"Remember when you wanted what you currently have?"</div>
              </div>
            </div>
            <div className="pb-tc-insight">
              <div style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>✦</div>
              <div className="pb-tc-insight-text"><strong>Playback insight:</strong> Your music shifts toward reflective artists every March. You've changed careers and moved cities since 2023. That's not small.</div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="pb-section pb-diff">
        <div className="pb-inner">
          <span className="pb-section-eyebrow reveal">Why Playback is different</span>
          <h2 className="pb-section-headline reveal">Apple Photos shows you a memory. Playback helps you understand it.</h2>
          <p className="pb-section-sub reveal">Every app gives you nostalgia. None of them do anything with it. That's the gap Playback fills.</p>
          <div className="pb-diff-grid reveal">
            {[
              { cls: 'pb-them-cell', label: 'them', labelText: 'Apple Photos / Spotify Wrapped', h: "Here's what you did.", p: "Shows you a memory or a stat. Creates a moment of feeling. Then you close the app and nothing changes." },
              { cls: 'pb-us-cell', label: 'us', labelText: '✦ Playback', h: "Here's who you're becoming.", p: "Pairs your memory with a reflection prompt, tracks growth over time, and builds a dataset of your inner life that gets smarter the longer you use it." },
              { cls: 'pb-them-cell', label: 'them', labelText: 'Journaling apps', h: "Requires a daily habit.", p: "You have to show up every day for it to work. Most people don't. The app gets abandoned after two weeks." },
              { cls: 'pb-us-cell', label: 'us', labelText: '✦ Playback', h: "Works while you live your life.", p: "Spotify and your photos do the capturing automatically. Playback surfaces insights when the timing is meaningful — anniversaries, milestones, seasons." },
            ].map((cell, i) => (
              <div key={i} className={`pb-diff-cell ${cell.cls}`}>
                <div className={`pb-diff-label ${cell.label}`}>{cell.labelText}</div>
                <h4>{cell.h}</h4>
                <p>{cell.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPOUNDING */}
      <section className="pb-section pb-moat">
        <div className="pb-inner">
          <span className="pb-section-eyebrow reveal">The compounding effect</span>
          <h2 className="pb-section-headline reveal">The longer you use Playback, the more irreplaceable it becomes.</h2>
          <p className="pb-section-sub reveal">Most apps are equally useful on day one as day one thousand. Playback is different. Your data is your moat.</p>
          <div className="pb-moat-timeline reveal">
            {[
              { dot: 'pb-moat-dot-1', icon: '🌱', h: 'Month 1 — Your foundation', p: "Connect Spotify. Upload your first photos. Answer a few reflection prompts. You've started building something no one else has — a timestamped record of who you are right now.", tagCls: 'pb-moat-tag-1', tag: 'First memory captured' },
              { dot: 'pb-moat-dot-2', icon: '📈', h: 'Year 1 — Patterns emerge', p: "Playback starts noticing things you can't see yourself. Your music shifts before major life events. Certain seasons trigger certain moods. You have proof of growth you'd have forgotten otherwise.", tagCls: 'pb-moat-tag-2', tag: 'Growth patterns unlocked' },
              { dot: 'pb-moat-dot-3', icon: '✦', h: 'Year 3+ — Irreplaceable intelligence', p: "You have a longitudinal record of your inner life that no other product, person, or therapist has. A mirror that has been watching you grow for years. You cannot recreate this anywhere else.", tagCls: 'pb-moat-tag-3', tag: 'Personal growth OS' },
            ].map((item, i) => (
              <div key={i} className="pb-moat-item">
                <div className={`pb-moat-dot ${item.dot}`}>{item.icon}</div>
                <div className="pb-moat-text">
                  <h4>{item.h}</h4>
                  <p>{item.p}</p>
                  <span className={`pb-moat-tag ${item.tagCls}`}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pb-section">
        <div className="pb-inner">
          <span className="pb-section-eyebrow reveal">How it works</span>
          <h2 className="pb-section-headline reveal">Three inputs. A lifetime of insight.</h2>
          <p className="pb-section-sub reveal">No new habits. No daily check-ins. Just connect what you already use and let Playback do the work.</p>
          <div className="pb-steps">
            {[
              { num: '01', icon: '🎵', h: 'Connect Spotify', p: "Your listening history is a musical diary you've been keeping for years without knowing it. Playback reads that signal and maps it to your timeline." },
              { num: '02', icon: '📷', h: 'Upload photos', p: 'Share photos from your Apple or Google memories. We read the date automatically. Your visual history slots into your timeline without any manual work.' },
              { num: '03', icon: '✦', h: 'Reflect on what surfaces', p: 'On meaningful dates, Playback surfaces a memory with a tailored reflection prompt. Your answers become part of your growth record — compounding over time.' },
            ].map((step, i) => (
              <div key={i} className="pb-step reveal">
                <div className="pb-step-num">{step.num}</div>
                <div className="pb-step-icon">{step.icon}</div>
                <h3>{step.h}</h3>
                <p>{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="pb-section" style={{ background: 'var(--mist)' }}>
        <div className="pb-inner">
          <span className="pb-section-eyebrow reveal">What Playback tells you</span>
          <h2 className="pb-section-headline reveal">The insights no other app can give you.</h2>
          <p className="pb-section-sub reveal">Because no other app has your complete picture across music, photos, and reflection — all in one place, over years.</p>
          <div className="pb-insights-grid">
            {[
              { year: '✦ Pattern insight', q: '"Your music gets more introspective every October. It\'s happened three years in a row."', src: '🎵', srcText: 'Spotify × 3 years of data' },
              { year: '✦ Progress insight', q: '"This day two years ago you were applying for jobs. Today you\'re building your own product."', src: '📷', srcText: 'Photos × reflection responses' },
              { year: '✦ Growth insight', q: '"You\'ve moved cities, changed careers, and started something new — all since you first opened Playback."', src: '✦', srcText: 'Full timeline intelligence' },
            ].map((card, i) => (
              <div key={i} className="pb-insight-card reveal">
                <div className="pb-insight-year">{card.year}</div>
                <div className="pb-insight-quote">{card.q}</div>
                <div className="pb-insight-source"><span>{card.src}</span>{card.srcText}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-section pb-cta" id="waitlist">
        <div className="pb-inner" style={{ position: 'relative', zIndex: 1 }}>
          <span className="pb-section-eyebrow reveal">Early access</span>
          <h2 className="pb-section-headline reveal">Your life is worth playing back. Start building your record today.</h2>
          <p className="pb-section-sub reveal">The best time to start was a year ago. The second best time is now.</p>
          {ctaSuccess ? (
            <div className="pb-success" style={{ justifyContent: 'center', color: 'var(--sky)' }}><span>✦</span> You're on the list. We'll be in touch.</div>
          ) : (
            <div className="pb-cta-form reveal">
              <input className="pb-input" type="email" placeholder="your@email.com" value={ctaEmail} onChange={e => setCtaEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && joinWaitlist('cta')} />
              <button className="pb-btn" onClick={() => joinWaitlist('cta')}>Get early access</button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pb-footer">
        <div className="pb-logo">
          <LogoSVG id="footer-lg" size={26} />
          <span className="pb-logo-text" style={{ fontSize: 18 }}>Playback</span>
        </div>
        <span className="pb-footer-note">© 2025 Playback · A record of the life you're building.</span>
      </footer>
    </div>
  );
}