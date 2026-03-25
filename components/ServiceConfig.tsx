import React, { useState } from 'react';
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

export default function ServiceConfig({ state, navigate, goBack, setBooking }: Props) {
  const service = state.selectedService ?? state.bookingDetails.service;
  const provider = state.selectedProvider ?? state.bookingDetails.provider;
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState('Zona Norte');

  if (!service || !provider) return null;

  const basePrice = service.minPrice * quantity;
  const maxPrice  = service.maxPrice  * quantity;

  const proceed = () => {
    setBooking({ description, address, zone, quotedAmount: basePrice });
    navigate(AppView.BOOKING_CALENDAR);
  };

  const ZONES = ['Zona Norte', 'Zona Centro', 'Zona Sur', 'Las Misiones', 'Cd. Universitaria', 'Las Torres'];

  return (
    <div className="h-full flex flex-col" style={{ background: '#EFEFEF' }}>
      <Navbar title="Configurar servicio" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '0 20px 120px' }}>

        {/* Provider summary card */}
        <div style={{ background: '#0A0A0A', borderRadius: 22, padding: '18px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: '#C1E8D5', opacity: 0.08, filter: 'blur(20px)', pointerEvents: 'none' }} />
          <div className="flex items-center gap-3">
            <div style={{ width: 48, height: 48, borderRadius: 16, background: provider.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 17, color: 'white', flexShrink: 0 }}>
              {provider.initials}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em', margin: '0 0 2px' }}>{service.name}</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>con {provider.name}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="flex items-center gap-1" style={{ justifyContent: 'flex-end', marginBottom: 2 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#C1E8D5" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{provider.rating}</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#C1E8D5', margin: 0 }}>~{provider.responseTimeMinutes} min resp.</p>
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div style={{ background: 'white', borderRadius: 20, padding: '18px', marginBottom: 14, boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A0A', letterSpacing: '-0.02em', margin: '0 0 3px' }}>Cantidad</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A', margin: 0 }}>{service.unit}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: 38, height: 38, borderRadius: 13, background: '#EFEFEF', border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 8px rgba(0,0,0,0.07), -2px -2px 6px rgba(255,255,255,0.9)' }}>−</button>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 22, color: '#0A0A0A', minWidth: 28, textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}
                style={{ width: 38, height: 38, borderRadius: 13, background: '#0A0A0A', border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>
          <div style={{ height: 5, borderRadius: 9999, background: '#EFEFEF', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#0A0A0A', borderRadius: 9999, width: `${Math.min(100, quantity * 20)}%`, transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Address */}
        <div style={{ marginBottom: 14 }}>
          <label className="field-label">Dirección del servicio</label>
          <input className="input-field" placeholder="Calle, número, colonia..."
            value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        {/* Zone */}
        <div style={{ marginBottom: 14 }}>
          <label className="field-label">Zona</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ZONES.map(z => (
              <button key={z} onClick={() => setZone(z)}
                style={{ padding: '9px 16px', border: 'none', borderRadius: 9999, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, background: zone === z ? '#0A0A0A' : 'white', color: zone === z ? 'white' : '#6A6A6A', boxShadow: zone === z ? '4px 6px 14px rgba(0,0,0,0.22)' : '3px 3px 8px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)', transition: 'all 0.2s ease' }}>
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <label className="field-label">Descripción del trabajo <span style={{ fontWeight: 400, color: '#B0B0B0' }}>(opcional)</span></label>
          <textarea className="input-field" rows={4}
            placeholder="Ej: Necesito instalar 2 contactos nuevos en sala y revisar el tablero..."
            value={description} onChange={e => setDescription(e.target.value)}
            style={{ resize: 'none' }} />
        </div>

        {/* Price preview */}
        <div style={{ background: 'white', borderRadius: 20, padding: '18px', boxShadow: '5px 5px 14px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.9)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600, color: '#6A6A6A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Precio estimado</span>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 24, color: '#0A0A0A', letterSpacing: '-0.04em', margin: 0 }}>
                ${basePrice.toLocaleString('es-MX')}–${maxPrice.toLocaleString('es-MX')}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B0B0B0', margin: 0 }}>MXN · cotización final al confirmar</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: '#C1E8D5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A6A6A' }}>Pago retenido en escrow hasta que confirmes que quedó bien</span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', background: 'rgba(239,239,239,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <button onClick={proceed} disabled={!address} className="btn-primary"
          style={{ width: '100%', padding: '17px', fontSize: 16, opacity: address ? 1 : 0.45, cursor: address ? 'pointer' : 'not-allowed' }}>
          Continuar — Elegir fecha y hora
        </button>
      </div>
    </div>
  );
}
