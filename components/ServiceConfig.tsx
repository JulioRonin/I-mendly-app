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

  const proceed = () => {
    setBooking({ description, address, zone, quotedAmount: basePrice });
    navigate(AppView.BOOKING_CALENDAR);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Configurar servicio" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-4 p-4 pb-32">
          {/* Service summary */}
          <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(15,52,96,0.6), rgba(6,13,22,0.9))', border: '1.5px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
                style={{ background: provider.avatarColor, fontFamily: 'Syne, sans-serif', color: 'white' }}>
                {provider.initials}
              </div>
              <div className="flex-1">
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'white' }}>{service.name}</h2>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                  con {provider.name}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <span style={{ color: '#F59E0B', fontSize: 12 }}>★</span>
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{provider.rating}</span>
                  </div>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: '#10B981' }}>
                    ⚡ Responde en ~{provider.responseTimeMinutes} min
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>Cantidad</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  {service.unit}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: 18, color: 'white' }}>−</button>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: 'white', minWidth: 28, textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,107,71,0.15)', border: '1.5px solid rgba(255,107,71,0.25)', cursor: 'pointer', fontSize: 18, color: '#FF6B47' }}>+</button>
              </div>
            </div>
            <div className="progress-bar h-1.5">
              <div className="progress-fill" style={{ width: `${Math.min(100, quantity * 20)}%`, height: '100%' }} />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Dirección del servicio
            </label>
            <input type="text" className="input-dark px-4 py-3" placeholder="Calle, número, colonia..."
              value={address} onChange={e => setAddress(e.target.value)} />
          </div>

          {/* Zone */}
          <div className="flex flex-col gap-2">
            <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Zona
            </label>
            <select className="input-dark px-4 py-3" value={zone} onChange={e => setZone(e.target.value)} style={{ appearance: 'none' }}>
              {['Zona Norte', 'Zona Centro', 'Zona Sur', 'Las Misiones', 'Cd. Universitaria', 'Las Torres'].map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Describe el trabajo <span style={{ fontWeight: 400, textTransform: 'none' }}>(opcional)</span>
            </label>
            <textarea className="input-dark px-4 py-3" rows={3}
              placeholder="Ej: Necesito instalar 2 contactos nuevos en sala y revisar el tablero..."
              value={description} onChange={e => setDescription(e.target.value)}
              style={{ resize: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
          </div>

          {/* Price preview */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,107,71,0.08)', border: '1.5px solid rgba(255,107,71,0.20)' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Precio estimado</span>
              <div className="text-right">
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#FF6B47', letterSpacing: '-0.03em' }}>
                  ${basePrice.toLocaleString('es-MX')}–${(service.maxPrice * quantity).toLocaleString('es-MX')}
                </p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>MXN · cotización final al confirmar</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span style={{ fontSize: 12 }}>🔒</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                Pago retenido en escrow hasta que confirmes que quedó bien
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-3 pb-safe glass-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={proceed} disabled={!address}
          className="btn-coral w-full py-4 text-base font-bold"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', opacity: address ? 1 : 0.5, cursor: address ? 'pointer' : 'not-allowed' }}>
          Continuar — Elegir fecha y hora →
        </button>
      </div>
    </div>
  );
}
