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

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  initiated:          { label: 'Iniciado',      color: '#6A6A6A', bg: 'rgba(106,106,106,0.1)',   dot: '#B0B0B0' },
  payment_held:       { label: 'En escrow',     color: '#0A0A0A', bg: 'rgba(193,232,213,0.25)',  dot: '#C1E8D5' },
  in_progress:        { label: 'En curso',      color: '#0A0A0A', bg: 'rgba(193,232,213,0.4)',   dot: '#89C9AA' },
  pending_validation: { label: 'Validar',       color: '#6A6A6A', bg: 'rgba(0,0,0,0.06)',        dot: '#B0B0B0' },
  completed:          { label: 'Completado',    color: '#0A0A0A', bg: 'rgba(193,232,213,0.25)',  dot: '#89C9AA' },
  disputed:           { label: 'En disputa',    color: '#EF4444', bg: 'rgba(239,68,68,0.08)',    dot: '#EF4444' },
  cancelled:          { label: 'Cancelado',     color: '#B0B0B0', bg: 'rgba(0,0,0,0.05)',        dot: '#D4D4D4' },
  released:           { label: 'Completado',    color: '#0A0A0A', bg: 'rgba(193,232,213,0.25)',  dot: '#89C9AA' },
};

function OrderCard({ order, onView }: { order: ServiceRequest; onView: () => void }) {
  const st = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.initiated;
  const date = new Date(order.scheduledAt);

  return (
    <button onClick={onView} style={{ background: 'white', borderRadius: 20, padding: '16px', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)', transition: 'transform 0.15s ease' }}>
      {/* Top row */}
      <div className="flex items-start justify-between" style={{ marginBottom: 12, gap: 10 }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 46, height: 46, borderRadius: 16, background: order.providerAvatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 14, color: 'white', flexShrink: 0 }}>
            {order.providerInitials}
          </div>
          <div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A0A', letterSpacing: '-0.02em', margin: '0 0 2px' }}>{order.serviceName}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', margin: 0 }}>{order.providerName}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: st.bg, borderRadius: 9999, padding: '5px 10px', flexShrink: 0 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: st.dot }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 11, color: st.color }}>{st.label}</span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4" style={{ marginBottom: 12 }}>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#B0B0B0' }}>{date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#B0B0B0' }}>{order.zone}</span>
        </div>
      </div>

      {/* Amount + escrow */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 500, color: '#B0B0B0' }}>Monto </span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.04em' }}>${order.quotedAmount.toLocaleString('es-MX')}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B0B0B0' }}> MXN</span>
        </div>
        {order.escrow && (
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 11, background: order.escrow.status === 'released' ? 'rgba(193,232,213,0.3)' : 'rgba(0,0,0,0.06)', color: order.escrow.status === 'released' ? '#0A0A0A' : '#6A6A6A', borderRadius: 9999, padding: '5px 12px' }}>
            {order.escrow.status === 'released' ? 'Liberado' : 'En escrow'}
          </span>
        )}
      </div>

      {/* Confirm CTA */}
      {order.status === 'pending_validation' && (
        <button className="btn-mint" style={{ width: '100%', padding: '13px', fontSize: 14, marginTop: 12 }}>
          Confirmar servicio completado
        </button>
      )}
    </button>
  );
}

export default function OrdersScreen({ state, navigate, goBack }: Props) {
  const [tab, setTab] = useState<'active' | 'history'>('active');

  const active  = state.orders.filter(o => !['completed','cancelled','refunded'].includes(o.status) && o.escrow?.status !== 'released');
  const history = state.orders.filter(o => ['completed','cancelled','refunded'].includes(o.status) || o.escrow?.status === 'released');
  const displayed = tab === 'active' ? active : history;

  return (
    <div className="h-full flex flex-col" style={{ background: '#EFEFEF' }}>
      {/* Header */}
      <div style={{ padding: '52px 20px 0', background: '#EFEFEF' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 28, color: '#0A0A0A', letterSpacing: '-0.04em', margin: '0 0 20px' }}>Mis pedidos</h1>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          {[
            { id: 'active',  label: `Activos (${active.length})` },
            { id: 'history', label: `Historial (${history.length})` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              style={{ padding: '10px 20px', border: 'none', borderRadius: 9999, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, background: tab === t.id ? '#0A0A0A' : 'white', color: tab === t.id ? 'white' : '#6A6A6A', boxShadow: tab === t.id ? '4px 6px 14px rgba(0,0,0,0.22)' : '3px 3px 8px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)', transition: 'all 0.2s ease' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 20px 120px' }}>
          {displayed.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 80 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: 'white', boxShadow: '4px 4px 12px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: '#B0B0B0', margin: '0 0 6px' }}>
                  {tab === 'active' ? 'Sin pedidos activos' : 'Sin historial todavía'}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#D4D4D4', margin: 0 }}>
                  {tab === 'active' ? 'Solicita un servicio para empezar' : 'Aquí aparecerán tus servicios completados'}
                </p>
              </div>
              {tab === 'active' && (
                <button onClick={() => navigate(AppView.CLIENT_HOME)} className="btn-primary" style={{ padding: '13px 28px', fontSize: 14 }}>
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

      <BottomNav current={AppView.ORDERS} role="client" navigate={navigate} />
    </div>
  );
}
