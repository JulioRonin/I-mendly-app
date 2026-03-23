import React, { useState } from 'react';
import { AppState, AppView, Provider, ServiceCategory } from '../types';
import { SERVICE_CATEGORIES } from '../constants';
import Navbar from './Navbar';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
  setCategory: (c: ServiceCategory | null) => void;
  setProvider: (p: Provider | null) => void;
  setService: (s: any) => void;
  setBooking: (b: any) => void;
}

// Re-export as ProviderProfile
export default function ProviderProfile({ state, navigate, goBack, setService, setBooking }: Props) {
  const p = state.selectedProvider;
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'about'>('services');

  if (!p) return (
    <div className="h-full flex items-center justify-center" style={{ background: '#060D16' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Proveedor no encontrado</p>
    </div>
  );

  const catNames = p.categories.map(c => SERVICE_CATEGORIES.find(sc => sc.id === c)?.name).filter(Boolean).join(', ');

  const handleBook = (service: any) => {
    setService(service);
    setBooking({ service, provider: p, category: SERVICE_CATEGORIES.find(c => c.id === service.categoryId) });
    navigate(AppView.SERVICE_CONFIG);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar showBack onBack={goBack} transparent
        rightContent={
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 16 }}>💙</button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 16 }}>📤</button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Hero section */}
        <div className="px-4 pt-2 pb-5" style={{ background: 'linear-gradient(180deg, rgba(15,52,96,0.4) 0%, transparent 100%)' }}>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0"
              style={{ background: p.avatarColor, fontFamily: 'Syne, sans-serif', color: 'white', boxShadow: `0 8px 24px ${p.avatarColor}50` }}>
              {p.initials}
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', letterSpacing: '-0.03em' }}>{p.name}</h1>
                {p.imendlyCertified && <span className="badge-teal px-2 py-1" style={{ fontSize: 10 }}>✓ Certificado I mendly</span>}
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {catNames}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <span style={{ color: '#F59E0B', fontSize: 14 }}>★</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>{p.rating}</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>({p.reviewCount} reseñas)</span>
                </div>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>📍 {p.zone}</span>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: 'Servicios', value: p.completedJobs, suffix: '' },
              { label: 'Completados', value: p.completionRate, suffix: '%' },
              { label: 'Experiencia', value: p.yearsExperience, suffix: ' años' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: 'white', letterSpacing: '-0.03em' }}>
                  {stat.value}{stat.suffix}
                </span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: 'rgba(8,145,178,0.15)', border: '1.5px solid rgba(8,145,178,0.25)', color: '#0891B2', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
              <span>📞</span> Llamar
            </button>
            <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.20)', color: '#10B981', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
              <span>💬</span> Chat
            </button>
            <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
              <span>📍</span> Ver zona
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-0 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          {[{ id: 'services', label: 'Servicios' }, { id: 'reviews', label: 'Reseñas' }, { id: 'about', label: 'Acerca de' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className="flex-1 py-3 text-sm font-semibold border-b-2 transition-all duration-200"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                borderBottomColor: activeTab === tab.id ? '#FF6B47' : 'transparent',
                color: activeTab === tab.id ? '#FF6B47' : 'rgba(255,255,255,0.4)',
                background: 'none', cursor: 'pointer',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="px-4 py-4 pb-28">
          {activeTab === 'services' && (
            <div className="flex flex-col gap-3">
              {p.services.map(s => (
                <div key={s.id} className="rounded-2xl p-4"
                  style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>{s.name}</p>
                        {s.popular && <span className="badge-coral px-2 py-0.5" style={{ fontSize: 10 }}>Popular</span>}
                      </div>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 3, lineHeight: 1.4 }}>{s.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                          ⏱ ~{s.estimatedMinutes >= 60 ? `${Math.round(s.estimatedMinutes / 60)}h` : `${s.estimatedMinutes}min`}
                        </span>
                        {s.includesMaterials && <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: '#10B981' }}>✅ Incluye mat.</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="text-right">
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>desde</p>
                        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#FF6B47' }}>
                          ${s.minPrice.toLocaleString('es-MX')}
                        </p>
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{s.unit}</p>
                      </div>
                      <button onClick={() => handleBook(s)} className="btn-coral px-3 py-1.5 text-xs font-bold"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Contratar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 p-4 rounded-2xl mb-2" style={{ background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.15)' }}>
                <div className="flex flex-col items-center">
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, color: '#F59E0B', letterSpacing: '-0.04em' }}>{p.rating}</span>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= Math.round(p.rating) ? '#F59E0B' : 'rgba(255,255,255,0.15)', fontSize: 14 }}>★</span>)}</div>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{p.reviewCount} reseñas</span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  {[5,4,3,2,1].map(star => {
                    const pct = star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : 1;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', width: 8 }}>{star}</span>
                        <div className="flex-1 progress-bar" style={{ height: 5 }}><div className="progress-fill" style={{ width: `${pct}%`, height: '100%' }} /></div>
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', width: 24 }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {[
                { name: 'María L.', init: 'ML', stars: 5, text: 'Excelente trabajo, muy puntual y profesional.', time: 'hace 2 días' },
                { name: 'Roberto S.', init: 'RS', stars: 5, text: 'Llegó a tiempo, trabajo perfecto. Lo recomiendo.', time: 'hace 1 semana' },
                { name: 'Claudia T.', init: 'CT', stars: 5, text: 'Super profesional, precio justo, calidad inmejorable.', time: 'hace 2 semanas' },
              ].map((r, i) => (
                <div key={i} className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.25)', border: '1.5px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: '#0891B2', fontFamily: 'Syne, sans-serif', color: 'white' }}>{r.init}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>{r.name}</p>
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{r.time}</span>
                      </div>
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.stars ? '#F59E0B' : 'rgba(255,255,255,0.15)', fontSize: 12 }}>★</span>)}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 8 }}>Descripción</h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{p.description}</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 10 }}>Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {p.categories.map(c => {
                    const cat = SERVICE_CATEGORIES.find(sc => sc.id === c);
                    return cat ? (
                      <span key={c} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ background: cat.iconBg, color: cat.iconColor, fontFamily: 'Plus Jakarta Sans, sans-serif', border: `1px solid ${cat.iconColor}30` }}>
                        {cat.icon} {cat.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(8,145,178,0.1)', border: '1.5px solid rgba(8,145,178,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontSize: 18 }}>🔒</span>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#0891B2' }}>Certificado I mendly</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {['Antecedentes no penales verificados', 'INE validado', 'Entrevista de calidad aprobada', 'Portafolio revisado'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <span style={{ color: '#10B981', fontSize: 14 }}>✅</span>
                      <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="px-4 py-3 pb-safe glass-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Precio base desde</p>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#FF6B47', letterSpacing: '-0.03em' }}>
              ${p.startingPrice.toLocaleString('es-MX')} <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>MXN</span>
            </p>
          </div>
          <button onClick={() => { if (p.services[0]) handleBook(p.services[0]); }}
            className="btn-coral px-6 py-3 text-sm font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Contratar ahora →
          </button>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <span style={{ fontSize: 14 }}>🔒</span>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
            Pago protegido por escrow · Sin anticipos · 100% seguro
          </span>
        </div>
      </div>
    </div>
  );
}
