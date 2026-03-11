import { useState } from "react";

const FEED = [
  { id: 1, type: "photo", yearsAgo: 2, date: "March 11, 2023", content: { emoji: "🌅", gradient: "linear-gradient(160deg, #dce8f5 0%, #b8d0e8 100%)", caption: "Brooklyn, New York" }, prompts: { reflection: "Who were you trying to become back then — and did you?", feeling: "How does this photo make you feel?" } },
  { id: 2, type: "song", yearsAgo: 1, date: "March 11, 2024", content: { emoji: "♪", gradient: "linear-gradient(160deg, #f5ead5 0%, #e8d0a8 100%)", title: "Unwritten", artist: "Natasha Bedingfield", detail: "You played this 47 times" }, prompts: { reflection: "What were you going through when this song was on repeat?", feeling: "How does this song make you feel?" } },
  { id: 3, type: "photo", yearsAgo: 3, date: "March 11, 2022", content: { emoji: "✈️", gradient: "linear-gradient(160deg, #e8e4f5 0%, #ccc4e8 100%)", caption: "JFK Airport" }, prompts: { reflection: "Remember when you wanted what you currently have.", feeling: "How does this photo make you feel?" } },
  { id: 4, type: "artist", yearsAgo: 2, date: "March 11, 2023", content: { emoji: "🎤", gradient: "linear-gradient(160deg, #f0e8f5 0%, #d8c4e8 100%)", title: "Lana Del Rey", detail: "Your #1 most played artist this month" }, prompts: { reflection: "What feeling were you chasing when you listened to her?", feeling: "How does this artist make you feel?" } },
  { id: 5, type: "photo", yearsAgo: 1, date: "March 11, 2024", content: { emoji: "🌿", gradient: "linear-gradient(160deg, #dceee0 0%, #b8d8bc 100%)", caption: "Central Park" }, prompts: { reflection: "What did this version of you need to hear that you know now?", feeling: "How does this photo make you feel?" } },
];

const FEELINGS = [
  { emoji: "🥺", label: "Nostalgic" }, { emoji: "😊", label: "Happy" }, { emoji: "😔", label: "Sad" },
  { emoji: "😌", label: "Peaceful" }, { emoji: "😤", label: "Frustrated" }, { emoji: "🤩", label: "Proud" },
];

function Logo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#C8DFFE"/><stop offset="100%" stopColor="#4A7AC7"/></linearGradient></defs>
      <path d="M4 2 L4 30 L30 16 Z" fill="url(#lg)"/>
      <rect x="4" y="20" width="4" height="10" fill="#FDFAF4"/>
      <rect x="10" y="14" width="4" height="16" fill="#FDFAF4"/>
      <rect x="16" y="22" width="4" height="8" fill="#FDFAF4"/>
    </svg>
  );
}

