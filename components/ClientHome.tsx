import React, { useState } from 'react';
import { AppState, AppView, ServiceCategory } from '../types';
import { SERVICE_CATEGORIES, MOCK_PROVIDERS, DEMO_ORDERS } from '../constants';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  setCategory: (c: ServiceCategory | null) => void;
}

// SVG icons per category (thin line, Gilroy/Outline style)
const CAT_ICONS: Record<string, React.FC<{ c: string }>> = {
  electricity:   ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  plumbing:      ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>,
  painting:      ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M2 13.5V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5M2 13.5L12 2l10 11.5M2 13.5h20"/></svg>,
  waterproofing: ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  ac:            ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="8" rx="2"/><path d="M7 11v6a2 2 0 0 0 4 0v-6M13 11v4a2 2 0 0 0 4 0v-4"/></svg>,
  cleaning:      ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M3 22V12h4V7l5-4 5 4v5h4v10H3zM9 22v-4h6v4"/></svg>,
  masonry:       ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="5"/><rect x="2" y="10" width="20" height="5"/><rect x="2" y="17" width="20" height="5"/></svg>,
  carpentry:     ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  fumigation:    ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l3-3 3 3M6 6v12"/><path d="M14 15s.5-1 2-1 2 1 2 1 .5 1 2 1 2-1 2-1"/><path d="M14 19s.5-1 2-1 2 1 2 1"/></svg>,
  pet_grooming:  ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="13" r="4"/><path d="M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M4 17a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1z"/></svg>,
  car_wash:      ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5"/><circle cx="16" cy="17" r="2"/><circle cx="9" cy="17" r="2"/><path d="M5 8h11M3 12h9"/></svg>,
  tailoring:     ({ c }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

const FEATURED_PHOTOS = [
  'https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=600&q=80&fit=crop',
];

const FEATURED = [
  { title: 'Electricidad residencial', subtitle: 'Desde $400/hr', photo: FEATURED_PHOTOS[0], cat: 'electricity' },
  { title: 'Limpieza profunda', subtitle: 'Desde $350/hr', photo: FEATURED_PHOTOS[1], cat: 'cleaning' },
  { title: 'Plomería de emergencia', subtitle: 'Desde $450/hr', photo: FEATURED_PHOTOS[2], cat: 'plumbing' },
];

const FACE_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80&fit=crop&crop=face',
];

export default function ClientHome({ state, navigate, setCategory }: Props) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const activeOrder = DEMO_ORDERS.find(o => o.status === 'in_progress');

  const handleCategory = (cat: ServiceCategory) => {
    setCategory(cat);
    navigate(AppView.PROVIDER_LIST);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#F5F5F5' }}>
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── HEADER ── */}
        <div style={{ padding: '52px 24px 20px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
            <div>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, fontWeight: 500, color: '#6B6B6B', marginBottom: 3 }}>buenos días</p>
              <h1 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 26, color: '#1F1F1F', letterSpacing: '-0.04em', margin: 0 }}>
                {state.clientUser?.name?.split(' ')[0] ?? 'usuario'}
              </h1>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 46, height: 46, borderRadius: 16, overflow: 'hidden', boxShadow: '4px 4px 12px rgba(0,0,0,0.1), -2px -2px 8px rgba(255,255,255,0.9)', border: '3px solid #3DB87A' }}>
                <img src={FACE_PHOTOS[0]} alt="avatar" className="w-full h-full object-cover"
                  onError={e => { const el = e.target as HTMLImageElement; el.parentElement!.style.background = '#3DB87A'; el.style.display = 'none'; }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: '50%', background: '#3DB87A', border: '2px solid #F5F5F5' }} />
            </div>
          </div>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8A8A8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              className="input-pill"
              placeholder="¿Qué servicio necesitas hoy?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 48, paddingRight: 20, paddingTop: 15, paddingBottom: 15, fontSize: 14, fontFamily: 'Urbanist, sans-serif' }}
            />
          </div>
        </div>

        {/* ── ACTIVE ORDER BANNER ── */}
        {activeOrder && (
          <div style={{ margin: '0 20px 20px', background: '#1F1F1F', borderRadius: 20, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 14, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 13, color: 'white', margin: 0 }}>Servicio en curso</p>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{activeOrder.providerName} · {activeOrder.serviceName}</p>
            </div>
            <button onClick={() => navigate(AppView.ORDERS)} style={{ background: '#3DB87A', border: 'none', borderRadius: 9999, padding: '8px 14px', fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 12, color: '#1F1F1F', cursor: 'pointer' }}>Ver</button>
          </div>
        )}

        {/* ── CATEGORIES ── */}
        <div style={{ padding: '0 24px', marginBottom: 28 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 18, color: '#1F1F1F', letterSpacing: '-0.03em', margin: 0 }}>servicios</h2>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, fontWeight: 600, color: '#6B6B6B', cursor: 'pointer' }}>ver todos →</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {SERVICE_CATEGORIES.map(cat => {
              const Icon = CAT_ICONS[cat.id];
              const isActive = activeFilter === cat.id;
              return (
                <button key={cat.id} onClick={() => { setActiveFilter(cat.id); handleCategory(cat); }}
                  style={{
                    flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    padding: '16px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', minWidth: 68,
                    background: isActive ? '#1F1F1F' : 'white',
                    boxShadow: isActive ? '4px 8px 16px rgba(0,0,0,0.22)' : '4px 4px 12px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)',
                    transition: 'all 0.2s ease',
                  }}>
                  {Icon && <Icon c={isActive ? '#3DB87A' : '#6B6B6B'} />}
                  <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 10, color: isActive ? 'white' : '#6B6B6B', whiteSpace: 'nowrap' }}>
                    {cat.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── FEATURED ── */}
        <div style={{ marginBottom: 28 }}>
          <div className="flex items-center justify-between" style={{ padding: '0 24px', marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 18, color: '#1F1F1F', letterSpacing: '-0.03em', margin: 0 }}>destacados</h2>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, fontWeight: 600, color: '#6B6B6B', cursor: 'pointer' }}>ver todos →</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar" style={{ padding: '4px 24px 8px' }}>
            {FEATURED.map((f, i) => (
              <button key={i} onClick={() => { const c = SERVICE_CATEGORIES.find(sc => sc.id === f.cat); if (c) handleCategory(c); }}
                style={{
                  flexShrink: 0, width: 200, borderRadius: 22, overflow: 'hidden', border: 'none', cursor: 'pointer',
                  background: i === 0 ? '#3DB87A' : 'white',
                  boxShadow: '6px 6px 18px rgba(0,0,0,0.09), -3px -3px 10px rgba(255,255,255,0.9)',
                  position: 'relative', textAlign: 'left',
                }}>
                {/* Service photo */}
                <div style={{ height: 130, overflow: 'hidden', position: 'relative' }}>
                  <img src={f.photo} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = '#E8E8E8'; (e.target as HTMLImageElement).style.display = 'none'; }} />
                  {i === 0 && <div style={{ position: 'absolute', inset: 0, background: 'rgba(193,232,213,0.15)' }} />}
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: '#1F1F1F', letterSpacing: '-0.02em', margin: '0 0 4px' }}>{f.title}</p>
                  <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: '#6B6B6B', margin: 0 }}>{f.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── TOP PROVIDERS ── */}
        <div style={{ padding: '0 24px', marginBottom: 120 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 18, color: '#1F1F1F', letterSpacing: '-0.03em', margin: 0 }}>top proveedores</h2>
            <span onClick={() => navigate(AppView.PROVIDER_LIST)} style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, fontWeight: 600, color: '#6B6B6B', cursor: 'pointer' }}>ver todos →</span>
          </div>
          <div className="flex flex-col gap-3">
            {MOCK_PROVIDERS.slice(0, 4).map((p, i) => (
              <button key={p.id} onClick={() => navigate(AppView.PROVIDER_LIST)}
                style={{ background: 'white', borderRadius: 20, padding: '16px', border: 'none', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center', textAlign: 'left', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)', width: '100%' }}>
                {/* Avatar */}
                <div style={{ width: 56, height: 56, borderRadius: 18, overflow: 'hidden', flexShrink: 0, background: '#E8E8E8' }}>
                  <img src={FACE_PHOTOS[i % FACE_PHOTOS.length]} alt={p.name} className="w-full h-full object-cover"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.parentElement!.style.background = p.avatarColor;
                      el.parentElement!.innerHTML = `<span style="font-family:Urbanist;font-weight:800;font-size:16px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                    }} />
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: 3 }}>
                    <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 15, color: '#1F1F1F', letterSpacing: '-0.02em', margin: 0 }}>{p.name}</p>
                    {p.imendlyCertified && (
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </div>
                  <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: '#6B6B6B', margin: '0 0 8px' }}>
                    {p.categories.slice(0, 2).map(c => SERVICE_CATEGORIES.find(sc => sc.id === c)?.name).filter(Boolean).join(' · ')}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#1F1F1F" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 12, color: '#1F1F1F' }}>{p.rating}</span>
                    </div>
                    <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: '#A8A8A8' }}>{p.completedJobs} trabajos</span>
                  </div>
                </div>
                {/* Price + arrow */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 800, fontSize: 15, color: '#1F1F1F', letterSpacing: '-0.03em' }}>${p.startingPrice.toLocaleString('es-MX')}</span>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: '#1F1F1F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
