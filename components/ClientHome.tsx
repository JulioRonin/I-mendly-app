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

const CAT_PHOTOS: Record<string, string> = {
  electricity:   'https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=200&q=80&fit=crop',
  plumbing:      'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=200&q=80&fit=crop',
  painting:      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&q=80&fit=crop',
  waterproofing: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80&fit=crop',
  ac:            'https://images.unsplash.com/photo-1631545808198-3ab5ee88ab95?w=200&q=80&fit=crop',
  cleaning:      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80&fit=crop',
  masonry:       'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&q=80&fit=crop',
  carpentry:     'https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=200&q=80&fit=crop',
  fumigation:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80&fit=crop',
  pet_grooming:  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80&fit=crop',
  car_wash:      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&q=80&fit=crop',
  tailoring:     'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&q=80&fit=crop',
};

const TOP_PICKS = [
  { title: 'Limpieza profunda', subtitle: '20% OFF primera vez',    photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80&fit=crop', categoryId: 'cleaning' },
  { title: 'Mantenimiento AC',  subtitle: 'Desde $400 MXN',         photo: 'https://images.unsplash.com/photo-1631545808198-3ab5ee88ab95?w=500&q=80&fit=crop', categoryId: 'ac'       },
  { title: 'Pintura express',   subtitle: 'Cuarto listo en 1 día',  photo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80&fit=crop', categoryId: 'painting' },
];

const PROVIDER_FACE_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop&crop=face',
];

export default function ClientHome({ state, navigate, goBack, setCategory, setProvider }: Props) {
  const [search, setSearch] = useState('');

  const user = state.clientUser;
  const filteredCats = search
    ? SERVICE_CATEGORIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : SERVICE_CATEGORIES;
  const topProviders = MOCK_PROVIDERS.slice(0, 4);

  const handleCategorySelect = (cat: ServiceCategory) => { setCategory(cat); navigate(AppView.PROVIDER_LIST); };
  const handleProviderSelect = (p: Provider)         => { setProvider(p);   navigate(AppView.PROVIDER_PROFILE); };

  return (
    <div className="h-full flex flex-col" style={{ background: '#0A0A0A' }}>

      {/* ── HEADER ── */}
      <div style={{ background: '#0A0A0A' }}>
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0" style={{ border: '2px solid rgba(124,58,237,0.6)' }}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fit=crop&crop=face"
                className="w-full h-full object-cover"
                alt="avatar"
                onError={e => {
                  const el = e.target as HTMLImageElement;
                  el.parentElement!.style.background = '#7C3AED';
                  el.parentElement!.innerHTML = `<span style="font-family:Inter,sans-serif;font-weight:800;font-size:14px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${user?.initials ?? 'U'}</span>`;
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1" style={{ marginBottom: 2 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                  {user?.zone ?? 'Zona Norte'}
                </span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.03em' }}>
                Hola, {user?.name?.split(' ')[0] ?? 'Usuario'} 👋
              </p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
            style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {state.notifCount > 0 && <span className="notif-dot" />}
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-5 flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ pointerEvents: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input type="text" className="input-dark pl-11 pr-4 py-3.5 text-sm"
              placeholder="Busca un servicio..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ borderRadius: 16, fontFamily: 'Inter, sans-serif' }}
            />
          </div>
          <button className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── SCROLLABLE ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col pb-24">

          {/* TOP PICKS */}
          {!search && (
            <div className="mb-6">
              <div className="flex items-center justify-between px-5 mb-3">
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: 'white', letterSpacing: '-0.03em' }}>Top Picks</h2>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8B5CF6', fontWeight: 600, cursor: 'pointer' }}>Ver todo</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pl-5 pr-5">
                {TOP_PICKS.map((pick, i) => {
                  const cat = SERVICE_CATEGORIES.find(c => c.id === pick.categoryId);
                  return (
                    <button key={i} onClick={() => cat && handleCategorySelect(cat)}
                      className="flex-shrink-0 relative overflow-hidden hover-lift"
                      style={{ width: 220, height: 168, borderRadius: 20, border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}>
                      <img src={pick.photo} alt={pick.title} className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.background = '#1A1A1A'; }}
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                        <div className="text-left">
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{pick.title}</p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3, fontWeight: 500 }}>{pick.subtitle}</p>
                        </div>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(124,58,237,0.5)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ALL CATEGORIES */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-5 mb-4">
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: 'white', letterSpacing: '-0.03em' }}>
                {search ? `Resultados para "${search}"` : 'Todas las categorías'}
              </h2>
              {!search && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8B5CF6', fontWeight: 600, cursor: 'pointer' }}>Ver todas</span>}
            </div>
            <div className="grid grid-cols-4 gap-4 px-5">
              {filteredCats.map((cat, i) => {
                const photo = CAT_PHOTOS[cat.id];
                return (
                  <button key={cat.id} onClick={() => handleCategorySelect(cat)}
                    className="flex flex-col items-center gap-2 hover-lift"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', border: '2px solid #2A2A2A', flexShrink: 0 }}>
                      {photo ? (
                        <img src={photo} alt={cat.name} className="w-full h-full object-cover"
                          onError={e => {
                            const el = e.target as HTMLImageElement;
                            el.style.display = 'none';
                            el.parentElement!.style.background = cat.iconBg || '#1A1A1A';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl" style={{ background: cat.iconBg || '#1A1A1A' }}>
                          {cat.icon}
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TOP PROVIDERS */}
          {!search && (
            <div className="mb-6">
              <div className="flex items-center justify-between px-5 mb-3">
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: 'white', letterSpacing: '-0.03em' }}>Mejores proveedores</h2>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8B5CF6', fontWeight: 600, cursor: 'pointer' }}>Ver todos</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pl-5 pr-5">
                {topProviders.map((p, i) => {
                  const facePhoto = PROVIDER_FACE_PHOTOS[i % PROVIDER_FACE_PHOTOS.length];
                  return (
                    <button key={p.id} onClick={() => handleProviderSelect(p)}
                      className="flex-shrink-0 hover-lift"
                      style={{ width: 152, background: '#111111', border: '1px solid #2A2A2A', borderRadius: 20, padding: '14px', cursor: 'pointer', textAlign: 'left', display: 'block' }}>
                      <div className="flex items-center justify-between mb-3">
                        <div style={{ width: 44, height: 44, borderRadius: 14, overflow: 'hidden', border: '2px solid #2A2A2A' }}>
                          <img src={facePhoto} alt={p.name} className="w-full h-full object-cover"
                            onError={e => {
                              const el = e.target as HTMLImageElement;
                              el.parentElement!.style.background = p.avatarColor;
                              el.parentElement!.innerHTML = `<span style="font-family:Inter,sans-serif;font-weight:800;font-size:13px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                            }}
                          />
                        </div>
                        {p.imendlyCertified && (
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(124,58,237,0.4)' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                        )}
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 3 }}>
                        {p.name.split(' ').slice(0, 2).join(' ')}
                      </p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 10, fontWeight: 500 }}>
                        {SERVICE_CATEGORIES.find(c => c.id === p.categories[0])?.name ?? ''}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{p.rating}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>({p.reviewCount})</span>
                      </div>
                      <div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Desde </span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 14, color: 'white', letterSpacing: '-0.03em' }}>
                          ${p.startingPrice.toLocaleString('es-MX')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTIVE ORDER BANNER */}
          {!search && state.orders.some(o => o.status === 'in_progress') && (() => {
            const active = state.orders.find(o => o.status === 'in_progress')!;
            return (
              <div className="px-5">
                <div style={{ background: '#111111', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 20, padding: '16px' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.07em' }}>En curso</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>{active.serviceName}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{active.providerName}</p>
                    </div>
                    <button onClick={() => navigate(AppView.ORDER_TRACKING)}
                      className="btn-purple px-4 py-2.5"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, borderRadius: 12, letterSpacing: '-0.01em' }}>
                      Ver →
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
