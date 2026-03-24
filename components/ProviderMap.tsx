import React, { useState } from 'react';
import { AppState, AppView, Provider, ServiceCategory } from '../types';
import { SERVICE_CATEGORIES } from '../constants';

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
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&fit=crop&crop=face',
];

export default function ProviderProfile({ state, navigate, goBack, setService, setBooking }: Props) {
  const p = state.selectedProvider;
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'about'>('services');

  if (!p) return (
    <div className="h-full flex items-center justify-center" style={{ background: '#F6F5F2' }}>
      <p style={{ color: '#9A9AAF', fontFamily: 'Inter, sans-serif' }}>Proveedor no encontrado</p>
    </div>
  );

  const heroCat = p.categories[0];
  const heroPhoto = SERVICE_PHOTOS[heroCat] ?? SERVICE_PHOTOS.cleaning;
  const faceIdx = parseInt(p.id.replace(/\D/g, ''), 10) % FACE_PHOTOS.length;
  const facePhoto = FACE_PHOTOS[faceIdx];

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
    <div className="h-full flex flex-col" style={{ background: '#F6F5F2' }}>

      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── HERO PHOTO ── */}
        <div style={{ position: 'relative', height: 300 }}>
          <img src={heroPhoto} alt="Service" className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = '#6C5CE7'; }}
          />
          {/* Dark overlay bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)',
          }} />

          {/* Back + actions */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 20px' }}>
            <div className="flex items-center justify-between">
              <button onClick={goBack}
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.9)', cursor: 'pointer', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.9)', cursor: 'pointer', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.9)', cursor: 'pointer', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Photo counter */}
          <div style={{
            position: 'absolute', bottom: 12, right: 16,
            background: 'rgba(0,0,0,0.5)', borderRadius: 9999,
            padding: '4px 10px',
          }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: 'white' }}>1/{p.portfolio?.length || 3}</span>
          </div>
        </div>

        {/* ── WHITE SHEET ── */}
        <div style={{
          background: 'white',
          borderRadius: '28px 28px 0 0',
          marginTop: -24,
          position: 'relative',
          zIndex: 1,
          minHeight: 500,
          boxShadow: '0 -8px 40px rgba(22,22,42,0.06)',
        }}>
          {/* Provider avatar overlapping */}
          <div style={{
            position: 'absolute', top: -28, left: 24,
            width: 56, height: 56, borderRadius: 18,
            overflow: 'hidden',
            border: '3px solid white',
            boxShadow: '0 4px 16px rgba(22,22,42,0.12)',
          }}>
            <img src={facePhoto} alt={p.name} className="w-full h-full object-cover"
              onError={e => {
                const el = e.target as HTMLImageElement;
                el.parentElement!.style.background = p.avatarColor;
                el.parentElement!.innerHTML = `<span style="font-family:Inter;font-weight:800;font-size:16px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
              }}
            />
          </div>

          <div className="px-5 pt-10 pb-4">
            {/* Name + contact */}
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center gap-2">
                  <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: '#16162A', letterSpacing: '-0.04em' }}>{p.name}</h1>
                  {p.imendlyCertified && (
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#6C5CE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A9AAF" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9A9AAF', fontWeight: 500 }}>{p.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: '#16162A' }}>{p.rating}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#C8C8D4' }}>({p.reviewCount})</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button style={{ width: 40, height: 40, borderRadius: 14, background: '#F6F5F2', border: '1px solid #EEEDF0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
                </button>
                <button style={{ width: 40, height: 40, borderRadius: 14, background: '#F6F5F2', border: '1px solid #EEEDF0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16162A" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B6B80', lineHeight: 1.7, fontWeight: 400, marginTop: 14, marginBottom: 16 }}>
              {p.description}
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {p.categories.map(catId => {
                const cat = SERVICE_CATEGORIES.find(c => c.id === catId);
                return cat ? (
                  <span key={catId} style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                    color: '#6B6B80', background: '#F6F5F2',
                    border: '1px solid #EEEDF0',
                    borderRadius: 9999, padding: '7px 16px',
                  }}>
                    {cat.name}
                  </span>
                ) : null;
              })}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#EEEDF0', marginBottom: 0 }} />
          </div>

          {/* ── TABS ── */}
          <div className="flex px-5 py-2 gap-1">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex-1 py-2.5 transition-all duration-200"
                style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
                  background: activeTab === tab.id ? '#6C5CE7' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#9A9AAF',
                  border: 'none', borderRadius: 12, cursor: 'pointer',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(108,92,231,0.30)' : 'none',
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── TAB CONTENT ── */}
          <div className="px-5 pb-40 pt-3">
            {activeTab === 'services' && (
              <div className="flex flex-col gap-3">
                {p.services.map(svc => (
                  <div key={svc.id} style={{ background: '#F6F5F2', border: '1px solid #EEEDF0', borderRadius: 20, padding: '16px' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 pr-3">
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#16162A', letterSpacing: '-0.02em' }}>{svc.name}</p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9A9AAF', marginTop: 4, lineHeight: 1.5 }}>{svc.description}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#16162A', letterSpacing: '-0.03em' }}>
                          ${svc.minPrice.toLocaleString('es-MX')}
                        </p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#C8C8D4', fontWeight: 500 }}>{svc.unit}</p>
                      </div>
                    </div>
                    <button onClick={() => handleBook(svc)}
                      className="w-full py-3 btn-primary"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, borderRadius: 14 }}>
                      Reservar servicio
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="flex flex-col gap-3">
                {[
                  { name: 'María G.', rating: 5, comment: 'Excelente servicio, muy puntual y profesional.', date: 'hace 2 días' },
                  { name: 'Carlos R.', rating: 5, comment: 'Muy buen trabajo, dejó todo limpio y en orden. Precios justos.', date: 'hace 1 semana' },
                  { name: 'Ana P.',    rating: 4, comment: 'Buen servicio, cumplió con lo acordado.', date: 'hace 2 semanas' },
                ].map((r, i) => (
                  <div key={i} style={{ background: '#F6F5F2', border: '1px solid #EEEDF0', borderRadius: 20, padding: '16px' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div style={{ width: 36, height: 36, borderRadius: 12, background: '#EEEDF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: '#9A9AAF' }}>{r.name[0]}</span>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: '#16162A' }}>{r.name}</p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#C8C8D4' }}>{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B6B80', lineHeight: 1.6 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="flex flex-col gap-3">
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B6B80', lineHeight: 1.7 }}>{p.description}</p>
                {[
                  { label: 'Experiencia', value: `${p.yearsExperience} años` },
                  { label: 'Tiempo de respuesta', value: `${p.responseTimeMinutes} min` },
                  { label: 'Zona de servicio', value: p.zone },
                  { label: 'Certificación', value: p.certificationStatus === 'approved' ? 'Verificado' : 'En proceso' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #EEEDF0' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9A9AAF', fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#16162A', fontWeight: 700 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── STICKY CTA ── */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid #EEEDF0',
        padding: '16px 20px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      }}>
        <div className="flex items-center justify-between">
          <div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9A9AAF', fontWeight: 500 }}>Precio:</span>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 24, color: '#16162A', letterSpacing: '-0.04em', lineHeight: 1 }}>
              ${p.startingPrice.toLocaleString('es-MX')}
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#C8C8D4' }}>/hr</span>
            </p>
          </div>
          <button
            onClick={() => p.services[0] && handleBook(p.services[0])}
            className="btn-primary px-8 py-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, borderRadius: 18, letterSpacing: '-0.02em' }}>
            Reservar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
