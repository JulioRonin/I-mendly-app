import React, { useState } from 'react';
import { UserRole } from '../types';

interface Props {
  onLogin: (role: UserRole) => void;
  onProviderRegister: () => void;
}

type Tab = 'client' | 'provider' | 'admin';

export default function LoginScreen({ onLogin, onProviderRegister }: Props) {
  const [tab, setTab] = useState<Tab>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const tabs: { id: Tab; label: string; desc: string }[] = [
    { id: 'client',   label: 'Cliente',   desc: 'Encuentra profesionales' },
    { id: 'provider', label: 'Proveedor', desc: 'Ofrece tus servicios' },
    { id: 'admin',    label: 'Admin',     desc: 'Panel de control' },
  ];

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden" style={{ background: '#F6F5F2' }}>

      {/* ── TOP HERO PHOTO (55%) ── */}
      <div className="relative" style={{ height: '52%', flexShrink: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85&fit=crop&crop=center"
          alt="Professional services"
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)'; }}
        />
        {/* Gradient fade into bg */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, transparent 40%, #F6F5F2 100%)',
        }} />

        {/* Top brand */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-12 flex items-center gap-2.5">
          <div style={{
            width: 36, height: 36, borderRadius: 11,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="#6C5CE7"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', letterSpacing: '-0.04em', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            imendly
          </span>
        </div>
      </div>

      {/* ── BOTTOM FORM SHEET ── */}
      <div className="flex-1 relative -mt-8 animate-slide-up" style={{ zIndex: 10 }}>
        <div style={{
          background: 'white',
          borderRadius: '28px 28px 0 0',
          padding: '28px 24px 32px',
          height: '100%',
          boxShadow: '0 -8px 40px rgba(22,22,42,0.08)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Title */}
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 26, color: '#16162A', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 4 }}>
            Bienvenido
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9A9AAF', fontWeight: 500, marginBottom: 20 }}>
            Inicia sesión para continuar
          </p>

          {/* Role selector */}
          <div className="flex gap-2 mb-5">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex-1 py-2.5 px-2 transition-all duration-250"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '-0.01em',
                  background: tab === t.id ? '#6C5CE7' : '#F6F5F2',
                  color: tab === t.id ? 'white' : '#9A9AAF',
                  border: tab === t.id ? 'none' : '1.5px solid #EEEDF0',
                  borderRadius: 9999,
                  cursor: 'pointer',
                  boxShadow: tab === t.id ? '0 4px 16px rgba(108,92,231,0.30)' : 'none',
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-3 mb-5">
            <input
              type="email"
              className="input-pill px-5 py-3.5"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                className="input-pill px-5 py-3.5 pr-12"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9A9AAF', display: 'flex' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {showPass ? (
                    <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                  ) : (
                    <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => onLogin(tab)}
            className="w-full py-4 btn-primary mb-3"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>
            {tab === 'client' ? 'Iniciar sesión' : tab === 'provider' ? 'Entrar como proveedor' : 'Acceder panel'}
          </button>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#C8C8D4', textAlign: 'center' }}>
            Demo — cualquier credencial funciona
          </p>

          {/* Provider register */}
          {tab === 'provider' && (
            <button onClick={onProviderRegister}
              className="mt-4 w-full py-3 btn-outline animate-fade-in"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }}>
              ¿Eres nuevo? Regístrate →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
