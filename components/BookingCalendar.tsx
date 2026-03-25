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

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS   = ['D','L','M','X','J','V','S'];
const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];
const UNAVAILABLE = [3, 7, 14, 18, 21];

export default function BookingCalendar({ state, navigate, goBack, setBooking }: Props) {
  const today = new Date();
  const [year, setYear]         = useState(today.getFullYear());
  const [month, setMonth]       = useState(today.getMonth());
  const [selectedDay, setDay]   = useState<number | null>(null);
  const [selectedTime, setTime] = useState<string | null>(null);

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => { if (month === 0) { setYear(y => y-1); setMonth(11); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y+1); setMonth(0); } else setMonth(m => m+1); };

  const canContinue = selectedDay !== null && selectedTime !== null;
  const proceed = () => {
    if (!canContinue) return;
    const dateStr = new Date(year, month, selectedDay!).toISOString();
    setBooking({ scheduledDate: dateStr, scheduledTime: selectedTime });
    navigate(AppView.PAYMENT);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#F5F5F5' }}>
      <Navbar title="Fecha y hora" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '0 20px 120px' }}>

        {/* Calendar card */}
        <div style={{ background: 'white', borderRadius: 22, padding: '20px', marginBottom: 16, boxShadow: '6px 6px 18px rgba(0,0,0,0.08), -4px -4px 12px rgba(255,255,255,0.9)' }}>
          {/* Month header */}
          <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
            <button onClick={prevMonth}
              style={{ width: 36, height: 36, borderRadius: 12, background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 8px rgba(0,0,0,0.07), -2px -2px 6px rgba(255,255,255,0.9)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h3 style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 16, color: '#1F1F1F', letterSpacing: '-0.02em' }}>
              {MONTHS[month]} {year}
            </h3>
            <button onClick={nextMonth}
              style={{ width: 36, height: 36, borderRadius: 12, background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 8px rgba(0,0,0,0.07), -2px -2px 6px rgba(255,255,255,0.9)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Day labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', padding: '4px 0' }}>
                <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, fontWeight: 700, color: '#A8A8A8', letterSpacing: '0.04em' }}>{d}</span>
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const isPast  = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isUnavail = UNAVAILABLE.includes(day);
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSel   = day === selectedDay;
              const disabled = isPast || isUnavail;

              return (
                <button key={day} disabled={disabled} onClick={() => { setDay(day); setTime(null); }}
                  style={{
                    aspectRatio: '1', borderRadius: 12, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
                    fontFamily: 'Urbanist, sans-serif', fontWeight: isSel ? 700 : 500, fontSize: 13,
                    background: isSel ? '#1F1F1F' : isToday ? '#3DB87A' : 'transparent',
                    color: isSel ? 'white' : disabled ? '#D4D4D4' : '#1F1F1F',
                    transition: 'all 0.15s ease',
                  }}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        {selectedDay && (
          <div style={{ background: 'white', borderRadius: 22, padding: '20px', marginBottom: 16, boxShadow: '6px 6px 18px rgba(0,0,0,0.08), -4px -4px 12px rgba(255,255,255,0.9)' }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 15, color: '#1F1F1F', letterSpacing: '-0.02em', marginBottom: 14 }}>
              Horario disponible
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {TIME_SLOTS.map(t => {
                const isSel = t === selectedTime;
                return (
                  <button key={t} onClick={() => setTime(t)}
                    style={{
                      padding: '11px 0', border: 'none', borderRadius: 14, cursor: 'pointer',
                      fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 13,
                      background: isSel ? '#1F1F1F' : '#F5F5F5',
                      color: isSel ? 'white' : '#6B6B6B',
                      boxShadow: isSel ? '4px 6px 12px rgba(0,0,0,0.2)' : '3px 3px 8px rgba(0,0,0,0.06), -2px -2px 6px rgba(255,255,255,0.9)',
                      transition: 'all 0.15s ease',
                    }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary */}
        {canContinue && (
          <div style={{ background: '#1F1F1F', borderRadius: 20, padding: '16px 18px' }}>
            <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Reserva confirmada</p>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', margin: 0 }}>
                  {MONTHS[month]} {selectedDay}, {year}
                </p>
                <p style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{selectedTime} hrs</p>
              </div>
              <div style={{ background: '#3DB87A', borderRadius: 9999, padding: '6px 14px' }}>
                <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 700, fontSize: 12, color: '#1F1F1F' }}>Seleccionado</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', background: 'rgba(239,239,239,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <button onClick={proceed} disabled={!canContinue} className="btn-primary"
          style={{ width: '100%', padding: '17px', fontSize: 16, opacity: canContinue ? 1 : 0.4, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
          Continuar al pago
        </button>
      </div>
    </div>
  );
}
