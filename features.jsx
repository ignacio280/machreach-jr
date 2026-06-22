/* ======== Features grid + product preview — polished mini UIs ======== */

const featStyles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 },
  card: (active) => ({
    position: "relative",
    background: "var(--surface)",
    border: "2px solid var(--ink)",
    borderRadius: 24,
    padding: 24,
    boxShadow: active ? "0 8px 0 0 var(--ink)" : "0 4px 0 0 var(--ink)",
    transform: active ? "translate(-1px, -3px)" : "translate(0,0)",
    transition: "transform .18s ease, box-shadow .18s ease",
    cursor: "pointer",
    overflow: "hidden",
    minHeight: 320,
    display: "flex", flexDirection: "column",
  }),
  iconBox: (color) => ({
    width: 48, height: 48, borderRadius: 14,
    background: color, border: "2px solid var(--ink)",
    display: "grid", placeItems: "center", color: "white",
    boxShadow: "0 3px 0 0 var(--ink)", marginBottom: 16,
  }),
  title: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, marginBottom: 8 },
  desc: { color: "var(--ink-2)", fontSize: 15, lineHeight: 1.5 },
  miniWrap: {
    marginTop: 18, background: "var(--bg-2)", border: "2px solid var(--line-2)",
    borderRadius: 16, padding: 14, flex: 1,
    display: "flex", alignItems: "center", justifyContent: "center", minHeight: 130,
  },
};

/* Mini-previews — every one looks like a real app */

function MiniCanvas() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-3)", letterSpacing: ".08em" }}>MIS CLASES · 2026</span>
        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--good)" }}>● synced</span>
      </div>
      {[
        { c: "Matemática",      p: 78, color: "var(--brand)",     n: "Prueba en 4d" },
        { c: "Historia",        p: 54, color: "var(--secondary)", n: "Tarea en 9d" },
        { c: "Biología",        p: 32, color: "var(--accent)",    n: "Control en 12d" },
      ].map((r, i) => (
        <div key={i} style={{
          background: "var(--surface)", border: "1.5px solid var(--line)",
          borderRadius: 10, padding: "8px 10px",
          display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 8,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: r.color, border: "1.5px solid var(--ink)" }}/>
              {r.c}
            </div>
            <div style={{ width: "100%", height: 4, background: "var(--bg)", borderRadius: 4, marginTop: 4, overflow: "hidden" }}>
              <div style={{ width: r.p + "%", height: "100%", background: r.color }}/>
            </div>
          </div>
          <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{r.n}</div>
        </div>
      ))}
    </div>
  );
}

