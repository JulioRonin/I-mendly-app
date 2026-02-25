import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Calendar as CalendarIcon, ArrowLeft, Clock } from 'lucide-react';

interface CalendarBookingProps {
    onConfirm: (date: Date, time: string) => void;
    onCancel: () => void;
    onBack: () => void;
}

const CalendarBooking: React.FC<CalendarBookingProps> = ({ onConfirm, onCancel, onBack }) => {
    const [selectedDate, setSelectedDate] = useState<number>(12);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const startOffset = 3;

    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "04:30 PM"
    ];

    return (
        <div className="h-full bg-canvas flex flex-col relative animate-fade-in overflow-y-auto no-scrollbar pb-32">

            {/* Header */}
            <div className="pt-14 px-5 pb-5 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center text-ink hover:bg-black/5 transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>
                <h2 className="text-lg font-black text-ink">Agendar Cita</h2>
                <button className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center text-ink-secondary">
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Calendar Card */}
            <div className="px-5 mb-6">
                <div className="bg-white rounded-3xl p-5 border border-black/5 shadow-xs">
                    <div className="flex justify-between items-center mb-6 px-1">
                        <span className="font-black text-xl text-ink">Septiembre</span>
                        <div className="flex gap-1.5">
                            <button className="w-8 h-8 rounded-xl bg-canvas flex items-center justify-center text-ink-muted hover:bg-black/5 transition-colors">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-8 h-8 rounded-xl bg-canvas flex items-center justify-center text-ink-muted hover:bg-black/5 transition-colors">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 mb-4">
                        {weekDays.map((d, i) => (
                            <div key={i} className="text-center text-[10px] font-bold text-ink-muted uppercase tracking-widest">{d}</div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-y-1.5 mb-2">
                        {Array.from({ length: startOffset }).map((_, i) => <div key={`empty-${i}`} />)}
                        {days.map((day) => {
                            const isSelected = day === selectedDate;
                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(day)}
                                    className={`
                                        w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-sm font-bold transition-all
                                        ${isSelected
                                            ? 'bg-green-500 text-white shadow-green scale-105'
                                            : 'text-ink-secondary hover:bg-canvas hover:text-ink'}
                                    `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Time Slots */}
            <div className="px-5 animate-card-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="font-black text-sm text-ink mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-green-500" />
                    Horarios Disponibles
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                    py-3.5 rounded-2xl font-bold text-xs transition-all border-2
                                    ${isSelected
                                        ? 'bg-green-500 text-white border-green-500 shadow-green'
                                        : 'bg-white text-ink-secondary border-black/5 hover:border-green-200'}
                                `}
                            >
                                {time}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Button */}
            {selectedDate && selectedTime && (
                <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-canvas via-canvas/90 to-transparent z-40 animate-slide-up">
                    <button
                        onClick={() => onConfirm(new Date(), selectedTime)}
                        className="btn-primary w-full py-5 text-sm font-bold tracking-wide"
                    >
                        Confirmar Cita
                    </button>
                </div>
            )}
        </div>
    );
};

export default CalendarBooking;
