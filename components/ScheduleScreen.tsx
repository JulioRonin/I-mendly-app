import React, { useState, useEffect } from 'react';
import {
    Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight,
    Plus, Search, MoreHorizontal,
    LayoutGrid
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    provider: string;
    time: string;
    duration: string;
    cost: number;
    color: string;
    type: string;
    status: 'Confirmed' | 'Pending' | 'In Progress';
    image: string;
    startHour: number;
    endHour: number;
}

const MOCK_PROJECTS: Record<number, Project[]> = {
    18: [
        {
            id: '1', title: 'Botany Exam Preparation', provider: 'Mr. Thomas',
            time: '09:30 AM', duration: '2h', cost: 45, color: '#10C96D',
            type: 'Education', status: 'Confirmed',
            image: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?auto=format&fit=crop&q=80&w=200',
            startHour: 9.5, endHour: 11.5,
        },
        {
            id: '2', title: 'Home Electrical Repair', provider: 'Electric Pro',
            time: '01:00 PM', duration: '1.5h', cost: 120, color: '#D97706',
            type: 'Repair', status: 'Pending',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200',
            startHour: 13, endHour: 14.5,
        }
    ],
    20: [
        {
            id: '3', title: 'Interior Design Consult', provider: 'Studio M',
            time: '11:00 AM', duration: '1h', cost: 200, color: '#2563EB',
            type: 'Design', status: 'In Progress',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=200',
            startHour: 11, endHour: 12,
        }
    ]
};

