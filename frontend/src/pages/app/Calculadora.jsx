import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

const Slider = ({ label, value, onChange, min, max, step, unit, suffix }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-3">
      <label className="text-sm font-medium text-[#8892A4]">{label}</label>
      <span className="text-lg font-bold text-[#F0F4FF]">{value}{suffix || ''}{unit || ''}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step || 1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, #1B93A4 0%, #3B82F6 ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`
      }}
    />
    <div className="flex justify-between mt-1 text-xs text-[#8892A4]">
      <span>{min}{unit || ''}</span>
      <span>{max}{unit || ''}</span>
    </div>
  </div>
);

const Calculadora = () => {
  const [llamadasDia, setLlamadasDia] = useState(10);
  const [pctPerdidas, setPctPerdidas] = useState(40);
  const [ticketMedio, setTicketMedio] = useState(800);
  const [horasAdmin, setHorasAdmin] = useState(10);

  const results = useMemo(() => {
    const leadsRecuperados = llamadasDia * (pctPerdidas / 100) * 22;
    const ingresosExtra = leadsRecuperados * ticketMedio * 0.3;
    const horasAhorradas = horasAdmin * 0.7 * 4;
    const roiMeses = ingresosExtra > 0 ? Math.ceil(500 / (ingresosExtra / 12)) : 99;
    return { leadsRecuperados, ingresosExtra, horasAhorradas, roiMeses };
  }, [llamadasDia, pctPerdidas, ticketMedio, horasAdmin]);

  const scenarios = [
    { label: 'Conservador', factor: 0.6, color: '#8892A4' },
    { label: 'Medio', factor: 1.0, color: '#3B82F6' },
    { label: 'Ambicioso', factor: 1.4, color: '#1B93A4' },
  ];

  return (
    <div className="min-h-screen bg-[#080B14]" data-testid="calculadora-page">
      <header className="bg-[#0D1117] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B93A4] via-[#3B82F6] to-[#D946EF] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#F0F4FF]">Leapifyes</span>
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-white/10 text-[#8892A4] hover:bg-white/5 hover:text-[#F0F4FF]">
              Volver al sitio
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">Calculadora de <span className="gradient-text">Impacto</span></h1>
          <p className="text-lg text-[#8892A4] max-w-2xl mx-auto">Introduce 4 parámetros de tu negocio y calcula cuánto puedes ganar automatizando. Ver los números cambia todo.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Sliders */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-white/10 bg-[#161B22]">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-[#F0F4FF] mb-8">Tu negocio hoy</h2>
                <Slider label="Llamadas/contactos al día" value={llamadasDia} onChange={setLlamadasDia} min={1} max={50} />
                <Slider label="% de contactos que pierdes" value={pctPerdidas} onChange={setPctPerdidas} min={10} max={80} suffix="%" />
                <Slider label="Ticket medio por cliente" value={ticketMedio} onChange={setTicketMedio} min={100} max={5000} step={50} suffix="€" />
                <Slider label="Horas admin por semana" value={horasAdmin} onChange={setHorasAdmin} min={2} max={30} suffix="h" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-[#F0F4FF]">Tu potencial con automatización</h2>

            <div className="grid gap-4">
              {scenarios.map((s) => (
                <Card key={s.label} className="border-white/10 bg-[#161B22]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: s.color, fontFamily: 'Space Grotesk, sans-serif' }}>{s.label}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-[#8892A4]">{s.factor}x</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <DollarSign className="w-5 h-5 mx-auto mb-1" style={{ color: s.color }} />
                        <p className="text-2xl font-black text-[#F0F4FF]">{Math.round(results.ingresosExtra * s.factor).toLocaleString('es-ES')}€</p>
                        <p className="text-xs text-[#8892A4]">extra/mes</p>
                      </div>
                      <div className="text-center">
                        <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: s.color }} />
                        <p className="text-2xl font-black text-[#F0F4FF]">{Math.round(results.horasAhorradas * s.factor)}h</p>
                        <p className="text-xs text-[#8892A4]">ahorradas/semana</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-5 h-5 mx-auto mb-1" style={{ color: s.color }} />
                        <p className="text-2xl font-black text-[#F0F4FF]">{Math.round(results.roiMeses / s.factor)}m</p>
                        <p className="text-xs text-[#8892A4]">ROI payback</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="glass-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B93A4]/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="text-2xl font-black text-[#F0F4FF] mb-2">
                  Podrías facturar <span className="gradient-text">{Math.round(results.ingresosExtra).toLocaleString('es-ES')}€</span> más al mes
                </p>
                <p className="text-[#8892A4] mb-6">Recuperando {Math.round(results.horasAhorradas)} horas semanales</p>
                <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                  <Button className="btn-gradient" data-testid="calculadora-cta">
                    Quiero estos resultados <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Calculadora;
