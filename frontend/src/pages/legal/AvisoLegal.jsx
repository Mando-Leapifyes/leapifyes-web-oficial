import Layout from '../../components/layout/Layout';
import { BRAND } from '../../lib/constants';

const AvisoLegal = () => {
  return (
    <Layout>
      <section className="section-padding" data-testid="aviso-legal-page">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#F0F4FF] mb-8">Aviso Legal</h1>
            <div className="space-y-6">
              <p className="text-[#8892A4]">Última actualización: Diciembre 2024</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">1. Datos Identificativos</h2>
              <p className="text-[#8892A4]">En cumplimiento con el artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información:</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li><strong className="text-[#F0F4FF]">Denominación social:</strong> {BRAND.name}</li><li><strong className="text-[#F0F4FF]">Domicilio:</strong> {BRAND.location}</li><li><strong className="text-[#F0F4FF]">Email:</strong> {BRAND.email}</li></ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">2. Objeto</h2>
              <p className="text-[#8892A4]">Este sitio web tiene como objeto proporcionar información sobre los servicios de transformación digital, automatización y agentes de IA ofrecidos por {BRAND.name}.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">3. Condiciones de Uso</h2>
              <p className="text-[#8892A4]">El acceso y uso de este sitio web implica la aceptación de las presentes condiciones. El usuario se compromete a:</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li>Hacer un uso adecuado del sitio conforme a la legalidad vigente.</li><li>No realizar actividades ilícitas o contrarias a la buena fe.</li><li>No introducir virus informáticos o sistemas que puedan causar daños.</li><li>No intentar acceder a áreas restringidas sin autorización.</li></ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">4. Propiedad Intelectual</h2>
              <p className="text-[#8892A4]">Todos los contenidos del sitio web son propiedad de {BRAND.name} o de terceros que han autorizado su uso, y están protegidos por derechos de propiedad intelectual e industrial.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">5. Exclusión de Responsabilidad</h2>
              <p className="text-[#8892A4]">{BRAND.name} no se hace responsable de:</p>
              <ul className="list-disc pl-6 text-[#8892A4] space-y-1"><li>Daños derivados del uso inadecuado del sitio web.</li><li>Contenidos de sitios web de terceros.</li><li>Interrupciones del servicio por causas técnicas o de fuerza mayor.</li><li>Información no actualizada por cambios posteriores.</li></ul>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">6. Enlaces a Terceros</h2>
              <p className="text-[#8892A4]">Este sitio puede contener enlaces a páginas de terceros. {BRAND.name} no asume responsabilidad sobre el contenido de dichos sitios externos.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">7. Legislación Aplicable</h2>
              <p className="text-[#8892A4]">Para cualquier controversia serán de aplicación las leyes españolas, sometiéndose las partes a la jurisdicción de los tribunales de Barcelona.</p>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mt-8 mb-4">8. Contacto</h2>
              <p className="text-[#8892A4]">Para cualquier consulta legal, puedes contactar con nosotros en {BRAND.email}.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AvisoLegal;
