import React, { useEffect, useState } from 'react';

interface Props { onDone: () => void; }

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    const t4 = setTimeout(onDone, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  const photos = [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80&fit=crop',
    'https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=300&q=80&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80&fit=crop',
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#F6F5F2' }}>

      {/* Decorative gradient blob */}
      <div className="absolute" style={{
        width: 400, height: 400, top: '-10%', right: '-15%',
        background: 'radial-gradient(circle, rgba(108,92,231,0.08) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div className="absolute" style={{
        width: 300, height: 300, bottom: '5%', left: '-10%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Fanned photo cards */}
      <div className="relative mb-12" style={{ width: 200, height: 160 }}>
        {photos.map((src, i) => {
          const rotation = (i - 1) * 12;
          const offsetX = (i - 1) * 8;
          const show = phase >= 1;
          return (
            <div key={i} className="absolute" style={{
              width: 130, height: 160,
              left: '50%', top: '50%',
              transform: show
                ? `translate(-50%, -50%) rotate(${rotation}deg) translateX(${offsetX}px)`
                : 'translate(-50%, -50%) rotate(0deg) scale(0.8)',
              opacity: show ? 1 : 0,
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(22,22,42,0.12)',
              zIndex: 3 - i,
            }}>
              <img src={src} alt="" className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = ['#6C5CE7','#FF6B35','#00B894'][i]; }}
              />
            </div>
          );
        })}
      </div>

      {/* Brand */}
      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        textAlign: 'center',
      }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: '#6C5CE7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(108,92,231,0.35)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 28, color: '#16162A', letterSpacing: '-0.05em' }}>
            i<span style={{ color: '#6C5CE7' }}>mendly</span>
          </span>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9A9AAF', fontWeight: 500, letterSpacing: '-0.01em' }}>
          Servicios del hogar con confianza
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16" style={{
        opacity: phase >= 3 ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i === 0 ? '#6C5CE7' : i === 1 ? '#A29BFE' : '#EEEDF0',
              animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
