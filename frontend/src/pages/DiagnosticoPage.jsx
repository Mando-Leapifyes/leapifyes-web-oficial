import { useState, useEffect, useRef } from "react";

const COLORS = {
  turquoise: "#00D4C8",
  magenta: "#E8008A",
  blue: "#3B0BDB",
  lavender: "#C8B8F8",
  pink: "#F8C8E8",
  dark: "#0A0A1A",
  darkCard: "#111128",
  darkBorder: "#1E1E3A",
  textMuted: "#888AAA",
};

const dimensions = [
  {
    id: "estrategia",
    label: "Estrategia y Negocio",
    icon: "🎯",
    color: "#00D4C8",
    questions: [
      {
        id: "e1",
        text: "¿Tu negocio tiene una hoja de ruta digital definida?",
        options: [
          { label: "No existe ningún plan", value: 0 },
          { label: "Hay ideas pero nada formal", value: 25 },
          { label: "Tenemos estrategia en papel", value: 60 },
          { label: "Estrategia activa con KPIs", value: 85 },
          { label: "Estrategia digital líder en nuestro sector", value: 100 },
        ],
      },
      {
        id: "e2",
        text: "¿Invertís en digitalización de forma planificada?",
        options: [
          { label: "No invertimos en esto", value: 0 },
          { label: "Gastos puntuales sin plan", value: 20 },
          { label: "Inversión anual definida", value: 55 },
          { label: "Partida presupuestaria fija", value: 80 },
          { label: "R&D digital continuo", value: 100 },
        ],
      },
      {
        id: "e3",
        text: "¿Cómo gestionáis la innovación?",
        options: [
          { label: "No innovamos activamente", value: 0 },
          { label: "Copiamos lo que funciona en el sector", value: 25 },
          { label: "Probamos tecnologías nuevas", value: 55 },
          { label: "Proceso formal de innovación", value: 80 },
          { label: "Innovación colaborativa interna + externa", value: 100 },
        ],
      },
    ],
  },
  {
    id: "procesos",
    label: "Procesos",
    icon: "⚙️",
    color: "#E8008A",
    questions: [
      {
        id: "p1",
        text: "¿Cómo registráis la información de vuestros procesos?",
        options: [
          { label: "Todo en papel", value: 0 },
          { label: "Excel y documentos sueltos", value: 20 },
          { label: "Software en algunos departamentos", value: 50 },
          { label: "ERP/CRM en la mayoría de procesos", value: 80 },
          { label: "100% digitalizado e integrado", value: 100 },
        ],
      },
      {
        id: "p2",
        text: "¿Vuestros sistemas están conectados con clientes y proveedores?",
        options: [
          { label: "Sin conexión digital", value: 0 },
          { label: "Email y teléfono únicamente", value: 15 },
          { label: "Conexión con algunos", value: 45 },
          { label: "Mayoría conectada digitalmente", value: 75 },
          { label: "Ecosistema digital integrado", value: 100 },
        ],
      },
      {
        id: "p3",
        text: "¿Qué nivel de automatización tenéis?",
        options: [
          { label: "Todo manual", value: 0 },
          { label: "Alguna tarea automatizada", value: 20 },
          { label: "Automatización en áreas clave", value: 50 },
          { label: "Alta automatización operativa", value: 80 },
          { label: "Procesos autónomos con IA", value: 100 },
        ],
      },
    ],
  },
  {
    id: "personas",
    label: "Organización y Personas",
    icon: "👥",
    color: "#3B0BDB",
    questions: [
      {
        id: "o1",
        text: "¿Qué nivel digital tienen las personas de tu equipo?",
        options: [
          { label: "Poco conocimiento digital", value: 0 },
          { label: "Uso básico de herramientas", value: 25 },
          { label: "Competencia digital media", value: 55 },
          { label: "Alta competencia, formación continua", value: 80 },
          { label: "Roles digitales especializados", value: 100 },
        ],
      },
      {
        id: "o2",
        text: "¿Existe un responsable de transformación digital?",
        options: [
          { label: "Nadie se ocupa de esto", value: 0 },
          { label: "Lo gestiona el CEO a ratos", value: 20 },
          { label: "Un responsable parcial", value: 50 },
          { label: "Responsable dedicado", value: 80 },
          { label: "Equipo digital especializado", value: 100 },
        ],
      },
      {
        id: "o3",
        text: "¿Cómo colabora tu equipo digitalmente?",
        options: [
          { label: "Sin herramientas de colaboración", value: 0 },
          { label: "WhatsApp y email", value: 15 },
          { label: "Herramientas básicas (Teams, Drive)", value: 45 },
          { label: "Plataformas integradas", value: 75 },
          { label: "Cultura digital colaborativa total", value: 100 },
        ],
      },
    ],
  },
  {
    id: "infraestructura",
    label: "Infraestructura",
    icon: "🏗️",
    color: "#C8B8F8",
    questions: [
      {
        id: "i1",
        text: "¿Qué capacidad tecnológica tienen vuestros sistemas?",
        options: [
          { label: "Sistemas obsoletos o inexistentes", value: 0 },
          { label: "Herramientas básicas sin integrar", value: 20 },
          { label: "Infraestructura parcialmente moderna", value: 50 },
          { label: "Sistemas robustos y escalables", value: 80 },
          { label: "Infraestructura cloud-first avanzada", value: 100 },
        ],
      },
      {
        id: "i2",
        text: "¿Usáis tecnologías cloud?",
        options: [
          { label: "Todo local/físico", value: 0 },
          { label: "Correo y almacenamiento básico", value: 20 },
          { label: "Algunas apps en cloud", value: 50 },
          { label: "Mayoría de ops en cloud", value: 80 },
          { label: "Cloud-native, multi-plataforma", value: 100 },
        ],
      },
      {
        id: "i3",
        text: "¿Qué nivel de ciberseguridad tenéis?",
        options: [
          { label: "Sin medidas de seguridad", value: 0 },
          { label: "Antivirus básico", value: 20 },
          { label: "Políticas básicas implementadas", value: 50 },
          { label: "Auditorías y monitorización activa", value: 80 },
          { label: "Ciberseguridad integral y proactiva", value: 100 },
        ],
      },
    ],
  },
  {
    id: "productos",
    label: "Productos y Servicios",
    icon: "📦",
    color: "#F8C8E8",
    questions: [
      {
        id: "ps1",
        text: "¿Vuestros productos/servicios tienen componentes digitales?",
        options: [
          { label: "Sin componentes digitales", value: 0 },
          { label: "Presencia online básica", value: 20 },
          { label: "Algunos servicios digitalizados", value: 50 },
          { label: "Mayoría con funcionalidades digitales", value: 80 },
          { label: "Producto digital nativo", value: 100 },
        ],
      },
      {
        id: "ps2",
        text: "¿Recopiláis y analizáis datos de uso de vuestros servicios?",
        options: [
          { label: "No recopilamos datos", value: 0 },
          { label: "Datos básicos sin analizar", value: 20 },
          { label: "Análisis manual periódico", value: 50 },
          { label: "Analytics automatizado", value: 80 },
          { label: "IA para decisiones en tiempo real", value: 100 },
        ],
      },
      {
        id: "ps3",
        text: "¿Tus servicios generan ingresos basados en datos?",
        options: [
          { label: "No, servicios tradicionales", value: 0 },
          { label: "En exploración", value: 20 },
          { label: "Algunos servicios data-driven", value: 50 },
          { label: "Parte significativa del negocio", value: 80 },
          { label: "Core del modelo de negocio", value: 100 },
        ],
      },
    ],
  },
];

