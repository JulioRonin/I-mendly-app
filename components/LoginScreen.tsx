import React, { useState } from 'react';
import { AppView } from '../types';

interface Props {
  onLogin: (role: 'client' | 'provider' | 'admin') => void;
  navigate: (v: AppView) => void;
}

export default function LoginScreen({ onLogin, navigate }: Props) {
  const [role, setRole] = useState<'client' | 'provider'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (email === 'admin@imendly.com') { onLogin('admin'); return; }
    onLogin(role);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#F5F5F5' }}>

      {/* ── DARK HEADER ── */}
      <div style={{ background: '#1F1F1F', padding: '52px 24px 36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: '#3DB87A', opacity: 0.07, filter: 'blur(40px)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div className="flex items-center gap-2" style={{ marginBottom: 32 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3DB87A" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', letterSpacing: '-0.03em' }}>imendly</span>
        </div>

        <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 11, color: '#3DB87A', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Inicio de sesión</span>
        <h1 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 42, color: 'white', letterSpacing: '-0.05em', lineHeight: 0.95, margin: '10px 0 0' }}>
          Bienvenido<br />de vuelta.
        </h1>
      </div>

      {/* ── FORM CARD ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '0 20px 32px', marginTop: -20 }}>
        <div style={{ background: 'white', borderRadius: '28px 28px 24px 24px', padding: '28px 24px', boxShadow: '8px 8px 30px rgba(0,0,0,0.10), -4px -4px 16px rgba(255,255,255,0.9)' }}>

          {/* Role tabs */}
          <div className="flex gap-2 p-1.5 rounded-2xl" style={{ background: '#F5F5F5', marginBottom: 24 }}>
            {(['client', 'provider'] as const).map(r => (
              <button key={r} onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: '11px', border: 'none', borderRadius: 14, cursor: 'pointer',
                  fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 13,
                  background: role === r ? '#1F1F1F' : 'transparent',
                  color: role === r ? 'white' : '#6B6B6B',
                  boxShadow: role === r ? '4px 4px 12px rgba(0,0,0,0.2)' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                {r === 'client' ? 'Soy Cliente' : 'Soy Proveedor'}
              </button>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label className="field-label">Correo electrónico</label>
            <input type="email" className="input-field" placeholder="nombre@ejemplo.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28, position: 'relative' }}>
            <label className="field-label">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} className="input-field" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: 50 }} />
              <button onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B6B6B', padding: 0 }}>
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, fontWeight: 600, color: '#6B6B6B', cursor: 'pointer' }}>¿Olvidaste tu contraseña?</span>
            </div>
          </div>

          {/* CTA */}
          <button onClick={handleLogin}
            className="btn-primary"
            style={{ width: '100%', padding: '17px', fontSize: 16, letterSpacing: '-0.02em' }}>
            Iniciar sesión
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3" style={{ margin: '22px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: '#A8A8A8' }}>o continúa con</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { name: 'Google', icon: <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
              { name: 'Apple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
            ].map(s => (
              <button key={s.name} style={{ flex: 1, padding: '13px', background: '#F5F5F5', border: 'none', borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.8)', fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 13, color: '#1F1F1F' }}>
                {s.icon} {s.name}
              </button>
            ))}
          </div>

          {/* Register link */}
          <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#6B6B6B', textAlign: 'center', marginTop: 22 }}>
            ¿No tienes cuenta?{' '}
            <span onClick={() => navigate(AppView.PROVIDER_ONBOARDING)} style={{ color: '#1F1F1F', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#3DB87A' }}>
              Regístrate gratis
            </span>
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-6" style={{ marginTop: 20 }}>
          {[
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Encriptación bancaria' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: 'Soporte 24/7' },
          ].map(b => (
            <div key={b.text} className="flex items-center gap-1.5">
              {b.icon}
              <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, fontWeight: 600, color: '#6B6B6B', letterSpacing: '0.02em' }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
