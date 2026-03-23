import React, { useState } from 'react';
import IMendlyLogo from './IMendlyLogo';
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

  const tabData: { id: Tab; label: string; icon: string }[] = [
    { id: 'client', label: 'Cliente', icon: '🏠' },
    { id: 'provider', label: 'Proveedor', icon: '🔧' },
    { id: 'admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden px-5"
      style={{ background: 'linear-gradient(160deg, #060D16 0%, #0F3460 55%, #060D16 100%)' }}>
      <div className="blob-coral absolute" style={{ width: 500, height: 500, top: '-20%', right: '-20%', opacity: 0.5 }} />
      <div className="blob-teal absolute" style={{ width: 320, height: 320, bottom: '5%', left: '-15%', opacity: 0.4 }} />

      <div className="w-full max-w-sm relative z-10 flex flex-col gap-6 animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <IMendlyLogo size={48} />
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Servicios del hogar con confianza
          </p>
        </div>

        {/* Main Card */}
        <div className="glass rounded-2xl p-6 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {tabData.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  background: tab === t.id ? 'linear-gradient(135deg,#FF6B47,#CC4A2A)' : 'transparent',
                  color: tab === t.id ? 'white' : 'rgba(255,255,255,0.4)',
                  boxShadow: tab === t.id ? '0 4px 12px rgba(255,107,71,0.3)' : 'none',
                }}>
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Correo electrónico</label>
              <input type="email" className="input-dark px-4 py-3" placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Contraseña</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} className="input-dark px-4 py-3 pr-12" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'rgba(255,255,255,0.3)' }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          <button onClick={() => onLogin(tab)} className="btn-coral w-full py-3.5 text-sm font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {tab === 'client' ? 'Entrar como cliente' : tab === 'provider' ? 'Entrar como proveedor' : 'Acceder al panel admin'}
          </button>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Demo · cualquier credencial funciona</p>
        </div>

        {/* Provider register CTA */}
        {tab === 'provider' && (
          <div className="glass-light rounded-2xl p-4 flex flex-col gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'rgba(255,107,71,0.15)' }}>🚀</div>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>¿Eres nuevo proveedor?</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Únete y empieza a ganar con certeza</p>
              </div>
            </div>
            <button onClick={onProviderRegister} className="btn-ghost py-2.5 text-sm w-full" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Comenzar mi registro →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
