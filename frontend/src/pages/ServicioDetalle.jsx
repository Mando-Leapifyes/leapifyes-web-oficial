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
import { useLocale } from '../context/LocaleContext';

const ServicioDetalle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t, getNestedData } = useLocale();
    const plan = getNestedData('plans_detail', slug);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '', sector: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const iconMap = {
        Clock, TrendingUp, Zap, Users, Star, Target, Rocket, Shield, Calendar
    };

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
            message: `[Servicio: ${plan.name}] Motivo: ${formData.message}`,
            service: plan.name,
            consent: true
        };

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
            await axios.post(`${backendUrl}/api/contact`, payload);
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        } catch (err) {
            console.error('Error enviando formulario:', err);
            setError(t('serv_detail', 'error_msg') || 'Error sending request.');
            toast.error('Error');
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
                <h1 className="text-3xl font-bold mb-4">{t('serv_detail', 'success_title')}</h1>
                <p className="text-[#8892A4] text-center max-w-md mb-8">
                    {t('serv_detail', 'success_msg').replace('{plan}', plan.name)}
                </p>
                <Link to="/" className="text-[#1B93A4] hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> {t('serv_detail', 'back_home')}
                </Link>
            </div>
        );
    }

    const planColor = slug === 'start' ? '#1B93A4' : slug === 'essential' ? '#3B82F6' : slug === 'pro' ? '#00D4C8' : '#E8008A';

    return (
        <div className="min-h-screen bg-[#0A0A1A] text-[#F0F4FF] selection:bg-[#1B93A4]/30">
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A1A]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#1B93A4]/30">
                            <img src={ASSETS.logoLeapifyes} alt="L" loading="lazy" className="w-full h-full object-cover mix-blend-luminosity" />
                        </div>
                        <span className="font-black tracking-tight text-xl">LEAPIFYES</span>
                    </Link>
                    <Link to="/" className="text-sm font-medium text-[#8892A4] hover:text-[#F0F4FF] flex items-center gap-1.5 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        {t('serv_detail', 'back_plans')}
                    </Link>
                </div>
            </header>

            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 opacity-20 blur-[120px]"
                    style={{ background: `radial-gradient(circle, ${planColor} 0%, transparent 70%)` }} />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 border"
                        style={{ borderColor: `${planColor}40`, color: planColor, background: `${planColor}10` }}>
                        {plan.badge}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none uppercase">
                        PLAN <span style={{ color: planColor }}>{plan.name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#8892A4] mb-8 max-w-2xl mx-auto">{plan.tagline}</p>
                    <div className="mb-10">
                        <span className="text-sm text-[#8892A4] block mb-1">{t('serv_detail', 'monthly_inv')}</span>
                        <span className="text-5xl font-black" style={{ color: planColor }}>{t('serv_detail', 'from')} {plan.price}€</span>
                        <span className="text-[#8892A4] ml-2 text-xl">/mes</span>
                    </div>
                    <button onClick={scrollToForm} className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto transition-all active:scale-95" style={{ backgroundColor: planColor, color: '#fff' }}>
                        {t('serv_detail', 'req_info')} <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: planColor }}>{t('serv_detail', 'for_whom')}</span>
                    <p className="text-2xl md:text-3xl text-[#F0F4FF] leading-relaxed font-medium">{plan.perfil}</p>
                </div>
            </section>

            <section className="py-20 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-8 block" style={{ color: planColor }}>{t('serv_detail', 'what_includes')} {plan.name}</span>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {plan.incluye.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 group">
                                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: planColor }} />
                                <span className="text-[#8892A4] group-hover:text-[#F0F4FF] transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-12 block" style={{ color: planColor }}>{t('serv_detail', 'how_works')}</span>
                    <div className="grid md:grid-cols-2 gap-8">
                        {plan.proceso.map((p, i) => (
                            <div key={i} className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                                <span className="absolute top-4 right-6 text-6xl font-black opacity-5 select-none">0{i + 1}</span>
                                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                                <p className="text-[#8892A4] text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="text-xs font-bold uppercase tracking-widest mb-12 block" style={{ color: planColor }}>{t('serv_detail', 'results_expect')}</span>
                    <div className="grid md:grid-cols-3 gap-6">
                        {plan.resultados.map((r, i) => {
                            const IconComp = iconMap[['Clock', 'TrendingUp', 'Zap', 'Users', 'Star', 'Target', 'Rocket', 'Shield', 'Calendar'][i]] || Zap;
                            return (
                                <div key={i} className="p-6 rounded-2xl bg-[#0A0A1A] border border-white/5 text-center">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <IconComp className="w-6 h-6" style={{ color: planColor }} />
                                    </div>
                                    <div className="text-3xl font-black mb-1" style={{ color: planColor }}>{r.val}</div>
                                    <div className="font-bold text-sm mb-2">{r.label}</div>
                                    <p className="text-xs text-[#8892A4] leading-relaxed">{r.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="formulario" className="py-32 border-t border-white/5 relative">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4">{t('serv_detail', 'start_today')}</h2>
                        <p className="text-[#8892A4]">{t('serv_detail', 'start_sub')}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="p-4 rounded-xl border flex items-center justify-between" style={{ backgroundColor: `${planColor}10`, borderColor: `${planColor}40` }}>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest block opacity-60 mb-1">{t('serv_detail', 'selected_serv')}</span>
                                <span className="font-bold text-lg">Plan {plan.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs opacity-60">{t('serv_detail', 'monthly_inv')}</span>
                                <span className="font-black text-xl" style={{ color: planColor }}>{plan.price}€/mes</span>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">{t('serv_detail', 'full_name')} *</label>
                                <input type="text" required name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">{t('serv_detail', 'work_email')} *</label>
                                <input type="email" required name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">{t('serv_detail', 'phone')}</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#8892A4]">{t('serv_detail', 'business_name')} *</label>
                                <input type="text" required name="company" value={formData.company} onChange={handleChange} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-[#8892A4]">{t('serv_detail', 'industry')}</label>
                            <input type="text" name="sector" value={formData.sector} onChange={handleChange} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-[#8892A4]">{t('serv_detail', 'why_interest')}</label>
                            <textarea rows={4} name="message" value={formData.message} onChange={handleChange} placeholder={t('serv_detail', 'placeholder_msg')} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1B93A4] transition-colors resize-none" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50" style={{ backgroundColor: planColor, color: '#fff' }}>
                            {isSubmitting ? t('serv_detail', 'sending') : (<>{t('serv_detail', 'req_meeting')} <ArrowRight className="w-5 h-5" /></>)}
                        </button>
                        <p className="text-[10px] text-[#8892A4] text-center">{t('serv_detail', 'privacy_msg')}</p>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ServicioDetalle;
