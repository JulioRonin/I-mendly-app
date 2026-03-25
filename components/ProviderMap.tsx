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
  electricity:   'https://images.unsplash.com/photo-1621905251189-08b45249d95c?w=700&q=80&fit=crop',
  plumbing:      'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=700&q=80&fit=crop',
  painting:      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700&q=80&fit=crop',
  waterproofing: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&fit=crop',
  ac:            'https://images.unsplash.com/photo-1631545808198-3ab5ee88ab95?w=700&q=80&fit=crop',
  cleaning:      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&fit=crop',
  masonry:       'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&q=80&fit=crop',
  carpentry:     'https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=700&q=80&fit=crop',
  fumigation:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&fit=crop',
  pet_grooming:  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=80&fit=crop',
  car_wash:      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=700&q=80&fit=crop',
  tailoring:     'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80&fit=crop',
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
    <div className="h-full flex items-center justify-center" style={{ background: '#EFEFEF' }}>
      <p style={{ color: '#B0B0B0', fontFamily: 'Outfit, sans-serif' }}>Proveedor no encontrado</p>
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
    <div className="h-full flex flex-col" style={{ background: '#EFEFEF' }}>
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── BACK BUTTON + TITLE ── */}
        <div style={{ padding: '52px 20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <button onClick={goBack}
            style={{ width: 40, height: 40, borderRadius: 14, background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 10px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)', flexShrink: 0, marginTop: 2 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 30, color: '#0A0A0A', letterSpacing: '-0.05em', margin: '0 0 6px' }}>{p.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A6A6A' }}>{p.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A0A0A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A' }}>{p.rating}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#B0B0B0' }}>({p.reviewCount})</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2" style={{ marginTop: 4 }}>
            <button style={{ width: 40, height: 40, borderRadius: 14, background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 10px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 14, background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 10px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
          </div>
        </div>

        {/* ── SERVICE IMAGE (cut-out style on gray) ── */}
        <div style={{ margin: '0 20px 28px', borderRadius: 24, overflow: 'hidden', height: 240, position: 'relative', background: '#E0E0E0', boxShadow: '6px 6px 18px rgba(0,0,0,0.09), -3px -3px 10px rgba(255,255,255,0.9)' }}>
          <img src={heroPhoto} alt="Service" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          {/* Provider avatar */}
          <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '10px 14px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, overflow: 'hidden', background: '#E0E0E0' }}>
              <img src={facePhoto} alt={p.name} className="w-full h-full object-cover"
                onError={e => {
                  const el = e.target as HTMLImageElement;
                  el.parentElement!.style.background = p.avatarColor;
                  el.parentElement!.innerHTML = `<span style="font-family:Outfit;font-weight:800;font-size:14px;color:white;display:flex;align-items:center;justify-content:center;height:100%">${p.initials}</span>`;
                }} />
            </div>
            <div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A', margin: 0 }}>{p.name}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A6A6A', margin: 0 }}>{p.yearsExperience} años de exp.</p>
            </div>
          </div>
          {/* Certified badge */}
          {p.imendlyCertified && (
            <div style={{ position: 'absolute', top: 14, right: 14, background: '#C1E8D5', borderRadius: 9999, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 10, color: '#0A0A0A' }}>Verificado</span>
            </div>
          )}
        </div>

        {/* ── SPECS ROW ── */}
        <div style={{ margin: '0 20px 24px', display: 'flex', gap: 12 }}>
          {[
            { label: `${p.yearsExperience} años`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
            { label: `${p.responseTimeMinutes} min resp.`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
            { label: `${p.completedJobs} trabajos`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> },
          ].map(spec => (
            <div key={spec.label} style={{ flex: 1, background: 'white', borderRadius: 16, padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
              {spec.icon}
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 12, color: '#0A0A0A', textAlign: 'center' }}>{spec.label}</span>
            </div>
          ))}
        </div>

        {/* ── CATEGORY CHIPS ── */}
        <div className="flex flex-wrap gap-2" style={{ padding: '0 20px', marginBottom: 24 }}>
          {p.categories.map(catId => {
            const cat = SERVICE_CATEGORIES.find(c => c.id === catId);
            return cat ? (
              <span key={catId} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600, color: '#6A6A6A', background: 'white', borderRadius: 9999, padding: '7px 16px', boxShadow: '3px 3px 8px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)' }}>
                {cat.name}
              </span>
            ) : null;
          })}
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1" style={{ margin: '0 20px', padding: '6px', background: 'white', borderRadius: 18, marginBottom: 16, boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 14, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, background: activeTab === tab.id ? '#0A0A0A' : 'transparent', color: activeTab === tab.id ? 'white' : '#B0B0B0', boxShadow: activeTab === tab.id ? '4px 4px 10px rgba(0,0,0,0.2)' : 'none', transition: 'all 0.2s ease' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        <div style={{ padding: '0 20px 160px' }}>
          {activeTab === 'services' && (
            <div className="flex flex-col gap-3">
              {p.services.map(svc => (
                <div key={svc.id} style={{ background: 'white', borderRadius: 20, padding: '18px', boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
                  <div className="flex items-start justify-between" style={{ marginBottom: 14 }}>
                    <div style={{ flex: 1, paddingRight: 12 }}>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0A', letterSpacing: '-0.02em', margin: '0 0 4px' }}>{svc.name}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', lineHeight: 1.5, margin: 0 }}>{svc.description}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.04em', margin: 0 }}>${svc.minPrice.toLocaleString('es-MX')}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B0B0B0', margin: 0 }}>{svc.unit}</p>
                    </div>
                  </div>
                  <button onClick={() => handleBook(svc)} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 14 }}>
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
                { name: 'Carlos R.', rating: 5, comment: 'Muy buen trabajo, dejó todo limpio y en orden.', date: 'hace 1 semana' },
                { name: 'Ana P.',    rating: 4, comment: 'Buen servicio, cumplió con lo acordado.', date: 'hace 2 semanas' },
              ].map((r, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 20, padding: '16px', boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 36, height: 36, borderRadius: 12, background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 14, color: '#0A0A0A' }}>{r.name[0]}</span>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A', margin: 0 }}>{r.name}</p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B0B0B0', margin: 0 }}>{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#0A0A0A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A6A6A', lineHeight: 1.6, margin: 0 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A6A6A', lineHeight: 1.7, marginBottom: 20 }}>{p.description}</p>
              {[
                { label: 'Experiencia', value: `${p.yearsExperience} años` },
                { label: 'Tiempo de respuesta', value: `${p.responseTimeMinutes} min` },
                { label: 'Zona de servicio', value: p.zone },
                { label: 'Certificación', value: p.certificationStatus === 'approved' ? 'Verificado' : 'En proceso' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A6A6A', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#0A0A0A', fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── STICKY CTA (yacht-style: price left, black button right in white card) ── */}
      <div style={{ background: 'rgba(239,239,239,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="flex items-center justify-between">
          <div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 500, color: '#6A6A6A' }}>Precio</span>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 26, color: '#0A0A0A', letterSpacing: '-0.05em', lineHeight: 1, margin: 0 }}>
              ${p.startingPrice.toLocaleString('es-MX')}
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, color: '#6A6A6A', letterSpacing: '0' }}> / hr</span>
            </p>
          </div>
          <button onClick={() => p.services[0] && handleBook(p.services[0])}
            className="btn-primary" style={{ padding: '16px 32px', fontSize: 16 }}>
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}
