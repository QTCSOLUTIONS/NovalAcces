import React, { useState } from 'react';
import {
  Car,
  ClipboardCheck,
  Package,
  Briefcase,
  Bell,
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

const NovalLogo: React.FC<{ size?: 'small' | 'large' }> = ({ size = 'large' }) => {
  const isLarge = size === 'large';
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="text-left leading-none">
        <h1 className={`${isLarge ? 'text-3xl' : 'text-xl'} font-extrabold tracking-tighter text-white`}>
          NOVAL <span className="font-light italic text-indigo-400">Properties</span>
        </h1>
        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 to-transparent mt-1" />
      </div>
    </div>
  );
};

const AppCard: React.FC<{ item: AppItem }> = ({ item }) => {
  const CardContent = (
    <div className={`relative h-full p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
      item.disabled 
        ? 'bg-[#13161c]/40 border-white/5 opacity-60 grayscale' 
        : 'bg-[#13161c]/80 backdrop-blur-xl border-white/10 hover:border-indigo-500/50 group'
    }`}>
      
      {/* Esfera de luz ambiental detrás del icono */}
      {!item.disabled && (
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
      )}

      <div className="flex items-start justify-between mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-indigo-500/10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
          {item.icon}
        </div>
        {!item.disabled && (
          <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
      <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm">
        {item.description}
      </p>

      <div className="mt-auto">
        {item.disabled ? (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-500">
            <Lock className="w-3 h-3" /> En Desarrollo
          </div>
        ) : (
          <span className="text-xs font-bold tracking-widest text-indigo-400 group-hover:text-indigo-300 transition-colors">
            ABRIR APLICACIÓN —
          </span>
        )}
      </div>
    </div>
  );

  if (item.disabled) {
    return (
      <div className="relative h-full transition-all duration-500 cursor-not-allowed">
        {CardContent}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block h-full transition-all duration-500 hover:-translate-y-2"
    >
      {/* Resplandor exterior al hacer hover */}
      <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      {CardContent}
    </a>
  );
};

const Dashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const apps: AppItem[] = [
    {
      id: 'novauto',
      title: 'NovAuto',
      description: 'Gestión inteligente de flotas. Control de mantenimiento y rastreo GPS en tiempo real.',
      icon: <Car className="w-7 h-7" />,
      gradient: 'from-blue-600 to-cyan-500',
      disabled: true
    },
    {
      id: 'novaudit',
      title: 'NovAudit',
      description: 'Auditoría técnica de alta precisión y cumplimiento de normativas de seguridad.',
      icon: <ClipboardCheck className="w-7 h-7" />,
      gradient: 'from-indigo-600 to-violet-500',
      url: 'https://controlpro-iota.vercel.app/'
    },
    {
      id: 'novalog',
      title: 'Novalog',
      description: 'Logística avanzada. Control de inventario y stock para materiales de construcción.',
      icon: <Package className="w-7 h-7" />,
      gradient: 'from-slate-500 to-slate-700',
      url: 'https://gestionalmacen.qtc-solutions.com'
    },
    {
      id: 'novalworks',
      title: 'NovalWorks',
      description: 'Gestión de proyectos de alto impacto. Cronogramas y recursos optimizados.',
      icon: <Briefcase className="w-7 h-7" />,
      gradient: 'from-emerald-500 to-teal-600',
      url: 'https://timegest.qtc-solutions.com/auth'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col selection:bg-indigo-500/30">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <header className="relative z-30 border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <NovalLogo size="small" />
            
            <div className="hidden md:flex items-center gap-6">
              <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 py-16 flex flex-col justify-center">
        <div className="mb-12">
          <h2 className="text-sm uppercase tracking-[0.4em] text-indigo-400 font-bold mb-2">Workspace</h2>
          <p className="text-gray-500 text-lg font-light">Selecciona una plataforma para comenzar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map(app => (
            <AppCard key={app.id} item={app} />
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] text-gray-600 font-bold tracking-[0.5em] uppercase">
            POWER BI QTC-SOLUTIONS COPYRIGHT 2026
          </p>
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