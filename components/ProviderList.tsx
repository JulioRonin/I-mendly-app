import React, { useState } from 'react';
import { AppState, AppView, Provider, ServiceCategory } from '../types';
import { MOCK_PROVIDERS, SERVICE_CATEGORIES, ZONES } from '../constants';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
  setCategory: (c: ServiceCategory | null) => void;
  setProvider: (p: Provider | null) => void;
  setService: (s: any) => void;
  setBooking: (b: any) => void;
}

const BADGE_LABELS: Record<string, string> = {
  top_rated: '⭐ Top', fast_response: '⚡ Rápido', pro_certified: '🏅 Pro', background_checked: '✅ Verificado', new: '🆕 Nuevo',
};

export default function ProviderList({ state, navigate, goBack, setProvider }: Props) {
  const [zone, setZone] = useState('Todas las zonas');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'jobs'>('rating');
  const cat = state.selectedCategory;

  const providers = MOCK_PROVIDERS
    .filter(p => !cat || p.categories.includes(cat.id))
    .filter(p => zone === 'Todas las zonas' || p.zone === zone)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.startingPrice - b.startingPrice;
      return b.completedJobs - a.completedJobs;
    });

  const handleSelect = (p: Provider) => {
    setProvider(p);
    navigate(AppView.PROVIDER_PROFILE);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title={cat?.name ?? 'Proveedores'} showBack onBack={goBack} />

      {/* Filters */}
      <div className="flex flex-col gap-3 px-4 py-3" style={{ background: 'rgba(15,52,96,0.2)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Zone chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {ZONES.slice(0, 6).map(z => (
            <button key={z} onClick={() => setZone(z)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                background: zone === z ? 'linear-gradient(135deg,#0891B2,#0F3460)' : 'rgba(255,255,255,0.06)',
                color: zone === z ? 'white' : 'rgba(255,255,255,0.5)',
                border: zone === z ? 'none' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: zone === z ? '0 4px 12px rgba(8,145,178,0.25)' : 'none',
                cursor: 'pointer',
              }}>
              {z === 'Todas las zonas' ? '📍 ' + z : z}
            </button>
          ))}
        </div>
        {/* Sort */}
        <div className="flex gap-2">
          {[{ key: 'rating', label: '⭐ Mejor calificados' }, { key: 'price', label: '💰 Menor precio' }, { key: 'jobs', label: '📋 Más servicios' }].map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key as any)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                background: sortBy === s.key ? 'rgba(255,107,71,0.2)' : 'rgba(255,255,255,0.05)',
                color: sortBy === s.key ? '#FF6B47' : 'rgba(255,255,255,0.4)',
                border: sortBy === s.key ? '1px solid rgba(255,107,71,0.3)' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2">
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          {providers.length} proveedores disponibles{cat ? ` en ${cat.name}` : ''}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-3 px-4 pb-6">
          {providers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <span style={{ fontSize: 48 }}>🔍</span>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                Sin proveedores en esta zona
              </p>
            </div>
          ) : (
            providers.map((p, i) => (
              <button key={p.id} onClick={() => handleSelect(p)}
                className="w-full text-left hover-lift rounded-2xl overflow-hidden transition-all duration-200"
                style={{ background: 'rgba(15,52,96,0.35)', border: '1.5px solid rgba(255,255,255,0.07)', cursor: 'pointer', animationDelay: `${i * 50}ms` }}>
                <div className="p-4 flex flex-col gap-3">
                  {/* Top row */}
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                      style={{ background: p.avatarColor, fontFamily: 'Syne, sans-serif', color: 'white' }}>
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white' }}>{p.name}</h3>
                        {p.imendlyCertified && (
                          <span className="badge-teal px-2 py-0.5" style={{ fontSize: 10 }}>✓ Certificado</span>
                        )}
                      </div>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                        📍 {p.zone} · {p.yearsExperience} años exp.
                      </p>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4, lineHeight: 1.4 }}>
                        {p.description.substring(0, 80)}…
                      </p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
                      <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>{p.rating}</span>
                      <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>({p.reviewCount})</span>
                    </div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                      ✅ {p.completedJobs} servicios
                    </div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                      ⚡ ~{p.responseTimeMinutes} min
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {p.badges.slice(0, 2).map(b => (
                        <span key={b} className="badge-coral px-2 py-0.5" style={{ fontSize: 10 }}>{BADGE_LABELS[b]}</span>
                      ))}
                    </div>
                    <div>
                      <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Desde </span>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#FF6B47' }}>
                        ${p.startingPrice.toLocaleString('es-MX')}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
