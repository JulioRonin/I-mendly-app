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

  const booking  = state.bookingDetails;
  const service  = booking.service  ?? state.selectedService;
  const provider = booking.provider ?? state.selectedProvider;
  const amount   = booking.quotedAmount ?? service?.minPrice ?? 800;
  const { rate, commission, net } = calculateCommission(amount);

  const gatewayFee = method === 'card' ? Math.round(amount * 0.029 + 3) : method === 'oxxo' ? Math.round(amount * 0.039) : 13;
  const total = amount + gatewayFee;

  const handlePay = () => {
    setConfirming(true);
    setTimeout(() => { setConfirming(false); setDone(true); }, 1800);
  };

  // ── SUCCESS ──
  if (done) {
    return (
      <div className="h-full flex flex-col items-center justify-center" style={{ background: '#F5F5F5', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 96, height: 96, borderRadius: 30, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 32px rgba(193,232,213,0.5)' }}>
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 28, color: '#1F1F1F', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: 10 }}>
              ¡Pago retenido<br />en escrow!
            </h1>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 14, color: '#6B6B6B', lineHeight: 1.65 }}>
              {provider?.name} ha sido notificado y está en camino
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: 22, padding: '20px', width: '100%', boxShadow: '6px 6px 18px rgba(0,0,0,0.08), -4px -4px 12px rgba(255,255,255,0.9)' }}>
            {[
              { label: 'Monto total', value: `$${total.toLocaleString('es-MX')} MXN` },
              { label: 'Estado del escrow', value: 'Retenido' },
              { label: 'Proveedor', value: provider?.name ?? '—' },
            ].map((row, i, arr) => (
              <div key={row.label} className="flex items-center justify-between py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#6B6B6B' }}>{row.label}</span>
                <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 13, color: '#1F1F1F' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(193,232,213,0.2)', borderRadius: 18, padding: '14px 16px', width: '100%', border: '1.5px solid rgba(193,232,213,0.4)' }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#1F1F1F', lineHeight: 1.6, textAlign: 'center', margin: 0 }}>
              El dinero se libera solo cuando <strong>tú confirmas</strong> que el servicio quedó perfecto. Tienes 24 horas para validar.
            </p>
          </div>

          <button onClick={() => navigate(AppView.ORDERS)} className="btn-primary" style={{ width: '100%', padding: '17px', fontSize: 16 }}>
            Ver mi pedido
          </button>
        </div>
      </div>
    );
  }

  const METHODS = [
    { id: 'card', label: 'Tarjeta de crédito/débito', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, fee: `+ $${Math.round(amount * 0.029 + 3).toLocaleString('es-MX')} comisión` },
    { id: 'spei', label: 'Transferencia SPEI', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, fee: '+ $13 comisión' },
    { id: 'oxxo', label: 'Pago en OXXO', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 3h18v18H3zM9 9h6M9 15h6M12 3v18"/></svg>, fee: `+ $${Math.round(amount * 0.039).toLocaleString('es-MX')} comisión` },
  ] as const;

  return (
    <div className="h-full flex flex-col" style={{ background: '#F5F5F5' }}>
      <Navbar title="Pago seguro" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '0 20px 120px' }}>

        {/* Order summary */}
        <div style={{ background: '#1F1F1F', borderRadius: 22, padding: '18px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: '#3DB87A', opacity: 0.08, filter: 'blur(20px)', pointerEvents: 'none' }} />
          <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Resumen del pedido</p>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', margin: '0 0 3px' }}>{service?.name ?? 'Servicio'}</p>
              <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>con {provider?.name}</p>
            </div>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 900, fontSize: 22, color: '#3DB87A', letterSpacing: '-0.04em', margin: 0 }}>
              ${amount.toLocaleString('es-MX')}
            </p>
          </div>
        </div>

        {/* Commission info */}
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)' }}>
          {[
            { label: 'Servicio', value: `$${amount.toLocaleString('es-MX')}` },
            { label: `Comisión pasarela (${method})`, value: `+$${gatewayFee.toLocaleString('es-MX')}` },
            { label: 'Total a pagar', value: `$${total.toLocaleString('es-MX')}`, bold: true },
          ].map((r, i, arr) => (
            <div key={r.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#6B6B6B' }}>{r.label}</span>
              <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: r.bold ? 900 : 700, fontSize: r.bold ? 18 : 14, color: '#1F1F1F', letterSpacing: '-0.03em' }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Escrow badge */}
        <div style={{ background: 'rgba(193,232,213,0.2)', borderRadius: 18, padding: '14px 16px', marginBottom: 16, border: '1.5px solid rgba(193,232,213,0.4)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: 11, background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: '#1F1F1F', lineHeight: 1.6, margin: 0 }}>
            Tu dinero está protegido en <strong>escrow</strong>. Se libera solo cuando confirmes que el servicio quedó perfecto.
          </p>
        </div>

        {/* Payment methods */}
        <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: '#1F1F1F', letterSpacing: '-0.02em', marginBottom: 12 }}>Método de pago</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {METHODS.map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)}
              style={{ background: 'white', borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', gap: 14, border: `2px solid ${method === m.id ? '#1F1F1F' : 'transparent'}`, cursor: 'pointer', textAlign: 'left', boxShadow: method === m.id ? '4px 6px 14px rgba(0,0,0,0.12)' : '4px 4px 10px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.9)', width: '100%', transition: 'all 0.2s ease' }}>
              <div style={{ width: 40, height: 40, borderRadius: 13, background: method === m.id ? '#1F1F1F' : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: method === m.id ? 'white' : '#6B6B6B', transition: 'all 0.2s ease' }}>
                {m.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: '#1F1F1F', margin: '0 0 2px' }}>{m.label}</p>
                <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: '#A8A8A8', margin: 0 }}>{m.fee}</p>
              </div>
              {method === m.id && (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#3DB87A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', background: 'rgba(239,239,239,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <button onClick={handlePay} disabled={confirming} className="btn-primary"
          style={{ width: '100%', padding: '17px', fontSize: 16, opacity: confirming ? 0.7 : 1 }}>
          {confirming ? 'Procesando pago…' : `Pagar $${total.toLocaleString('es-MX')} MXN`}
        </button>
      </div>
    </div>
  );
}
