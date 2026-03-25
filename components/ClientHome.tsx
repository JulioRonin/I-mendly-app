import React, { useState } from 'react';
import { AppState, AppView, ServiceCategory, Provider } from '../types';
import { SERVICE_CATEGORIES, MOCK_PROVIDERS } from '../constants';
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

/* ── CATEGORY ICONS (SVG, no emojis) ── */
const CAT_CONFIG: Record<string, { bg: string; fg: string; icon: React.FC<{c: string}> }> = {
  electricity:   { bg: '#FFF3E0', fg: '#F57C00',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  plumbing:      { bg: '#E3F2FD', fg: '#1565C0',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
  painting:      { bg: '#FCE4EC', fg: '#C2185B',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><circle cx="13.5" cy="6.5" r="4"/><path d="M3 15c1 1.5 3 3.5 5 3.5s2-2 4-2c1.7 0 3 1.5 5 1.5"/><path d="M6.5 17.5V22"/></svg> },
  waterproofing: { bg: '#E0F7FA', fg: '#00838F',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg> },
  ac:            { bg: '#EDE7F6', fg: '#512DA8',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M12 2v20M2 12h20M17 7l-5 5-5-5M7 17l5-5 5 5"/></svg> },
  cleaning:      { bg: '#E8F5E9', fg: '#2E7D32',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> },
  masonry:       { bg: '#EFEBE9', fg: '#4E342E',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M12 7v10M2 12h20"/></svg> },
  carpentry:     { bg: '#FBE9E7', fg: '#BF360C',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M3 3l18 18M3 21l6.5-6.5"/><path d="M20.41 4.41A2 2 0 0 0 17.59 1.6L11 8.17V13l4.83-.01 4.58-4.57a2 2 0 0 0 0-4z"/></svg> },
  fumigation:    { bg: '#F1F8E9', fg: '#558B2F',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M3 9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9z"/><path d="M8 15s1-2 4-2 4 2 4 2"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/></svg> },
  pet_grooming:  { bg: '#FFF8E1', fg: '#F9A825',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/><path d="M7.5 4.5a2 2 0 1 0 0 4m9-4a2 2 0 1 1 0 4m-11 3a2 2 0 1 0 0 4m14-4a2 2 0 1 1 0 4"/></svg> },
  car_wash:      { bg: '#ECEFF1', fg: '#37474F',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h13l4 4v4a2 2 0 0 1-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg> },
  tailoring:     { bg: '#F3E5F5', fg: '#7B1FA2',
    icon: ({c}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
};

const FEATURED = [
  { title: 'Limpieza profunda', sub: '20% OFF primera vez', photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80&fit=crop', cat: 'cleaning' },
  { title: 'Mantenimiento AC', sub: 'Desde $400 MXN', photo: 'https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=400&q=80&fit=crop', cat: 'ac' },
  { title: 'Pintura express', sub: 'Cuarto listo en 1 día', photo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80&fit=crop', cat: 'painting' },
];

const FACE_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop&crop=face',
];

export default function ClientHome({ state, navigate, goBack, setCategory, setProvider }: Props) {
  const [search, setSearch] = useState('');
  const user = state.clientUser;
  const filtered = search
    ? SERVICE_CATEGORIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : SERVICE_CATEGORIES;
  const topProvs = MOCK_PROVIDERS.slice(0, 4);

  const goCategory = (c: ServiceCategory) => { setCategory(c); navigate(AppView.PROVIDER_LIST); };
  const goProvider = (p: Provider) => { setProvider(p); navigate(AppView.PROVIDER_PROFILE); };

  return (
    <div className="h-full flex flex-col" style={{ background: '#F2F1F8' }}>

      {/* ── HEADER ── */}
      <div style={{ background: '#F2F1F8' }}>
        <div className="flex items-center justify-between px-5 pt-6 pb-3">
          {/* Greeting + avatar */}
          <div className="flex items-center gap-3">
            <div style={{ width: 42, height: 42, borderRadius: 13, overflow: 'hidden', border: '2.5px solid #6B4EFF', boxShadow: '0 2px 10px rgba(107,78,255,0.15)' }}>
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face" className="w-full h-full object-cover" alt="avatar"
                onError={e => {
                  const el = e.target as HTMLImageElement;
                  el.parentElement!.style.background = '#6B4EFF';
                  el.parentElement!.innerHTML = `<span style="font-family:Inter;font-weight:800;font-size:14px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${user?.initials ?? 'U'}</span>`;
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#AAAABB" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#AAAABB', fontWeight: 500 }}>{user?.zone ?? 'Zona Norte'}</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#1A1A2E', letterSpacing: '-0.03em' }}>
                Hola, {user?.name?.split(' ')[0] ?? 'Usuario'} 👋
              </p>
            </div>
          </div>

          {/* Bell */}
          <button className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
            style={{ background: 'white', border: '1.5px solid #E8E7F0', cursor: 'pointer', boxShadow: '0 1px 4px rgba(107,78,255,0.05)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {state.notifCount > 0 && <span className="notif-dot" />}
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-5">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AAAABB" strokeWidth="2.2" strokeLinecap="round" style={{ pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" className="input-pill pl-11 pr-5 py-3.5"
              placeholder="Buscar servicio o proveedor..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, boxShadow: '0 1px 4px rgba(107,78,255,0.05)' }}
            />
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col pb-24">

          {/* CATEGORIES HORIZONTAL SCROLL */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-5 mb-3">
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#1A1A2E', letterSpacing: '-0.03em' }}>
                {search ? `"${search}"` : 'Categorías'}
              </h2>
              {!search && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B4EFF', fontWeight: 600, cursor: 'pointer' }}>Ver todas</span>}
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-1">
              {filtered.slice(0, search ? filtered.length : 8).map((cat, i) => {
                const cfg = CAT_CONFIG[cat.id];
                return (
                  <button key={cat.id} onClick={() => goCategory(cat)}
                    className="flex flex-col items-center gap-2 flex-shrink-0 hover-lift"
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, width: 68 }}>
                    <div style={{
                      width: 58, height: 58, borderRadius: 20,
                      background: cfg?.bg ?? '#F2F1F8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(107,78,255,0.06)',
                    }}>
                      {cfg ? <cfg.icon c={cfg.fg} /> : <span style={{ fontSize: 22 }}>{cat.icon}</span>}
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#7B7B8E', textAlign: 'center', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEATURED OFFERS */}
          {!search && (
            <div className="mb-6">
              <div className="flex items-center justify-between px-5 mb-3">
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#1A1A2E', letterSpacing: '-0.03em' }}>Recomendado para ti</h2>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B4EFF', fontWeight: 600, cursor: 'pointer' }}>Ver todo</span>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar px-5">
                {FEATURED.map((f, i) => {
                  const cat = SERVICE_CATEGORIES.find(c => c.id === f.cat);
                  return (
                    <button key={i} onClick={() => cat && goCategory(cat)}
                      className="flex-shrink-0 hover-lift"
                      style={{ width: 220, background: 'white', borderRadius: 22, overflow: 'hidden', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', display: 'block', boxShadow: '0 4px 20px rgba(107,78,255,0.08)' }}>
                      {/* Photo */}
                      <div style={{ height: 148, position: 'relative', overflow: 'hidden' }}>
                        <img src={f.photo} alt={f.title} className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = '#6B4EFF'; }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.75) 0%, transparent 60%)' }} />
                        {/* Arrow button */}
                        <div style={{ position: 'absolute', bottom: 10, right: 10, width: 34, height: 34, borderRadius: 11, background: '#6B4EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(107,78,255,0.45)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                        </div>
                        {/* Bottom text in photo */}
                        <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{f.title}</p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2, fontWeight: 500 }}>{f.sub}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TOP PROVIDERS */}
          {!search && (
            <div className="mb-6">
              <div className="flex items-center justify-between px-5 mb-3">
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#1A1A2E', letterSpacing: '-0.03em' }}>Mejores proveedores</h2>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B4EFF', fontWeight: 600, cursor: 'pointer' }}>Ver todos</span>
              </div>
              <div className="flex flex-col gap-3 px-5">
                {topProvs.map((p, i) => (
                  <button key={p.id} onClick={() => goProvider(p)}
                    className="hover-lift"
                    style={{ background: 'white', borderRadius: 20, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 14, border: 'none', boxShadow: '0 2px 12px rgba(107,78,255,0.06)', alignItems: 'center' }}>
                    {/* Avatar */}
                    <div style={{ width: 52, height: 52, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={FACE_PHOTOS[i % FACE_PHOTOS.length]} alt={p.name} className="w-full h-full object-cover"
                        onError={e => {
                          const el = e.target as HTMLImageElement;
                          el.parentElement!.style.background = p.avatarColor;
                          el.parentElement!.innerHTML = `<span style="font-family:Inter;font-weight:800;font-size:16px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                        }}
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#1A1A2E', letterSpacing: '-0.02em' }}>{p.name}</p>
                        {p.imendlyCertified && (
                          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#6B4EFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                        )}
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#AAAABB', fontWeight: 500, marginBottom: 6 }}>
                        {SERVICE_CATEGORIES.find(c => c.id === p.categories[0])?.name ?? ''}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#1A1A2E' }}>{p.rating}</span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#AAAABB' }}>({p.reviewCount})</span>
                        </div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#AAAABB' }}>{p.completedJobs} trabajos</span>
                      </div>
                    </div>
                    {/* Price + arrow */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#AAAABB', fontWeight: 500 }}>Desde</span>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#1A1A2E', letterSpacing: '-0.03em' }}>
                          ${p.startingPrice.toLocaleString('es-MX')}
                        </p>
                      </div>
                      <div style={{ width: 30, height: 30, borderRadius: 10, background: '#F2F1F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B4EFF" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ALL CATEGORIES GRID (search or extra) */}
          {(search && filtered.length > 0) && (
            <div className="px-5 mb-4">
              <div className="grid grid-cols-3 gap-3">
                {filtered.map(cat => {
                  const cfg = CAT_CONFIG[cat.id];
                  return (
                    <button key={cat.id} onClick={() => goCategory(cat)}
                      className="hover-lift"
                      style={{ background: 'white', borderRadius: 18, padding: '16px 10px', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: 'none', boxShadow: '0 2px 8px rgba(107,78,255,0.05)' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 15, background: cfg?.bg ?? '#F2F1F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {cfg ? <cfg.icon c={cfg.fg} /> : <span style={{ fontSize: 20 }}>{cat.icon}</span>}
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTIVE ORDER */}
          {!search && state.orders.some(o => o.status === 'in_progress') && (() => {
            const a = state.orders.find(o => o.status === 'in_progress')!;
            return (
              <div className="px-5">
                <div style={{ background: '#2D1569', borderRadius: 20, padding: '18px 20px', boxShadow: '0 8px 32px rgba(45,21,105,0.25)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C48C', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>En curso</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>{a.serviceName}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{a.providerName}</p>
                    </div>
                    <button onClick={() => navigate(AppView.ORDER_TRACKING)}
                      style={{ background: 'white', color: '#6B4EFF', border: 'none', borderRadius: 14, padding: '10px 18px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <BottomNav currentView={AppView.CLIENT_HOME} onNavigate={v => navigate(v)} role="client" />
    </div>
  );
}
