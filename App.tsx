import React, { useState } from 'react';
import {
  Car,
  ClipboardCheck,
  Package,
  Briefcase,
  Bell,
  FileText,
  Lock, // Lock is still used in AppCard
  Search,
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

interface AlertItem {
  id: number;
  title: string;
  time: string;
  type: 'urgent' | 'info' | 'success';
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
        <span>{item.disabled ? 'EN DESARROLLO' : 'ABRIR APLICACIÓN'}</span>
      </div>
    </>
  );

  if (item.disabled) {
    return (
      <div className="group relative bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-200 opacity-60 cursor-not-allowed overflow-hidden grayscale-[0.8]">
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

const SidebarWidget: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
    <div className="flex items-center space-x-2 mb-6 border-b border-slate-50 pb-4">
      <div className="text-slate-900">{icon}</div>
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{title}</h3>
    </div>
    {children}
  </div>
);

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

  const alerts: AlertItem[] = [
    { id: 1, title: 'Mantenimiento del Servidor programado para el viernes 22:00 EST', time: 'hace 2 horas', type: 'info' },
    { id: 2, title: 'Urgente: Enviar Informes de Gastos del Q3 antes de las 5 PM', time: 'hace 4 horas', type: 'urgent' },
    { id: 3, title: 'Nuevos protocolos de seguridad actualizados para el Sitio B', time: 'hace 1 día', type: 'success' },
  ];

  const docs = [
    { title: 'Manual del Empleado 2024', size: '2.4 MB' },
    { title: 'Guías de Seguridad TI', size: '1.1 MB' },
    { title: 'Calendario de Festivos', size: '0.5 MB' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20"> {/* Aumenté un poco la altura para el logo */}
            {/* Logo */}
            <div className="flex items-center">
              <NovalLogo size="small" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center px-8">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar herramientas, documentos. . ."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>
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
              {/* Simplified Mobile Menu */}
              <div className="p-3">
                <p className="text-slate-500 text-sm">Menú</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Bienvenido al Portal Noval
          </h1>
          <p className="text-slate-500 mt-1">Accede a todas tus herramientas de gestión desde un solo lugar.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Apps Grid */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-slate-900" />
                  Aplicaciones Disponibles
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apps.map(app => (
                  <AppCard key={app.id} item={app} />
                ))}
              </div>
            </section>

            {/* Quick Stats / Recent Activity Area (Placeholder) */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Estado del Sistema</h3>
              <div className="h-48 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-300">
                <p className="text-slate-400 text-sm font-medium">Todos los sistemas operativos</p>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* System Alerts */}
            <SidebarWidget title="Noticias y Alertas" icon={<Bell className="w-5 h-5" />}>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${alert.type === 'urgent' ? 'bg-red-500 shadow-red-200 shadow-md animate-pulse' :
                        alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`} />
                    <div>
                      <p className="text-sm font-medium text-slate-700 leading-snug hover:text-slate-900 cursor-pointer transition-colors">
                        {alert.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarWidget>

            {/* Quick Docs */}
            <SidebarWidget title="Documentación" icon={<FileText className="w-5 h-5" />}>
              <div className="space-y-3">
                {docs.map((doc, idx) => (
                  <div key={idx} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 group-hover:text-amber-700 transition-colors">{doc.title}</p>
                        <p className="text-xs text-slate-400">{doc.size} • PDF</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-xs font-bold text-amber-600 hover:text-amber-700 text-center uppercase tracking-wide py-2">
                Ver Todos los Documentos
              </button>
            </SidebarWidget>

          </div>
        </div>
      </main>
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