import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Layout from '../components/layout/Layout';
import { BRAND, SECTORS } from '../lib/constants';
import { toast } from 'sonner';
import axios from 'axios';
import { trackSubmitLead } from '../lib/analytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', city: '', sector: '', phone: '', message: '', consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error('Debes aceptar la política de privacidad para continuar.');
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, formData);
      setIsSubmitted(true);
      trackSubmitLead('contact');
      toast.success('¡Mensaje enviado! Te contactaremos pronto.');
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h1 className="text-4xl font-bold text-[#F0F4FF] mb-4">¡Mensaje Recibido!</h1>
              <p className="text-lg text-[#8892A4] mb-8">
                Gracias por contactar con nosotros. Nuestro equipo revisará tu solicitud y te responderá en menos de 24 horas laborables.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="btn-secondary">
                Enviar otro mensaje
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden" data-testid="contacto-hero">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-40" />
        </div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-[#1B93A4]" />
              <span className="text-sm font-medium text-[#8892A4]">Contacto</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-6">
              Hablemos de tu <span className="gradient-text">proyecto</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed">
              Cuéntanos qué tienes en mente. Sin compromiso, sin presión. Una conversación para entender cómo podemos ayudarte.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding border-t border-white/5" data-testid="contacto-form">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#F0F4FF]">Nombre *</Label>
                    <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Tu nombre" className="bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="contact-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#F0F4FF]">Email *</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="tu@email.com" className="bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="contact-email" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#F0F4FF]">Empresa *</Label>
                    <Input id="company" name="company" type="text" required value={formData.company} onChange={handleChange} placeholder="Nombre de tu empresa" className="bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="contact-company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#F0F4FF]">Ciudad *</Label>
                    <Input id="city" name="city" type="text" required value={formData.city} onChange={handleChange} placeholder="Barcelona, Girona..." className="bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="contact-city" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sector" className="text-[#F0F4FF]">Sector *</Label>
                    <Select name="sector" value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-[#F0F4FF]" data-testid="contact-sector">
                        <SelectValue placeholder="Selecciona tu sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {SECTORS.map(sector => (
                          <SelectItem key={sector.id} value={sector.id}>{sector.title}</SelectItem>
                        ))}
                        <SelectItem value="otro">Otro sector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#F0F4FF]">Teléfono (opcional)</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+34 600 000 000" className="bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="contact-phone" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#F0F4FF]">¿En qué podemos ayudarte? *</Label>
                  <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Cuéntanos brevemente tu situación y qué buscas..." rows={5} className="bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="contact-message" />
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="consent" checked={formData.consent} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked }))} data-testid="contact-consent" />
                  <Label htmlFor="consent" className="text-sm text-[#8892A4] leading-relaxed">
                    He leído y acepto la{' '}
                    <a href="/legal/privacidad" target="_blank" className="text-[#1B93A4] hover:underline">política de privacidad</a>. Leapifyes tratará tus datos para responder a tu consulta. *
                  </Label>
                </div>
                <Button type="submit" className="btn-gradient w-full md:w-auto" disabled={isSubmitting} data-testid="contact-submit">
                  {isSubmitting ? 'Enviando...' : (<>Enviar Mensaje <Send className="w-4 h-4 ml-2" /></>)}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-[#F0F4FF] mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1B93A4]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#1B93A4]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#F0F4FF]">Ubicación</p>
                      <p className="text-[#8892A4] text-sm">{BRAND.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#F0F4FF]">Email</p>
                      <a href={`mailto:${BRAND.email}`} className="text-[#8892A4] text-sm hover:text-[#3B82F6]">{BRAND.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D946EF]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#D946EF]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#F0F4FF]">Horario</p>
                      <p className="text-[#8892A4] text-sm">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 border border-[#1B93A4]/20">
                <h3 className="text-lg font-bold text-[#F0F4FF] mb-4">¿Prefieres una demo directa?</h3>
                <p className="text-[#8892A4] text-sm mb-4">
                  Si ya tienes claro que quieres ver nuestras soluciones en acción, agenda directamente una demo.
                </p>
                <a href="/app/diagnostico">
                  <Button className="w-full btn-secondary">Diagnóstico Rápido</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