const ScheduleScreen: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(20);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const days = [
        { date: 17, label: 'LUN' },
        { date: 18, label: 'MAR', active: true },
        { date: 19, label: 'MIÉ' },
        { date: 20, label: 'JUE', highlighted: true },
        { date: 21, label: 'VIE' }
    ];

    const currentProjects = MOCK_PROJECTS[selectedDay] || [];
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
    const timelineStartHour = 8;
    const timelineEndHour = 18;

    const getBlockStyle = (project: Project) => {
        const top = ((project.startHour - timelineStartHour) / (timelineEndHour - timelineStartHour)) * 100;
        const height = ((project.endHour - project.startHour) / (timelineEndHour - timelineStartHour)) * 100;
        return { top: `${top}%`, height: `${height}%` };
    };

    const currentTimePosition = ((currentHour - timelineStartHour) / (timelineEndHour - timelineStartHour)) * 100;

    return (
        <div className="h-full bg-canvas flex flex-col animate-fade-in overflow-hidden relative">
            {/* Background blob */}
            <div className="absolute w-52 h-52 bg-green-200/10 rounded-full morph-blob animate-drift pointer-events-none" style={{ top: '-3%', right: '-8%', filter: 'blur(50px)' }} />

            {/* Header */}
            <div className="pt-14 px-5 pb-5 shrink-0 relative z-10">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center">
                            <LayoutGrid size={17} className="text-ink-secondary" />
                        </div>
                        <div className="flex gap-3 text-[10px] font-black uppercase tracking-widest text-ink-muted">
                            <button className="hover:text-ink transition-colors">Día</button>
                            <button className="text-green-600">Semana</button>
                            <button className="hover:text-ink transition-colors">Mes</button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-ink-secondary hover:bg-black/5 transition-colors">
                            <Search size={17} />
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-green hover:scale-105 transition-transform">
                            <Plus size={17} />
                        </button>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-ink leading-none mb-1">Mi Agenda</h1>
                <div className="flex items-center gap-2 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                    <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest font-mono">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Septiembre 2024
                    </p>
                </div>
            </div>

            {/* Day Selector with spring animation */}
            <div className="px-5 mb-5 shrink-0 flex items-center gap-3 relative z-10">
                <div className="flex gap-1.5 shrink-0">
                    <button className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center text-ink-muted hover:text-ink transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center text-ink-muted hover:text-ink transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar">
                    {days.map((day) => {
                        const isSelected = selectedDay === day.date;
                        return (
                            <button
                                key={day.date}
                                onClick={() => setSelectedDay(day.date)}
                                className={`flex flex-col items-center py-3 px-4 rounded-2xl min-w-[60px] transition-all duration-500 ${isSelected
                                        ? 'bg-ink text-white shadow-card scale-105'
                                        : 'bg-white text-ink-secondary border border-black/5 hover:border-green-200 hover:scale-102'
                                    }`}
                                style={{ transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                            >
                                <span className="text-2xl font-black leading-none mb-0.5">{day.date}</span>
                                <span className={`text-[9px] font-bold tracking-widest ${isSelected ? 'text-white/60' : 'text-ink-muted'}`}>{day.label}</span>
                                {day.active && <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1 animate-pulse" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Timeline View ─────────────────────────── */}
            <div className="flex-1 px-5 overflow-y-auto no-scrollbar pb-36 relative z-10">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-ink-muted flex items-center gap-2">
                        <Clock size={12} /> Timeline
                    </h3>
                    <MoreHorizontal className="text-ink-muted" size={16} />
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-3xl border border-black/5 shadow-xs p-4 relative" style={{ minHeight: 500 }}>
                    <div className="relative" style={{ height: 460 }}>
                        {/* Hour lines */}
                        {hours.map((hour) => {
                            const top = ((hour - timelineStartHour) / (timelineEndHour - timelineStartHour)) * 100;
                            return (
                                <div key={hour} className="absolute left-0 right-0 flex items-center" style={{ top: `${top}%` }}>
                                    <span className="text-[9px] text-ink-muted font-mono w-10 shrink-0">{hour}:00</span>
                                    <div className="flex-1 h-px bg-black/5" />
                                </div>
                            );
                        })}

                        {/* ── Current Time Indicator (pulsing red line) ── */}
                        {currentTimePosition >= 0 && currentTimePosition <= 100 && (
                            <div
                                className="absolute left-10 right-0 flex items-center z-30 animate-fade-in"
                                style={{ top: `${currentTimePosition}%` }}
                            >
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse-dot -ml-1" />
                                <div className="flex-1 h-[2px] bg-red-500/60" style={{ boxShadow: '0 0 8px rgba(239,68,68,0.3)' }} />
                                <span className="text-[8px] font-mono text-red-500 font-bold ml-1">
                                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )}

                        {/* Event blocks with gradient fill animation */}
                        {currentProjects.map((project, idx) => {
                            const style = getBlockStyle(project);
                            return (
                                <div
                                    key={project.id}
                                    className="absolute left-12 right-2 rounded-2xl p-3.5 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform animate-spring-in"
                                    style={{
                                        ...style,
                                        background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
                                        borderLeft: `3px solid ${project.color}`,
                                        animationDelay: `${idx * 0.12}s`,
                                    }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-sm text-ink leading-tight">{project.title}</h4>
                                            <p className="text-[10px] text-ink-muted font-mono mt-0.5">{project.provider} · {project.time}</p>
                                        </div>
                                        <span
                                            className="text-base font-black"
                                            style={{ color: project.color }}
                                        >
                                            ${project.cost}
                                        </span>
                                    </div>
                                    {/* Animated gradient sweep */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: `linear-gradient(90deg, transparent 0%, ${project.color}08 50%, transparent 100%)`,
                                            backgroundSize: '200% 100%',
                                            animation: 'shimmer 4s ease-in-out infinite',
                                        }}
                                    />
                                </div>
                            );
                        })}

                        {/* Empty state */}
                        {currentProjects.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-muted">
                                <CalendarIcon size={40} className="mb-3 opacity-20" />
                                <p className="text-sm font-medium">Sin eventos programados</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    {currentProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-2xl border border-black/5 p-4 card-hover animate-card-in"
                            style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: project.color }} />
                                <span className="text-[9px] font-black uppercase tracking-widest text-ink-muted">{project.type}</span>
                            </div>
                            <h4 className="font-bold text-sm text-ink mb-1 leading-tight">{project.title}</h4>
                            <p className="text-[10px] text-ink-muted font-mono">{project.time} · {project.duration}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScheduleScreen;
