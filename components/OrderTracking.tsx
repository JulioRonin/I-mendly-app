import React from 'react';
import { AppState, AppView } from '../types';
import Navbar from './Navbar';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
  setCategory: (c: any) => void;
  setProvider: (p: any) => void;
  setService: (s: any) => void;
  setBooking: (b: any) => void;
}

export default function OrderTracking({ state, navigate, goBack }: Props) {
  const order = state.orders.find(o => o.status === 'in_progress') ?? state.orders[0];
  if (!order) return null;

  return (
    <div className="h-full flex flex-col" style={{ background: '#EFEFEF' }}>
      <Navbar title="Seguimiento" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '0 20px 40px' }}>

        {/* Provider card */}
        <div style={{ background: '#0A0A0A', borderRadius: 22, padding: '18px', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 150, height: 150, borderRadius: '50%', background: '#C1E8D5', opacity: 0.07, filter: 'blur(30px)', pointerEvents: 'none' }} />
          <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 18, background: order.providerAvatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 18, color: 'white', flexShrink: 0 }}>
              {order.providerInitials}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em', margin: '0 0 2px' }}>{order.providerName}</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{order.serviceName}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 4.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>,
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
              ].map((icon, i) => (
                <button key={i} style={{ width: 38, height: 38, borderRadius: 13, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(193,232,213,0.12)', border: '1px solid rgba(193,232,213,0.2)', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C1E8D5' }} />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13, color: '#C1E8D5' }}>Servicio en curso</span>
          </div>
        </div>

        {/* Escrow */}
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 14, boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 46, height: 46, borderRadius: 16, background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A0A' }}>Pago en escrow</span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.04em' }}>${order.quotedAmount.toLocaleString('es-MX')}</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', margin: '4px 0 0', lineHeight: 1.5 }}>
              Tu pago está protegido. Se libera solo cuando confirmes que quedó bien.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: 'white', borderRadius: 20, padding: '18px', marginBottom: 14, boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 18 }}>Estado del servicio</h3>
          <div>
            {order.timeline.map((event, i) => (
              <div key={i} style={{ display: 'flex', gap: 14 }}>
                {/* Left column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: event.done ? '#C1E8D5' : event.active ? '#0A0A0A' : '#EFEFEF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: event.active ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                  }}>
                    {event.done
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : event.active
                        ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C1E8D5' }} />
                        : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4D4D4' }} />
                    }
                  </div>
                  {i < order.timeline.length - 1 && (
                    <div style={{ width: 2, flex: 1, margin: '4px 0', background: event.done ? '#C1E8D5' : 'rgba(0,0,0,0.07)', minHeight: 20 }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ paddingBottom: i < order.timeline.length - 1 ? 20 : 0, paddingTop: 4 }}>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: event.done || event.active ? 700 : 500, fontSize: 14, color: event.done ? '#0A0A0A' : event.active ? '#0A0A0A' : '#B0B0B0', margin: '0 0 2px' }}>
                    {event.label}
                  </p>
                  {event.timestamp && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B0B0B0', margin: 0 }}>
                      {new Date(event.timestamp).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validate CTA */}
        {order.status === 'pending_validation' && (
          <div style={{ background: 'white', borderRadius: 20, padding: '18px', boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)', border: '2px solid #C1E8D5' }}>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0A', marginBottom: 6 }}>¿El servicio quedó bien?</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A6A6A', lineHeight: 1.6, marginBottom: 16 }}>
              Tienes 24 horas para confirmar. Si no lo haces, el pago se libera automáticamente.
            </p>
            <div className="flex gap-3">
              <button className="btn-primary" style={{ flex: 1, padding: '13px' }}>Confirmar y liberar pago</button>
              <button className="btn-ghost" style={{ padding: '13px 18px', color: '#EF4444', borderColor: 'rgba(239,68,68,0.2)' }}>Disputa</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
