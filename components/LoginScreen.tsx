import React, { useState } from 'react';
import { UserRole } from '../types';

interface Props {
  onLogin: (role: UserRole) => void;
  onProviderRegister: () => void;
}

type Tab = 'client' | 'provider' | 'admin';

const ImendlyLogo = () => (
  <div className="flex items-center gap-2 mb-6">
    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#6B4EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(107,78,255,0.30)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white"/>
      </svg>
    </div>
    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 20, color: '#1A1A2E', letterSpacing: '-0.04em' }}>
      imendly
    </span>
  </div>
);

export default function LoginScreen({ onLogin, onProviderRegister }: Props) {
  const [tab, setTab] = useState<Tab>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'client',   label: 'Cliente'   },
    { id: 'provider', label: 'Proveedor' },
    { id: 'admin',    label: 'Admin'     },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar" style={{ background: '#F2F1F8' }}>
      <div style={{ minHeight: '100%', padding: '0 0 32px', display: 'flex', flexDirection: 'column' }}>

        {/* ── HEADER ── */}
        <div className="px-5 pt-10 pb-2">
          <ImendlyLogo />
          <div className="badge-pill mb-4" style={{ fontSize: 10 }}>Inicio de sesión</div>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 34, color: '#1A1A2E', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 8 }}>
            Bienvenido<br />de vuelta.
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7B7B8E', fontWeight: 400, lineHeight: 1.6 }}>
            Inicia sesión para continuar con tu cuenta.
          </p>
        </div>

        {/* ── FORM CARD ── */}
        <div className="px-5 pt-5 flex-1">
          <div style={{ background: 'white', borderRadius: 24, padding: '24px 20px', boxShadow: '0 4px 20px rgba(107,78,255,0.07)' }}>

            {/* Role tabs */}
            <div className="flex gap-1 p-1 mb-6 rounded-2xl" style={{ background: '#F2F1F8' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="flex-1 py-2.5 text-sm transition-all duration-200"
                  style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
                    background: tab === t.id ? '#6B4EFF' : 'transparent',
                    color: tab === t.id ? 'white' : '#AAAABB',
                    border: 'none', borderRadius: 14, cursor: 'pointer',
                    boxShadow: tab === t.id ? '0 4px 16px rgba(107,78,255,0.30)' : 'none',
                    letterSpacing: '-0.01em',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="field-label">Correo electrónico</label>
              <input type="email" className="input-field" placeholder="nombre@ejemplo.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="field-label">Contraseña</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} className="input-field pr-12" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#AAAABB', display: 'flex' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
            <button onClick={() => onLogin(tab)} className="btn-primary w-full py-4 mb-3">
              {tab === 'client' ? 'Iniciar sesión' : tab === 'provider' ? 'Acceder como proveedor' : 'Panel de administración'}
            </button>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#AAAABB', textAlign: 'center' }}>
              Demo · cualquier credencial funciona
            </p>
          </div>

          {/* Provider register */}
          {tab === 'provider' && (
            <div className="mt-4 animate-fade-in" style={{
              background: 'white', borderRadius: 20, padding: '20px',
              boxShadow: '0 4px 20px rgba(107,78,255,0.07)',
              border: '1px solid rgba(107,78,255,0.12)',
            }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#1A1A2E', letterSpacing: '-0.02em', marginBottom: 6 }}>
                ¿Eres nuevo proveedor?
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#7B7B8E', marginBottom: 14, lineHeight: 1.5 }}>
                Únete a la red y empieza a generar ingresos con certeza.
              </p>
              <button onClick={onProviderRegister}
                className="btn-outline w-full py-3"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600 }}>
                Comenzar mi registro →
              </button>
            </div>
          )}

          {/* Trust */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { icon: '🔒', label: 'Encriptación grado bancario' },
              { icon: '💬', label: 'Soporte 24/7' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <span style={{ fontSize: 14 }}>{t.icon}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: '#AAAABB', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
