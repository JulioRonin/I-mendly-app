import React, { useState } from 'react';
import { AppState, AppView } from '../types';
import { DEMO_ORDERS, SERVICE_CATEGORIES } from '../constants';
import Navbar from './Navbar';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
}

const GREEN = '#3DB87A';
const BLACK = '#1F1F1F';
const GRAY = '#6B6B6B';
const SILVER = '#D1D1D1';
const BG = '#F5F5F5';
const WHITE = '#FFFFFF';
const GREEN_LT = 'rgba(61,184,122,0.10)';

const PERIODS = ['este mes', 'últimos 3 meses', 'este año'];

// Simulated monthly spend data
const MONTHLY_SPEND = [
  { month: 'oct', amount: 1200 },
  { month: 'nov', amount: 650 },
  { month: 'dic', amount: 2100 },
  { month: 'ene', amount: 800 },
  { month: 'feb', amount: 1400 },
  { month: 'mar', amount: 2450 },
];

// Simulated category breakdown
const CATEGORY_SPEND = [
  { label: 'limpieza', amount: 1800, color: '#3DB87A', pct: 36 },
  { label: 'electricidad', amount: 1250, color: '#1F1F1F', pct: 25 },
  { label: 'plomería', amount: 900, color: '#A8A8A8', pct: 18 },
  { label: 'climas / ac', amount: 750, color: '#D1D1D1', pct: 15 },
  { label: 'otros', amount: 300, color: '#E8E8E8', pct: 6 },
];

const TOTAL = 5000;
const ORDERS_COUNT = 8;
const SAVINGS = 920; // vs market rate
const AVG_RATING = 4.9;

function MiniBarChart() {
  const max = Math.max(...MONTHLY_SPEND.map(d => d.amount));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 72, padding: '0 4px' }}>
      {MONTHLY_SPEND.map((d, i) => {
        const isLast = i === MONTHLY_SPEND.length - 1;
        const h = Math.round((d.amount / max) * 68);
        return (
          <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%', height: h, borderRadius: '6px 6px 4px 4px',
              background: isLast ? GREEN : SILVER,
              transition: 'height 0.4s ease',
              position: 'relative',
            }}>
              {isLast && (
                <div style={{
                  position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
                  background: GREEN, color: WHITE, fontSize: 10, fontWeight: 700,
                  padding: '3px 6px', borderRadius: 6, whiteSpace: 'nowrap',
                  fontFamily: 'Urbanist, sans-serif',
                }}>
                  ${d.amount.toLocaleString('es-MX')}
                </div>
              )}
            </div>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 10, color: isLast ? BLACK : GRAY, fontWeight: isLast ? 600 : 400 }}>
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function DonutSegment({ pct, color, offset }: { pct: number; color: string; offset: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const gap = circ - dash;
  const rot = (offset / 100) * 360 - 90;
  return (
    <circle
      cx="50" cy="50" r={r}
      fill="none"
      stroke={color}
      strokeWidth="14"
      strokeDasharray={`${dash} ${gap}`}
      transform={`rotate(${rot} 50 50)`}
      strokeLinecap="butt"
    />
  );
}

function DonutChart() {
  let offset = 0;
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {CATEGORY_SPEND.map((c, i) => {
        const seg = <DonutSegment key={i} pct={c.pct} color={c.color} offset={offset} />;
        offset += c.pct;
        return seg;
      })}
      <circle cx="50" cy="50" r="25" fill={WHITE} />
      <text x="50" y="46" textAnchor="middle" fontFamily="Urbanist, sans-serif" fontWeight="700" fontSize="11" fill={BLACK}>total</text>
      <text x="50" y="58" textAnchor="middle" fontFamily="Urbanist, sans-serif" fontWeight="700" fontSize="10" fill={GRAY}>{ORDERS_COUNT} svc</text>
    </svg>
  );
}

