import React, { useState } from 'react';
import { UserRole } from '../types';

interface Props {
  onLogin: (role: UserRole) => void;
  onProviderRegister: () => void;
}

type Tab = 'client' | 'provider' | 'admin';

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"/>
  </svg>
);
const WrenchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const EyeIcon = ({ open }: { open: boolean }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function LoginScreen({ onLogin, onProviderRegister }: Props) {
  const [tab, setTab] = useState<Tab>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const tabData: { id: Tab; label: string; Icon: React.FC }[] = [
    { id: 'client',   label: 'Cliente',    Icon: HomeIcon   },
    { id: 'provider', label: 'Proveedor',  Icon: WrenchIcon },
    { id: 'admin',    label: 'Admin',      Icon: ShieldIcon },
  ];

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden"
      style={{ background: '#0A0A0A' }}>

      {/* Hero photo top half */}
      <div className="absolute inset-0 top-0" style={{ height: '45%' }}>
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&fit=crop&crop=top"
          alt="Professional services"
          className="w-full h-full object-cover"
          style={{ opacity: 0.4 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,10,10,1) 100%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top branding */}
        <div className="px-6 pt-14 pb-4 flex items-center gap-2.5">
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: '#7C3AED',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.04em' }}>
            i<span style={{ color: '#A78BFA' }}>mendly</span>
          </span>
        </div>

        <div className="px-6 mb-6">
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 28, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Bienvenido de<br/>vuelta
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
            Servicios del hogar con confianza
          </p>
        </div>

        {/* Bottom card */}
        <div className="mt-auto px-5 pb-8 animate-slide-up">
          <div style={{
            background: '#111111',
            border: '1px solid #2A2A2A',
            borderRadius: 24,
            padding: '24px 20px',
          }}>
            {/* Role Tabs */}
            <div className="flex gap-1.5 p-1 rounded-2xl mb-6" style={{ background: '#1A1A1A' }}>
              {tabData.map(({ id, label, Icon }) => (
                <button key={id} onClick={() => setTab(id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    background: tab === id ? '#7C3AED' : 'transparent',
                    color: tab === id ? 'white' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: tab === id ? '0 4px 16px rgba(124,58,237,0.35)' : 'none',
                  }}>
                  <Icon />{label}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-4 mb-5">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="input-dark px-4 py-3.5"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ borderRadius: 14, fontSize: 15 }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="input-dark px-4 py-3.5 pr-12"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ borderRadius: 14, fontSize: 15 }}
                  />
                  <button onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center' }}>
                    <EyeIcon open={showPass} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => onLogin(tab)}
              className="w-full py-4 btn-purple"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, borderRadius: 16, letterSpacing: '-0.02em' }}>
              {tab === 'client' ? 'Entrar como cliente' : tab === 'provider' ? 'Entrar como proveedor' : 'Acceder al panel admin'}
            </button>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.18)', textAlign: 'center', marginTop: 12 }}>
              Demo · cualquier credencial funciona
            </p>
          </div>

          {/* Provider register CTA */}
          {tab === 'provider' && (
            <div className="mt-3 animate-fade-in" style={{
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 20,
              padding: '16px',
            }}>
              <div className="flex items-center gap-3 mb-3">
                <div style={{
                  width: 42, height: 42, borderRadius: 13,
                  background: 'rgba(124,58,237,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', letterSpacing: '-0.02em' }}>¿Eres nuevo proveedor?</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Únete y empieza a ganar con certeza</p>
                </div>
              </div>
              <button onClick={onProviderRegister}
                className="btn-ghost py-2.5 text-sm w-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '-0.01em' }}>
                Comenzar mi registro →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
