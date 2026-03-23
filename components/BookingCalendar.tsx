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
const DAYS = ['D','L','M','X','J','V','S'];
const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];
const UNAVAILABLE = [3, 7, 14, 18, 21];

export default function BookingCalendar({ state, navigate, goBack, setBooking }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const canContinue = selectedDay !== null && selectedTime !== null;

  const proceed = () => {
    if (!canContinue) return;
    const dateStr = new Date(year, month, selectedDay!).toISOString();
    setBooking({ scheduledDate: dateStr, scheduledTime: selectedTime });
    navigate(AppView.PAYMENT);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Elige fecha y hora" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-5 p-4 pb-32">

          {/* Calendar */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(15,52,96,0.3)', border: '1.5px solid rgba(255,255,255,0.07)' }}>
            {/* Month header */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', fontSize: 16, color: 'white' }}>←</button>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>
                {MONTHS[month]} {year}
              </h3>
              <button onClick={nextMonth} className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', fontSize: 16, color: 'white' }}>→</button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="flex items-center justify-center py-1">
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>{d}</span>
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const isUnavailable = UNAVAILABLE.includes(day);
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                const isSelected = day === selectedDay;
                const disabled = isPast || isUnavailable;

                return (
                  <button key={day} onClick={() => !disabled && setSelectedDay(day)} disabled={disabled}
                    className="flex items-center justify-center rounded-xl transition-all duration-200"
                    style={{
                      height: 36,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 13,
                      fontWeight: isSelected || isToday ? 700 : 500,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      background: isSelected ? 'linear-gradient(135deg,#FF6B47,#CC4A2A)' : isToday ? 'rgba(8,145,178,0.2)' : 'transparent',
                      color: isSelected ? 'white' : isToday ? '#0891B2' : disabled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)',
                      boxShadow: isSelected ? '0 4px 12px rgba(255,107,71,0.35)' : 'none',
                      border: isToday && !isSelected ? '1.5px solid rgba(8,145,178,0.4)' : 'none',
                      textDecoration: isUnavailable ? 'line-through' : 'none',
                    }}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', marginBottom: 12 }}>
              Horario disponible
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map(time => {
                const isSelected = time === selectedTime;
                const unavailTimes = ['11:00', '14:00'];
                const isUnavail = unavailTimes.includes(time) && selectedDay;
                return (
                  <button key={time} onClick={() => !isUnavail && setSelectedTime(time)} disabled={!!isUnavail}
                    className="py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      background: isSelected ? 'linear-gradient(135deg,#0891B2,#0F3460)' : isUnavail ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)',
                      color: isSelected ? 'white' : isUnavail ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)',
                      border: isSelected ? 'none' : '1.5px solid rgba(255,255,255,0.07)',
                      cursor: isUnavail ? 'not-allowed' : 'pointer',
                      boxShadow: isSelected ? '0 4px 12px rgba(8,145,178,0.3)' : 'none',
                      textDecoration: isUnavail ? 'line-through' : 'none',
                    }}>
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected summary */}
          {canContinue && (
            <div className="rounded-2xl p-4 animate-fade-in" style={{ background: 'rgba(16,185,129,0.08)', border: '1.5px solid rgba(16,185,129,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span style={{ fontSize: 16 }}>✅</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#10B981' }}>Horario seleccionado</span>
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                {MONTHS[month]} {selectedDay}, {year} a las {selectedTime} hrs
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                Recibirás confirmación por WhatsApp y email
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-3 pb-safe glass-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={proceed} disabled={!canContinue}
          className="btn-coral w-full py-4 text-base font-bold"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', opacity: canContinue ? 1 : 0.4, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
          Continuar al pago →
        </button>
      </div>
    </div>
  );
}
