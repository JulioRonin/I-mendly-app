import React, { useState } from 'react';
import { AppState, AppView, ServiceRequest } from '../types';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
  setCategory: (c: any) => void;
  setProvider: (p: any) => void;
  setService: (s: any) => void;
  setBooking: (b: any) => void;
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  initiated:           { label: 'Iniciado', color: '#94A3B8', bg: 'rgba(148,163,184,0.15)' },
  payment_held:        { label: '🔒 Escrow', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  in_progress:         { label: '⚡ En curso', color: '#0891B2', bg: 'rgba(8,145,178,0.15)' },
  pending_validation:  { label: '⏳ Validar', color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
  completed:           { label: '✅ Completado', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  disputed:            { label: '⚠️ Disputa', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  cancelled:           { label: 'Cancelado', color: '#6B7280', bg: 'rgba(107,114,128,0.15)' },
  released:            { label: '✅ Completado', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
};

function OrderCard({ order, onView }: { key?: string; order: ServiceRequest; onView: () => void }) {
  const st = STATUS_LABELS[order.status] ?? STATUS_LABELS.initiated;
  const date = new Date(order.scheduledAt);

  return (
    <button onClick={onView} className="w-full text-left hover-lift rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}>
      <div className="p-4 flex flex-col gap-3">
        {/* Top */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: order.providerAvatarColor, fontFamily: 'Syne, sans-serif', color: 'white' }}>
              {order.providerInitials}
            </div>
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>{order.serviceName}</p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{order.providerName}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
            style={{ background: st.bg, color: st.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {st.label}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap">
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            📅 {date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
          </span>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            📍 {order.zone}
          </span>
        </div>

        {/* Amount + escrow */}
        <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Monto </span>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#FF6B47' }}>
              ${order.quotedAmount.toLocaleString('es-MX')}
            </span>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}> MXN</span>
          </div>
          {order.escrow && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                background: order.escrow.status === 'released' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                color: order.escrow.status === 'released' ? '#10B981' : '#F59E0B',
              }}>
              🔒 {order.escrow.status === 'released' ? 'Liberado' : 'En escrow'}
            </span>
          )}
        </div>

        {/* Pending validation CTA */}
        {order.status === 'pending_validation' && (
          <button className="btn-coral w-full py-2.5 text-sm font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            ✅ Confirmar servicio completado
          </button>
        )}
      </div>
    </button>
  );
}

export default function OrdersScreen({ state, navigate, goBack }: Props) {
  const [tab, setTab] = useState<'active' | 'history'>('active');

  const active = state.orders.filter(o => !['completed', 'cancelled', 'refunded'].includes(o.status) && o.escrow?.status !== 'released');
  const history = state.orders.filter(o => ['completed', 'cancelled', 'refunded'].includes(o.status) || o.escrow?.status === 'released');

  const displayed = tab === 'active' ? active : history;

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Mis pedidos" notifCount={state.notifCount} />

      {/* Tabs */}
      <div className="flex px-4 gap-0 pt-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {[{ id: 'active', label: `Activos (${active.length})` }, { id: 'history', label: `Historial (${history.length})` }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className="flex-1 py-3 text-sm font-semibold border-b-2 transition-all duration-200"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              borderBottomColor: tab === t.id ? '#FF6B47' : 'transparent',
              color: tab === t.id ? '#FF6B47' : 'rgba(255,255,255,0.4)',
              background: 'none', cursor: 'pointer',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-3 p-4 pb-24">
          {displayed.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16">
              <span style={{ fontSize: 48 }}>{tab === 'active' ? '📋' : '🕐'}</span>
              <div className="text-center">
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>
                  {tab === 'active' ? 'Sin pedidos activos' : 'Sin historial todavía'}
                </p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>
                  {tab === 'active' ? 'Solicita un servicio para empezar' : 'Aquí aparecerán tus servicios completados'}
                </p>
              </div>
              {tab === 'active' && (
                <button onClick={() => navigate(AppView.CLIENT_HOME)} className="btn-coral px-6 py-2.5 text-sm font-bold"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Buscar servicio
                </button>
              )}
            </div>
          ) : (
            displayed.map(order => (
              <OrderCard key={order.id} order={order} onView={() => navigate(AppView.ORDER_TRACKING)} />
            ))
          )}
        </div>
      </div>

      <BottomNav currentView={AppView.ORDERS} onNavigate={v => navigate(v)} role="client" />
    </div>
  );
}
