import React, { useState } from 'react';
import { AppState, AppView } from '../types';
import { DEMO_REVIEWS, DEMO_WEEKLY_EARNINGS, SERVICE_CATEGORIES } from '../constants';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
  setCategory: (c: any) => void;
  setProvider: (p: any) => void;
  setService: (s: any) => void;
  setBooking: (b: any) => void;
}

const maxBar = Math.max(...DEMO_WEEKLY_EARNINGS.map(d => d.amount));

export default function ProviderDashboard({ state, navigate }: Props) {
  const [tab, setTab] = useState<'home' | 'orders' | 'earnings' | 'reviews' | 'profile'>('home');
  const provider = state.providerUser;
  const activeOrder = state.orders.find(o => o.status === 'in_progress');
  const completedOrders = state.orders.filter(o => o.escrow?.status === 'released');
  const weekEarnings = DEMO_WEEKLY_EARNINGS.reduce((s, d) => s + d.amount, 0);
  const monthGrowth = Math.round(((provider?.earnedThisMonth ?? 0) - (provider?.earnedLastMonth ?? 0)) / (provider?.earnedLastMonth ?? 1) * 100);

  // ── HOME ──
  const renderHome = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Dark header card */}
      <div style={{ background: '#0A0A0A', margin: '0', padding: '52px 20px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, borderRadius: '50%', background: '#C1E8D5', opacity: 0.06, filter: 'blur(50px)', pointerEvents: 'none' }} />
        {/* Top row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 46, height: 46, borderRadius: 16, background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: '#0A0A0A' }}>
              {provider?.initials}
            </div>
            <div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Panel proveedor</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 17, color: 'white', letterSpacing: '-0.03em', margin: 0 }}>{provider?.name?.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {provider?.imendlyCertified && (
              <div style={{ background: '#C1E8D5', borderRadius: 9999, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 10, color: '#0A0A0A' }}>Verificado</span>
              </div>
            )}
            <button style={{ width: 38, height: 38, borderRadius: 13, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
          </div>
        </div>

        {/* Metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Ganancias este mes', value: `$${(provider?.earnedThisMonth ?? 0).toLocaleString('es-MX')}`, sub: `${monthGrowth > 0 ? '+' : ''}${monthGrowth}% vs anterior`, hi: true },
            { label: 'Completados', value: String(provider?.totalServices ?? 0), sub: `+${completedOrders.length} este mes`, hi: false },
            { label: 'Calificación', value: `${provider?.ratingAvg}`, sub: 'Top 5% de la red', hi: false },
            { label: 'Tasa éxito', value: `${provider?.completionRate}%`, sub: (provider?.completionRate ?? 0) >= 90 ? 'Badge activo' : 'Mejorar', hi: false },
          ].map(m => (
            <div key={m.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 18, padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 6px' }}>{m.label}</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 22, color: m.hi ? '#C1E8D5' : 'white', letterSpacing: '-0.04em', margin: '0 0 3px' }}>{m.value}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.28)', margin: 0 }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Active order */}
        {activeOrder && (
          <div style={{ background: 'white', borderRadius: 20, padding: '16px', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)', border: '2px solid #C1E8D5' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C1E8D5', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 11, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Servicio activo</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0A', margin: '0 0 4px' }}>{activeOrder.serviceName}</p>
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A' }}>{activeOrder.zone}</span>
                </div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.04em', marginTop: 8 }}>
                  ${(activeOrder.escrow?.netProviderAmount ?? 0).toLocaleString('es-MX')}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>Completar</button>
                <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: 12 }}>Chat</button>
              </div>
            </div>
          </div>
        )}

        {/* Earnings chart */}
        <div style={{ background: 'white', borderRadius: 20, padding: '18px', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 11, color: '#6A6A6A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Esta semana</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 24, color: '#0A0A0A', letterSpacing: '-0.04em', margin: 0 }}>
                ${weekEarnings.toLocaleString('es-MX')}
              </p>
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700, color: '#0A0A0A', background: '#C1E8D5', borderRadius: 9999, padding: '5px 14px' }}>+12%</span>
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 72 }}>
            {DEMO_WEEKLY_EARNINGS.map(d => {
              const isMax = d.amount === maxBar;
              const pct = (d.amount / maxBar) * 100;
              return (
                <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: isMax ? '#0A0A0A' : '#EFEFEF', height: `${Math.max(pct, 8)}%`, transition: 'height 0.7s ease', minHeight: 4 }} />
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, color: isMax ? '#0A0A0A' : '#B0B0B0', fontWeight: isMax ? 700 : 500 }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent reviews */}
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: '#0A0A0A', letterSpacing: '-0.02em', margin: 0 }}>Últimas reseñas</h3>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600, color: '#6A6A6A', cursor: 'pointer' }}>Ver todas →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DEMO_REVIEWS.slice(0, 2).map(r => (
              <div key={r.id} style={{ background: 'white', borderRadius: 18, padding: '14px', boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <div style={{ width: 32, height: 32, borderRadius: 12, background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 12, color: '#0A0A0A' }}>{r.reviewerInitials}</span>
                    </div>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A' }}>{r.reviewerName}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= r.rating ? '#0A0A0A' : '#E0E0E0'} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  </div>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', lineHeight: 1.5, margin: 0 }}>{r.comment.substring(0, 80)}…</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── EARNINGS ──
  const renderEarnings = () => (
    <div style={{ padding: '52px 20px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 28, color: '#0A0A0A', letterSpacing: '-0.04em', margin: 0 }}>Mis ganancias</h2>
      <div style={{ background: '#0A0A0A', borderRadius: 22, padding: '22px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -30, width: 150, height: 150, borderRadius: '50%', background: '#C1E8D5', opacity: 0.1, filter: 'blur(30px)', pointerEvents: 'none' }} />
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Este mes</p>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 40, color: '#C1E8D5', letterSpacing: '-0.05em', margin: '0 0 6px' }}>${(provider?.earnedThisMonth ?? 0).toLocaleString('es-MX')}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>+{monthGrowth}% vs mes anterior</p>
      </div>
      {[
        { label: 'Ganancias hoy', value: 2400 },
        { label: 'Esta semana', value: weekEarnings },
        { label: 'Total acumulado', value: 184000 },
      ].map(s => (
        <div key={s.label} style={{ background: 'white', borderRadius: 18, padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A6A6A' }}>{s.label}</span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 20, color: '#0A0A0A', letterSpacing: '-0.04em' }}>${s.value.toLocaleString('es-MX')}</span>
        </div>
      ))}
      <div style={{ background: 'white', borderRadius: 18, padding: '18px', boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A', marginBottom: 8 }}>Comisión imendly</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', lineHeight: 1.6, margin: 0 }}>
          7% en {'>'} $3,000 · 11% de $1,500–$3,000 · 14% de $800–$1,500 · 17% {'<'} $800 MXN
        </p>
      </div>
    </div>
  );

  // ── REVIEWS ──
  const renderReviews = () => (
    <div style={{ padding: '52px 20px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 28, color: '#0A0A0A', letterSpacing: '-0.04em', margin: 0 }}>Reseñas</h2>
      {/* Rating summary */}
      <div style={{ background: 'white', borderRadius: 20, padding: '20px', display: 'flex', gap: 16, boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 44, color: '#0A0A0A', letterSpacing: '-0.05em' }}>{provider?.ratingAvg}</span>
          <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#0A0A0A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}</div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A6A6A' }}>{DEMO_REVIEWS.length * 45} reseñas</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-2">
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, color: '#0A0A0A', width: 8 }}>{star}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 9999, background: '#EFEFEF', overflow: 'hidden', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.07)' }}>
                <div style={{ height: '100%', background: '#0A0A0A', borderRadius: 9999, width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {DEMO_REVIEWS.map(r => (
        <div key={r.id} style={{ background: 'white', borderRadius: 20, padding: '16px', boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 14, background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 14, color: '#0A0A0A' }}>{r.reviewerInitials}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A', margin: 0 }}>{r.reviewerName}</p>
              <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= r.rating ? '#0A0A0A' : '#E0E0E0'} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}</div>
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 15, color: '#0A0A0A', letterSpacing: '-0.03em' }}>${r.amount.toLocaleString('es-MX')}</span>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A6A6A', lineHeight: 1.55, margin: 0 }}>{r.comment}</p>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, color: '#B0B0B0', marginTop: 8 }}>{r.serviceName}</p>
        </div>
      ))}
    </div>
  );

  // ── PROFILE ──
  const renderProfile = () => (
    <div style={{ padding: '52px 20px 120px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingBottom: 16 }}>
        <div style={{ width: 80, height: 80, borderRadius: 26, background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 28, color: '#0A0A0A', boxShadow: '0 8px 24px rgba(193,232,213,0.45)' }}>
          {provider?.initials}
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 22, color: '#0A0A0A', letterSpacing: '-0.04em', margin: '0 0 4px' }}>{provider?.name}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A6A6A', margin: 0 }}>{provider?.email}</p>
        </div>
        {provider?.imendlyCertified && (
          <div style={{ background: '#C1E8D5', borderRadius: 9999, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A' }}>Certificado imendly</span>
          </div>
        )}
      </div>

      <div style={{ background: 'white', borderRadius: 22, overflow: 'hidden', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)' }}>
        {[
          { label: 'Mis servicios y tarifas', sub: `${provider?.categories.length} categorías activas`, icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
          { label: 'Zonas de cobertura', sub: provider?.zone, icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
          { label: 'Mis documentos', sub: 'INE, antecedentes, portafolio', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
          { label: 'Cuenta bancaria / SPEI', sub: 'Para recibir tus pagos', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
          { label: 'Soporte imendly', sub: 'Ayuda y centro de soporte', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
        ].map((item, i, arr) => (
          <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none', textAlign: 'left' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: '#EFEFEF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A0A', margin: '0 0 2px' }}>{item.label}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A6A6A', margin: 0 }}>{item.sub}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4D4D4" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>

      <button style={{ width: '100%', padding: '15px', background: 'rgba(239,68,68,0.06)', border: '1.5px solid rgba(239,68,68,0.15)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#EF4444', cursor: 'pointer' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Cerrar sesión
      </button>
    </div>
  );

  const NAV_TABS = [
    { id: 'home',     label: 'Inicio',    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id: 'orders',   label: 'Servicios', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { id: 'earnings', label: 'Ganancias', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { id: 'reviews',  label: 'Reseñas',   icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
    { id: 'profile',  label: 'Perfil',    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ] as const;

  return (
    <div className="h-full flex flex-col" style={{ background: '#EFEFEF' }}>
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ paddingBottom: 80 }}>
        {tab === 'home'     && renderHome()}
        {tab === 'earnings' && renderEarnings()}
        {tab === 'reviews'  && renderReviews()}
        {tab === 'profile'  && renderProfile()}
        {tab === 'orders'   && (
          <div style={{ padding: '52px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 28, color: '#0A0A0A', letterSpacing: '-0.04em', margin: 0 }}>Mis servicios</h2>
            {state.orders.map(o => (
              <div key={o.id} style={{ background: 'white', borderRadius: 20, padding: '16px', boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0A', margin: '0 0 4px' }}>{o.serviceName}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', margin: 0 }}>{o.zone}</p>
                  </div>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.03em' }}>${(o.escrow?.netProviderAmount ?? o.quotedAmount).toLocaleString('es-MX')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ background: 'white', boxShadow: '0 -4px 24px rgba(0,0,0,0.06)', borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {NAV_TABS.map(t => {
          const isActive = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, border: 'none', background: 'none', cursor: 'pointer', padding: '10px 0', position: 'relative' }}>
              {isActive && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 28, height: 3, borderRadius: '0 0 3px 3px', background: '#C1E8D5' }} />}
              <svg viewBox={t.icon.props.viewBox} width="22" height="22" fill={isActive ? '#0A0A0A' : 'none'} stroke={isActive ? '#0A0A0A' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round">
                {t.icon.props.children}
              </svg>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? '#0A0A0A' : '#B0B0B0' }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
