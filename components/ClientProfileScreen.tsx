import React from 'react';
import { AppState, AppView } from '../types';
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

const MENU_ICONS = {
  address: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  payment: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  notif:   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  star:    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  lock:    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  chat:    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  doc:     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
};

export default function ClientProfileScreen({ state, navigate }: Props) {
  const user = state.clientUser;
  const completedCount = state.orders.filter(o => o.escrow?.status === 'released').length;

  const menuItems = [
    { icon: MENU_ICONS.address, label: 'Mis direcciones',    sub: 'Gestiona tus ubicaciones' },
    { icon: MENU_ICONS.payment, label: 'Métodos de pago',    sub: 'Tarjetas y transferencias' },
    { icon: MENU_ICONS.notif,   label: 'Notificaciones',     sub: 'Configura tus alertas' },
    { icon: MENU_ICONS.star,    label: 'Mis reseñas',        sub: `${completedCount} servicios valorados` },
    { icon: MENU_ICONS.lock,    label: 'Seguridad',          sub: 'Contraseña y privacidad' },
    { icon: MENU_ICONS.chat,    label: 'Soporte imendly',    sub: 'Ayuda y centro de soporte' },
    { icon: MENU_ICONS.doc,     label: 'Términos y privacidad', sub: 'Políticas de la plataforma' },
  ];

  return (
    <div className="h-full flex flex-col" style={{ background: '#F5F5F5' }}>
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* Hero */}
        <div style={{ background: '#1F1F1F', padding: '52px 20px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -50, right: -40, width: 200, height: 200, borderRadius: '50%', background: '#3DB87A', opacity: 0.07, filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, borderRadius: 26, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 26, color: '#1F1F1F', boxShadow: '0 8px 24px rgba(193,232,213,0.35)' }}>
                {user?.initials ?? 'U'}
              </div>
              <button style={{ position: 'absolute', bottom: -4, right: -4, width: 26, height: 26, borderRadius: 9, background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              </button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 22, color: 'white', letterSpacing: '-0.04em', margin: '0 0 4px' }}>{user?.name}</h2>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 2px' }}>{user?.email}</p>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>{user?.zone} · {user?.city}</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 10, width: '100%' }}>
              {[
                { label: 'Servicios',   value: state.orders.length },
                { label: 'Completados', value: completedCount },
                { label: 'Zona',        value: user?.zone?.split(' ')[0] ?? 'Norte' },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 18, color: 'white', letterSpacing: '-0.04em' }}>{stat.value}</span>
                  <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ background: 'white', borderRadius: 22, overflow: 'hidden', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)', marginBottom: 16 }}>
            {menuItems.map((item, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: i < menuItems.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: '#1F1F1F', margin: '0 0 2px' }}>{item.label}</p>
                  <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: '#6B6B6B', margin: 0 }}>{item.sub}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4D4D4" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
          </div>

          {/* Logout */}
          <button onClick={() => navigate(AppView.LOGIN)}
            style={{ width: '100%', padding: '15px', background: 'rgba(239,68,68,0.06)', border: '1.5px solid rgba(239,68,68,0.15)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: '#EF4444', cursor: 'pointer', marginBottom: 24 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Cerrar sesión
          </button>

          {/* Branding */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingBottom: 32 }}>
            <IMendlyLogo size={26} variant="light" />
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: '#A8A8A8', margin: 0 }}>v1.0 · Ciudad Juárez, Chih. · 2026</p>
          </div>
        </div>
      </div>

      <BottomNav current={AppView.PROFILE} role="client" navigate={navigate} />
    </div>
  );
}
