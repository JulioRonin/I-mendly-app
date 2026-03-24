import React, { useEffect, useState } from 'react';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(onDone, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Full-bleed hero photo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85&fit=crop&crop=center"
          alt="Service professional"
          className="w-full h-full object-cover"
          style={{ opacity: 0.55 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.95) 100%)'
        }} />
      </div>

      {/* Top logo */}
      <div
        className="relative z-10 px-6 pt-14"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: '#7C3AED',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
          }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.04em' }}>
            i<span style={{ color: '#A78BFA' }}>mendly</span>
          </span>
        </div>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 mt-auto px-6 pb-16">
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          {/* Slide indicators */}
          <div className="flex gap-1.5 mb-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                height: 4, width: i === 0 ? 28 : 8,
                borderRadius: 999,
                background: i === 0 ? '#7C3AED' : 'rgba(255,255,255,0.2)',
              }} />
            ))}
          </div>

          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 38,
            color: 'white',
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            marginBottom: 14,
          }}>
            Hogar limpio,<br />
            <span style={{ color: '#A78BFA' }}>siempre feliz</span>
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 400,
            lineHeight: 1.65,
            marginBottom: 32,
            maxWidth: 270,
          }}>
            Servicios del hogar personalizados y adaptados perfectamente a tu estilo de vida.
          </p>

          {/* CTA */}
          <div style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <button
              onClick={onDone}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: '#7C3AED',
                border: 'none',
                borderRadius: 999,
                padding: '12px 24px 12px 14px',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(124,58,237,0.5)',
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15.5 5L21 12L15.5 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12H21" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>
                Comenzar
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>›››</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
