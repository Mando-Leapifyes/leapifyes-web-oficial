import Layout from '../../components/layout/Layout';
import { BRAND } from '../../lib/constants';

const Cookies = () => {
  return (
    <Layout>
      <section className="section-padding" data-testid="cookies-page">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#F0F4FF] mb-8">Política de Cookies</h1>
            <div className="space-y-6">
              <p className="text-[#8892A4]">Última actualización: Diciembre 2024</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">1. ¿Qué son las Cookies?</h2>
              <p className="text-[#8892A4]">Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Sirven para recordar tus preferencias, mejorar tu experiencia de navegación y analizar cómo usas nuestro sitio.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">2. Cookies que Utilizamos</h2>
              <h3 className="text-xl font-semibold text-[#F0F4FF] mt-6 mb-3">2.1 Cookies Técnicas (Necesarias)</h3>
              <p className="text-[#8892A4]">Son esenciales para el funcionamiento del sitio. No requieren consentimiento.</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li>Gestión de sesión</li><li>Preferencias de idioma</li><li>Seguridad y autenticación</li></ul>
              <h3 className="text-xl font-semibold text-[#F0F4FF] mt-6 mb-3">2.2 Cookies Analíticas</h3>
              <p className="text-[#8892A4]">Nos ayudan a entender cómo interactúan los visitantes con el sitio.</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li>Páginas visitadas</li><li>Tiempo de permanencia</li><li>Origen de la visita</li></ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">3. Gestión de Cookies</h2>
              <p className="text-[#8892A4]">Puedes configurar tu navegador para rechazar cookies. Instrucciones para navegadores comunes:</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#1B93A4] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="text-[#1B93A4] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#1B93A4] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#1B93A4] hover:underline">Microsoft Edge</a></li>
              </ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">4. Actualizaciones</h2>
              <p className="text-[#8892A4]">Esta política puede actualizarse. Revisarla periódicamente es recomendable.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">5. Contacto</h2>
              <p className="text-[#8892A4]">Para cualquier consulta sobre cookies, contacta con nosotros en {BRAND.email}.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cookies;
