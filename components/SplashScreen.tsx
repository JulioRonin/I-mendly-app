import React, { useState } from 'react';

interface Props { onDone: () => void; }

const STEPS = [
  { num: '01', title: 'Perfil Profesional', desc: 'Completa tu información básica, experiencia laboral y las categorías de servicio que dominas.' },
  { num: '02', title: 'Documentación', desc: 'Sube tu identificación oficial y comprobante de domicilio para validar tu identidad y seguridad.' },
  { num: '03', title: 'Antecedentes', desc: 'Iniciamos una revisión de antecedentes sin cargos para mantener nuestra comunidad segura.' },
  { num: '04', title: 'Entrevista Digital', desc: 'Una breve videollamada para conocer tu metodología de trabajo y atención al cliente.' },
  { num: '05', title: 'Capacitación', desc: 'Accede a nuestros módulos sobre el estándar de servicio imendly y uso de la aplicación.' },
  { num: '06', title: '¡Primer Servicio!', desc: 'Una vez aprobado, activa tu disponibilidad y comienza a recibir solicitudes en tu zona.' },
];

const STATS = [
  { value: '+45k', label: 'Servicios completados' },
  { value: '4.9★', label: 'Calificación promedio' },
];

export default function SplashScreen({ onDone }: Props) {
  const [view, setView] = useState<'landing' | 'client'>('landing');

  return (
    <div className="h-full overflow-y-auto no-scrollbar" style={{ background: '#F2F1F8' }}>
      <div className="flex flex-col min-h-full">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-5 pt-8 pb-2">
          <div className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#6B4EFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v4h4V4h6v4h4V8l-3-4zM4 8v12a2 2 0 0 0 2 2h5v-6h2v6h5a2 2 0 0 0 2-2V8H4z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#1A1A2E', letterSpacing: '-0.04em' }}>imendly</span>
          </div>
          <button onClick={onDone}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6B4EFF', background: 'none', border: 'none', cursor: 'pointer' }}>
            Iniciar sesión
          </button>
        </div>

        {/* ── HERO ── */}
        <div className="px-5 pt-6 pb-5">
          <div className="badge-pill mb-4" style={{ fontSize: 10 }}>
            <span>●</span> Plataforma para profesionales
          </div>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 36, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#1A1A2E', marginBottom: 14 }}>
            Trabaja con<br />confianza.<br />
            <span style={{ color: '#6B4EFF' }}>Gana con certeza.</span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7B7B8E', lineHeight: 1.65, fontWeight: 400, marginBottom: 24 }}>
            Únete a la red de servicios domésticos más exclusiva. Te conectamos con clientes premium mientras tú te enfocas en lo que mejor sabes hacer.
          </p>

          <div className="flex flex-col gap-3">
            <button onClick={onDone}
              className="btn-primary py-4 w-full"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>
              Comenzar mi registro
            </button>
            <button
              onClick={onDone}
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15,
                color: '#1A1A2E', background: 'transparent',
                border: '1.5px solid #E8E7F0', borderRadius: 9999,
                padding: '14px 24px', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
              Ver requisitos
            </button>
          </div>
        </div>

        {/* ── FEATURED CARD ── */}
        <div className="px-5 mb-8">
          <div style={{
            background: 'white', borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(107,78,255,0.10)',
          }}>
            <div style={{ position: 'relative', height: 200 }}>
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=500&q=85&fit=crop"
                alt="Professional"
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg,#6B4EFF,#9580FF)'; }}
              />
              {/* Stats badge */}
              <div style={{
                position: 'absolute', bottom: 12, left: 12,
                background: 'white', borderRadius: 14, padding: '10px 14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                display: 'flex', gap: 16,
              }}>
                {STATS.map(s => (
                  <div key={s.value}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#1A1A2E', letterSpacing: '-0.03em' }}>{s.value}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#7B7B8E', fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── NUMBERED STEPS ── */}
        <div className="px-5 mb-8">
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 26, color: '#1A1A2E', letterSpacing: '-0.03em', marginBottom: 6 }}>
            Tu camino al éxito en 6 pasos
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#7B7B8E', fontWeight: 400, marginBottom: 24, lineHeight: 1.6 }}>
            Nuestro proceso de selección garantiza la calidad para nuestros clientes y la seguridad para ti.
          </p>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 pb-6" style={{ borderLeft: i < STEPS.length - 1 ? '1.5px solid #E8E7F0' : 'none', marginLeft: 20, paddingLeft: 24, position: 'relative' }}>
                {/* Number circle */}
                <div style={{
                  position: 'absolute',
                  left: -14, top: 0,
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#F2F1F8',
                  border: '1.5px solid #E8E7F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 10, color: '#6B4EFF' }}>{step.num}</span>
                </div>
                <div style={{ paddingTop: 2 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#1A1A2E', letterSpacing: '-0.02em', marginBottom: 4 }}>
                    {step.title}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#7B7B8E', lineHeight: 1.6, fontWeight: 400 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DARK CTA SECTION ── */}
        <div className="px-5 mb-6">
          <div style={{
            background: '#2D1569',
            borderRadius: 24,
            padding: '32px 24px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 26,
              color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15,
              marginBottom: 12,
            }}>
              ¿Listo para transformar tu oficio en un negocio?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24 }}>
              Únete hoy a los más de 5,000 profesionales que ya confían en imendly para gestionar su agenda.
            </p>
            <button onClick={onDone}
              style={{
                background: 'white', color: '#6B4EFF',
                border: 'none', borderRadius: 9999,
                padding: '16px 32px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16,
                width: '100%', letterSpacing: '-0.01em',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}>
              Comenzar mi registro ahora
            </button>
          </div>
        </div>

        {/* Bottom padding */}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
