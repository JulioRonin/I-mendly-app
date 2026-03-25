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
    <div className="h-full flex flex-col" style={{ background: '#EFEFEF' }}>
      <Navbar title={cat?.name ?? 'Proveedores'} showBack onBack={goBack} />

      {/* Filters */}
      <div style={{ padding: '0 20px 16px' }}>
        {/* Zone chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar" style={{ marginBottom: 12 }}>
          {ZONES.slice(0, 6).map(z => (
            <button key={z} onClick={() => setZone(z)}
              style={{
                flexShrink: 0, padding: '9px 18px', border: 'none', borderRadius: 9999, cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 12,
                background: zone === z ? '#0A0A0A' : 'white',
                color: zone === z ? 'white' : '#6A6A6A',
                boxShadow: zone === z ? '4px 6px 14px rgba(0,0,0,0.22)' : '3px 3px 8px rgba(0,0,0,0.07), -2px -2px 6px rgba(255,255,255,0.9)',
                whiteSpace: 'nowrap', transition: 'all 0.2s ease',
              }}>
              {z}
            </button>
          ))}
        </div>
        {/* Sort chips */}
        <div className="flex gap-2">
          {[
            { key: 'rating', label: 'Top rated' },
            { key: 'price',  label: 'Menor precio' },
            { key: 'jobs',   label: 'Más trabajos' },
          ].map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key as any)}
              style={{
                padding: '7px 14px', border: 'none', borderRadius: 9999, cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 12,
                background: sortBy === s.key ? 'rgba(193,232,213,0.5)' : 'transparent',
                color: sortBy === s.key ? '#0A0A0A' : '#B0B0B0',
                transition: 'all 0.2s ease',
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ padding: '0 20px 10px' }}>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 500, color: '#B0B0B0', margin: 0 }}>
          {providers.length} proveedor{providers.length !== 1 ? 'es' : ''}{cat ? ` · ${cat.name}` : ''}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 20px 120px' }}>
          {providers.length === 0 ? (
            <div className="flex flex-col items-center gap-4" style={{ paddingTop: 80 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: 'white', boxShadow: '4px 4px 12px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: '#B0B0B0', textAlign: 'center', margin: 0 }}>Sin proveedores disponibles</p>
            </div>
          ) : providers.map((p, i) => (
            <button key={p.id} onClick={() => handleSelect(p)}
              style={{ background: 'white', borderRadius: 22, padding: '18px', border: 'none', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center', textAlign: 'left', boxShadow: '5px 5px 16px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)', width: '100%', transition: 'transform 0.15s ease' }}>

              {/* Photo */}
              <div style={{ width: 64, height: 64, borderRadius: 20, overflow: 'hidden', flexShrink: 0, background: '#E8E8E8' }}>
                <img src={FACE_PHOTOS[i % FACE_PHOTOS.length]} alt={p.name} className="w-full h-full object-cover"
                  onError={e => {
                    const el = e.target as HTMLImageElement;
                    el.parentElement!.style.background = p.avatarColor;
                    el.parentElement!.innerHTML = `<span style="font-family:Outfit;font-weight:800;font-size:18px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                  }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 3 }}>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0A', letterSpacing: '-0.02em', margin: 0 }}>{p.name}</p>
                  {p.imendlyCertified && (
                    <div style={{ width: 17, height: 17, borderRadius: '50%', background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', margin: '0 0 10px' }}>
                  {p.categories.slice(0, 2).map(c => SERVICE_CATEGORIES.find(sc => sc.id === c)?.name).filter(Boolean).join(' · ')}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A0A0A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 12, color: '#0A0A0A' }}>{p.rating}</span>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B0B0B0' }}>{p.completedJobs} trabajos</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B0B0B0' }}>{p.zone}</span>
                </div>
              </div>

              {/* Price + arrow */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: '#0A0A0A', letterSpacing: '-0.03em' }}>${p.startingPrice.toLocaleString('es-MX')}</span>
                <div style={{ width: 32, height: 32, borderRadius: 12, background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
