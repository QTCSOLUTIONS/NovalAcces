import React, { useState, useEffect } from 'react';
import {
  Car,
  ClipboardCheck,
  Package,
  Briefcase,
  Lock,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

// --- Types ---

interface AppItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  url?: string;
  disabled?: boolean;
}

// --- Components ---

// 1. Logo Rediseñado con Isotipo Animado
const NovalLogo: React.FC<{ size?: 'small' | 'large' }> = ({ size = 'large' }) => {
  const isLarge = size === 'large';
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Isotipo: Abstracción de Edificios/Regla moderna */}
      <div className="flex items-end gap-[3px] h-8">
        <div className="w-1.5 h-4 bg-indigo-600 rounded-t-sm group-hover:h-5 transition-all duration-300"></div>
        <div className="w-1.5 h-6 bg-indigo-400 rounded-t-sm group-hover:h-7 transition-all duration-300 delay-75"></div>
        <div className="w-1.5 h-8 bg-white rounded-t-sm group-hover:h-9 transition-all duration-300 delay-150 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
        <div className="w-1.5 h-5 bg-indigo-500 rounded-t-sm group-hover:h-6 transition-all duration-300 delay-200"></div>
      </div>
      
      {/* Texto del Logo */}
      <div className="flex flex-col items-start justify-center">
        <div className="text-left leading-none">
          <h1 className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-extrabold tracking-tighter text-white`}>
            NOVAL <span className="font-light italic text-indigo-400">Properties</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

// 2. Tarjetas de Aplicación con Animación de Entrada
const AppCard: React.FC<{ item: AppItem; index: number }> = ({ item, index }) => {
  const CardContent = (
    <div className={`relative h-full p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
      item.disabled 
        ? 'bg-[#13161c]/40 border-white/5 opacity-60 grayscale' 
        : 'bg-[#13161c]/80 backdrop-blur-xl border-white/10 hover:border-indigo-500/50 group shadow-2xl shadow-black/50'
    }`}>
      
      {!item.disabled && (
        <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-700`} />
      )}

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-indigo-500/20 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
          {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
        </div>
        {!item.disabled && (
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all duration-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-100 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm max-w-[90%]">
          {item.description}
        </p>
      </div>

      <div className="mt-auto relative z-10">
        {item.disabled ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            <Lock className="w-3 h-3" /> En Desarrollo
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-indigo-400 group-hover:text-indigo-300 transition-colors uppercase">
            Abrir Aplicación
            <div className="h-[1px] w-8 bg-indigo-500/50 group-hover:w-12 transition-all duration-500" />
          </div>
        )}
      </div>
    </div>
  );

  // Lógica para envolver la tarjeta con el link o dejarla deshabilitada
  const Wrapper = item.disabled ? 'div' : 'a';
  const wrapperProps = item.disabled ? {} : {
    href: item.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "relative block h-full transition-all duration-500 hover:-translate-y-2 group"
  };

  return (
    <div 
      className="card-entrance" 
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <Wrapper {...(wrapperProps as any)} className={item.disabled ? "relative h-full transition-all duration-500 cursor-not-allowed" : wrapperProps.className}>
        {!item.disabled && (
          <div className="absolute inset-4 rounded-[2rem] bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        {CardContent}
      </Wrapper>
    </div>
  );
};

// 3. Componente Principal del Dashboard
const Dashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Disparar la animación al cargar la página
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const apps: AppItem[] = [
    {
      id: 'novauto',
      title: 'NovAuto',
      description: 'Gestión inteligente de flotas. Control de mantenimiento y rastreo GPS en tiempo real.',
      icon: <Car />,
      gradient: 'from-blue-600 to-cyan-500',
      disabled: true
    },
    {
      id: 'novaudit',
      title: 'NovAudit',
      description: 'Auditoría técnica de alta precisión y cumplimiento de normativas de seguridad.',
      icon: <ClipboardCheck />,
      gradient: 'from-indigo-600 to-violet-500',
      url: 'https://controlpro-iota.vercel.app/'
    },
    {
      id: 'novalog',
      title: 'Novalog',
      description: 'Logística avanzada. Control de inventario y stock para materiales de construcción.',
      icon: <Package />,
      gradient: 'from-slate-500 to-slate-700',
      url: 'https://gestionalmacen.qtc-solutions.com'
    },
    {
      id: 'novalworks',
      title: 'NovalWorks',
      description: 'Gestión de proyectos de alto impacto. Cronogramas y recursos optimizados.',
      icon: <Briefcase />,
      gradient: 'from-emerald-500 to-teal-600',
      url: 'https://timegest.qtc-solutions.com/auth'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      
      {/* Estilos CSS Inyectados para la animación de entrada */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-entrance {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Atmósfera de Fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[140px] rounded-full" />
      </div>

      <header className="relative z-30 border-b border-white/5 bg-[#0a0c10]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <NovalLogo size="small" />
            
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl hover:bg-white/10 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase leading-none">Acceso</span>
                  <span className="text-xs font-bold text-white tracking-wide">ADMINISTRADOR</span>
                </div>
              </div>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 py-12 md:py-20 flex flex-col justify-center">
        {/* Cabecera del Hub animada */}
        <div className={`mb-16 space-y-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase">Sistema Operativo v2.0</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white italic">
            Bienvenido al <span className="text-indigo-500">Hub</span>
          </h2>
          <p className="text-gray-500 text-lg font-light max-w-xl">
            Gestiona todas tus herramientas de Noval Properties desde un panel centralizado con seguridad en tiempo real.
          </p>
        </div>

        {/* Grid de Aplicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {apps.map((app, index) => (
            <AppCard key={app.id} item={app} index={index} />
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-gray-600 font-bold tracking-[0.5em] uppercase">
            POWER BI QTC-SOLUTIONS COPYRIGHT 2026
          </p>
          <div className="flex gap-8">
             <span className="text-[9px] text-gray-500 tracking-[0.2em] hover:text-white cursor-pointer transition-colors uppercase">Soporte</span>
             <span className="text-[9px] text-gray-500 tracking-[0.2em] hover:text-white cursor-pointer transition-colors uppercase">Privacidad</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="antialiased font-sans text-slate-200 bg-[#0a0c10]">
      <Dashboard />
    </div>
  );
};

export default App;