```
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    CheckCircle2, ArrowLeft, Send, CheckCircle,
    AlertCircle, Star, Users, Briefcase, Zap,
    TrendingUp, Rocket, Shield, Target, Clock,
    ArrowRight, Calendar
} from 'lucide-react';
import axios from 'axios';
import { ASSETS } from '../lib/assets';
import { toast } from 'sonner';

const PLAN_DATA = {
    'start': {
        name: 'START',
        tagline: 'El primer paso para ordenar tu negocio',
        price: '497',
        color: '#1B93A4',
        badge: 'Ideal para comenzar',
        perfil: "Autónomos y pymes que quieren ordenar su negocio digital sin complicaciones. Si sientes que pierdes clientes por falta de seguimiento o tus procesos son manuales y caóticos, este es tu punto de partida.",
        incluye: [
            'Diagnóstico digital completo de tu negocio',
            'CRM básico configurado y en funcionamiento',
            '1 automatización crítica implementada',
            'Seguimiento mensual dedicado',
            'Acceso portal de clientes Leapifyes',
            'Informe de resultados mensual'
        ],
        proceso: [
            { num: '01', title: 'Diagnóstico inicial', desc: 'Analizamos tus puntos de dolor y procesos actuales.' },
            { num: '02', title: 'Plan de acción 30 días', desc: 'Definimos objetivos claros y alcanzables a corto plazo.' },
            { num: '03', title: 'Implementación guiada', desc: 'Configuramos las herramientas y te enseñamos a usarlas.' },
            { num: '04', title: 'Seguimiento mensual', desc: 'Revisamos resultados y ajustamos el rumbo.' }
        ],
        resultados: [
            { icon: Clock, val: '3-5h', label: 'Horas recuperadas', desc: 'Tiempo semanal libre de tareas manuales.' },
            { icon: TrendingUp, val: '+30%', label: 'Tasa de seguimiento', desc: 'Más clientes contactados profesionalmente.' },
            { icon: Zap, val: '30 días', label: 'Time-to-value', desc: 'Resultados visibles desde el primer mes.' }
        ]
    },
    'essential': {
        name: 'ESSENTIAL',
        tagline: 'Estructura sólida para crecer con equipo',
        price: '750',
        color: '#3B82F6',
        badge: 'El más elegido',
        perfil: "Pymes con equipo que necesitan procesos claros, un CRM que funcione de verdad y su equipo alineado. Si ya tienes clientes pero sientes que el crecimiento se complica con el desorden, este plan te da la estructura.",
        incluye: [
            'Todo lo incluido en el plan START',
            'CRM avanzado con embudo de ventas personalizado',
            '3 automatizaciones activas distribuidas',
            'Formación equipo (hasta 5 personas)',
            'Revisión estratégica bimestral',
            'Dashboard de KPIs en tiempo real',
            'Soporte prioritario via portal'
        ],
        proceso: [
            { num: '01', title: 'Auditoría de procesos', desc: 'Mapeamos cómo trabaja tu equipo hoy.' },
            { num: '02', title: 'Diseño del sistema', desc: 'Creamos la estructura que tu empresa necesita.' },
            { num: '03', title: 'Formación del equipo', desc: 'Aseguramos que todos sepan usar el sistema.' },
            { num: '04', title: 'Optimización continua', desc: 'Refinamos flujos para máxima eficiencia.' }
        ],
        resultados: [
            { icon: Users, val: '5 pers.', label: 'Equipo alineado', desc: 'Todo el equipo trabajando bajo un mismo proceso.' },
            { icon: Zap, val: '3 flujos', label: 'Automatización', desc: 'Procesos clave funcionando solos 24/7.' },
            { icon: TrendingUp, val: '+45%', label: 'Eficiencia', desc: 'Aumento real de la productividad comercial.' }
        ]
    },
    'pro': {
        name: 'PRO',
        tagline: 'Escalabilidad con Inteligencia Artificial',
        price: '950',
        color: '#00D4C8',
        badge: '⭐ Más popular',
        perfil: "Empresas en crecimiento que quieren escalar con un agente IA integrado, automatizaciones sin límite y un equipo de estrategia que trabaja contigo mensualmente.",
        incluye: [
            'Todo lo incluido en el plan ESSENTIAL',
            'Agente IA incluido (llamadas o WhatsApp)',
            'Automatizaciones múltiples sin límite',
            'Embudo comercial completo "Ready to Sell"',
            'Revisión estratégica mensual 1:1',
            'Landing page de conversión incluida',
            'Integraciones con tus herramientas actuales',
            'Soporte prioritario (respuesta <8h)'
        ],
        proceso: [
            { num: '01', title: 'Estrategia y roadmap', desc: 'Diseñamos tu ventaja competitiva digital.' },
            { num: '02', title: 'Implementación por bloques', desc: 'Activamos sistemas, IA y automatizaciones.' },
            { num: '03', title: 'Activación y pruebas', desc: 'Ponemos todo en marcha con supervisión real.' },
            { num: '04', title: 'Estrategia mensual activa', desc: 'Consultoría recurrente para escalar ventas.' }
        ],
        resultados: [
            { icon: Star, val: '24/7', label: 'Atención IA', desc: 'Tu negocio responde siempre, al instante.' },
            { icon: Target, val: '+60%', label: 'Leads cualificados', desc: 'Filtra mejores clientes automáticamente.' },
            { icon: Rocket, val: 'x2', label: 'Capacidad', desc: 'Duplica tu alcance comercial sin contratar más.' }
        ]
    },
    'premium-360': {
        name: 'PREMIUM 360',
        tagline: 'La transformación digital definitiva',
        price: '2.000',
        color: '#E8008A',
        badge: 'Máxima transformación',
        perfil: "Empresas que necesitan una transformación digital integral. Todos los servicios activos simultáneamente, gestión del cambio y un roadmap trimestral personalizado.",
        incluye: [
            'Estrategia integral con roadmap trimestral',
            'Todos los servicios de Leapifyes activos',
            'Gestión del cambio organizacional completa',
            'Desarrollo de sistemas a medida incluidos',
            'Agente IA multi-canal (Voz + Bot)',
            'Automatizaciones sin límite estructural',
            'Soporte VIP (respuesta <4h)',
            'Reporting ejecutivo mensual detallado',
            'Acceso directo al fundador (Canal Slack/WA)'
        ],
        proceso: [
            { num: '01', title: 'Inmersión estratégica', desc: 'Auditoría 360º de toda la organización.' },
            { num: '02', title: 'Activación paralela', desc: 'Desplegamos múltiples frentes a la vez.' },
            { num: '03', title: 'Gestión del cambio', desc: 'Acompañamos a las personas en la transición.' },
            { num: '04', title: 'Optimización trimestral', desc: 'Evolución constante del ecosistema digital.' }
        ],
        resultados: [
            { icon: Shield, val: '100%', label: 'Transformación', desc: 'Digitalización total de punta a punta.' },
            { icon: Clock, val: '<4h', label: 'Respuesta VIP', desc: 'Prioridad absoluta en todo momento.' },
            { icon: Calendar, val: 'Trimestral', label: 'Evolución', desc: 'Roadmap actualizado a tus necesidades.' }
        ]
    }
};

const ServicioDetalle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const plan = PLAN_DATA[slug];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        sector: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!plan && slug) {
            navigate('/');
        }
    }, [plan, slug, navigate]);

    if (!plan) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const payload = {
            ...formData,
            message: `[Servicio: ${ plan.name }]Motivo: ${ formData.message } `,
            service: plan.name,
            consent: true // Requerido por el backend
        };

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
            await axios.post(`${ backendUrl } /api/contact`, payload);
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        } catch (err) {
            console.error('Error enviando formulario:', err);
            setError('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
            toast.error('Error al enviar el formulario');
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToForm = () => {
        document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#0A0A1A] text-[#F0F4FF] flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h1 className="text-3xl font-bold mb-4">¡Solicitud recibida!</h1>
                <p className="text-[#8892A4] text-center max-w-md mb-8">
                    Gracias por tu interés en el plan {plan.name}. Nos pondremos en contacto contigo en menos de 24 horas laborables para agendar tu reunión estratégica.
                </p>
                <Link to="/" className="text-[#1B93A4] hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Volver al inicio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A1A] text-[#F0F4FF] selection:bg-[#1B93A4]/30">

            {/* 1. Header Fijo */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A1A]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#1B93A4]/30">
                            <img src={ASSETS.logoLeapifyes} alt="L" className="w-full h-full object-cover mix-blend-luminosity" />
                        </div>
                        <span className="font-black tracking-tight text-xl">LEAPIFYES</span>
                    </Link>
                    <Link to="/" className="text-sm font-medium text-[#8892A4] hover:text-[#F0F4FF] flex items-center gap-1.5 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Ver todos los planes
                    </Link>
                </div>
            </header>

            {/* 2. Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Glow decorativo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 opacity-20 blur-[120px]"
                    style={{ background: `radial - gradient(circle, ${ plan.color } 0 %, transparent 70 %)` }} />

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 border"
                        style={{ borderColor: `${ plan.color } 40`, color: plan.color, background: `${ plan.color } 10` }}>
                        {plan.badge}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none">
                        PLAN <span style={{ color: plan.color }}>{plan.name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#8892A4] mb-8 max-w-2xl mx-auto">
                        {plan.tagline}
                    </p>
                    <div className="mb-10">
                        <span className="text-sm text-[#8892A4] block mb-1">Inversión mensual</span>
                        <span className="text-5xl font-black" style={{ color: plan.color }}>Desde {plan.price}€</span>
                        <span className="text-[#8892A4] ml-2 text-xl">/mes</span>
                    </div>
                    <button
                        onClick={scrollToForm}
                        className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto transition-all active:scale-95"
                        style={{ backgroundColor: plan.color, color: '#fff' }}
                    >
                        Solicitar información <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* 3. ¿Para quién es? */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: plan.color }}>¿Para quién es este plan?</span>
                    <p className="text-2xl md:text-3xl text-[#F0F4FF] leading-relaxed font-medium">
                        {plan.perfil}
                    </p>
                </div>
            </section>

            {/* 4. Qué incluye */}
            <section className="py-20 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-8 block" style={{ color: plan.color }}>Qué incluye el plan {plan.name}</span>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {plan.incluye.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 group">
                                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                                <span className="text-[#8892A4] group-hover:text-[#F0F4FF] transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. ¿Cómo funciona? */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-12 block" style={{ color: plan.color }}>¿Cómo funciona? El proceso</span>
                    <div className="grid md:grid-cols-2 gap-8">
                        {plan.proceso.map((p, i) => (
                            <div key={i} className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                                <span className="absolute top-4 right-6 text-6xl font-black opacity-5 select-none">{p.num}</span>
                                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                                <p className="text-[#8892A4] text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Resultados */}
            <section className="py-20 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-12 block" style={{ color: plan.color }}>Resultados que puedes esperar</span>
                    <div className="grid md:grid-cols-3 gap-6">
                        {plan.resultados.map((r, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[#0A0A1A] border border-white/5 text-center">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                    <r.icon className="w-6 h-6" style={{ color: plan.color }} />
                                </div>
                                <div className="text-3xl font-black mb-1" style={{ color: plan.color }}>{r.val}</div>
                                <div className="font-bold text-sm mb-2">{r.label}</div>
                                <p className="text-xs text-[#8892A4] leading-relaxed">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Formulario */}
            <section id="formulario" className="py-32 border-t border-white/5 relative">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4">Empieza hoy mismo</h2>
                        <p className="text-[#8892A4]">Completa tus datos y nos pondremos en contacto contigo para una videollamada de 30 minutos sin compromiso.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Servicio seleccionado (Readonly) */}
                        <div className="p-4 rounded-xl border flex items-center justify-between"
                            style={{ backgroundColor: `${ plan.color } 10`, borderColor: `${ plan.color } 40` }}>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest block opacity-60 mb-1">Servicio seleccionado</span>
                                <span className="font-bold text-lg">Plan {plan.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs opacity-60">Inversión mensual</span>
                                <span className="font-black text-xl" style={{ color: plan.color }}>{plan.price}€/mes</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">Nombre completo *</label>
                                <input
                                    type="text" required name="name"
                                    value={formData.name} onChange={handleChange}
                                    placeholder="Tu nombre"
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">Email laboral *</label>
                                <input
                                    type="email" required name="email"
                                    value={formData.email} onChange={handleChange}
                                    placeholder="tu@empresa.com"
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">Teléfono</label>
                                <input
                                    type="tel" name="phone"
                                    value={formData.phone} onChange={handleChange}
                                    placeholder="+34"
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">Nombre de tu negocio *</label>
                                <input
                                    type="text" required name="company"
                                    value={formData.company} onChange={handleChange}
                                    placeholder="Tu empresa"
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-[#8892A4]">Sector / Industria</label>
                            <input
                                type="text" name="sector"
                                value={formData.sector} onChange={handleChange}
                                placeholder="Ej: Reformas, Salud, Gestoría..."
                                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-[#8892A4]">¿Por qué te interesa este servicio?</label>
                            <textarea
                                rows={4} name="message"
                                value={formData.message} onChange={handleChange}
                                placeholder="Cuéntanos brevemente qué problema quieres resolver..."
                                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors resize-none"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                            style={{ backgroundColor: plan.color, color: '#fff' }}
                        >
                            {isSubmitting ? 'Enviando...' : (<>Solicitar reunión estratégica <ArrowRight className="w-5 h-5" /></>)}
                        </button>
                        <p className="text-[10px] text-[#8892A4] text-center">
                            Al enviar este formulario aceptas nuestra política de privacidad. Tus datos serán tratados exclusivamente para responder a tu solicitud de servicio.
                        </p>
                    </form>
                </div>
            </section>

            {/* Footer mínimo */}
            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-xs text-[#8892A4]">© {new Date().getFullYear()} DigitalLeap Solutions S.L.U. · Leapifyes</p>
            </footer>
        </div>
    );
};

export default ServicioDetalle;
