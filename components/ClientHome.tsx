import React, { useState } from 'react';
import { AppState, AppView, ServiceCategory, Provider } from '../types';
import { SERVICE_CATEGORIES, MOCK_PROVIDERS, ZONES } from '../constants';
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

const FEATURED_OFFERS = [
  { title: 'Limpieza profunda', subtitle: 'Primera vez con 20% OFF', emoji: '🧹', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  { title: 'AC Juárez Verano', subtitle: 'Mantenimiento desde $400', emoji: '❄️', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' },
  { title: 'Pintura express', subtitle: 'Cuarto listo en 1 día', emoji: '🎨', color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
];

export default function ClientHome({ state, navigate, goBack, setCategory, setProvider }: Props) {
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState('Todas las zonas');
  const [offerIdx, setOfferIdx] = useState(0);

  const user = state.clientUser;
  const filteredCats = search
    ? SERVICE_CATEGORIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : SERVICE_CATEGORIES;

  const topProviders = MOCK_PROVIDERS.slice(0, 4);

  const handleCategorySelect = (cat: ServiceCategory) => {
    setCategory(cat);
    navigate(AppView.PROVIDER_LIST);
  };

  const handleProviderSelect = (p: Provider) => {
    setProvider(p);
    navigate(AppView.PROVIDER_PROFILE);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #0F3460 0%, #060D16 100%)', paddingBottom: 0 }}>
        {/* Top row */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#FF6B47,#CC4A2A)', fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'white' }}>
              {user?.initials ?? 'U'}
            </div>
            <div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                ¡Hola! 👋
              </p>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>
                {user?.name?.split(' ')[0] ?? 'Usuario'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <span style={{ fontSize: 10 }}>📍</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                {user?.zone ?? 'Zona Norte'}
              </span>
            </div>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
              <span style={{ fontSize: 16 }}>🔔</span>
              {state.notifCount > 0 && <span className="notif-dot" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-4 pb-4 flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base" style={{ color: 'rgba(255,255,255,0.3)' }}>🔍</span>
            <input
              type="text"
              className="input-dark pl-10 pr-4 py-3 text-sm"
              placeholder="Busca un servicio..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(8,145,178,0.20)', border: '1.5px solid rgba(8,145,178,0.25)', cursor: 'pointer', fontSize: 18 }}>
            🎛️
          </button>
        </div>

        {/* Promo carousel */}
        <div className="px-4 pb-5">
          <div
            className="relative rounded-2xl overflow-hidden p-4 cursor-pointer transition-all duration-200"
            style={{ background: `linear-gradient(135deg, ${FEATURED_OFFERS[offerIdx].bg}, rgba(15,52,96,0.4))`, border: '1.5px solid rgba(255,255,255,0.08)', minHeight: 88 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: FEATURED_OFFERS[offerIdx].color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Oferta especial
                </span>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: 'white', letterSpacing: '-0.03em' }}>
                  {FEATURED_OFFERS[offerIdx].title}
                </h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                  {FEATURED_OFFERS[offerIdx].subtitle}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: FEATURED_OFFERS[offerIdx].bg, border: `1.5px solid ${FEATURED_OFFERS[offerIdx].color}30` }}>
                {FEATURED_OFFERS[offerIdx].emoji}
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 mt-3">
              {FEATURED_OFFERS.map((_, i) => (
                <button key={i} onClick={() => setOfferIdx(i)}
                  style={{ width: i === offerIdx ? 16 : 6, height: 6, borderRadius: 999, background: i === offerIdx ? FEATURED_OFFERS[offerIdx].color : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-6 pb-24 pt-2">

          {/* Categories */}
          <div>
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>
                {search ? `Resultados para "${search}"` : 'Todos los servicios'}
              </h2>
              {!search && <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#0891B2', fontWeight: 600, cursor: 'pointer' }}>Ver todos</span>}
            </div>
            <div className="grid grid-cols-4 gap-3 px-4">
              {filteredCats.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat)}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl hover-lift transition-all duration-200"
                  style={{ background: 'rgba(15,52,96,0.35)', border: '1.5px solid rgba(255,255,255,0.07)', cursor: 'pointer', animationDelay: `${i * 40}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: cat.iconBg }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.2 }}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Top providers */}
          {!search && (
            <div>
              <div className="flex items-center justify-between px-4 mb-3">
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>
                  Top proveedores
                </h2>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#0891B2', fontWeight: 600, cursor: 'pointer' }}>Ver todos</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pl-4 pr-4">
                {topProviders.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => handleProviderSelect(p)}
                    className="flex flex-col gap-3 p-3.5 rounded-2xl hover-lift flex-shrink-0"
                    style={{ background: 'rgba(15,52,96,0.35)', border: '1.5px solid rgba(255,255,255,0.07)', cursor: 'pointer', width: 160, animationDelay: `${i * 60}ms` }}
                  >
                    {/* Avatar */}
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm"
                        style={{ background: p.avatarColor, fontFamily: 'Syne, sans-serif', color: 'white' }}>
                        {p.initials}
                      </div>
                      {p.imendlyCertified && (
                        <span className="badge-teal px-2 py-0.5 text-xs">✓ Pro</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'white', lineHeight: 1.2 }}>{p.name}</p>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                        {p.categories.map(c => SERVICE_CATEGORIES.find(sc => sc.id === c)?.name).filter(Boolean).slice(0, 2).join(' · ')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span style={{ color: '#F59E0B', fontSize: 12 }}>★</span>
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{p.rating}</span>
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>({p.reviewCount})</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Desde </span>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#FF6B47' }}>
                        ${p.startingPrice.toLocaleString('es-MX')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Zone filter + active order */}
          {!search && state.orders.some(o => o.status === 'in_progress') && (
            <div className="px-4">
              <div className="rounded-2xl p-4 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(15,52,96,0.7) 0%, rgba(6,13,22,0.9) 100%)', border: '1.5px solid rgba(8,145,178,0.25)' }}>
                <div className="blob-teal absolute" style={{ width: 200, height: 200, top: '-50%', right: '-20%', opacity: 0.3 }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#10B981', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 11, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>En curso</span>
                  </div>
                  {(() => {
                    const active = state.orders.find(o => o.status === 'in_progress')!;
                    return (
                      <div className="flex items-center justify-between">
                        <div>
                          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white' }}>{active.serviceName}</p>
                          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{active.providerName}</p>
                        </div>
                        <button
                          onClick={() => navigate(AppView.ORDER_TRACKING)}
                          className="btn-coral px-4 py-2 text-xs font-bold"
                          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          Ver →
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav currentView={AppView.CLIENT_HOME} onNavigate={v => navigate(v)} role="client" />
    </div>
  );
}
