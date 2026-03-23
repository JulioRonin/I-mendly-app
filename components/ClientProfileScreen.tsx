import React from 'react';
import { AppState, AppView } from '../types';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import IMendlyLogo from './IMendlyLogo';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
  setCategory: (c: any) => void;
  setProvider: (p: any) => void;
  setService: (s: any) => void;
  setBooking: (b: any) => void;
}

export default function ClientProfileScreen({ state, navigate, goBack }: Props) {
  const user = state.clientUser;

  const menuItems = [
    { icon: '📍', label: 'Mis direcciones', sub: 'Gestiona tus ubicaciones' },
    { icon: '💳', label: 'Métodos de pago', sub: 'Tarjetas y transferencias' },
    { icon: '🔔', label: 'Notificaciones', sub: 'Configura tus alertas' },
    { icon: '⭐', label: 'Mis reseñas', sub: `${state.orders.filter(o => o.status === 'completed' || o.escrow?.status === 'released').length} servicios valorados` },
    { icon: '🔒', label: 'Seguridad', sub: 'Contraseña y privacidad' },
    { icon: '💬', label: 'Soporte I mendly', sub: 'Ayuda y centro de soporte' },
    { icon: '📄', label: 'Términos y privacidad', sub: 'Políticas de la plataforma' },
  ];

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Mi perfil" notifCount={state.notifCount} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-4 pb-24">
          {/* Profile hero */}
          <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-6"
            style={{ background: 'linear-gradient(180deg, rgba(15,52,96,0.3) 0%, transparent 100%)' }}>
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl"
                style={{ background: 'linear-gradient(135deg,#FF6B47,#CC4A2A)', fontFamily: 'Syne, sans-serif', color: 'white', boxShadow: '0 8px 24px rgba(255,107,71,0.35)' }}>
                {user?.initials ?? 'U'}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                style={{ background: '#0891B2', cursor: 'pointer' }}>✏️</button>
            </div>
            <div className="text-center">
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', letterSpacing: '-0.03em' }}>{user?.name}</h2>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{user?.email}</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                📍 {user?.zone} · {user?.city}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-3 w-full">
              {[
                { label: 'Servicios', value: state.orders.length },
                { label: 'Completados', value: state.orders.filter(o => o.escrow?.status === 'released').length },
                { label: 'Zona', value: user?.zone?.split(' ')[0] ?? 'Norte' },
              ].map(stat => (
                <div key={stat.label} className="flex-1 flex flex-col items-center gap-0.5 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: 'white' }}>{stat.value}</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col mx-4 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(15,52,96,0.25)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
            {menuItems.map((item, i) => (
              <button key={i} className="flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 hover:bg-white hover:bg-opacity-5"
                style={{ borderBottom: i < menuItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer', background: 'none' }}>
                <span style={{ fontSize: 18, width: 24, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                <div className="flex-1">
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: 'white' }}>{item.label}</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{item.sub}</p>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>›</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="px-4">
            <button onClick={() => navigate(AppView.LOGIN)}
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', color: '#EF4444', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
              🚪 Cerrar sesión
            </button>
          </div>

          {/* Branding */}
          <div className="flex flex-col items-center gap-2 px-4 pb-4">
            <IMendlyLogo size={28} />
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
              v1.0 · Ciudad Juárez, Chih. · 2026
            </p>
          </div>
        </div>
      </div>

      <BottomNav currentView={AppView.CLIENT_PROFILE} onNavigate={v => navigate(v)} role="client" />
    </div>
  );
}
