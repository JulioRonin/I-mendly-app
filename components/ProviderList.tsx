import React, { useState } from 'react';
import { AppState, AppView, Provider, ServiceCategory } from '../types';
import { MOCK_PROVIDERS, SERVICE_CATEGORIES, ZONES } from '../constants';
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

const FACE_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80&fit=crop&crop=face',
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
    <div className="h-full flex flex-col" style={{ background: '#F2F1F8' }}>
      <Navbar title={cat?.name ?? 'Proveedores'} showBack onBack={goBack} />

      {/* Filters */}
      <div className="px-5 py-3" style={{ background: 'white', borderBottom: '1px solid #E8E7F0' }}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-2">
          {ZONES.slice(0, 6).map(z => (
            <button key={z} onClick={() => setZone(z)}
              className="flex-shrink-0 px-3.5 py-2 text-xs transition-all duration-200"
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                background: zone === z ? '#6B4EFF' : 'transparent',
                color: zone === z ? 'white' : '#AAAABB',
                border: zone === z ? 'none' : '1.5px solid #E8E7F0',
                borderRadius: 9999, cursor: 'pointer',
                boxShadow: zone === z ? '0 4px 12px rgba(107,78,255,0.30)' : 'none',
                whiteSpace: 'nowrap',
              }}>
              {z}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {[
            { key: 'rating', label: 'Top rated' },
            { key: 'price',  label: 'Menor precio' },
            { key: 'jobs',   label: 'Más trabajos' },
          ].map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key as any)}
              className="flex-shrink-0 px-3 py-1.5 text-xs transition-all duration-200"
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                background: sortBy === s.key ? 'rgba(107,78,255,0.08)' : 'transparent',
                color: sortBy === s.key ? '#6B4EFF' : '#AAAABB',
                border: 'none', borderRadius: 9999, cursor: 'pointer',
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-5 py-2">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#AAAABB', fontWeight: 500 }}>
          {providers.length} proveedor{providers.length !== 1 ? 'es' : ''}{cat ? ` en ${cat.name}` : ''}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-3 px-5 pb-8">
          {providers.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: '#AAAABB', textAlign: 'center' }}>
                Sin proveedores disponibles
              </p>
            </div>
          ) : providers.map((p, i) => {
            const facePhoto = FACE_PHOTOS[i % FACE_PHOTOS.length];
            return (
              <button key={p.id} onClick={() => handleSelect(p)}
                style={{
                  background: 'white', border: '1px solid #E8E7F0',
                  borderRadius: 22, padding: '16px', cursor: 'pointer',
                  textAlign: 'left', width: '100%', display: 'flex', gap: 14,
                  boxShadow: '0 2px 12px rgba(107,78,255,0.06)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}>
                {/* Photo */}
                <div style={{ width: 62, height: 62, borderRadius: 18, overflow: 'hidden', flexShrink: 0, border: '2px solid #E8E7F0' }}>
                  <img src={facePhoto} alt={p.name} className="w-full h-full object-cover"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.parentElement!.style.background = p.avatarColor;
                      el.parentElement!.innerHTML = `<span style="font-family:Inter;font-weight:800;font-size:18px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                    }}
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#1A1A2E', letterSpacing: '-0.02em' }}>{p.name}</p>
                    {p.imendlyCertified && (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#6B4EFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#7B7B8E', marginBottom: 8, fontWeight: 500 }}>
                    {p.categories.map(c => SERVICE_CATEGORIES.find(sc => sc.id === c)?.name).filter(Boolean).slice(0, 2).join(' · ')}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#1A1A2E' }}>{p.rating}</span>
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#AAAABB' }}>{p.completedJobs} trabajos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: '#1A1A2E', letterSpacing: '-0.03em' }}>
                        ${p.startingPrice.toLocaleString('es-MX')}
                      </span>
                      <div style={{ width: 28, height: 28, borderRadius: 10, background: '#6B4EFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
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