export default function ReportsScreen({ state, navigate, goBack }: Props) {
  const [period, setPeriod] = useState(0);
  const completedOrders = [...state.orders, ...DEMO_ORDERS].filter(o => o.status === 'completed');

  return (
    <div className="h-full flex flex-col" style={{ background: BG }}>
      <Navbar title="reportes" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '12px 20px 120px' }}>

        {/* Period selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {PERIODS.map((p, i) => (
            <button key={i} onClick={() => setPeriod(i)}
              style={{
                padding: '8px 14px', borderRadius: 9999, border: 'none', cursor: 'pointer',
                background: period === i ? BLACK : WHITE,
                color: period === i ? WHITE : GRAY,
                fontFamily: 'Urbanist, sans-serif', fontWeight: period === i ? 600 : 400,
                fontSize: 12, textTransform: 'lowercase',
                boxShadow: period === i ? '0 2px 8px rgba(0,0,0,0.18)' : '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
              }}>
              {p}
            </button>
          ))}
        </div>

        {/* Summary KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {/* Total gastado */}
          <div style={{ background: BLACK, borderRadius: 18, padding: '18px 16px' }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.5)', margin: '0 0 6px', textTransform: 'lowercase' }}>
              total gastado
            </p>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 24, fontWeight: 700, color: WHITE, letterSpacing: '-0.04em', margin: 0 }}>
              ${TOTAL.toLocaleString('es-MX')}
            </p>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: GREEN, margin: '4px 0 0', fontWeight: 500 }}>
              {ORDERS_COUNT} servicios
            </p>
          </div>
          {/* Ahorro estimado */}
          <div style={{ background: GREEN_LT, borderRadius: 18, padding: '18px 16px', border: `1px solid rgba(61,184,122,0.2)` }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, fontWeight: 400, color: GRAY, margin: '0 0 6px', textTransform: 'lowercase' }}>
              ahorro estimado
            </p>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 24, fontWeight: 700, color: GREEN, letterSpacing: '-0.04em', margin: 0 }}>
              ${SAVINGS.toLocaleString('es-MX')}
            </p>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: GRAY, margin: '4px 0 0', fontWeight: 400 }}>
              vs precio de mercado
            </p>
          </div>
          {/* Calificación promedio */}
          <div style={{ background: WHITE, borderRadius: 18, padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, fontWeight: 400, color: GRAY, margin: 0, textTransform: 'lowercase' }}>
              calificación promedio
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={GREEN} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 22, fontWeight: 700, color: BLACK, letterSpacing: '-0.03em' }}>{AVG_RATING}</span>
            </div>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: GRAY, margin: 0 }}>de todos los servicios</p>
          </div>
          {/* Escrow protegido */}
          <div style={{ background: WHITE, borderRadius: 18, padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, fontWeight: 400, color: GRAY, margin: 0, textTransform: 'lowercase' }}>
              pagos en escrow
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 22, fontWeight: 700, color: BLACK, letterSpacing: '-0.03em' }}>{ORDERS_COUNT}</span>
            </div>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: GRAY, margin: 0 }}>100% protegidos</p>
          </div>
        </div>

        {/* Monthly spend chart */}
        <div style={{ background: WHITE, borderRadius: 20, padding: '18px 16px', marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 14, color: BLACK, margin: 0, textTransform: 'lowercase', letterSpacing: '-0.01em' }}>
              gasto mensual
            </h3>
            <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: GREEN, fontWeight: 600 }}>últimos 6 meses</span>
          </div>
          <MiniBarChart />
        </div>

        {/* Category breakdown */}
        <div style={{ background: WHITE, borderRadius: 20, padding: '18px 16px', marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 14, color: BLACK, margin: '0 0 16px', textTransform: 'lowercase', letterSpacing: '-0.01em' }}>
            por categoría
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Donut */}
            <div style={{ flexShrink: 0 }}>
              <DonutChart />
            </div>
            {/* Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CATEGORY_SPEND.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color, flexShrink: 0, border: c.color === '#E8E8E8' ? `1px solid ${SILVER}` : 'none' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: BLACK, fontWeight: 500, textTransform: 'lowercase' }}>{c.label}</span>
                      <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: GRAY, fontWeight: 400 }}>{c.pct}%</span>
                    </div>
                    <div style={{ height: 3, background: '#F0F0F0', borderRadius: 9999, marginTop: 3 }}>
                      <div style={{ height: '100%', width: `${c.pct}%`, background: c.color, borderRadius: 9999, border: c.color === '#E8E8E8' ? `1px solid ${SILVER}` : 'none' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent completed orders */}
        <div style={{ background: WHITE, borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 14, color: BLACK, margin: 0, textTransform: 'lowercase', letterSpacing: '-0.01em' }}>
              historial de servicios
            </h3>
            <button onClick={() => navigate(AppView.ORDERS)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Urbanist, sans-serif', fontSize: 12, color: GREEN, fontWeight: 600 }}>
              ver todos
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...state.orders, ...DEMO_ORDERS]
              .filter((o, i, arr) => arr.findIndex(x => x.id === o.id) === i)
              .slice(0, 5)
              .map((order) => (
                <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: `1px solid #F0F0F0` }}>
                  {/* Avatar */}
                  <div style={{ width: 40, height: 40, borderRadius: 14, background: order.providerAvatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: WHITE }}>
                    {order.providerInitials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 600, fontSize: 13, color: BLACK, margin: 0, textTransform: 'lowercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {order.serviceName}
                    </p>
                    <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: GRAY, margin: '2px 0 0', textTransform: 'lowercase' }}>
                      {order.providerName.toLowerCase()} · {order.categoryName.toLowerCase()}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 14, color: BLACK, letterSpacing: '-0.02em', margin: 0 }}>
                      ${(order.finalAmount ?? order.quotedAmount).toLocaleString('es-MX')}
                    </p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                      background: order.status === 'completed' ? GREEN_LT : 'rgba(248,113,113,0.1)',
                      borderRadius: 9999, padding: '2px 8px', marginTop: 3,
                    }}>
                      <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 10, fontWeight: 600, color: order.status === 'completed' ? GREEN : '#DC2626', textTransform: 'lowercase' }}>
                        {order.status === 'completed' ? 'completado' : order.status === 'in_progress' ? 'en curso' : order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