function MiniFocus() {
  const total = 1500;
  const [t, setT] = React.useState(1247);
  React.useEffect(() => {
    const id = setInterval(() => setT(x => x <= 0 ? total : x - 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(t / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  const pct = ((total - t) / total) * 100;
  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 78, height: 78 }}>
        <svg width="78" height="78" viewBox="0 0 78 78" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="39" cy="39" r="32" fill="none" stroke="var(--bg)" strokeWidth="6"/>
          <circle cx="39" cy="39" r="32" fill="none" stroke="var(--brand)" strokeWidth="6"
            strokeDasharray={2 * Math.PI * 32}
            strokeDashoffset={2 * Math.PI * 32 * (1 - pct / 100)}
            strokeLinecap="round"/>
          <circle cx="39" cy="39" r="32" fill="none" stroke="var(--ink)" strokeWidth="2"/>
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "grid", placeItems: "center",
          fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 14,
        }}>{m}:{s}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, color: "var(--good)", fontFamily: "var(--font-mono)", letterSpacing: ".1em", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--good)", animation: "pulse-ring 1.4s infinite" }}/>
          ENFOCADO
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-display)", marginTop: 2 }}>Matemática</div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>Prueba unidad 3</div>
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {[1,1,1,0].map((on, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: on ? "var(--brand)" : "var(--bg)",
              border: "1px solid var(--ink)",
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniChart() {
  const bars = [3.2, 5.1, 2.4, 7.0, 4.3, 8.2, 6.1];
  const labels = ["L","M","M","J","V","S","D"];
  const max = Math.max(...bars);
  const total = bars.reduce((a,b) => a+b, 0).toFixed(1);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>{total}h</span>
          <span style={{ fontSize: 10, color: "var(--ink-3)", marginLeft: 6, fontFamily: "var(--font-mono)" }}>esta semana</span>
        </div>
        <span style={{ fontSize: 10, color: "var(--good)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>↑ +24%</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70 }}>
        {bars.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column-reverse", height: 56 }}>
              <div style={{
                width: "100%", height: (v/max) * 56, borderRadius: 4,
                background: i === 5 ? "var(--brand)" : "var(--secondary)",
                border: "1.5px solid var(--ink)",
              }}/>
              {i === 5 && <div style={{
                position: "absolute", top: -2, left: "50%", transform: "translateX(-50%)",
                fontSize: 9, fontFamily: "var(--font-mono)", fontWeight: 800,
                background: "var(--ink)", color: "white", padding: "1px 4px", borderRadius: 3,
              }}>{v}h</div>}
            </div>
            <span style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--ink-3)", fontWeight: 700 }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniQuiz() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <span style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--brand-ink)", background: "var(--brand-soft)", padding: "2px 5px", borderRadius: 4, letterSpacing: ".06em" }}>BIOLOGÍA</span>
        <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>3/10</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>¿Cuál es la unidad básica de la vida?</div>
      {[
        { t: "La célula", ok: true },
        { t: "El átomo" },
        { t: "El tejido" },
      ].map((o, i) => (
        <div key={i} style={{
          padding: "5px 9px", borderRadius: 8,
          border: "1.5px solid " + (o.ok ? "var(--good)" : "var(--line-2)"),
          background: o.ok ? "color-mix(in oklab, var(--good) 14%, var(--surface))" : "var(--surface)",
          fontSize: 11, fontWeight: 700,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              background: o.ok ? "var(--good)" : "var(--bg)", color: o.ok ? "white" : "var(--ink-3)",
              padding: "1px 4px", borderRadius: 3, fontWeight: 800,
            }}>{["A","B","C"][i]}</span>
            {o.t}
          </span>
          {o.ok && <span style={{ color: "var(--good)" }}><IconCheck size={12} strokeWidth={3.5}/></span>}
        </div>
      ))}
    </div>
  );
}

function MiniBadges() {
  const items = [
    { c: "var(--gold)",     l: "7d",  ic: <IconFire size={14}/>, locked: false },
    { c: "var(--secondary)",l: "30d", ic: <IconFire size={14}/>, locked: false },
    { c: "var(--brand)",    l: "100h",ic: <IconTimer size={14}/>, locked: false },
    { c: "var(--ink-3)",    l: "?",   ic: <IconStar size={14}/>, locked: true },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-3)", letterSpacing: ".08em", marginBottom: 8 }}>LOGROS · 12 / 24</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
        {items.map((b, i) => (
          <div key={i} style={{
            flex: 1, aspectRatio: "1",
            borderRadius: 12,
            background: b.locked ? "var(--bg)" : b.c,
            border: "2px solid var(--ink)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 1,
            color: b.locked ? "var(--ink-3)" : "white",
            boxShadow: b.locked ? "none" : "0 3px 0 0 var(--ink)",
            opacity: b.locked ? 0.55 : 1,
            position: "relative",
          }}>
            {b.ic}
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 10 }}>{b.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniCoins() {
  const items = [
    { n: "Banner Neón",  cost: 200, owned: true,  c: "var(--brand)" },
    { n: "Tema Dorado",  cost: 450, owned: true,  c: "var(--gold)" },
    { n: "Marco Diamante", cost: 800, owned: false, c: "var(--secondary)" },
  ];
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
      <div className="mini-coins-balance" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "var(--ink)", color: "white",
        padding: "6px 10px", borderRadius: 8,
      }}>
        <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: ".08em", color: "color-mix(in oklab, white 70%, transparent)" }}>SALDO</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14 }}>
          <span style={{ color: "var(--gold)" }}><IconCoin size={14}/></span>
          1.240
        </span>
      </div>
      {items.map((it, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 8,
          padding: "5px 8px", borderRadius: 8,
          background: "var(--surface)", border: "1.5px solid var(--line)",
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 5,
            background: it.c, border: "1.5px solid var(--ink)",
          }}/>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{it.n}</span>
          {it.owned ? (
            <span style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--good)", fontWeight: 800 }}>✓ TUYO</span>
          ) : (
            <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-2)", fontWeight: 800, display: "flex", alignItems: "center", gap: 2 }}>
              <span style={{ color: "var(--gold)" }}><IconCoin size={11}/></span>{it.cost}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Features() {
  const [hover, setHover] = React.useState(null);
  const items = [
    { id: 0, color: "var(--brand)",     icon: <IconCanvas/>,  title: "Material a todo el curso",   desc: "El profe sube el material desde Classroom y llega ordenado a cada alumno del curso, por clase.", mini: <MiniCanvas/> },
    { id: 1, color: "var(--secondary)", icon: <IconTimer/>,   title: "Modo Focus",             desc: "Cada alumno estudia de verdad y el colegio ve el tiempo de foco real, no solo las notas.",         mini: <MiniFocus/> },
    { id: 2, color: "var(--accent)",    icon: <IconChart/>,   title: "Analítica de estudio",   desc: "El profesor ve cuánto y cuándo estudia su curso, clase por clase.",        mini: <MiniChart/> },
    { id: 3, color: "var(--brand)",     icon: <IconBrain/>,   title: "Quizzes con IA",          desc: "La IA arma quizzes desde el material que sube el profe. Práctica alineada a la prueba real.", mini: <MiniQuiz/> },
    { id: 4, color: "var(--secondary)", icon: <IconMedal/>,   title: "Badges, ligas y rachas", desc: "La motivación que hace que los alumnos vuelvan a estudiar, sin que el colegio tenga que insistir.", mini: <MiniBadges/> },
    { id: 5, color: "var(--accent)",    icon: <IconCoin/>,    title: "Economía de monedas",    desc: "Recompensas que mantienen el hábito. Pura estética: no afectan las notas.",  mini: <MiniCoins/> },
  ];
  return (
    <section id="features">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"/> Para todo el colegio</span>
          <h2>Una plataforma para profes,<br/>alumnos y apoderados.</h2>
          <p>Seis piezas que convierten el material del colegio en estudio real, medible y, por fin, motivante.</p>
        </div>
        <div className="feat-grid" style={featStyles.grid}>
          {items.map((it) => (
            <div key={it.id}
              style={featStyles.card(hover === it.id)}
              onMouseEnter={() => setHover(it.id)}
              onMouseLeave={() => setHover(null)}>
              <div style={featStyles.iconBox(it.color)}>{React.cloneElement(it.icon, { size: 24 })}</div>
              <div style={featStyles.title}>{it.title}</div>
              <div style={featStyles.desc}>{it.desc}</div>
              <div style={featStyles.miniWrap}>{it.mini}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) { .feat-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .feat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

window.Features = Features;
