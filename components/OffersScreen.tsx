import React from 'react';
import { AppState, AppView } from '../types';
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

const OFFERS = [
  { id: 1, title: 'Primera limpieza profunda', discount: '20% OFF', emoji: '🧹', color: '#10B981', bg: 'rgba(16,185,129,0.12)', code: 'LIMPIA20', validUntil: '31 Mar 2026', service: 'Limpieza' },
  { id: 2, title: 'Mantenimiento AC antes del verano', discount: '$100 OFF', emoji: '❄️', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)', code: 'AC100', validUntil: '15 Abr 2026', service: 'Climas/AC' },
  { id: 3, title: 'Diagnóstico eléctrico gratis', discount: 'GRATIS', emoji: '⚡', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', code: 'ELEC0', validUntil: '5 Abr 2026', service: 'Electricidad' },
  { id: 4, title: 'Pintura de recámara express', discount: '15% OFF', emoji: '🎨', color: '#A855F7', bg: 'rgba(168,85,247,0.12)', code: 'PINTA15', validUntil: '30 Abr 2026', service: 'Pintura' },
];

export default function OffersScreen({ state, navigate }: Props) {
  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Ofertas especiales" notifCount={state.notifCount} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-4 p-4 pb-24">
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Descuentos exclusivos para usuarios I mendly ·  {OFFERS.length} disponibles
          </p>

          {OFFERS.map((offer, i) => (
            <div key={offer.id} className="rounded-2xl overflow-hidden hover-lift"
              style={{ background: `linear-gradient(135deg, ${offer.bg}, rgba(15,52,96,0.4))`, border: `1.5px solid ${offer.color}25`, animationDelay: `${i * 60}ms` }}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold w-fit"
                      style={{ background: offer.bg, color: offer.color, border: `1px solid ${offer.color}30`, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {offer.service}
                    </span>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', lineHeight: 1.2 }}>{offer.title}</h3>
                  </div>
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0"
                    style={{ background: offer.bg, border: `1.5px solid ${offer.color}30` }}>
                    <span style={{ fontSize: 24 }}>{offer.emoji}</span>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 11, color: offer.color, lineHeight: 1 }}>{offer.discount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>📅 Válido hasta {offer.validUntil}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 12, color: offer.color, letterSpacing: '0.08em' }}>{offer.code}</span>
                    <button style={{ fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}>📋</button>
                  </div>
                </div>
              </div>

              <button onClick={() => navigate(AppView.CLIENT_HOME)}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold"
                style={{ background: offer.color, color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Usar oferta →
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav current={AppView.CLIENT_HOME} navigate={navigate} role="client" />
    </div>
  );
}
