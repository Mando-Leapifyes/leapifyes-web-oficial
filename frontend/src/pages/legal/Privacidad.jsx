import Layout from '../../components/layout/Layout';
import { BRAND } from '../../lib/constants';

const Privacidad = () => {
  return (
    <Layout>
      <section className="section-padding" data-testid="privacidad-page">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#F0F4FF] mb-8">Política de Privacidad</h1>
            <div className="prose-dark space-y-6">
              <p className="text-[#8892A4]">Última actualización: Diciembre 2024</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">1. Responsable del Tratamiento</h2>
              <p className="text-[#8892A4]">{BRAND.name} (en adelante, "nosotros" o "Leapifyes") es responsable del tratamiento de los datos personales recogidos a través de este sitio web.</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li>Ubicación: {BRAND.location}</li><li>Email de contacto: {BRAND.email}</li></ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">2. Datos que Recogemos</h2>
              <p className="text-[#8892A4]">Recogemos únicamente los datos necesarios para las siguientes finalidades:</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li><strong className="text-[#F0F4FF]">Formulario de contacto:</strong> Nombre, email, empresa, ciudad, sector, teléfono (opcional), mensaje.</li><li><strong className="text-[#F0F4FF]">Diagnóstico online:</strong> Respuestas anónimas al cuestionario.</li><li><strong className="text-[#F0F4FF]">Newsletter:</strong> Email.</li></ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">3. Finalidad del Tratamiento</h2>
              <p className="text-[#8892A4]">Tratamos tus datos personales para:</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li>Responder a tus consultas y solicitudes de información.</li><li>Enviarte comunicaciones comerciales si has dado tu consentimiento.</li><li>Mejorar nuestros servicios mediante análisis agregados y anónimos.</li><li>Cumplir con obligaciones legales.</li></ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">4. Base Legal</h2>
              <p className="text-[#8892A4]">El tratamiento de tus datos se basa en tu consentimiento explícito al enviar formularios, así como en nuestro interés legítimo para responder consultas y mejorar servicios.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">5. Conservación de Datos</h2>
              <p className="text-[#8892A4]">Conservaremos tus datos personales mientras sea necesario para las finalidades indicadas, y posteriormente durante los plazos legalmente establecidos.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">6. Destinatarios</h2>
              <p className="text-[#8892A4]">No cedemos tus datos a terceros, excepto cuando sea necesario para prestarte el servicio o por obligación legal.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">7. Tus Derechos</h2>
              <p className="text-[#8892A4]">Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición enviando un email a {BRAND.email} con el asunto "Ejercicio de derechos RGPD".</p>
              <p className="text-[#8892A4]">También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">8. Seguridad</h2>
              <p className="text-[#8892A4]">Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos contra acceso no autorizado, pérdida o destrucción.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">9. Cambios en esta Política</h2>
              <p className="text-[#8892A4]">Nos reservamos el derecho a modificar esta política. Cualquier cambio será publicado en esta página con la fecha de actualización.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">10. Contacto</h2>
              <p className="text-[#8892A4]">Para cualquier consulta sobre privacidad, contacta con nosotros en {BRAND.email}.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacidad;
