import React, { useState } from 'react';
import {
  Car,
  ClipboardCheck,
  Package,
  Briefcase,
  Bell,
  Lock, // Lock is still used in AppCard
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
  colorClass: string;
  gradient: string;
  url?: string;
  disabled?: boolean;
}

// --- Components ---

// Componente de Logo Reutilizable para mantener consistencia
const NovalLogo: React.FC<{ size?: 'small' | 'large' }> = ({ size = 'large' }) => {
  const isLarge = size === 'large';

  return (
    <div className="flex flex-col items-center justify-center text-slate-900">
      {/* Icono de Regla (simulando el logo) */}
      <div className={`${isLarge ? 'w-16 h-8' : 'w-10 h-5'} border-2 border-slate-900 rounded-sm flex flex-col justify-end items-center relative mb-1`}>
        <div className="w-full flex justify-around items-end h-full pb-0.5">
          <div className="h-2 w-px bg-slate-900"></div>
          <div className="h-1 w-px bg-slate-900"></div>
          <div className="h-2 w-px bg-slate-900"></div>
          <div className="h-1 w-px bg-slate-900"></div>
          <div className="h-2 w-px bg-slate-900"></div>
        </div>
      </div>

      {/* Texto */}
      <div className="text-center leading-none">
        <h1 className={`${isLarge ? 'text-4xl' : 'text-xl'} font-bold tracking-tight text-slate-900`}>NOVAL</h1>
        <p className={`${isLarge ? 'text-sm' : 'text-[0.6rem]'} tracking-[0.2em] font-light text-slate-800 uppercase italic`}>PROPERTIES</p>
      </div>
    </div>
  );
};

const AppCard: React.FC<{ item: AppItem }> = ({ item }) => {
  const CardContent = (
    <>
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md`}>
          {item.icon}
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
          {item.disabled ? (
            <Lock className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900">{item.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{item.description}</p>

      <div className={`flex items-center text-xs font-semibold text-slate-400 ${!item.disabled && 'group-hover:text-amber-600'} transition-colors`}>
        <span>{item.disabled ? '' : 'ABRIR APLICACIÓN'}</span>
      </div>

      {/* Disabled Overlay */}
      {item.disabled && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-xl transform -rotate-6 border border-slate-700">
            EN DESARROLLO
          </div>
        </div>
      )}
    </>
  );

  if (item.disabled) {
    return (
      <div className="group relative bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-200 cursor-not-allowed overflow-hidden">
        {CardContent}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
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
      description: 'Sistema de gestión de flotas. Programa mantenimiento, rastrea ubicación de vehículos y gestiona reservas.',
      icon: <Car className="w-6 h-6" />,
      colorClass: 'text-cyan-600',
      gradient: 'from-cyan-600 to-blue-700',
      disabled: true
    },
    {
      id: 'novaudit',
      title: 'NovAudit',
      description: 'Herramientas de auditoría técnica y cumplimiento para inspecciones de propiedades y controles de seguridad.',
      icon: <ClipboardCheck className="w-6 h-6" />,
      colorClass: 'text-indigo-600',
      gradient: 'from-indigo-600 to-violet-700',
      url: 'https://controlpro-iota.vercel.app/'
    },
    {
      id: 'novalog',
      title: 'Novalog',
      description: 'Control de almacén e inventario. Rastreo de stock en tiempo real para materiales de construcción.',
      icon: <Package className="w-6 h-6" />,
      colorClass: 'text-slate-600',
      gradient: 'from-slate-600 to-slate-800',
      url: 'https://gestionalmacen.qtc-solutions.com'
    },
    {
      id: 'novalworks',
      title: 'NovalWorks',
      description: 'Suite de gestión de proyectos. Diagramas de Gantt, asignación de recursos y seguimiento de cronogramas.',
      icon: <Briefcase className="w-6 h-6" />,
      colorClass: 'text-emerald-600',
      gradient: 'from-emerald-600 to-teal-700',
      url: 'https://timegest.qtc-solutions.com/auth'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <NovalLogo size="small" />
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-4 py-3 space-y-1">
              <div className="p-3">
                <p className="text-slate-500 text-sm">Menú</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {apps.map(app => (
              <AppCard key={app.id} item={app} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-xs font-bold tracking-widest">
            POWER BI QTC-SOLUITIONS COPYRIGHT 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

// --- Main App Controller ---

const App: React.FC = () => {
  return (
    <div className="antialiased font-sans text-slate-900">
      <Dashboard />
    </div>
  );
};

export default App;