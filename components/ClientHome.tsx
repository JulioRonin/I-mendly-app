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

/* ── CATEGORY SVG ICONS (clean, no emojis) ── */
const CatIcon: Record<string, { bg: string; fg: string; Icon: React.FC<{color: string}> }> = {
  electricity: {
    bg: '#FFF3E0', fg: '#F57C00',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  plumbing: {
    bg: '#E3F2FD', fg: '#1976D2',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  painting: {
    bg: '#FCE4EC', fg: '#D81B60',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  waterproofing: {
    bg: '#E0F7FA', fg: '#00838F',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  },
  ac: {
    bg: '#EDE7F6', fg: '#5E35B1',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M12 2v20M2 12h20M17 7l-5 5-5-5M7 17l5-5 5 5"/></svg>,
  },
  cleaning: {
    bg: '#E8F5E9', fg: '#388E3C',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v18M5.63 7.5l6.37 6.37M18.37 7.5l-6.37 6.37M3 12h18"/></svg>,
  },
  masonry: {
    bg: '#EFEBE9', fg: '#5D4037',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6v12M2 12h20M7 6v6M17 12v6"/></svg>,
  },
  carpentry: {
    bg: '#FBE9E7', fg: '#BF360C',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M2 6l10-4 10 4M2 6v12l10 4 10-4V6"/><path d="M12 2v20"/></svg>,
  },
  fumigation: {
    bg: '#F1F8E9', fg: '#558B2F',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M6 12h12M4 6h16M8 18h8"/><circle cx="12" cy="12" r="10"/></svg>,
  },
  pet_grooming: {
    bg: '#FFF8E1', fg: '#F9A825',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><path d="M12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/><path d="M7.5 4.5a2 2 0 1 0 0 4"/><path d="M16.5 4.5a2 2 0 1 1 0 4"/><path d="M5.5 10a2 2 0 1 0 0 4"/><path d="M18.5 10a2 2 0 1 1 0 4"/><path d="M12 16v4"/></svg>,
  },
  car_wash: {
    bg: '#ECEFF1', fg: '#455A64',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><circle cx="6" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M3 11h12"/></svg>,
  },
  tailoring: {
    bg: '#F3E5F5', fg: '#8E24AA',
    Icon: ({color}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"><circle cx="6" cy="6" r="3"/><path d="M6 9v12"/><circle cx="18" cy="6" r="3"/><path d="M18 9v12"/><path d="M6 15h12"/></svg>,
  },
};

/* ── FEATURED SERVICE CARDS ── */
const FEATURED = [
  {
    title: 'Limpieza\nprofunda',
    subtitle: 'Primera vez 20% OFF',
    photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80&fit=crop',
    accent: '#FF6B35',
    catId: 'cleaning',
  },
  {
    title: 'Servicio de\nAC Verano',
    subtitle: 'Mantenimiento desde $400',
    photo: 'https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=400&q=80&fit=crop',
    accent: '#6C5CE7',
    catId: 'electricity',
  },
  {
    title: 'Pintura\nexpress',
    subtitle: 'Cuarto listo en 1 día',
    photo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80&fit=crop',
    accent: '#00B894',
    catId: 'painting',
  },
];

const PROVIDER_PHOTOS = [
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

  const handleCatSelect = (cat: ServiceCategory) => { setCategory(cat); navigate(AppView.PROVIDER_LIST); };
  const handleProvSelect = (p: Provider) => { setProvider(p); navigate(AppView.PROVIDER_PROFILE); };

  return (
    <div className="h-full flex flex-col" style={{ background: '#F6F5F2' }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: '#F6F5F2', paddingTop: 0 }}>
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: '#6C5CE7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(108,92,231,0.30)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 20, color: '#16162A', letterSpacing: '-0.04em' }}>
              i<span style={{ color: '#6C5CE7' }}>mendly</span>
            </span>
          </div>
          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
              style={{ background: 'white', border: '1.5px solid #EEEDF0', cursor: 'pointer', boxShadow: '0 1px 3px rgba(22,22,42,0.04)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {state.notifCount > 0 && <span className="notif-dot" />}
            </button>
            {/* Avatar */}
            <div style={{
              width: 38, height: 38, borderRadius: 12, overflow: 'hidden',
              border: '2px solid #6C5CE7',
              boxShadow: '0 2px 8px rgba(108,92,231,0.15)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face"
                className="w-full h-full object-cover"
                alt="avatar"
                onError={e => {
                  const el = e.target as HTMLImageElement;
                  el.parentElement!.style.background = '#6C5CE7';
                  el.parentElement!.innerHTML = `<span style="font-family:Inter;font-weight:800;font-size:13px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${user?.initials ?? 'U'}</span>`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="px-5 pt-3 pb-1">
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 26, color: '#16162A', letterSpacing: '-0.04em', lineHeight: 1.2 }}>
            Hola, {user?.name?.split(' ')[0] ?? 'Usuario'} 👋
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9A9AAF', fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}>
            ¿Qué servicio necesitas hoy?
          </p>
        </div>

        {/* Search */}
        <div className="px-5 py-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ pointerEvents: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8B8C8" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input type="text" className="input-pill pl-12 pr-12 py-3.5"
              placeholder="Buscar servicio, proveedor..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ pointerEvents: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8B8C8" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col pb-28">

          {/* ── CATEGORIES (horizontal scroll circles) ── */}
          <div className="mb-5">
            <div className="flex items-center justify-between px-5 mb-3">
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: '#16162A', letterSpacing: '-0.03em' }}>
                {search ? `"${search}"` : 'Categorías'}
              </h2>
              {!search && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6C5CE7', fontWeight: 600, cursor: 'pointer' }}>Ver todas</span>}
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-5">
              {filteredCats.slice(0, 8).map((cat, i) => {
                const icon = CatIcon[cat.id];
                return (
                  <button key={cat.id} onClick={() => handleCatSelect(cat)}
                    className="flex flex-col items-center gap-2 flex-shrink-0 hover-lift"
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, width: 64 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 18,
                      background: icon?.bg ?? '#F6F5F2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(22,22,42,0.04)',
                      border: '1px solid rgba(0,0,0,0.04)',
                    }}>
                      {icon ? <icon.Icon color={icon.fg} /> : <span style={{ fontSize: 22 }}>{cat.icon}</span>}
                    </div>
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                      color: '#6B6B80', textAlign: 'center', lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                    }}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── FEATURED OFFERS (large cards) ── */}
          {!search && (
            <div className="mb-5">
              <div className="flex items-center justify-between px-5 mb-3">
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: '#16162A', letterSpacing: '-0.03em' }}>
                  Recomendado
                </h2>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6C5CE7', fontWeight: 600, cursor: 'pointer' }}>Ver todo</span>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar px-5">
                {FEATURED.map((item, i) => {
                  const cat = SERVICE_CATEGORIES.find(c => c.id === item.catId);
                  return (
                    <button key={i} onClick={() => cat && handleCatSelect(cat)}
                      className="flex-shrink-0 hover-lift"
                      style={{
                        width: 200, background: 'white', borderRadius: 24,
                        overflow: 'hidden', border: '1px solid #EEEDF0',
                        boxShadow: '0 2px 12px rgba(22,22,42,0.06)',
                        cursor: 'pointer', padding: 0, textAlign: 'left',
                        display: 'block',
                      }}>
                      {/* Photo */}
                      <div style={{ height: 140, position: 'relative', overflow: 'hidden' }}>
                        <img src={item.photo} alt={item.title} className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = item.accent; }}
                        />
                        {/* Action button */}
                        <div style={{
                          position: 'absolute', bottom: 10, right: 10,
                          width: 36, height: 36, borderRadius: 12,
                          background: item.accent,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: `0 4px 12px ${item.accent}55`,
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M7 17L17 7M7 7h10v10"/>
                          </svg>
                        </div>
                      </div>
                      {/* Text */}
                      <div style={{ padding: '14px 16px' }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#16162A', letterSpacing: '-0.02em', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                          {item.title.replace('\\n','\n')}
                        </p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9A9AAF', fontWeight: 500, marginTop: 4 }}>
                          {item.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── TOP PROVIDERS ── */}
          {!search && (
            <div className="mb-5">
              <div className="flex items-center justify-between px-5 mb-3">
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: '#16162A', letterSpacing: '-0.03em' }}>
                  Proveedores top
                </h2>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6C5CE7', fontWeight: 600, cursor: 'pointer' }}>Ver todos</span>
              </div>
              <div className="grid grid-cols-2 gap-3 px-5">
                {topProviders.map((p, i) => (
                  <button key={p.id} onClick={() => handleProvSelect(p)}
                    className="hover-lift"
                    style={{
                      background: 'white', borderRadius: 22,
                      overflow: 'hidden', border: '1px solid #EEEDF0',
                      boxShadow: '0 2px 12px rgba(22,22,42,0.05)',
                      cursor: 'pointer', padding: 0, textAlign: 'left',
                      display: 'block',
                    }}>
                    {/* Photo area */}
                    <div style={{ height: 110, position: 'relative', overflow: 'hidden', background: '#F6F5F2' }}>
                      <img
                        src={PROVIDER_PHOTOS[i]}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          const el = e.target as HTMLImageElement;
                          el.parentElement!.style.background = p.avatarColor;
                          el.parentElement!.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%"><span style="font-family:Inter;font-weight:800;font-size:28px;color:white">${p.initials}</span></div>`;
                        }}
                      />
                      {/* Rating badge */}
                      <div style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: 9999,
                        padding: '3px 8px',
                        display: 'flex', alignItems: 'center', gap: 3,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: '#16162A' }}>{p.rating}</span>
                      </div>
                      {/* Certified badge */}
                      {p.imendlyCertified && (
                        <div style={{
                          position: 'absolute', top: 8, left: 8,
                          width: 22, height: 22, borderRadius: '50%',
                          background: '#6C5CE7',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(108,92,231,0.3)',
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div style={{ padding: '12px 14px 14px' }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#16162A', letterSpacing: '-0.02em', marginBottom: 2 }}>
                        {p.name.split(' ').slice(0,2).join(' ')}
                      </p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9A9AAF', fontWeight: 500, marginBottom: 8 }}>
                        {SERVICE_CATEGORIES.find(c => c.id === p.categories[0])?.name ?? ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#C8C8D4' }}>Desde </span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#16162A', letterSpacing: '-0.03em' }}>
                            ${p.startingPrice.toLocaleString('es-MX')}
                          </span>
                        </div>
                        <div style={{
                          width: 32, height: 32, borderRadius: 10,
                          background: '#16162A',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M7 17L17 7M7 7h10v10"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── ACTIVE ORDER ── */}
          {!search && state.orders.some(o => o.status === 'in_progress') && (() => {
            const active = state.orders.find(o => o.status === 'in_progress')!;
            return (
              <div className="px-5">
                <div style={{
                  background: '#6C5CE7',
                  borderRadius: 22,
                  padding: '18px 20px',
                  boxShadow: '0 8px 28px rgba(108,92,231,0.30)',
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00B894', boxShadow: '0 0 8px rgba(0,184,148,0.6)', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Servicio en curso
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>{active.serviceName}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{active.providerName}</p>
                    </div>
                    <button onClick={() => navigate(AppView.ORDER_TRACKING)}
                      style={{
                        background: 'white', color: '#6C5CE7',
                        border: 'none', borderRadius: 14,
                        padding: '10px 18px',
                        fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        letterSpacing: '-0.01em',
                      }}>
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── MORE CATEGORIES GRID (if searching or scrolled) ── */}
          {(search || filteredCats.length > 8) && (
            <div className="px-5 mt-2">
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: '#16162A', letterSpacing: '-0.03em', marginBottom: 12 }}>
                {search ? 'Resultados' : 'Más categorías'}
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {(search ? filteredCats : filteredCats.slice(8)).map(cat => {
                  const icon = CatIcon[cat.id];
                  return (
                    <button key={cat.id} onClick={() => handleCatSelect(cat)}
                      className="hover-lift"
                      style={{
                        background: 'white', border: '1px solid #EEEDF0',
                        borderRadius: 20, padding: '16px 12px',
                        cursor: 'pointer', textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(22,22,42,0.04)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: icon?.bg ?? '#F6F5F2',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {icon ? <icon.Icon color={icon.fg} /> : <span style={{ fontSize: 20 }}>{cat.icon}</span>}
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#16162A', letterSpacing: '-0.01em' }}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav currentView={AppView.CLIENT_HOME} onNavigate={v => navigate(v)} role="client" />
    </div>
  );
}
