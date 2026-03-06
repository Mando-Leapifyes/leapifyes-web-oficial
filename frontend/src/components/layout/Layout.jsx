import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const BackToHome = () => {
  const { pathname } = useLocation();
  // No mostrar en home, app, admin ni portal
  const hide = pathname === '/' || pathname.startsWith('/app') || pathname.startsWith('/admin') || pathname.startsWith('/portal');
  if (hide) return null;

  return (
    <div className="fixed top-24 left-4 z-40 md:left-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-[#8892A4] hover:text-white hover:bg-white/10 backdrop-blur-md transition-all duration-200"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Inicio
      </Link>
    </div>
  );
};

const Layout = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#080B14]">
      <Navbar />
      <BackToHome />
      <main className="flex-1 pt-20">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