const maturityLevels = [
  { min: 0, max: 20, label: "Estático", emoji: "🔴", color: "#FF4444", desc: "Sin presencia digital. Es el momento de empezar." },
  { min: 20, max: 40, label: "Consciente", emoji: "🟠", color: "#FF8C00", desc: "Primeros pasos digitales. El potencial está por explotar." },
  { min: 40, max: 60, label: "Competente", emoji: "🟡", color: "#FFD700", desc: "Base sólida. Falta integración y estrategia clara." },
  { min: 60, max: 75, label: "Dinámico", emoji: "🟢", color: "#00C851", desc: "Transformación en marcha. Momentum positivo." },
  { min: 75, max: 88, label: "Referente", emoji: "🔵", color: "#00D4C8", desc: "Liderando el sector. Optimización continua." },
  { min: 88, max: 101, label: "Líder", emoji: "🟣", color: "#E8008A", desc: "Industria 4.0 consolidada. Modelo para el sector." },
];

function getLevel(score) {
  return maturityLevels.find((l) => score >= l.min && score < l.max) || maturityLevels[maturityLevels.length - 1];
}

function RadarChart({ scores }) {
  const cx = 150, cy = 150, r = 110;
  const dims = dimensions.map((d, i) => {
    const angle = (i * 2 * Math.PI) / dimensions.length - Math.PI / 2;
    return { ...d, angle, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const getPoint = (score, angle, radius) => {
    const sr = (score / 100) * radius;
    return { x: cx + sr * Math.cos(angle), y: cy + sr * Math.sin(angle) };
  };

  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto">
      {gridLevels.map((lvl) => (
        <polygon
          key={lvl}
          points={dims.map((d) => { const p = getPoint(lvl, d.angle, r); return `${p.x},${p.y}`; }).join(" ")}
          fill="none"
          stroke="#1E1E3A"
          strokeWidth="1"
        />
      ))}
      {dims.map((d) => (
        <line key={d.id} x1={cx} y1={cy} x2={d.x} y2={d.y} stroke="#1E1E3A" strokeWidth="1" />
      ))}
      <polygon
        points={dims.map((d) => { const s = scores[d.id] || 0; const p = getPoint(s, d.angle, r); return `${p.x},${p.y}`; }).join(" ")}
        fill="rgba(0,212,200,0.15)"
        stroke="#00D4C8"
        strokeWidth="2"
      />
      {dims.map((d) => {
        const s = scores[d.id] || 0;
        const p = getPoint(s, d.angle, r);
        return <circle key={d.id} cx={p.x} cy={p.y} r="4" fill={d.color} />;
      })}
      {dims.map((d) => (
        <text
          key={d.id + "label"}
          x={d.x + (d.x > cx ? 8 : d.x < cx ? -8 : 0)}
          y={d.y + (d.y > cy ? 14 : d.y < cy ? -6 : 4)}
          fontSize="9"
          fill="#888AAA"
          textAnchor={d.x > cx + 5 ? "start" : d.x < cx - 5 ? "end" : "middle"}
        >
          {d.icon}
        </text>
      ))}
    </svg>
  );
}

function ScoreBar({ score, color, label }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span style={{ color: "#888AAA", fontSize: 13 }}>{label}</span>
        <span style={{ color, fontSize: 13, fontWeight: 700 }}>{Math.round(score)}%</span>
      </div>
      <div style={{ background: "#1E1E3A", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div
          style={{
            width: `${animated}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            height: "100%",
            borderRadius: 99,
            transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

const STEP_INTRO = "intro";
const STEP_QUESTIONS = "questions";
const STEP_RESULTS = "results";

export default function LeapifyesIMD() {
  const [step, setStep] = useState(STEP_INTRO);
  const [currentDim, setCurrentDim] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [showForm, setShowForm] = useState(false);
  const resultsRef = useRef(null);

  const totalQuestions = dimensions.reduce((sum, d) => sum + d.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const dim = dimensions[currentDim];
  const question = dim?.questions[currentQ];

  function handleAnswer(qId, value) {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      const nextQ = currentQ + 1;
      if (nextQ < dim.questions.length) {
        setCurrentQ(nextQ);
      } else {
        const nextDim = currentDim + 1;
        if (nextDim < dimensions.length) {
          setCurrentDim(nextDim);
          setCurrentQ(0);
        } else {
          setStep(STEP_RESULTS);
          fetchAIAnalysis(newAnswers);
        }
      }
    }, 300);
  }

  function getDimensionScore(dimId) {
    const dim = dimensions.find((d) => d.id === dimId);
    if (!dim) return 0;
    const vals = dim.questions.map((q) => answers[q.id] ?? null).filter((v) => v !== null);
    if (!vals.length) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  const scores = dimensions.reduce((acc, d) => ({ ...acc, [d.id]: getDimensionScore(d.id) }), {});
  const globalScore = Object.values(scores).reduce((a, b) => a + b, 0) / dimensions.length;
  const level = getLevel(globalScore);

  async function fetchAIAnalysis(ans) {
    setAiLoading(true);
    try {
      const summary = dimensions.map((d) => {
        const dimAnswers = d.questions.map((q) => {
          const option = q.options.find((o) => o.value === ans[q.id]);
          return `- ${q.text}: ${option?.label || "Sin responder"}`;
        }).join("\n");
        const score = d.questions.map((q) => ans[q.id] ?? 0).reduce((a, b) => a + b, 0) / d.questions.length;
        return `\n## ${d.label} (${Math.round(score)}%)\n${dimAnswers}`;
      }).join("\n");

      const globalScoreCalc = dimensions.reduce((acc, d) => {
        return acc + d.questions.map((q) => ans[q.id] ?? 0).reduce((a, b) => a + b, 0) / d.questions.length;
      }, 0) / dimensions.length;

      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
      const resp = await fetch(`${BACKEND_URL}/api/imd-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Eres el Agente de Transformación Digital de Leapifyes, consultora especializada en PYMEs y autónomos en España. Tu misión es analizar el índice de madurez digital de una empresa y dar un diagnóstico claro, directo y accionable. Tono: profesional, directo, empático. Habla como un consultor de élite en una terraza de hotel de lujo — sin relleno, sin paja. Usa emojis estratégicamente. Máximo 350 palabras. Estructura: 1) Diagnóstico ejecutivo (2-3 frases), 2) Fortalezas detectadas (2 puntos), 3) Áreas prioritarias de mejora (3 puntos con acción concreta), 4) Frase de cierre motivadora. NUNCA menciones el informe HADA ni competidores.`,
          messages: [{
            role: "user",
            content: `Analiza este diagnóstico de madurez digital:\n\nPuntuación global: ${Math.round(globalScoreCalc)}%\nNivel: ${getLevel(globalScoreCalc).label}\n${summary}\n\nEmpresa: ${company || "PYME española"}\nSector: ${sector || "No especificado"}\nContacto: ${name || "No especificado"}`
          }]
        })
      });
      const data = await resp.json();
      const text = data.content?.map((c) => c.text || "").join("") || "Análisis no disponible.";
      setAiAnalysis(text);
    } catch {
      setAiAnalysis("No se pudo generar el análisis en este momento. Contacta con Leapifyes para un diagnóstico personalizado.");
    }
    setAiLoading(false);
  }

  function restart() {
    setStep(STEP_INTRO);
    setCurrentDim(0);
    setCurrentQ(0);
    setAnswers({});
    setAiAnalysis("");
    setName("");
    setCompany("");
    setSector("");
    setShowForm(false);
  }

  // ─── INTRO ───
  if (step === STEP_INTRO) {
    return (
      <div style={{ background: COLORS.dark, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: "#fff" }}>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#111128", border: "1px solid #1E1E3A", borderRadius: 99, padding: "8px 20px", marginBottom: 32 }}>
              <span style={{ fontSize: 12, color: COLORS.turquoise, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Leapifyes</span>
              <span style={{ color: "#1E1E3A" }}>·</span>
              <span style={{ fontSize: 12, color: "#888AAA", letterSpacing: 1 }}>Índice de Madurez Digital</span>
            </div>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
              ¿Cómo de digital{" "}
              <span style={{ background: `linear-gradient(135deg, ${COLORS.turquoise}, ${COLORS.magenta})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                es tu negocio?
              </span>
            </h1>
            <p style={{ color: "#888AAA", fontSize: 16, lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
              Diagnóstico inteligente en 5 minutos. Descubre tu nivel de madurez digital y recibe un plan de acción personalizado con IA.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 40 }}>
            {[
              { n: "15", label: "Preguntas", icon: "❓" },
              { n: "5 min", label: "Duración", icon: "⚡" },
              { n: "IA", label: "Análisis", icon: "🤖" },
            ].map((s) => (
              <div key={s.label} style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`, borderRadius: 16, padding: "20px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.turquoise }}>{s.n}</div>
                <div style={{ fontSize: 11, color: "#888AAA", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Dimensions preview */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, color: "#888AAA", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Áreas evaluadas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {dimensions.map((d) => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`, borderRadius: 12, padding: "12px 16px" }}>
                  <span style={{ fontSize: 20 }}>{d.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: d.color }}>{d.label}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: "#888AAA" }}>{d.questions.length} preguntas</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setStep(STEP_QUESTIONS)}
            style={{
              width: "100%", padding: "18px 32px", borderRadius: 16, border: "none", cursor: "pointer",
              background: `linear-gradient(135deg, ${COLORS.turquoise}, ${COLORS.blue})`,
              color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: 0.5,
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: `0 8px 32px ${COLORS.turquoise}44`,
            }}
          >
            Iniciar diagnóstico →
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "#555577", marginTop: 12 }}>
            Gratis · Sin registro · Resultados inmediatos
          </p>
        </div>
      </div>
    );
  }

  // ─── QUESTIONS ───
  if (step === STEP_QUESTIONS && question) {
    const dimProgress = ((currentQ) / dim.questions.length) * 100;
    return (
      <div style={{ background: COLORS.dark, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: "#fff" }}>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet" />

        {/* Progress bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, background: COLORS.dark, borderBottom: `1px solid ${COLORS.darkBorder}`, padding: "16px 24px" }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: COLORS.turquoise, fontWeight: 700 }}>{dim.icon} {dim.label}</span>
              <span style={{ fontSize: 12, color: "#888AAA" }}>{answeredCount}/{totalQuestions}</span>
            </div>
            <div style={{ background: "#1E1E3A", borderRadius: 99, height: 4 }}>
              <div style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${COLORS.turquoise}, ${COLORS.magenta})`, height: "100%", borderRadius: 99, transition: "width 0.5s" }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
          {/* Dimension indicator */}
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            {dimensions.map((d, i) => (
              <div key={d.id} style={{ flex: 1, height: 3, borderRadius: 99, background: i < currentDim ? d.color : i === currentDim ? `linear-gradient(90deg, ${d.color}, ${d.color}44)` : "#1E1E3A", transition: "all 0.3s" }} />
            ))}
          </div>

          {/* Question */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 12, color: "#888AAA", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
              Pregunta {currentQ + 1} de {dim.questions.length}
            </div>
            <h2 style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700, lineHeight: 1.4 }}>
              {question.text}
            </h2>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {question.options.map((opt, i) => {
              const isHovered = hoveredOption === `${question.id}-${i}`;
              const isAnswered = answers[question.id] === opt.value;
              return (
                <button
                  key={i}
                  onMouseEnter={() => setHoveredOption(`${question.id}-${i}`)}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={() => { handleAnswer(question.id, opt.value); setHoveredOption(null); }}
                  style={{
                    padding: "16px 20px", borderRadius: 14, border: `1px solid ${isHovered || isAnswered ? dim.color : COLORS.darkBorder}`,
                    background: isAnswered ? `${dim.color}22` : isHovered ? `${dim.color}11` : COLORS.darkCard,
                    color: isHovered || isAnswered ? dim.color : "#fff",
                    fontSize: 14, fontWeight: isHovered ? 600 : 400, cursor: "pointer",
                    textAlign: "left", fontFamily: "'Montserrat', sans-serif",
                    transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12,
                  }}
                >
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: isHovered || isAnswered ? `${dim.color}33` : "#1E1E3A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: dim.color, flexShrink: 0 }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULTS ───
  if (step === STEP_RESULTS) {
    return (
      <div style={{ background: COLORS.dark, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: "#fff" }} ref={resultsRef}>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>

          {/* Score hero */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, color: COLORS.turquoise, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Tu Índice de Madurez Digital</div>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
              <div style={{ width: 140, height: 140, borderRadius: "50%", background: `conic-gradient(${level.color} ${globalScore * 3.6}deg, #1E1E3A 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 110, height: 110, borderRadius: "50%", background: COLORS.dark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: level.color }}>{Math.round(globalScore)}</span>
                  <span style={{ fontSize: 10, color: "#888AAA" }}>/ 100</span>
                </div>
              </div>
            </div>
            <div style={{ display: "inline-block", background: `${level.color}22`, border: `1px solid ${level.color}44`, borderRadius: 99, padding: "6px 20px", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: level.color }}>{level.emoji} Nivel {level.label}</span>
            </div>
            <p style={{ color: "#888AAA", fontSize: 14, lineHeight: 1.6 }}>{level.desc}</p>
          </div>

          {/* Radar + Scores */}
          <div style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`, borderRadius: 20, padding: 24, marginBottom: 24 }}>
            <RadarChart scores={scores} />
            <div style={{ marginTop: 20 }}>
              {dimensions.map((d) => (
                <ScoreBar key={d.id} score={scores[d.id]} color={d.color} label={`${d.icon} ${d.label}`} />
              ))}
            </div>
          </div>

          {/* Benchmarking */}
          <div style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`, borderRadius: 20, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#888AAA", letterSpacing: 1, textTransform: "uppercase" }}>Comparativa sector</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Tu empresa", score: Math.round(globalScore), color: level.color, bold: true },
                { label: "Media PYMEs España", score: 42, color: "#888AAA" },
                { label: "Media Barcelona", score: 38, color: "#888AAA" },
                { label: "Nivel Líder", score: 90, color: COLORS.magenta },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: item.bold ? "#fff" : "#888AAA", fontWeight: item.bold ? 700 : 400 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: item.color, fontWeight: 700 }}>{item.score}%</span>
                  </div>
                  <div style={{ background: "#1E1E3A", borderRadius: 99, height: 5 }}>
                    <div style={{ width: `${item.score}%`, background: item.bold ? `linear-gradient(90deg, ${item.color}, ${item.color}88)` : "#1E1E3A44", border: item.bold ? "none" : `1px solid ${item.color}`, height: "100%", borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`, borderRadius: 20, padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.turquoise}33, ${COLORS.magenta}33)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Análisis IA Leapifyes</h3>
                <span style={{ fontSize: 11, color: COLORS.turquoise }}>Diagnóstico personalizado</span>
              </div>
            </div>
            {aiLoading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#888AAA", padding: "20px 0" }}>
                <div style={{ width: 20, height: 20, border: `2px solid ${COLORS.turquoise}44`, borderTop: `2px solid ${COLORS.turquoise}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                <span style={{ fontSize: 14 }}>Analizando tu diagnóstico...</span>
              </div>
            ) : (
              <div style={{ fontSize: 14, lineHeight: 1.8, color: "#CCCCDD", whiteSpace: "pre-wrap" }}>
                {aiAnalysis}
              </div>
            )}
          </div>

          {/* CTA */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              style={{
                width: "100%", padding: "18px 32px", borderRadius: 16, border: "none", cursor: "pointer",
                background: `linear-gradient(135deg, ${COLORS.turquoise}, ${COLORS.magenta})`,
                color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: "'Montserrat', sans-serif",
                boxShadow: `0 8px 32px ${COLORS.magenta}44`, marginBottom: 12,
              }}
            >
              🚀 Quiero un plan de acción personalizado
            </button>
          ) : (
            <div style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`, borderRadius: 20, padding: 24, marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Un paso más</h3>
              <p style={{ fontSize: 13, color: "#888AAA", marginBottom: 20 }}>Déjanos tus datos y te contactamos para una sesión estratégica gratuita.</p>
              {[
                { label: "Tu nombre", value: name, setter: setName, placeholder: "Ricardo García" },
                { label: "Empresa", value: company, setter: setCompany, placeholder: "Mi Empresa S.L." },
                { label: "Sector", value: sector, setter: setSector, placeholder: "Construcción, consultoría, retail..." },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, color: "#888AAA", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${COLORS.darkBorder}`,
                      background: COLORS.dark, color: "#fff", fontSize: 14, fontFamily: "'Montserrat', sans-serif",
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <a
                href="https://crm.zoho.eu/bookings/Calendariodelaweb"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block", width: "100%", padding: "16px 32px", borderRadius: 14,
                  background: `linear-gradient(135deg, ${COLORS.turquoise}, ${COLORS.blue})`,
                  color: "#fff", fontSize: 15, fontWeight: 800, textAlign: "center",
                  textDecoration: "none", fontFamily: "'Montserrat', sans-serif",
                  boxSizing: "border-box",
                }}
              >
                Agendar sesión estratégica →
              </a>
            </div>
          )}

          <button
            onClick={restart}
            style={{ width: "100%", padding: "14px", borderRadius: 14, border: `1px solid ${COLORS.darkBorder}`, background: "transparent", color: "#888AAA", fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}
          >
            Repetir diagnóstico
          </button>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return null;
}