function MemoryCard({ item, onSave }) {
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);
  const [feeling, setFeeling] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

  const handleSave = () => {
    if (reflection.trim() || feeling) {
      setSaved(true);
      onSave({ id: item.id, date: item.date, type: item.type, reflection, feeling, prompt: item.prompts.reflection });
    }
  };

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7FA8E8", marginBottom: 2 }}>{item.yearsAgo === 1 ? "1 year ago" : `${item.yearsAgo} years ago`}</div>
          <div style={{ fontSize: 11, color: "rgba(26,39,68,0.4)" }}>{item.date}</div>
        </div>
        <button onClick={() => setBookmarked(b => !b)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="16" height="18" viewBox="0 0 24 24" fill={bookmarked ? "#7FA8E8" : "none"} stroke={bookmarked ? "#7FA8E8" : "rgba(26,39,68,0.25)"} strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>

      <div style={{ background: item.content.gradient, borderRadius: 18, border: "1px solid rgba(26,39,68,0.07)", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 12 }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>{item.content.emoji}</div>
        {item.type === "photo" && <div style={{ fontSize: 11, color: "rgba(26,39,68,0.45)" }}>📍 {item.content.caption}</div>}
        {(item.type === "song" || item.type === "artist") && (
          <div style={{ textAlign: "center", padding: "0 20px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1A2744", fontFamily: "Georgia,serif", marginBottom: 3 }}>{item.content.title}</div>
            {item.content.artist && <div style={{ fontSize: 11, color: "rgba(26,39,68,0.45)" }}>{item.content.artist}</div>}
            <div style={{ fontSize: 10, color: "#7FA8E8", marginTop: 5, fontWeight: 600 }}>{item.content.detail}</div>
          </div>
        )}
        <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(26,39,68,0.4)", background: "rgba(255,255,255,0.65)", padding: "2px 8px", borderRadius: 100 }}>{item.type}</div>
      </div>

      <div style={{ marginBottom: 10, padding: "14px", background: "white", borderRadius: 14, border: "1px solid rgba(200,223,254,0.45)" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(26,39,68,0.3)", marginBottom: 10 }}>{item.prompts.feeling}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FEELINGS.map(f => (
            <button key={f.label} onClick={() => setFeeling(feeling === f.label ? null : f.label)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 100, border: feeling === f.label ? "1.5px solid #7FA8E8" : "1.5px solid rgba(200,223,254,0.7)", background: feeling === f.label ? "rgba(127,168,232,0.1)" : "transparent", cursor: "pointer", fontSize: 11, color: feeling === f.label ? "#4A7AC7" : "rgba(26,39,68,0.5)", fontWeight: feeling === f.label ? 600 : 400 }}>
              <span style={{ fontSize: 13 }}>{f.emoji}</span>{f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px", background: "white", borderRadius: 14, border: "1px solid rgba(200,223,254,0.45)" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(26,39,68,0.3)", marginBottom: 8 }}>✦ Reflection</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontStyle: "italic", color: "rgba(26,39,68,0.6)", lineHeight: 1.6, marginBottom: 12 }}>"{item.prompts.reflection}"</div>
        {saved ? (
          <div style={{ background: "rgba(127,168,232,0.08)", borderRadius: 10, padding: "11px 13px", border: "1px solid rgba(127,168,232,0.2)" }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7FA8E8", marginBottom: 5 }}>Saved to your record</div>
            {feeling && <div style={{ fontSize: 12, color: "rgba(26,39,68,0.45)", marginBottom: 3 }}>{FEELINGS.find(f => f.label === feeling)?.emoji} {feeling}</div>}
            {reflection && <div style={{ fontSize: 12, color: "#1A2744", lineHeight: 1.6 }}>{reflection}</div>}
          </div>
        ) : (
          <>
            <textarea value={reflection} onChange={e => setReflection(e.target.value)} placeholder="Write your reflection here..." style={{ width: "100%", minHeight: 68, border: "1.5px solid rgba(200,223,254,0.6)", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#1A2744", background: "#FDFAF4", outline: "none", resize: "none", lineHeight: 1.6, boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#7FA8E8"} onBlur={e => e.target.style.borderColor = "rgba(200,223,254,0.6)"} />
            <button onClick={handleSave} style={{ marginTop: 9, width: "100%", padding: "11px", borderRadius: 100, border: "none", background: (reflection.trim() || feeling) ? "#1A2744" : "rgba(26,39,68,0.06)", color: (reflection.trim() || feeling) ? "#FDFAF4" : "rgba(26,39,68,0.2)", fontSize: 12, fontWeight: 600, cursor: (reflection.trim() || feeling) ? "pointer" : "not-allowed" }}>Save to my record</button>
          </>
        )}
      </div>
      <div style={{ height: 1, background: "rgba(200,223,254,0.25)", marginTop: 32 }} />
    </div>
  );
}

function ReflectionsView({ reflections }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    if (!reflections.length) return;
    setLoading(true);
    try {
      const summary = reflections.map(r => `Memory: ${r.type} from ${r.date}. Feeling: ${r.feeling || "not specified"}. Reflection: "${r.reflection || "none"}". Prompt: "${r.prompt}"`).join("\n");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: "You are a warm, emotionally intelligent growth coach. Based on the user's reflections on their memories, generate a short thoughtful insight (3-4 sentences) about their patterns, growth, or emotional journey. Be specific and encouraging. Write in second person.", messages: [{ role: "user", content: `Here are my recent reflections:\n\n${summary}\n\nWhat patterns or insights do you notice?` }] })
      });
      const data = await res.json();
      setInsight(data.content?.[0]?.text || "");
    } catch { setInsight("Something went wrong. Try again."); }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", scrollbarWidth: "none" }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 19, color: "#1A2744", fontStyle: "italic", marginBottom: 3 }}>Your reflections</div>
        <div style={{ fontSize: 11, color: "rgba(26,39,68,0.4)" }}>{reflections.length} saved so far</div>
      </div>
      {reflections.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>✦</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#1A2744", fontStyle: "italic", marginBottom: 8 }}>No reflections yet.</div>
          <div style={{ fontSize: 12, color: "rgba(26,39,68,0.4)", lineHeight: 1.6 }}>Go back to your feed and start reflecting.</div>
        </div>
      ) : (
        <>
          <button onClick={generateInsight} disabled={loading} style={{ width: "100%", padding: "13px", borderRadius: 14, border: "none", background: loading ? "rgba(26,39,68,0.05)" : "#1A2744", color: loading ? "rgba(26,39,68,0.3)" : "#FDFAF4", fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", marginBottom: 18 }}>
            {loading ? "Generating..." : "✦ Generate insight from my reflections"}
          </button>
          {insight && (
            <div style={{ background: "linear-gradient(135deg,#1A2744,#2a3f6f)", borderRadius: 16, padding: "18px", marginBottom: 20 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(200,223,254,0.5)", marginBottom: 10 }}>✦ Playback insight</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontStyle: "italic", color: "white", lineHeight: 1.75 }}>{insight}</div>
            </div>
          )}
          {reflections.map((r, i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "14px", marginBottom: 10, border: "1px solid rgba(200,223,254,0.4)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#7FA8E8" }}>{r.type} · {r.date}</div>
                {r.feeling && <div style={{ fontSize: 13 }}>{FEELINGS.find(f => f.label === r.feeling)?.emoji}</div>}
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontStyle: "italic", color: "rgba(26,39,68,0.4)", marginBottom: 6 }}>"{r.prompt}"</div>
              {r.reflection && <div style={{ fontSize: 12, color: "#1A2744", lineHeight: 1.6 }}>{r.reflection}</div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");
  const [reflections, setReflections] = useState([]);

  const tabs = [
    { id: "feed", label: "Feed", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
    { id: "reflections", label: "Reflections", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
    { id: "saved", label: "Saved", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
    { id: "profile", label: "Profile", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#EEF4FF", minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>
      <div style={{ width: 355, background: "#FDFAF4", borderRadius: 40, overflow: "hidden", boxShadow: "0 40px 100px rgba(26,39,68,0.15)", border: "1px solid rgba(200,223,254,0.4)", display: "flex", flexDirection: "column", height: "88vh", maxHeight: 780 }}>
        <div style={{ padding: "13px 26px 0", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1A2744" }}>9:41</span>
          <div style={{ width: 88, height: 12, background: "rgba(26,39,68,0.07)", borderRadius: 100, marginTop: 2 }} />
          <span style={{ fontSize: 10, color: "#1A2744", opacity: 0.3 }}>●●●</span>
        </div>
        <div style={{ padding: "11px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(200,223,254,0.4)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={22} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#1A2744", fontStyle: "italic" }}>Playback</span>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="1.8" style={{ opacity: 0.3 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <div style={{ position: "relative" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="1.8" style={{ opacity: 0.3 }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={{ position: "absolute", top: -2, right: -2, width: 6, height: 6, background: "#7FA8E8", borderRadius: "50%", border: "2px solid #FDFAF4" }} />
            </div>
          </div>
        </div>

        {activeTab === "feed" ? (
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 14px 8px", scrollbarWidth: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(127,168,232,0.2)" }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(26,39,68,0.28)" }}>March 11</span>
              <div style={{ flex: 1, height: 1, background: "rgba(127,168,232,0.2)" }} />
            </div>
            {FEED.map(item => <MemoryCard key={item.id} item={item} onSave={r => setReflections(prev => [r, ...prev])} />)}
            <div style={{ textAlign: "center", padding: "8px 0 32px" }}>
              <div style={{ fontSize: 16, marginBottom: 6 }}>✦</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#1A2744", fontStyle: "italic" }}>You're all caught up.</div>
              <div style={{ fontSize: 11, color: "rgba(26,39,68,0.35)", marginTop: 4 }}>More memories surface as your record grows.</div>
            </div>
          </div>
        ) : activeTab === "reflections" ? (
          <ReflectionsView reflections={reflections} />
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 22 }}>✦</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#1A2744", fontStyle: "italic" }}>{activeTab}</div>
            <div style={{ fontSize: 11, color: "rgba(26,39,68,0.4)" }}>Coming soon</div>
          </div>
        )}

        <div style={{ padding: "10px 8px 18px", display: "flex", justifyContent: "space-around", borderTop: "1px solid rgba(200,223,254,0.35)", background: "rgba(253,250,244,0.97)", flexShrink: 0 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "5px 10px", color: activeTab === tab.id ? "#7FA8E8" : "rgba(26,39,68,0.28)", position: "relative" }}>
              {tab.id === "reflections" && reflections.length > 0 && <div style={{ position: "absolute", top: 2, right: 8, width: 6, height: 6, background: "#7FA8E8", borderRadius: "50%", border: "2px solid #FDFAF4" }} />}
              {tab.icon}
              <span style={{ fontSize: 9, fontWeight: 600 }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}