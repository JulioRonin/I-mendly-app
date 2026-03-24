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

const FACE_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80&fit=crop&crop=face',
];

const SORT_OPTIONS = [
  { key: 'rating', label: 'Mejor calificados' },
  { key: 'price',  label: 'Menor precio'       },
  { key: 'jobs',   label: 'Más servicios'       },
];

export default function ProviderList({ state, navigate, goBack, setProvider }: Props) {
  const [zone, setZone] = useState('Todas las zonas');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'jobs'>('rating');

  const cat = state.selectedCategory;
  const providers = MOCK_PROVIDERS
    .filter(p => !cat || p.categories.includes(cat.id))
    .filter(p => zone === 'Todas las zonas' || p.zone === zone)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price')  return a.startingPrice - b.startingPrice;
      return b.completedJobs - a.completedJobs;
    });

  const handleSelect = (p: Provider) => { setProvider(p); navigate(AppView.PROVIDER_PROFILE); };

  return (
    <div className="h-full flex flex-col" style={{ background: '#0A0A0A' }}>
      <Navbar title={cat?.name ?? 'Proveedores'} showBack onBack={goBack} />

      {/* Filters */}
      <div className="px-5 py-3 flex flex-col gap-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
        {/* Zone chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {ZONES.slice(0, 6).map(z => (
            <button key={z} onClick={() => setZone(z)}
              className="flex-shrink-0 px-3.5 py-2 text-xs font-semibold transition-all duration-200"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                background: zone === z ? '#7C3AED' : '#1A1A1A',
                color: zone === z ? 'white' : 'rgba(255,255,255,0.4)',
                border: zone === z ? 'none' : '1px solid #2A2A2A',
                borderRadius: 999,
                cursor: 'pointer',
                boxShadow: zone === z ? '0 4px 12px rgba(124,58,237,0.35)' : 'none',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
              }}>
              {z === 'Todas las zonas' ? '📍 ' + z : z}
            </button>
          ))}
        </div>
        {/* Sort */}
        <div className="flex gap-2">
          {SORT_OPTIONS.map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key as any)}
              className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold transition-all duration-200"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                background: sortBy === s.key ? 'rgba(124,58,237,0.15)' : '#1A1A1A',
                color: sortBy === s.key ? '#A78BFA' : 'rgba(255,255,255,0.35)',
                border: sortBy === s.key ? '1px solid rgba(124,58,237,0.3)' : '1px solid #2A2A2A',
                borderRadius: 999,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-5 py-2">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          {providers.length} proveedores disponibles{cat ? ` en ${cat.name}` : ''}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-3 px-5 pb-8">
          {providers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <div style={{ fontSize: 44 }}>🔍</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', letterSpacing: '-0.03em' }}>
                Sin proveedores en esta zona
              </p>
            </div>
          ) : providers.map((p, i) => {
            const facePhoto = FACE_PHOTOS[i % FACE_PHOTOS.length];
            return (
              <button key={p.id} onClick={() => handleSelect(p)}
                className="hover-lift"
                style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: 20, padding: '16px', cursor: 'pointer', textAlign: 'left', width: '100%', display: 'block' }}>
                <div className="flex gap-4">
                  {/* Photo */}
                  <div style={{ width: 56, height: 56, borderRadius: 16, overflow: 'hidden', border: '2px solid #2A2A2A', flexShrink: 0 }}>
                    <img src={facePhoto} alt={p.name} className="w-full h-full object-cover"
                      onError={e => {
                        const el = e.target as HTMLImageElement;
                        el.parentElement!.style.background = p.avatarColor;
                        el.parentElement!.innerHTML = `<span style="font-family:Inter,sans-serif;font-weight:800;font-size:16px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>
                          {p.name}
                        </p>
                        {p.imendlyCertified && (
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Desde </span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: 'white', letterSpacing: '-0.03em' }}>
                          ${p.startingPrice.toLocaleString('es-MX')}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.38)', marginBottom: 10, fontWeight: 500 }}>
                      {p.categories.map(c => SERVICE_CATEGORIES.find(sc => sc.id === c)?.name).filter(Boolean).slice(0, 2).join(' · ')}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{p.rating}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>({p.reviewCount})</span>
                      </div>
                      {/* Jobs */}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                        {p.completedJobs} trabajos
                      </span>
                      {/* Zone */}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                        📍 {p.zone}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
