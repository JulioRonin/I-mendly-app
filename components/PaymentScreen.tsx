import React, { useState } from 'react';
import { AppState, AppView, calculateCommission } from '../types';
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

export default function PaymentScreen({ state, navigate, goBack }: Props) {
  const [method, setMethod] = useState<'card' | 'spei' | 'oxxo'>('card');
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  const booking = state.bookingDetails;
  const service = booking.service ?? state.selectedService;
  const provider = booking.provider ?? state.selectedProvider;
  const amount = booking.quotedAmount ?? service?.minPrice ?? 800;
  const { rate, commission, net } = calculateCommission(amount);

  const gatewayFee = method === 'card' ? Math.round(amount * 0.029 + 3) : method === 'oxxo' ? Math.round(amount * 0.039) : 13;
  const total = amount + gatewayFee;

  const handlePay = () => {
    setConfirming(true);
    setTimeout(() => { setConfirming(false); setDone(true); }, 1800);
  };

  const handleDone = () => navigate(AppView.ORDERS);

  if (done) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 gap-6"
        style={{ background: 'linear-gradient(160deg, #060D16 0%, #0F3460 60%, #060D16 100%)' }}>
        <div className="blob-teal absolute" style={{ width: 300, height: 300, top: '10%', right: '-10%', opacity: 0.4 }} />
        <div className="relative z-10 flex flex-col items-center gap-6 animate-scale-in">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
            style={{ background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}>
            ✅
          </div>
          <div className="text-center">
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              ¡Pago retenido<br />en escrow!
            </h1>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
              {provider?.name} ha sido notificado y está en camino
            </p>
          </div>

          <div className="w-full rounded-2xl p-4" style={{ background: 'rgba(15,52,96,0.4)', border: '1.5px solid rgba(255,255,255,0.08)' }}>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Monto total', value: `$${total.toLocaleString('es-MX')} MXN`, color: 'white' },
                { label: 'Estado del escrow', value: '🔒 Retenido', color: '#F59E0B' },
                { label: 'Proveedor', value: provider?.name ?? '—', color: 'rgba(255,255,255,0.7)' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: row.color }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full rounded-2xl p-3" style={{ background: 'rgba(8,145,178,0.1)', border: '1.5px solid rgba(8,145,178,0.2)' }}>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.5 }}>
              El dinero se libera solo cuando <strong style={{ color: '#0891B2' }}>tú confirmas</strong> que el servicio quedó perfecto.
              Tienes 24 horas para validar.
            </p>
          </div>

          <button onClick={handleDone} className="btn-coral w-full py-4 text-sm font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Ver mi pedido →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Confirmar y pagar" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-4 p-4 pb-32">

          {/* Order summary */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(15,52,96,0.35)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 12 }}>Resumen del servicio</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Servicio', value: service?.name ?? '—' },
                { label: 'Proveedor', value: provider?.name ?? '—' },
                { label: 'Zona', value: state.bookingDetails.zone ?? '—' },
                { label: 'Fecha', value: state.bookingDetails.scheduledDate ? new Date(state.bookingDetails.scheduledDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' }) : '—' },
                { label: 'Hora', value: state.bookingDetails.scheduledTime ?? '—' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className="flex flex-col gap-3">
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>Método de pago</h3>
            {[
              { id: 'card', icon: '💳', label: 'Tarjeta débito/crédito', sub: '2.9% + $3 MXN' },
              { id: 'spei', icon: '🏦', label: 'SPEI / Transferencia', sub: '$13 MXN fijo' },
              { id: 'oxxo', icon: '🏪', label: 'OXXO Pay', sub: '3.9% del monto' },
            ].map(m => (
              <button key={m.id} onClick={() => setMethod(m.id as any)}
                className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: method === m.id ? 'rgba(255,107,71,0.12)' : 'rgba(255,255,255,0.04)',
                  border: method === m.id ? '1.5px solid rgba(255,107,71,0.35)' : '1.5px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer',
                }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{m.icon}</span>
                <div className="flex-1">
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>{m.label}</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Comisión pasarela: {m.sub}</p>
                </div>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: method === m.id ? '#FF6B47' : 'rgba(255,255,255,0.1)', border: method === m.id ? 'none' : '1.5px solid rgba(255,255,255,0.15)' }}>
                  {method === m.id && <span style={{ color: 'white', fontSize: 11 }}>✓</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Price breakdown */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 12 }}>Desglose de pago</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Servicio', value: `$${amount.toLocaleString('es-MX')}` },
                { label: `Comisión pasarela`, value: `$${gatewayFee.toLocaleString('es-MX')}` },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{row.value}</span>
                </div>
              ))}
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)', margin: '4px 0' }} />
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white' }}>Total</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#FF6B47' }}>${total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
          </div>

          {/* Escrow info */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(8,145,178,0.08)', border: '1.5px solid rgba(8,145,178,0.15)' }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: 20, flexShrink: 0 }}>🔒</span>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#0891B2', marginBottom: 4 }}>¿Cómo funciona el escrow?</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  Tu pago queda retenido. El proveedor lo recibe solo cuando tú confirmes que el trabajo quedó bien. Si hay un problema, tienes 24 horas para reportarlo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-3 pb-safe glass-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={handlePay} disabled={confirming}
          className="btn-coral w-full py-4 text-base font-bold"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {confirming ? '🔒 Procesando pago...' : `Pagar $${total.toLocaleString('es-MX')} MXN →`}
        </button>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 8 }}>
          Sin anticipos al proveedor · Pago protegido por escrow
        </p>
      </div>
    </div>
  );
}
