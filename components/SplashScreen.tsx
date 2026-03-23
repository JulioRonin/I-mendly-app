import React, { useEffect, useState } from 'react';
import IMendlyLogo from './IMendlyLogo';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(onDone, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060D16 0%, #0F3460 60%, #060D16 100%)' }}
    >
      {/* Background blobs */}
      <div className="blob-coral absolute" style={{ width: 400, height: 400, top: '-10%', right: '-15%', opacity: 0.6 }} />
      <div className="blob-teal absolute" style={{ width: 300, height: 300, bottom: '5%', left: '-10%', opacity: 0.5 }} />

      {/* Rotating ring */}
      <div className="absolute" style={{ width: 280, height: 280, border: '1px solid rgba(255,107,71,0.08)', borderRadius: '50%', animation: 'spin 12s linear infinite' }} />
      <div className="absolute" style={{ width: 360, height: 360, border: '1px solid rgba(8,145,178,0.06)', borderRadius: '50%', animation: 'spin 18s linear infinite reverse' }} />

      {/* Content */}
      <div
        className="flex flex-col items-center gap-6 relative z-10"
        style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <IMendlyLogo size={64} showWordmark={false} />

        <div className="flex flex-col items-center gap-2">
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 32, letterSpacing: '-0.04em', color: 'white', textAlign: 'center', lineHeight: 1.1 }}>
            i <span style={{ color: '#FF6B47' }}>mendly</span>
          </h1>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Servicios del hogar con confianza
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div
        className="absolute bottom-16 flex gap-2"
        style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i === 0 ? '#FF6B47' : 'rgba(255,255,255,0.25)',
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
