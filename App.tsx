import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import {
  Car,
  ClipboardCheck,
  Package,
  Briefcase,
  Lock,
  ChevronRight,
  Menu,
  X,
  QrCode as QrCodeIcon, // Rename Lucide icon to avoid conflict
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

// 1. Logo Original de Noval Adaptado al Dark Mode
const NovalLogo: React.FC<{ size?: 'small' | 'large' }> = ({ size = 'large' }) => {
  const isLarge = size === 'large';

  return (
    <div className="flex flex-col items-center justify-center group cursor-pointer mt-1">
      <div className={`${isLarge ? 'w-16 h-8' : 'w-10 h-5'} border-2 border-white rounded-sm flex flex-col justify-end items-center relative mb-1 group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300`}>
        <div className="w-full flex justify-around items-end h-full pb-0.5">
          <div className="h-2 w-px bg-white group-hover:bg-indigo-400 transition-colors duration-300"></div>
          <div className="h-1 w-px bg-white group-hover:bg-indigo-400 transition-colors duration-300"></div>
          <div className="h-2 w-px bg-white group-hover:bg-indigo-400 transition-colors duration-300"></div>
          <div className="h-1 w-px bg-white group-hover:bg-indigo-400 transition-colors duration-300"></div>
          <div className="h-2 w-px bg-white group-hover:bg-indigo-400 transition-colors duration-300"></div>
        </div>
      </div>

      <div className="text-center leading-none">
        <h1 className={`${isLarge ? 'text-4xl' : 'text-xl'} font-bold tracking-tight text-white group-hover:text-indigo-50 transition-colors duration-300`}>NOVAL</h1>
        <p className={`${isLarge ? 'text-sm' : 'text-[0.6rem]'} tracking-[0.2em] font-light text-indigo-400 uppercase italic`}>PROPERTIES</p>
      </div>
    </div>
  );
};

// 2. Tarjetas de Aplicación
const AppCard: React.FC<{ item: AppItem; index: number }> = ({ item, index }) => {
  const CardContent = (
    <div className={`relative h-full p-6 rounded-3xl border transition-all duration-500 overflow-hidden ${item.disabled
      ? 'bg-[#13161c]/40 border-white/5 opacity-60 grayscale'
      : 'bg-[#13161c]/80 backdrop-blur-xl border-white/10 hover:border-indigo-500/50 group shadow-xl shadow-black/40'
      }`}>

      {!item.disabled && (
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl group-hover:opacity-25 transition-opacity duration-700`} />
      )}

      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-indigo-500/20 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
          {React.cloneElement(item.icon as React.ReactElement, { size: 22 })}
        </div>
        {!item.disabled && (
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all duration-300">
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-100 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-400 font-light leading-relaxed mb-6 text-xs max-w-[95%]">
          {item.description}
        </p>
      </div>

      <div className="mt-auto relative z-10">
        {item.disabled ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            <Lock className="w-2.5 h-2.5" /> En Desarrollo
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-indigo-400 group-hover:text-indigo-300 transition-colors uppercase">
            Abrir Aplicación
            <div className="h-[1px] w-6 bg-indigo-500/50 group-hover:w-10 transition-all duration-500" />
          </div>
        )}
      </div>
    </div>
  );

  const Wrapper = item.disabled ? 'div' : 'a';
  const wrapperProps = item.disabled ? {} : {
    href: item.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "relative block h-full transition-all duration-500 hover:-translate-y-1.5 group"
  };

  return (
    <div className="card-entrance" style={{ animationDelay: `${index * 100}ms` }}>
      <Wrapper {...(wrapperProps as any)} className={item.disabled ? "relative h-full transition-all duration-500 cursor-not-allowed" : wrapperProps.className}>
        {!item.disabled && (
          <div className="absolute inset-4 rounded-3xl bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        {CardContent}
      </Wrapper>
    </div>
  );
};

// 3. Componente Principal
const Dashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false); // <-- Estado para el Modal QR

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

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(12px); }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .card-entrance {
          opacity: 0;
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .modal-overlay {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        .modal-content {
          animation: modalScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Atmósfera de Fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header Compacto con Botón QR */}
      <header className="relative z-30 border-b border-white/5 bg-[#0a0c10]/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <NovalLogo size="small" />

            <div className="hidden md:flex items-center">
              {/* Botón Acceso Móvil */}
              <button
                onClick={() => setQrModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 group shadow-lg"
              >
                <QrCodeIcon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                <span className="text-[10px] font-bold tracking-widest text-gray-300 group-hover:text-white uppercase">Acceso Móvil</span>
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-6 py-8 flex flex-col justify-center">
        <div className={`mb-8 space-y-3 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-indigo-400 uppercase">Sistema Operativo v2.0</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white italic">
            Bienvenido al <span className="text-indigo-500">Hub</span>
          </h2>
          <p className="text-gray-500 text-sm font-light max-w-lg">
            Gestiona todas tus herramientas de Noval Properties desde un panel centralizado con seguridad en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {apps.map((app, index) => (
            <AppCard key={app.id} item={app} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 bg-black/20 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/80 font-bold tracking-[0.2em] uppercase">
            POWERED BY QTC-SOLUTIONS | COPYRIGHT © 2026
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-white/60 tracking-[0.2em] hover:text-white cursor-pointer transition-colors uppercase">Soporte</span>
            <span className="text-[10px] text-white/60 tracking-[0.2em] hover:text-white cursor-pointer transition-colors uppercase">Privacidad</span>
          </div>
        </div>
      </footer>

      {/* Modal del Código QR */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo oscuro desenfocado */}
          <div
            className="absolute inset-0 bg-[#0a0c10]/80 modal-overlay"
            onClick={() => setQrModalOpen(false)}
          />

          {/* Caja del Modal */}
          <div className="relative bg-[#13161c] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full shadow-2xl shadow-indigo-500/20 modal-content overflow-hidden">
            {/* Efecto de luz interno */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div className="text-center relative z-10 mt-2">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                <QrCodeIcon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Lleva el Hub contigo</h3>
              <p className="text-sm text-gray-400 mb-8 font-light leading-relaxed">
                Escanea este código con la cámara de tu móvil para acceder al ecosistema de Noval Properties desde cualquier lugar.
              </p>

              {/* Contenedor del QR Code visual */}
              <div className="bg-white p-4 rounded-3xl mx-auto w-48 h-48 shadow-lg shadow-black/50 transform hover:scale-105 transition-transform duration-300">
                {/* SVG Simulando un QR (Aquí puedes reemplazarlo por un <QRCode /> real en el futuro) */}
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value="https://noval-acces.vercel.app"
                  viewBox={`0 0 256 256`}
                />
              </div>

              <div className="mt-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                noval-acces.vercel.app
              </div>
            </div>
          </div>
        </div>
      )}
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