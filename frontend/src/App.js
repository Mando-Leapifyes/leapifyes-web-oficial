import { lazy, Suspense, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import CookieBanner from "@/components/CookieBanner";
import { LocaleProvider } from "@/context/LocaleContext";
import { AuthProvider } from "@/context/AuthContext";



// Componente ScrollToTop
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Marketing Pages - Loaded eagerly for SEO
import Home from "./pages/Home";
import SolucionesHub from "./pages/soluciones/SolucionesHub";
import ServiceDetail from "./pages/soluciones/ServiceDetail";
import SectoresHub from "./pages/sectores/SectoresHub";
import SectorDetail from "./pages/sectores/SectorDetail";
import Casos from "./pages/Casos";
import Metodo from "./pages/Metodo";
import Empresa from "./pages/Empresa";
import Recursos from "./pages/Recursos";
import Contacto from "./pages/Contacto";
import Barcelona from "./pages/Barcelona";
import Cataluna from "./pages/Cataluna";
import DiagnosticoPage from "./pages/DiagnosticoPage";
import ServicioDetalle from "./pages/ServicioDetalle";
import LinkHub from "./pages/LinkHub";


// Legal Pages - Loaded eagerly for SEO
import Privacidad from "./pages/legal/Privacidad";
import Cookies from "./pages/legal/Cookies";
import AvisoLegal from "./pages/legal/AvisoLegal";

// App Pages - Lazy loaded (not SEO critical)
const AppDashboard = lazy(() => import("./pages/app/AppDashboard"));
const Diagnostico = lazy(() => import("./pages/app/Diagnostico"));
const Resultados = lazy(() => import("./pages/app/Resultados"));
const DemoAgentesIA = lazy(() => import("./pages/app/DemoAgentesIA"));
const Calculadora = lazy(() => import("./pages/app/Calculadora"));

// Portal Pages - Lazy loaded
const PortalLogin = lazy(() => import("./pages/portal/PortalLogin"));
const PortalDashboard = lazy(() => import("./pages/portal/PortalDashboard"));

// Admin Pages - Lazy loaded
const AdminRoute = lazy(() => import("./components/layout/AdminRoute"));
const AdminLayout = lazy(() => import("./components/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminDiagnostics = lazy(() => import("./pages/admin/AdminDiagnostics"));
const AdminAILogs = lazy(() => import("./pages/admin/AdminAILogs"));
const AdminSystem = lazy(() => import("./pages/admin/AdminSystem"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));

// Loading fallback for lazy components
const AppLoading = () => (
  <div className="min-h-screen bg-[#080B14] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#1B93A4] via-[#3B82F6] to-[#D946EF] animate-pulse" />
      <p className="text-[#8892A4]">Cargando...</p>
    </div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <LocaleProvider>
        <AuthProvider>
          <div className="App">
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Marketing Routes - SEO Critical */}
                <Route path="/" element={<Home />} />

                {/* Soluciones */}
                <Route path="/soluciones" element={<SolucionesHub />} />
                <Route path="/soluciones/:serviceId" element={<ServiceDetail />} />

                {/* Sectores */}
                <Route path="/sectores" element={<SectoresHub />} />
                <Route path="/sectores/:sectorId" element={<SectorDetail />} />

                {/* Local SEO Pages */}
                <Route path="/barcelona" element={<Barcelona />} />
                <Route path="/cataluna" element={<Cataluna />} />

                {/* Other Marketing Pages */}
                <Route path="/casos" element={<Casos />} />
                <Route path="/metodo" element={<Metodo />} />
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/recursos" element={<Recursos />} />
                <Route path="/contacto" element={<Contacto />} />

                {/* Herramientas interactivas */}
                <Route path="/diagnostico" element={<DiagnosticoPage />} />
                <Route path="/servicios/:slug" element={<ServicioDetalle />} />

                {/* Legal Pages */}
                <Route path="/legal/privacidad" element={<Privacidad />} />
                <Route path="/legal/cookies" element={<Cookies />} />
                <Route path="/legal/aviso-legal" element={<AvisoLegal />} />

                {/* Link Hub / Access - Hidden routes */}
                <Route path="/go" element={<LinkHub />} />
                <Route path="/acceso" element={<LinkHub />} />

                {/* App Routes - Lazy Loaded */}

                <Route path="/app" element={
                  <Suspense fallback={<AppLoading />}>
                    <AppDashboard />
                  </Suspense>
                } />
                <Route path="/app/diagnostico" element={
                  <Suspense fallback={<AppLoading />}>
                    <Diagnostico />
                  </Suspense>
                } />
                <Route path="/app/resultados" element={
                  <Suspense fallback={<AppLoading />}>
                    <Resultados />
                  </Suspense>
                } />
                <Route path="/app/calculadora" element={
                  <Suspense fallback={<AppLoading />}>
                    <Calculadora />
                  </Suspense>
                } />
                <Route path="/app/demo-agentes-ia" element={
                  <Suspense fallback={<AppLoading />}>
                    <DemoAgentesIA />
                  </Suspense>
                } />

                {/* Portal Routes */}
                <Route path="/portal/login" element={
                  <Suspense fallback={<AppLoading />}>
                    <PortalLogin />
                  </Suspense>
                } />
                <Route path="/portal" element={
                  <Suspense fallback={<AppLoading />}>
                    <PortalDashboard />
                  </Suspense>
                } />

                {/* Super Admin Routes */}
                <Route path="/admin" element={
                  <Suspense fallback={<AppLoading />}>
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  </Suspense>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="diagnostics" element={<AdminDiagnostics />} />
                  <Route path="ai-logs" element={<AdminAILogs />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="system" element={<AdminSystem />} />
                </Route>
              </Routes>
            </BrowserRouter>
            {/* <CookieBanner /> */}
            <Toaster position="top-right" richColors />
          </div>
        </AuthProvider>
      </LocaleProvider>
    </HelmetProvider>
  );
}

export default App;
