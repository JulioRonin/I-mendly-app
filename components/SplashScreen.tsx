import React, { useState } from 'react';

interface Props { onDone: () => void; }

const CATEGORIES = [
  { id: 'electricity', label: 'Electricidad', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  )},
  { id: 'plumbing', label: 'Plomería', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
  )},
  { id: 'cleaning', label: 'Limpieza', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 22V12h4V7l5-4 5 4v5h4v10H3zM9 22v-4h6v4"/></svg>
  )},
  { id: 'ac', label: 'Clima A/C', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="8" rx="2"/><path d="M7 11v6a2 2 0 0 0 4 0v-6M13 11v4a2 2 0 0 0 4 0v-4"/></svg>
  )},
];

const STEPS = [
  { n: '01', title: 'Perfil Profesional', desc: 'Completa tu información básica, experiencia laboral y las categorías de servicio que dominas.' },
  { n: '02', title: 'Documentación', desc: 'Sube tu identificación oficial y comprobante de domicilio para validar tu identidad y seguridad.' },
  { n: '03', title: 'Antecedentes', desc: 'Iniciamos una revisión de antecedentes no penales para mantener nuestra comunidad segura.' },
  { n: '04', title: 'Entrevista Digital', desc: 'Una breve videollamada para conocer tu metodología de trabajo y atención al cliente.' },
  { n: '05', title: 'Capacitación', desc: 'Accede a nuestros módulos sobre el estándar de servicio imendly y uso de la aplicación.' },
  { n: '06', title: 'Primer Servicio', desc: 'Una vez aprobado, activa tu disponibilidad y comienza a recibir solicitudes en tu zona.' },
];

export default function SplashScreen({ onDone }: Props) {
  const [activeCategory, setActiveCategory] = useState('electricity');

  return (
    <div className="h-full overflow-y-auto no-scrollbar" style={{ background: '#F5F5F5' }}>

      {/* ── DARK HERO ── */}
      <div style={{ background: '#1F1F1F', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=800&q=80&fit=crop"
            alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.65) 50%, #1F1F1F 100%)' }} />
        </div>

        {/* Header */}
        <div style={{ position: 'relative', zIndex: 1, padding: '56px 24px 0' }}>
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3DB87A" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', letterSpacing: '-0.03em' }}>imendly</span>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 1, padding: '44px 24px 0', flex: 1 }}>
          <h1 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 50, color: 'white', letterSpacing: '-0.05em', lineHeight: 0.95, margin: '0 0 20px' }}>
            Servicios<br />
            <span style={{ color: '#3DB87A' }}>a domicilio</span><br />
            en Juárez.
          </h1>
          <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 40, maxWidth: 300 }}>
            Conectamos clientes con profesionales verificados mientras te enfocas en lo que mejor sabes hacer.
          </p>

          {/* Category chips */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
              Elige un servicio
            </p>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  style={{
                    flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    padding: '16px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: activeCategory === cat.id ? '#3DB87A' : '#1C1C1C',
                    color: activeCategory === cat.id ? '#1F1F1F' : 'rgba(255,255,255,0.55)',
                    minWidth: 76, transition: 'all 0.2s ease',
                    boxShadow: activeCategory === cat.id ? '0 6px 20px rgba(193,232,213,0.3)' : 'none',
                  }}>
                  {cat.icon}
                  <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 10, whiteSpace: 'nowrap' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search + arrow */}
          <div className="flex items-center gap-3" style={{ marginBottom: 52 }}>
            <button onClick={onDone}
              style={{
                flex: 1, background: 'white', color: '#1F1F1F', border: 'none', borderRadius: 9999,
                padding: '16px 24px', fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', textAlign: 'left',
              }}>
              Buscar servicio
            </button>
            <button onClick={onDone}
              style={{
                width: 54, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer', flexShrink: 0,
                background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(193,232,213,0.35)',
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── STEPS SECTION ── */}
      <div style={{ background: '#F5F5F5', padding: '52px 24px 0' }}>
        <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 11, color: '#6B6B6B', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>El proceso</p>
        <h2 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 32, color: '#1F1F1F', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: 12 }}>
          Tu camino al éxito<br />en 6 pasos.
        </h2>
        <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 14, color: '#6B6B6B', lineHeight: 1.65, marginBottom: 40 }}>
          Nuestro proceso de selección garantiza la calidad para nuestros clientes y la seguridad para ti.
        </p>

        <div style={{ marginBottom: 52 }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', gap: 18, paddingBottom: i < STEPS.length - 1 ? 28 : 0 }}>
              {/* Number column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 50, flexShrink: 0 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 16, flexShrink: 0,
                  background: 'white',
                  boxShadow: '5px 5px 14px rgba(0,0,0,0.08), -3px -3px 10px rgba(255,255,255,0.9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 800, fontSize: 15, color: '#1F1F1F' }}>{s.n}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 1, flex: 1, marginTop: 8, background: 'rgba(0,0,0,0.09)' }} />
                )}
              </div>
              {/* Content */}
              <div style={{ paddingTop: 13 }}>
                <h3 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 16, color: '#1F1F1F', letterSpacing: '-0.02em', margin: '0 0 5px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#6B6B6B', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DARK CTA CARD ── */}
      <div style={{ padding: '0 20px 52px' }}>
        <div style={{ background: '#1F1F1F', borderRadius: 28, padding: '34px 26px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: '50%', background: '#3DB87A', opacity: 0.1, filter: 'blur(30px)', pointerEvents: 'none' }} />
          <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 11, color: '#3DB87A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Únete ahora</span>
          <h2 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 28, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '14px 0 10px' }}>
            ¿Listo para transformar tu oficio en un negocio?
          </h2>
          <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 26 }}>
            Únete a los más de 3,000 profesionales que ya confían en imendly para gestionar su agenda.
          </p>
          <button onClick={onDone} style={{ width: '100%', padding: '16px', background: 'white', color: '#1F1F1F', border: 'none', borderRadius: 9999, fontFamily: 'Urbanist, sans-serif', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginBottom: 10 }}>
            Comenzar mi registro ahora
          </button>
          <button onClick={onDone} style={{ width: '100%', padding: '14px', background: 'transparent', color: 'rgba(255,255,255,0.45)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 9999, fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            Ver requisitos
          </button>
        </div>
      </div>

    </div>
  );
}
