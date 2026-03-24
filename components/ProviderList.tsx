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
    <div className="h-full flex flex-col" style={{ background: '#F6F5F2' }}>
      <Navbar title={cat?.name ?? 'Proveedores'} showBack onBack={goBack} />

      {/* Filters */}
      <div className="px-5 py-3" style={{ borderBottom: '1px solid #EEEDF0' }}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-2">
          {ZONES.slice(0, 6).map(z => (
            <button key={z} onClick={() => setZone(z)}
              className="flex-shrink-0 px-3.5 py-2 text-xs transition-all duration-200"
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                background: zone === z ? '#6C5CE7' : 'white',
                color: zone === z ? 'white' : '#9A9AAF',
                border: zone === z ? 'none' : '1.5px solid #EEEDF0',
                borderRadius: 9999, cursor: 'pointer',
                boxShadow: zone === z ? '0 4px 12px rgba(108,92,231,0.30)' : '0 1px 3px rgba(22,22,42,0.04)',
                whiteSpace: 'nowrap',
              }}>
              {z}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { key: 'rating', label: 'Top rated' },
            { key: 'price',  label: 'Menor precio' },
            { key: 'jobs',   label: 'Más trabajos' },
          ].map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key as any)}
              className="flex-shrink-0 px-3 py-1.5 text-xs transition-all duration-200"
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                background: sortBy === s.key ? 'rgba(108,92,231,0.08)' : 'transparent',
                color: sortBy === s.key ? '#6C5CE7' : '#9A9AAF',
                border: 'none', borderRadius: 9999, cursor: 'pointer',
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-5 py-2">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9A9AAF', fontWeight: 500 }}>
          {providers.length} proveedores{cat ? ` en ${cat.name}` : ''}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-3 px-5 pb-8">
          {providers.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: '#9A9AAF', textAlign: 'center' }}>
                Sin proveedores disponibles
              </p>
            </div>
          ) : providers.map((p, i) => {
            const facePhoto = FACE_PHOTOS[i % FACE_PHOTOS.length];
            return (
              <button key={p.id} onClick={() => handleSelect(p)}
                className="hover-lift"
                style={{
                  background: 'white', border: '1px solid #EEEDF0',
                  borderRadius: 22, padding: '16px', cursor: 'pointer',
                  textAlign: 'left', width: '100%', display: 'flex', gap: 14,
                  boxShadow: '0 2px 8px rgba(22,22,42,0.04)',
                }}>
                {/* Photo */}
                <div style={{ width: 60, height: 60, borderRadius: 18, overflow: 'hidden', flexShrink: 0 }}>
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
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#16162A', letterSpacing: '-0.02em' }}>{p.name}</p>
                    {p.imendlyCertified && (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#6C5CE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9A9AAF', marginBottom: 8, fontWeight: 500 }}>
                    {p.categories.map(c => SERVICE_CATEGORIES.find(sc => sc.id === c)?.name).filter(Boolean).slice(0, 2).join(' · ')}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#16162A' }}>{p.rating}</span>
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#C8C8D4' }}>{p.completedJobs} trabajos</span>
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: '#16162A', letterSpacing: '-0.03em' }}>
                      ${p.startingPrice.toLocaleString('es-MX')}
                    </span>
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
