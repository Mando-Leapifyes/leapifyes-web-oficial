// Blog data for Leapifyes official site
// System built for weekly publishing, SEO, and analytics tracking

export const BLOG_POSTS = [
  {
    id: 7,
    slug: 'el-verdadero-coste-de-gestionar-una-reforma-sin-sistema',
    title: 'El verdadero coste de gestionar una reforma sin sistema',
    subtitle: 'Cómo MANDO transforma el caos operativo en rentabilidad real.',
    excerpt: 'Descubre cuánto dinero pierde una empresa de reformas sin un sistema de gestión y cómo profesionalizar tu operación.',
    category: 'Estrategia',
    readTime: '10 min',
    date: '24 Mar 2026',
    featured: true,
    image: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770925218/MANDO_by_Leapifyes_tajoao.png',
    sections: [
      {
        type: 'intro',
        content: 'En un sector donde cada céntimo cuenta y cada día de retraso resta margen, la gestión artesanal —basada en la memoria, los mensajes de WhatsApp y las hojas de cálculo inconexas— ya no es solo ineficiente: es peligrosa. Para una empresa de reformas, el caos no es solo una molestia; es un sumidero invisible de rentabilidad.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'El sumidero de horas invisibles'
      },
      {
        type: 'paragraph',
        content: '¿Cuánto tiempo dedica un jefe de obra a buscar un presupuesto antiguo? ¿Cuántas veces se ha pedido material por duplicado porque no había un registro claro? Estas "horas invisibles" son el primer coste directo de no tener un sistema. MANDO centraliza toda la documentación técnica y financiera, permitiendo que lo que antes tomaba 40 minutos de búsqueda, ahora se resuelva en 40 segundos.'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770922699/MANDO_Dashboard.png',
        caption: 'MANDO Dashboard: Control total de la rentabilidad en un vistazo.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'La fragilidad del "todo en la cabeza"'
      },
      {
        type: 'paragraph',
        content: 'Depender de la memoria del dueño o del encargado genera cuellos de botella constantes. Cuando la información no está en un sistema, si esa persona no está disponible, el proyecto se detiene o se cometen errores costosos. Digitalizar los procesos con un ERP propio para reformas significa que el negocio deja de depender de personas específicas y empieza a depender de procesos sólidos.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'El impacto en la percepción del cliente'
      },
      {
        type: 'paragraph',
        content: 'Enviar un presupuesto profesional en 24 horas frente a tardar una semana marca la diferencia entre ganar o perder una obra de 50.000€. Los clientes de hoy valoran la transparencia y la rapidez. La capacidad de MANDO de generar presupuestos detallados y hacer un seguimiento riguroso no solo mejora la operación, sino que eleva la marca de la empresa ante el mercado.'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770922699/Captura_de_pantalla_2026-02-12_a_las_19.52.51_seqsuk.png',
        caption: 'Gestión detallada de partidas y costes directos.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'MANDO: La oficina en tu bolsillo'
      },
      {
        type: 'paragraph',
        content: 'Diseñamos MANDO específicamente para el sector de la construcción. No es un programa genérico; es una herramienta que entiende las incidencias en obra, las certificaciones y los pagos a proveedores. Al tener todo bajo control desde el móvil, el equipo puede enfocarse en lo que realmente importa: la calidad de la ejecución.'
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770922699/Captura_de_pantalla_2026-02-12_a_las_19.53.12_e2atlc.png',
        caption: 'Panel de control operativo: Todo el equipo alineado.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'Transformación, no solo gestión'
      },
      {
        type: 'paragraph',
        content: 'Implementar un sistema como MANDO no es simplemente comprar software; es una declaración de intenciones. Es el paso de ser un "autónomo con ayudantes" a ser una empresa de reformas profesional, escalable y rentable. En Leapifyes, te acompañamos en este salto para que dejes de apagar fuegos y empieces a liderar tu crecimiento.'
      }
    ],
    cta: {
      text: 'Descubre cómo MANDO puede optimizar tu próxima reforma',
      link: '/diagnostico'
    },
    meta: {
      title: 'El verdadero coste de gestionar una reforma sin sistema | MANDO',
      description: 'Descubre cuánto dinero pierde una empresa de reformas sin un sistema de gestión y cómo profesionalizar tu operación con MANDO.'
    }
  },
  { id: 1, slug: 'guia-transformacion-digital-pymes', title: 'Guía Completa de Transformación Digital para PYMEs en 2025', excerpt: 'Todo lo que necesitas saber para digitalizar tu negocio sin morir en el intento. Sin tecnicismos, con ejemplos reales.', category: 'Transformación Digital', readTime: '8 min', date: '15 Dic 2024', featured: true },
  { id: 2, slug: 'agentes-ia-atencion-cliente', title: 'Cómo los Agentes de IA están revolucionando la atención al cliente', excerpt: 'Casos reales de empresas que han multiplicado su capacidad de atención sin aumentar plantilla.', category: 'Agentes IA', readTime: '6 min', date: '10 Dic 2024', featured: true },
  { id: 3, slug: 'automatizacion-whatsapp-negocios', title: 'WhatsApp Business + IA: La combinación que multiplica conversiones', excerpt: 'Aprende a configurar un sistema de atención automatizada en WhatsApp que cualifica y convierte 24/7.', category: 'Automatización', readTime: '5 min', date: '5 Dic 2024', featured: false },
  { id: 4, slug: 'roi-transformacion-digital', title: 'Cómo calcular el ROI de tu inversión en transformación digital', excerpt: 'Métricas claras y metodología práctica para justificar y medir el retorno de tu proyecto de digitalización.', category: 'Estrategia', readTime: '7 min', date: '28 Nov 2024', featured: false },
  { id: 5, slug: 'errores-digitalizacion-pymes', title: '5 errores que cometen las PYMEs al digitalizar (y cómo evitarlos)', excerpt: 'Lecciones aprendidas de más de 50 proyectos de transformación digital en Barcelona.', category: 'Transformación Digital', readTime: '4 min', date: '20 Nov 2024', featured: false },
  { id: 6, slug: 'crm-pequenas-empresas', title: 'El mejor CRM para pequeñas empresas: Guía de selección 2025', excerpt: 'Comparativa honesta de las mejores opciones de CRM para negocios de 5 a 50 empleados.', category: 'Herramientas', readTime: '10 min', date: '15 Nov 2024', featured: false },
  {
    id: 8,
    slug: 'el-verdadero-coste-gestionar-reforma-sin-sistema-mando',
    title: 'El verdadero coste de gestionar una reforma sin sistema',
    subtitle: 'Cómo MANDO convierte el caos administrativo en control operativo para empresas y autónomos de la reformas',
    excerpt: 'Descubre cuánto dinero pierde una empresa de reformas sin un sistema de gestión y cómo MANDO convierte el caos en control.',
    category: 'Transformación Digital',
    readTime: '8 min',
    date: '24 Mar 2026',
    featured: true,
    image: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770925218/MANDO_by_Leapifyes_tajoao.png',
    sections: [
      {
        type: 'intro',
        content: `Eres bueno en lo tuyo. Muy bueno. Sabes exactamente cuánto material necesitas para una reforma integral. Calculas cargas estructurales mentalmente. Coordinas equipos, resuelves imprevistos y entregas obras que funcionan. Pero hay algo que te quita más tiempo que cualquier obra complicada: La gestión. No es la reforma lo que te agota. Es todo lo demás: presupuestos que tardan días en salir, albaranes perdidos, gastos de obra sin asignar, facturas que pospones porque odias el proceso y la sensación constante de no saber exactamente cuánto estás ganando. Y lo peor: sabes que esto te está costando dinero. Obras que parecían rentables y luego descubres que apenas dejaron margen. Clientes que pagan tarde. Compras urgentes a sobreprecio. Esto no es normal. Y no tiene por qué seguir así.`
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770922699/Captura_de_pantalla_2026-02-12_a_las_19.52.51_seqsuk.png',
        caption: 'Control operativo y financiero en tiempo real con MANDO.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'El problema no es que seas desorganizado'
      },
      {
        type: 'paragraph',
        content: `El problema es que gestionas una empresa de reformas con herramientas que no están pensadas para reformas. Un Excel genérico, un cuaderno de notas, facturas en Word, albaranes en la guantera, WhatsApps que se pierden... Ninguna de estas herramientas está diseñada para el ritmo real de una obra. Y mientras tanto: pierdes 6-8 horas semanales en tareas administrativas, tomas decisiones sin datos claros, dependes de tu memoria para recordar compromisos y trabajas más horas pero no ganas proporcionalmente más.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Qué cambia con MANDO'
      },
      {
        type: 'paragraph',
        content: `MANDO no es un software más. Es el sistema de control operativo diseñado específicamente para autónomos y PYMEs de reformas que quieren profesionalizar su gestión sin complicarse la vida.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Control financiero real'
      },
      {
        type: 'paragraph',
        content: `El problema: No sabes cuánto estás ganando en cada obra hasta que termina (y a veces ni entonces). La solución MANDO: Dashboard en tiempo real de Coste vs. Ingreso por obra. Ves instantáneamente cuánto llevas gastado, cuánto has facturado, cuánto te queda de margen y si vas rentable o no. Resultado: Tomas decisiones con datos, no con intuición.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Fin del caos de albaranes y compras'
      },
      {
        type: 'paragraph',
        content: `El problema: Albaranes perdidos, gastos sin asignar, inventario mental, compras duplicadas. La solución MANDO: Haces foto al albarán desde el almacén → MANDO extrae los datos, actualiza stock y asigna el gasto a la obra correspondiente automáticamente. Resultado: Cero albaranes perdidos. Cero excusas con proveedores. Control total de materiales.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Presupuestos profesionales en minutos'
      },
      {
        type: 'paragraph',
        content: `El problema: Presupuestos que tardan días, con errores de cálculo, olvidando partidas, formato poco profesional. La solución MANDO: Plantillas adaptadas a reformas + bases de datos de precios actualizadas. Generas presupuestos detallados y profesionales en una fracción del tiempo. Resultado: Más presupuestos enviados = más obras cerradas.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Facturación legal sin quebraderos de cabeza'
      },
      {
        type: 'paragraph',
        content: `El problema: Normativa española compleja. TicketBAI. Facturación electrónica obligatoria. Miedo a errores con Hacienda. La solución MANDO: Sistema 100% adaptado a normativa española con facturas legales, compatibilidad con TicketBAI y preparación para facturación electrónica obligatoria. Resultado: Duermes tranquilo. Hacienda no es un problema.`
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770922699/Captura_de_pantalla_2026-02-12_a_las_19.53.12_e2atlc.png',
        caption: 'Facturación adaptada y cumplimiento legal garantizado.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'Por qué MANDO es diferente'
      },
      {
        type: 'paragraph',
        content: `No somos un software genérico "adaptado" a reformas. Somos un sistema pensado desde cero para cómo trabajan realmente las empresas de reformas en España.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Simplicidad extrema y Todo centralizado'
      },
      {
        type: 'paragraph',
        content: `Si sabes usar WhatsApp, sabes usar MANDO. Interfaz diseñada para usarse con una mano, en obra. Una sola herramienta para clientes, proveedores, presupuestos, albaranes, facturas, gastos y control de obra. Accesible desde móvil, tablet u ordenador. Cada decisión la tomas con datos claros, no con esperanza.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Qué consigues con MANDO'
      },
      {
        type: 'paragraph',
        content: `✅ Recuperas 6-8 horas semanales de administración. ✅ Sabes exactamente cuánto ganas en cada obra, en tiempo real. ✅ Cero albaranes perdidos, cero facturas olvidadas. ✅ Presupuestos profesionales que cierran más obras. ✅ Un negocio que funciona como un sistema, no como un caos personal.`
      },
      {
        type: 'image',
        url: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770922699/MANDO_Dashboard.png',
        caption: 'MANDO Dashboard: El centro de mando de tu negocio.'
      },
      {
        type: 'heading',
        level: 2,
        title: 'A quién NO le sirve MANDO'
      },
      {
        type: 'paragraph',
        content: `MANDO no es para ti si prefieres seguir "como siempre" aunque no funcione o si no te importa la rentabilidad. MANDO es para empresarios de reformas que quieren crecer, valoran su tiempo y entienden que el control del negocio no es opcional.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'El coste real de no tener control'
      },
      {
        type: 'paragraph',
        content: `Sin MANDO, puedes perder miles de euros al año en márgenes mal calculados y albaranes perdidos, además de cientos de horas de gestión. Con MANDO, recuperas ese tiempo y aseguras tu rentabilidad.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Tu negocio, bajo control'
      },
      {
        type: 'paragraph',
        content: `MANDO no hace magia. Hace algo más potente: convierte el caos en sistema. Y un sistema bien montado es lo que separa una empresa rentable de un autónomo sobrepasado.`
      },
      {
        type: 'heading',
        level: 2,
        title: 'Prueba MANDO sin compromiso'
      },
      {
        type: 'paragraph',
        content: `👉 PRUEBA MANDO GRATIS DURANTE 7 DÍAS. Sin tarjeta de crédito. Sin letra pequeña. Sin compromisos. MANDO by Leapifyes: Tu negocio de reformas, bajo control.`
      }
    ],
    cta: {
      text: 'PRUEBA MANDO GRATIS DURANTE 7 DÍAS',
      link: 'https://mando.leapifyes.com'
    },
    meta: {
      title: 'El verdadero coste de gestionar una reforma sin sistema | MANDO by Leapifyes',
      description: 'Descubre cuánto dinero pierde una empresa de reformas sin un sistema de gestión y cómo MANDO convierte el caos en control.'
    }
  },
];
