import React, { useState } from 'react';
import { AppState, AppView } from '../types';
import { MOCK_PROVIDERS } from '../constants';
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

const METRICS = [
  { icon: '👷', label: 'Proveedores activos', value: '247', color: '#0891B2', bg: 'rgba(8,145,178,0.15)' },
  { icon: '⏳', label: 'En revisión', value: '18', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  { icon: '👥', label: 'Clientes registrados', value: '1,834', color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
  { icon: '📋', label: 'Servicios activos', value: '43', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  { icon: '💰', label: 'Revenue este mes', value: '$284K', color: '#FF6B47', bg: 'rgba(255,107,71,0.15)' },
  { icon: '⚠️', label: 'Disputas abiertas', value: '3', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
];

const PENDING_PROVIDERS = MOCK_PROVIDERS.map((p, i) => ({ ...p, certificationStatus: i === 0 ? 'in_review' : 'approved' as any }));

const DISPUTES = [
  { id: 'D-001', client: 'Ana García', provider: 'Carlos M.', service: 'Electricidad', amount: 850, opened: 'hace 2h', status: 'open' },
  { id: 'D-002', client: 'Luis Torres', provider: 'Sergio D.', service: 'Plomería', amount: 1200, opened: 'hace 5h', status: 'under_review' },
  { id: 'D-003', client: 'María Flores', provider: 'Jorge R.', service: 'Pintura', amount: 3200, opened: 'hace 1d', status: 'awaiting_response' },
];

export default function AdminDashboard({ state, navigate }: Props) {
  const [tab, setTab] = useState<'overview' | 'providers' | 'disputes' | 'analytics'>('overview');

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Resumen' },
    { id: 'providers', icon: '👷', label: 'Proveedores' },
    { id: 'disputes', icon: '⚠️', label: 'Disputas' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ] as const;

  const renderOverview = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-3">
        {METRICS.map(m => (
          <div key={m.label} className="flex flex-col gap-2 p-4 rounded-2xl"
            style={{ background: m.bg, border: `1.5px solid ${m.color}25` }}>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 20 }}>{m.icon}</span>
            </div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</p>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3, fontWeight: 600 }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>Actividad reciente</h3>
          <span className="badge-coral px-2 py-0.5">En vivo</span>
        </div>
        {[
          { icon: '✅', text: 'Carlos Mendoza certificado', time: '2 min', color: '#10B981' },
          { icon: '💰', text: 'Pago liberado · Limpieza · $1,800', time: '8 min', color: '#FF6B47' },
          { icon: '🆕', text: 'Ana Flores completó onboarding', time: '15 min', color: '#0891B2' },
          { icon: '⭐', text: 'Reseña 5★ para Sergio Domínguez', time: '22 min', color: '#F59E0B' },
          { icon: '⚠️', text: 'Disputa abierta · Electricidad', time: '1 h', color: '#EF4444' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', flex: 1 }}>{item.text}</p>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{item.time}</span>
          </div>
        ))}
      </div>

      {/* Commission stats */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,107,71,0.08)', border: '1.5px solid rgba(255,107,71,0.15)' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#FF6B47', marginBottom: 12 }}>💰 Comisiones del mes</h3>
        {[
          { label: 'Servicios < $800 (17%)', count: 34, amount: '$2,380' },
          { label: '$800–$1,500 (14%)', count: 87, amount: '$14,210' },
          { label: '$1,500–$3,000 (11%)', count: 52, amount: '$18,920' },
          { label: '> $3,000 (7%)', count: 28, amount: '$32,480' },
        ].map(row => (
          <div key={row.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{row.label}</span>
              <span className="badge-coral px-1.5 py-0.5" style={{ fontSize: 9 }}>{row.count} servicios</span>
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#FF6B47' }}>{row.amount}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-3 mt-1">
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>Total comisiones</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#FF6B47' }}>$67,990</span>
        </div>
      </div>
    </div>
  );

  const renderProviders = () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {['Todos', 'En revisión', 'Aprobados', 'Rechazados'].map(f => (
          <button key={f} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: f === 'Todos' ? 'linear-gradient(135deg,#FF6B47,#CC4A2A)' : 'rgba(255,255,255,0.06)', color: f === 'Todos' ? 'white' : 'rgba(255,255,255,0.5)', border: f === 'Todos' ? 'none' : '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Pending approval highlight */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.2)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontSize: 16 }}>⏳</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#F59E0B' }}>18 proveedores en revisión</span>
        </div>
        <div className="flex gap-2">
          <button className="btn-coral flex-1 py-2 text-xs font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Revisar ahora</button>
          <button className="btn-ghost flex-1 py-2 text-xs" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Programar</button>
        </div>
      </div>

      {MOCK_PROVIDERS.map(p => (
        <div key={p.id} className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold"
              style={{ background: p.avatarColor, fontFamily: 'Syne, sans-serif', color: 'white', fontSize: 14 }}>
              {p.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>{p.name}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.imendlyCertified ? 'badge-success' : 'badge-coral'}`}>
                  {p.imendlyCertified ? '✅ Cert.' : '⏳ Rev.'}
                </span>
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                📍 {p.zone} · ★ {p.rating} · {p.completedJobs} servicios
              </p>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button className="btn-teal px-3 py-1 text-xs" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11 }}>Ver</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDisputes = () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="p-4 rounded-2xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#EF4444' }}>3 disputas abiertas</span>
        </div>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
          Tienes hasta 72 horas para resolver cada disputa
        </p>
      </div>

      {DISPUTES.map(d => (
        <div key={d.id} className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{d.id}</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                background: d.status === 'open' ? 'rgba(239,68,68,0.15)' : d.status === 'under_review' ? 'rgba(245,158,11,0.15)' : 'rgba(168,85,247,0.15)',
                color: d.status === 'open' ? '#EF4444' : d.status === 'under_review' ? '#F59E0B' : '#A855F7',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              {d.status === 'open' ? '🔴 Abierta' : d.status === 'under_review' ? '🟡 En revisión' : '🟣 Esperando'}
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'white' }}>{d.service}</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                👤 {d.client} vs 🔧 {d.provider}
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Abierta {d.opened}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#FF6B47' }}>${d.amount.toLocaleString('es-MX')}</span>
              <div className="flex gap-1.5">
                <button className="btn-teal px-3 py-1.5 text-xs font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Resolver</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAnalytics = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'GMV este mes', value: '$2.8M', sub: '↑ +23% vs anterior', color: '#FF6B47' },
          { label: 'Revenue (comisión)', value: '$284K', sub: '↑ +18% vs anterior', color: '#10B981' },
          { label: 'Ticket promedio', value: '$1,842', sub: '↑ +8% vs anterior', color: '#0891B2' },
          { label: 'NPS Clientes', value: '72', sub: '↑ +4 puntos', color: '#F59E0B' },
        ].map(m => (
          <div key={m.label} className="p-4 rounded-2xl" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 6 }}>{m.label}</p>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: m.color, letterSpacing: '-0.03em' }}>{m.value}</p>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: '#10B981', marginTop: 4 }}>{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-4" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 12 }}>Top categorías este mes</h3>
        {[
          { cat: 'Limpieza', pct: 28, revenue: '$78K', color: '#10B981' },
          { cat: 'Electricidad', pct: 22, revenue: '$62K', color: '#F59E0B' },
          { cat: 'AC / Climas', pct: 18, revenue: '$51K', color: '#06B6D4' },
          { cat: 'Plomería', pct: 14, revenue: '$39K', color: '#3B82F6' },
          { cat: 'Pintura', pct: 10, revenue: '$28K', color: '#A855F7' },
        ].map(row => (
          <div key={row.cat} className="flex items-center gap-3 mb-3">
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', width: 88, flexShrink: 0 }}>{row.cat}</span>
            <div className="flex-1 progress-bar" style={{ height: 8 }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: row.color, width: 40, textAlign: 'right', flexShrink: 0 }}>{row.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between"
        style={{ background: 'linear-gradient(160deg,#0F3460,#060D16)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <IMendlyLogo size={32} />
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Panel admin</p>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white' }}>Operations HQ</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center relative"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 16 }}>
            🔔
            <span className="notif-dot" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {tab === 'overview' && renderOverview()}
        {tab === 'providers' && renderProviders()}
        {tab === 'disputes' && renderDisputes()}
        {tab === 'analytics' && renderAnalytics()}
      </div>

      {/* Bottom nav */}
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
