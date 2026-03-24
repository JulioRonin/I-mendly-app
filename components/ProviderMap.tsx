import React, { useState } from 'react';
import { AppState, AppView, Provider, ServiceCategory } from '../types';
import { SERVICE_CATEGORIES } from '../constants';
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

const SERVICE_PHOTOS: Record<string, string> = {
  electricity:   'https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=600&q=80&fit=crop',
  plumbing:      'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=600&q=80&fit=crop',
  painting:      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80&fit=crop',
  waterproofing: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fit=crop',
  ac:            'https://images.unsplash.com/photo-1631545808198-3ab5ee88ab95?w=600&q=80&fit=crop',
  cleaning:      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&fit=crop',
  masonry:       'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80&fit=crop',
  carpentry:     'https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=600&q=80&fit=crop',
  fumigation:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
  pet_grooming:  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&fit=crop',
  car_wash:      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80&fit=crop',
  tailoring:     'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80&fit=crop',
};

const FACE_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&fit=crop&crop=face',
];

// Re-export as ProviderProfile for App.tsx compatibility
export default function ProviderProfile({ state, navigate, goBack, setService, setBooking }: Props) {
  const p = state.selectedProvider;
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'about'>('services');

  if (!p) return (
    <div className="h-full flex items-center justify-center" style={{ background: '#0A0A0A' }}>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>Proveedor no encontrado</p>
    </div>
  );

  const heroCat = p.categories[0];
  const heroPhoto = SERVICE_PHOTOS[heroCat] ?? SERVICE_PHOTOS['cleaning'];
  const facePhoto = FACE_PHOTOS[parseInt(p.id.replace(/\D/g, ''), 10) % FACE_PHOTOS.length] ?? FACE_PHOTOS[0];

  const handleBook = (service: any) => {
    setService(service);
    setBooking({ service, provider: p, category: SERVICE_CATEGORIES.find(c => c.id === service.categoryId) });
    navigate(AppView.SERVICE_CONFIG);
  };

  const TABS = [
    { id: 'services', label: 'Servicios' },
    { id: 'reviews',  label: 'Reseñas'  },
    { id: 'about',    label: 'Acerca de' },
  ] as const;

  return (
    <div className="h-full flex flex-col" style={{ background: '#0A0A0A' }}>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── HERO PHOTO ── */}
        <div style={{ position: 'relative', height: 280 }}>
          <img
            src={heroPhoto}
            alt="Service"
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = '#1A1A1A'; }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%)',
          }} />

          {/* Back + actions */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <div className="flex items-center justify-between px-5 py-4">
              <button onClick={goBack}
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Provider name on hero */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 16px' }}>
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div style={{ width: 52, height: 52, borderRadius: 16, overflow: 'hidden', border: '2.5px solid white', flexShrink: 0 }}>
                  <img src={facePhoto} alt={p.name} className="w-full h-full object-cover"
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.parentElement!.style.background = p.avatarColor;
                      el.parentElement!.innerHTML = `<span style="font-family:Inter,sans-serif;font-weight:800;font-size:15px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: 'white', letterSpacing: '-0.03em' }}>{p.name}</p>
                    {p.imendlyCertified && (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{p.location}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>·</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{p.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DETAIL PANEL ── */}
        <div style={{ background: '#0A0A0A', borderRadius: '24px 24px 0 0', marginTop: -16, position: 'relative', zIndex: 1 }}>
          <div className="px-5 pt-5 pb-3">
            {/* Title + contact */}
            <div className="flex items-start justify-between mb-1">
              <div>
                <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.04em' }}>
                  {SERVICE_CATEGORIES.find(c => c.id === heroCat)?.name ?? 'Servicio'}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{p.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{p.rating} calificación</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontWeight: 400, marginTop: 12, marginBottom: 16 }}>
              {p.description}
            </p>

            {/* Stats row */}
            <div className="flex gap-3 mb-5">
              {[
                { label: 'Trabajos', value: p.completedJobs.toString() },
                { label: 'Calificación', value: p.rating.toFixed(1) },
                { label: 'Completados', value: `${p.completionRate}%` },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, background: '#111111', border: '1px solid #2A2A2A', borderRadius: 16, padding: '12px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: 'white', letterSpacing: '-0.04em' }}>{stat.value}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginTop: 2 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{ height: 1, background: '#1A1A1A', marginBottom: 0 }} />

          {/* ── TABS ── */}
          <div className="flex px-5 py-3 gap-1">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex-1 py-2.5 text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '-0.01em',
                  background: activeTab === tab.id ? '#7C3AED' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(124,58,237,0.35)' : 'none',
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── TAB CONTENT ── */}
          <div className="px-5 pb-32">
            {activeTab === 'services' && (
              <div className="flex flex-col gap-3">
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  Servicios incluidos
                </p>
                {/* Service pills */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {p.categories.map(catId => {
                    const cat = SERVICE_CATEGORIES.find(c => c.id === catId);
                    return cat ? (
                      <span key={catId} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 999, padding: '6px 14px', letterSpacing: '-0.01em' }}>
                        {cat.name}
                      </span>
                    ) : null;
                  })}
                </div>
                {/* Service items */}
                {p.services.map((svc, i) => (
                  <div key={svc.id} style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: 18, padding: '16px' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-3">
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', letterSpacing: '-0.02em' }}>{svc.name}</p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 3, lineHeight: 1.5, fontWeight: 400 }}>{svc.description}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, color: 'white', letterSpacing: '-0.03em' }}>
                          ${svc.minPrice.toLocaleString('es-MX')}
                        </p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                          {svc.unit}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleBook(svc)}
                      className="w-full py-3 btn-purple"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, borderRadius: 14, letterSpacing: '-0.01em' }}>
                      Reservar
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="flex flex-col gap-3">
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  Reseñas de clientes
                </p>
                {[
                  { name: 'María G.', rating: 5, comment: 'Excelente servicio, muy puntual y profesional. Lo recomiendo ampliamente.', date: 'hace 2 días' },
                  { name: 'Carlos R.', rating: 5, comment: 'Muy buen trabajo, dejó todo limpio y en orden. Precios justos.', date: 'hace 1 semana' },
                  { name: 'Ana P.',    rating: 4, comment: 'Buen servicio, cumplió con lo acordado. Volvería a contratar.', date: 'hace 2 semanas' },
                ].map((r, i) => (
                  <div key={i} style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: 18, padding: '16px' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div style={{ width: 34, height: 34, borderRadius: 11, background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{r.name[0]}</span>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: 'white', letterSpacing: '-0.02em' }}>{r.name}</p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontWeight: 400 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="flex flex-col gap-4">
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  Sobre el proveedor
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontWeight: 400 }}>
                  {p.description}
                </p>
                {[
                  { label: 'Experiencia', value: `${p.yearsExperience} años` },
                  { label: 'Tiempo de respuesta', value: `${p.responseTimeMinutes} min aprox.` },
                  { label: 'Zona de servicio', value: p.zone },
                  { label: 'Certificación', value: p.certificationStatus === 'approved' ? 'Verificado ✓' : 'En proceso' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #1A1A1A' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'white', fontWeight: 700, letterSpacing: '-0.01em' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── STICKY BOOK CTA ── */}
      <div style={{ background: 'rgba(10,10,10,0.95)', borderTop: '1px solid #1A1A1A', padding: '16px 20px', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Precio desde</span>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
              ${p.startingPrice.toLocaleString('es-MX')}
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: 0 }}>/hr</span>
            </p>
          </div>
          <button
            onClick={() => p.services[0] && handleBook(p.services[0])}
            className="btn-purple px-8 py-3.5"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, borderRadius: 16, letterSpacing: '-0.02em' }}>
            Reservar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
