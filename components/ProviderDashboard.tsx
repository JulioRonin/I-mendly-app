import React, { useState } from 'react';
import { AppState, AppView } from '../types';
import { DEMO_REVIEWS, DEMO_WEEKLY_EARNINGS, SERVICE_CATEGORIES } from '../constants';
import BottomNav from './BottomNav';
import IMendlyLogo from './IMendlyLogo';

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

  const renderHome = () => (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="px-4 pt-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0F3460 0%, #060D16 100%)', paddingBottom: 20 }}>
        <div className="blob-coral absolute" style={{ width: 300, height: 300, top: '-50%', right: '-20%', opacity: 0.08 }} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                style={{ background: 'linear-gradient(135deg,#0891B2,#0F3460)', fontFamily: 'Syne, sans-serif', color: 'white', boxShadow: '0 4px 16px rgba(8,145,178,0.4)' }}>
                {provider?.initials}
              </div>
              <div>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Panel proveedor</p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>{provider?.name?.split(' ')[0]}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {provider?.imendlyCertified && (
                <span className="badge-teal px-2 py-1 flex items-center gap-1" style={{ fontSize: 10 }}>
                  ✓ Certificado
                </span>
              )}
              <button className="w-9 h-9 rounded-xl flex items-center justify-center relative"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 16 }}>
                🔔
                {state.notifCount > 0 && <span className="notif-dot" />}
              </button>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Ganancias este mes', value: `$${(provider?.earnedThisMonth ?? 0).toLocaleString('es-MX')}`, sub: `${monthGrowth > 0 ? '+' : ''}${monthGrowth}% vs mes anterior`, color: '#FF6B47' },
              { label: 'Servicios completados', value: provider?.totalServices ?? 0, sub: `+${completedOrders.length} este mes`, color: '#10B981' },
              { label: 'Calificación promedio', value: `★ ${provider?.ratingAvg}`, sub: `Top 5% de la red`, color: '#F59E0B' },
              { label: 'Tasa completados', value: `${provider?.completionRate}%`, sub: provider?.completionRate && provider.completionRate >= 90 ? '✅ Badge activo' : '⚠️ Mejorar', color: '#0891B2' },
            ].map(m => (
              <div key={m.label} className="flex flex-col gap-1 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active order */}
      {activeOrder && (
        <div className="mx-4 rounded-2xl p-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(15,52,96,0.8), rgba(6,13,22,0.95))', border: '1.5px solid rgba(8,145,178,0.3)' }}>
          <div className="blob-teal absolute" style={{ width: 200, height: 200, top: '-50%', right: '-20%', opacity: 0.2 }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0891B2', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 11, color: '#0891B2', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Servicio activo</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white' }}>{activeOrder.serviceName}</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>📍 {activeOrder.zone}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Monto garantizado:</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#10B981' }}>
                    ${(activeOrder.escrow?.netProviderAmount ?? 0).toLocaleString('es-MX')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="btn-coral px-4 py-2 text-xs font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  ✅ Completar
                </button>
                <button className="btn-ghost px-4 py-2 text-xs" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11 }}>
                  💬 Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earnings chart */}
      <div className="mx-4 rounded-2xl p-4" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Esta semana</p>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#FF6B47', letterSpacing: '-0.03em', marginTop: 2 }}>
              ${weekEarnings.toLocaleString('es-MX')}
            </p>
          </div>
          <span className="badge-success px-3 py-1.5">↑ +12%</span>
        </div>
        <div className="flex items-end justify-between gap-1.5" style={{ height: 80 }}>
          {DEMO_WEEKLY_EARNINGS.map((d, i) => {
            const isMax = d.amount === maxBar;
            const pct = (d.amount / maxBar) * 100;
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md transition-all duration-700"
                  style={{ height: `${pct}%`, background: isMax ? 'linear-gradient(180deg,#FF6B47,#CC4A2A)' : 'rgba(8,145,178,0.5)', minHeight: 4 }} />
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: isMax ? '#FF6B47' : 'rgba(255,255,255,0.3)', fontWeight: isMax ? 700 : 500 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming / recent */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>Últimas reseñas</h3>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#0891B2', fontWeight: 600, cursor: 'pointer' }}>Ver todas</span>
        </div>
        <div className="flex flex-col gap-2">
          {DEMO_REVIEWS.map(r => (
            <div key={r.id} className="p-3 rounded-xl" style={{ background: 'rgba(15,52,96,0.25)', border: '1.5px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: '#0891B2', fontFamily: 'Syne, sans-serif', color: 'white' }}>
                    {r.reviewerInitials}
                  </div>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{r.reviewerName}</span>
                </div>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 11 }}>★</span>)}</div>
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{r.comment.substring(0, 65)}…</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg,rgba(255,107,71,0.15),rgba(15,52,96,0.5))', border: '1.5px solid rgba(255,107,71,0.2)' }}>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>Ganancias este mes</p>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, color: '#FF6B47', letterSpacing: '-0.04em', marginTop: 4 }}>
          ${(provider?.earnedThisMonth ?? 0).toLocaleString('es-MX')}
        </p>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#10B981' }}>↑ +{monthGrowth}% vs mes anterior</p>
      </div>

      {[
        { label: 'Ganancias hoy', value: 2400, color: '#FF6B47' },
        { label: 'Esta semana', value: weekEarnings, color: '#0891B2' },
        { label: 'Total acumulado', value: 184000, color: '#10B981' },
      ].map(s => (
        <div key={s.label} className="flex items-center justify-between p-4 rounded-2xl"
          style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: s.color }}>${s.value.toLocaleString('es-MX')}</span>
        </div>
      ))}

      <div className="rounded-2xl p-4" style={{ background: 'rgba(8,145,178,0.1)', border: '1.5px solid rgba(8,145,178,0.2)' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#0891B2', marginBottom: 6 }}>Comisión I mendly</p>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
          Cobro dinámico: 7% en servicios {'>'} $3,000 · 11% de $1,500-$3,000 · 14% de $800-$1,500 · 17% {'<'} $800 MXN
        </p>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.15)' }}>
        <div className="flex flex-col items-center">
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, color: '#F59E0B' }}>{provider?.ratingAvg}</span>
          <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>)}</div>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{DEMO_REVIEWS.length * 45} reseñas</span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-2">
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', width: 8 }}>{star}</span>
              <div className="flex-1 progress-bar" style={{ height: 5 }}><div className="progress-fill" style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%`, height: '100%' }} /></div>
            </div>
          ))}
        </div>
      </div>
      {DEMO_REVIEWS.map(r => (
        <div key={r.id} className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.25)', border: '1.5px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold" style={{ background: '#0891B2', fontFamily: 'Syne, sans-serif', color: 'white', fontSize: 13 }}>{r.reviewerInitials}</div>
            <div className="flex-1">
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>{r.reviewerName}</p>
              <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.rating ? '#F59E0B' : 'rgba(255,255,255,0.15)', fontSize: 12 }}>★</span>)}</div>
            </div>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: '#10B981' }}>${r.amount.toLocaleString('es-MX')}</span>
          </div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{r.comment}</p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>{r.serviceName}</p>
        </div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl"
          style={{ background: 'linear-gradient(135deg,#0891B2,#0F3460)', fontFamily: 'Syne, sans-serif', color: 'white', boxShadow: '0 8px 24px rgba(8,145,178,0.35)' }}>
          {provider?.initials}
        </div>
        <div className="text-center">
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: 'white' }}>{provider?.name}</h2>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{provider?.email}</p>
        </div>
        {provider?.imendlyCertified && (
          <div className="badge-teal px-4 py-2 flex items-center gap-2">
            <span>✓</span><span style={{ fontSize: 12 }}>Certificado I mendly</span>
          </div>
        )}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid rgba(255,255,255,0.07)' }}>
        {[
          { icon: '🔧', label: 'Mis servicios y tarifas', sub: `${provider?.categories.length} categorías activas` },
          { icon: '📍', label: 'Zonas de cobertura', sub: provider?.zone },
          { icon: '📄', label: 'Mis documentos', sub: 'INE, antecedentes, portafolio' },
          { icon: '💳', label: 'Cuenta bancaria / SPEI', sub: 'Para recibir tus pagos' },
          { icon: '💬', label: 'Soporte I mendly', sub: 'Ayuda y centro de soporte' },
        ].map((item, i, arr) => (
          <button key={i} className="flex items-center gap-3 px-4 py-3.5 w-full text-left"
            style={{ background: 'rgba(15,52,96,0.25)', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 18, width: 24, flexShrink: 0 }}>{item.icon}</span>
            <div className="flex-1">
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: 'white' }}>{item.label}</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{item.sub}</p>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>›</span>
          </button>
        ))}
      </div>

      <button className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', color: '#EF4444', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
        🚪 Cerrar sesión
      </button>
    </div>
  );

  const tabs = [
    { id: 'home', icon: '🏠', label: 'Inicio' },
    { id: 'orders', icon: '📋', label: 'Servicios' },
    { id: 'earnings', icon: '💰', label: 'Ganancias' },
    { id: 'reviews', icon: '⭐', label: 'Reseñas' },
    { id: 'profile', icon: '👤', label: 'Perfil' },
  ] as const;

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {tab === 'home' && renderHome()}
        {tab === 'earnings' && renderEarnings()}
        {tab === 'reviews' && renderReviews()}
        {tab === 'profile' && renderProfile()}
        {tab === 'orders' && (
          <div className="p-4 flex flex-col gap-3">
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: 'white', marginTop: 16 }}>Mis servicios</h2>
            {state.orders.map(o => (
              <div key={o.id} className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>{o.serviceName}</p>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>📍 {o.zone}</p>
                  </div>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#10B981' }}>${(o.escrow?.netProviderAmount ?? o.quotedAmount).toLocaleString('es-MX')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom bottom nav */}
      <div className="glass-dark flex items-center pb-safe" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {tabs.map(t => {
          const isActive = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 20, filter: isActive ? 'none' : 'grayscale(1) opacity(0.4)' }}>{t.icon}</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? '#FF6B47' : 'rgba(255,255,255,0.35)' }}>{t.label}</span>
              {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF6B47' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
