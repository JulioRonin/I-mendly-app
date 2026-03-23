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

  const { rate, commission, net } = { rate: order.escrow?.commissionRate ?? 0.14, commission: order.escrow?.commissionAmount ?? 0, net: order.escrow?.netProviderAmount ?? 0 };

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Seguimiento" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-4 p-4 pb-10">

          {/* Provider card */}
          <div className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(15,52,96,0.7), rgba(6,13,22,0.95))', border: '1.5px solid rgba(8,145,178,0.25)' }}>
            <div className="blob-teal absolute" style={{ width: 200, height: 200, top: '-40%', right: '-20%', opacity: 0.25 }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl"
                  style={{ background: order.providerAvatarColor, fontFamily: 'Syne, sans-serif', color: 'white', boxShadow: `0 6px 20px ${order.providerAvatarColor}50` }}>
                  {order.providerInitials}
                </div>
                <div className="flex-1">
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: 'white' }}>{order.providerName}</h2>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{order.serviceName}</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#0891B2', marginTop: 2 }}>📍 {order.zone}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(8,145,178,0.2)', border: '1.5px solid rgba(8,145,178,0.3)', cursor: 'pointer', fontSize: 18 }}>📞</button>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1.5px solid rgba(16,185,129,0.2)', cursor: 'pointer', fontSize: 18 }}>💬</button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(8,145,178,0.12)', border: '1px solid rgba(8,145,178,0.2)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0891B2', animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#0891B2' }}>
                  Servicio en curso
                </span>
              </div>
            </div>
          </div>

          {/* Escrow status */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.2)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 18 }}>🔒</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#F59E0B' }}>Pago en escrow</span>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#FF6B47' }}>
                ${order.quotedAmount.toLocaleString('es-MX')}
              </span>
            </div>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
              Tu pago está retenido de forma segura. Se liberará al proveedor solo cuando confirmes que el servicio quedó bien.
            </p>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 16 }}>Estado del servicio</h3>
            <div className="flex flex-col">
              {order.timeline.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: event.done ? '#10B981' : event.active ? 'linear-gradient(135deg,#FF6B47,#CC4A2A)' : 'rgba(255,255,255,0.08)',
                        color: event.done || event.active ? 'white' : 'rgba(255,255,255,0.25)',
                        boxShadow: event.active ? '0 4px 12px rgba(255,107,71,0.35)' : 'none',
                      }}>
                      {event.done ? '✓' : event.active ? '●' : i + 1}
                    </div>
                    {i < order.timeline.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: event.done ? '#10B981' : 'rgba(255,255,255,0.08)', minHeight: 24, margin: '4px 0' }} />
                    )}
                  </div>
                  <div className="pb-5">
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: event.done || event.active ? 700 : 500, fontSize: 13, color: event.done ? '#10B981' : event.active ? '#FF6B47' : 'rgba(255,255,255,0.35)' }}>
                      {event.label}
                    </p>
                    {event.timestamp && (
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>
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
            <div className="rounded-2xl p-4" style={{ background: 'rgba(168,85,247,0.1)', border: '1.5px solid rgba(168,85,247,0.25)' }}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#A855F7', marginBottom: 8 }}>
                ¿El servicio quedó bien?
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12, lineHeight: 1.5 }}>
                Tienes 24 horas para confirmar. Si no lo haces, el pago se libera automáticamente.
              </p>
              <div className="flex gap-2">
                <button className="btn-coral flex-1 py-2.5 text-sm font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  ✅ Confirmar y liberar pago
                </button>
                <button className="btn-ghost flex-shrink-0 px-4 py-2.5 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)' }}>
                  ⚠️ Disputa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
