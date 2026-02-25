import React, { useState, useEffect } from 'react';
import {
    Search, MapPin, Bell, Sparkles, Zap, PenTool, Home, Layers,
    Box, Hammer, Droplets as Droplet, Scissors, Palette,
    Monitor, Leaf, Heart, AlertTriangle, Lock, Wrench, Printer, Maximize,
    ChevronRight, ArrowRight, Star, TrendingUp
} from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceCategory } from '../types';

interface ServiceGridProps {
    onSelectService: (category: ServiceCategory) => void;
    onOpenChat: () => void;
    onSelectZone: (zone: string) => void;
    selectedZone: string | null;
    onOpenOffers: () => void;
    onOpenRecommended: (serviceId: string, providerId: string) => void;
}

const ServiceIcon: React.FC<{ icon: string; size?: number }> = ({ icon, size = 20 }) => {
    const map: Record<string, React.ReactNode> = {
        clean: <Sparkles size={size} />, architecture: <PenTool size={size} />,
        roofing: <Home size={size} />, flooring: <Layers size={size} />,
        stone: <Box size={size} />, electronic: <Zap size={size} />,
        hammer: <Hammer size={size} />, plumbing: <Droplet size={size} />,
        scissors: <Scissors size={size} />, palette: <Palette size={size} />,
        monitor: <Monitor size={size} />, printer: <Printer size={size} />,
        window: <Maximize size={size} />, garden: <Leaf size={size} />,
        pet: <Heart size={size} />, pest: <AlertTriangle size={size} />,
        lock: <Lock size={size} />,
    };
    return <>{map[icon] || <Wrench size={size} />}</>;
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
    green: { bg: '#E8FBF1', text: '#0F9D5A' },
    blue: { bg: '#EBF4FF', text: '#2563EB' },
    orange: { bg: '#FFF4E5', text: '#D97706' },
    yellow: { bg: '#FFFBEB', text: '#B45309' },
    purple: { bg: '#F5F0FF', text: '#7C3AED' },
    pink: { bg: '#FFF0F6', text: '#BE185D' },
    gray: { bg: '#F3F4F6', text: '#4B5563' },
    red: { bg: '#FFF1F0', text: '#DC2626' },
};

const FEATURED = [
    {
        id: '10',
        title: 'Limpieza Premium',
        subtitle: 'Tu casa como nueva',
        description: 'Profesionales certificados · desde $800',
        image: '/home clean.png',
        providerId: 'PROV-CLEAN-1',
        badgeText: 'Más popular',
    },
    {
        id: '11',
        title: 'Carpintería fina',
        subtitle: 'Muebles únicos',
        description: 'Mono Atelier · desde $450',
        image: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?q=80&w=600',
        providerId: 'PROV-WOOD-2',
        badgeText: '⭐ 5.0',
    },
    {
        id: '5',
        title: 'Electricidad',
        subtitle: 'Instalaciones seguras',
        description: 'Certificados · desde $300',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600',
        providerId: 'PROV-ELEC-1',
        badgeText: 'Urgencias 24h',
    },
];

const QUICK_ACTIONS = [
    { label: 'Limpieza', icon: 'clean', id: '10', color: 'green' },
    { label: 'Eléctrico', icon: 'electronic', id: '5', color: 'yellow' },
    { label: 'Plomería', icon: 'plumbing', id: '16', color: 'blue' },
    { label: 'Carpintería', icon: 'hammer', id: '11', color: 'orange' },
    { label: 'Pisos', icon: 'flooring', id: '3', color: 'gray' },
    { label: 'Interiores', icon: 'palette', id: '14', color: 'pink' },
    { label: 'Jardinería', icon: 'garden', id: '6', color: 'green' },
    { label: 'Mascotas', icon: 'pet', id: '7', color: 'orange' },
];

/* ── Animated Counter Hook ──────────────────── */
const useCounter = (target: number, duration = 1200) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setValue(target); clearInterval(timer); }
            else setValue(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return value;
};

/* ── Mini SVG Sparkline ─────────────────────── */
const MiniSparkline: React.FC = () => (
    <svg viewBox="0 0 80 30" className="w-full h-8 mt-2">
        <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10C96D" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10C96D" stopOpacity="0" />
            </linearGradient>
        </defs>
        <path
            d="M0,25 L10,20 L20,22 L30,14 L40,16 L50,8 L60,10 L70,5 L80,7"
            fill="none"
            stroke="#10C96D"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-fade-in"
            style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: 'fadeIn 0.5s ease forwards, spinUp 1.5s ease forwards' }}
        />
        <path
            d="M0,25 L10,20 L20,22 L30,14 L40,16 L50,8 L60,10 L70,5 L80,7 L80,30 L0,30 Z"
            fill="url(#sparkGrad)"
            className="animate-fade-in delay-2"
        />
    </svg>
);

const ServiceGrid: React.FC<ServiceGridProps> = ({
    onSelectService,
    onOpenOffers,
    onOpenRecommended,
}) => {
    const [featuredIdx, setFeaturedIdx] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const highlighted = FEATURED[featuredIdx];
    const category = SERVICES.find(s => s.id === highlighted.id);

    // Animated counters
    const serviceCount = useCounter(2400);
    const ratingCount = useCounter(49);
    const proCount = useCounter(200);

    // Auto-rotate hero every 4s
    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setFeaturedIdx(prev => (prev + 1) % FEATURED.length);
                setIsTransitioning(false);
            }, 300);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-full overflow-y-auto no-scrollbar pb-36 bg-canvas relative">
            {/* ── Background floating blobs ───────────── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-64 h-64 bg-green-200/15 rounded-full morph-blob animate-drift" style={{ top: '-5%', right: '-10%', filter: 'blur(50px)' }} />
                <div className="absolute w-40 h-40 bg-emerald-200/10 rounded-full animate-drift-reverse" style={{ top: '40%', left: '-10%', filter: 'blur(40px)' }} />
            </div>

            {/* ── Top bar ─────────────────────────────── */}
            <div className="px-5 pt-14 pb-4 animate-fade-in relative z-10">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-xs text-ink-muted font-mono uppercase tracking-widest mb-1">I Mendly</p>
                        <h1 className="text-2xl font-black text-ink tracking-tight">¿Qué necesitas hoy?</h1>
                    </div>
                    <div className="relative">
                        <button className="w-11 h-11 bg-white rounded-2xl shadow-card flex items-center justify-center border border-black/5 hover:scale-105 transition-transform">
                            <Bell size={18} className="text-ink-secondary" />
                        </button>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border-2 border-white animate-pulse-dot" />
                    </div>
                </div>

                {/* Search bar with focus shimmer */}
                <div className={`bg-white rounded-2xl shadow-xs border flex items-center gap-3 px-4 py-3.5 animate-card-in transition-all duration-500 ${searchFocused ? 'border-green-300 shadow-green/20 shadow-card' : 'border-black/5'}`}>
                    <Search size={17} className={`shrink-0 transition-colors ${searchFocused ? 'text-green-500' : 'text-ink-muted'}`} />
                    <input
                        type="text"
                        placeholder="Busca plomero, limpieza, carpintero..."
                        className="bg-transparent flex-1 outline-none text-sm text-ink placeholder:text-ink-muted"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    <div className="flex items-center gap-1.5 bg-canvas rounded-xl px-3 py-1.5 shrink-0">
                        <MapPin size={12} className="text-green-500" />
                        <span className="text-xs font-semibold text-ink-secondary">Saltillo</span>
                    </div>
                </div>
            </div>

            <div className="px-5 space-y-4 relative z-10">

                {/* ── Animated Stats Bar ─────────────────── */}
                <div className="flex items-center gap-2 animate-card-in overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-full border border-black/5 shrink-0">
                        <TrendingUp size={12} className="text-green-500" />
                        <span className="text-xs font-black text-ink">{serviceCount.toLocaleString()}+</span>
                        <span className="text-[9px] text-ink-muted">servicios</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-full border border-black/5 shrink-0">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-black text-ink">{(ratingCount / 10).toFixed(1)}</span>
                        <span className="text-[9px] text-ink-muted">rating</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-full border border-black/5 shrink-0">
                        <Sparkles size={12} className="text-green-500" />
                        <span className="text-xs font-black text-ink">{proCount}+</span>
                        <span className="text-[9px] text-ink-muted">pros</span>
                    </div>
                </div>

                {/* ── Hero featured card with crossfade ──── */}
                <div className="animate-card-in delay-1">
                    <div
                        className="relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ height: 220 }}
                        onClick={() => category && onOpenRecommended(highlighted.id, highlighted.providerId)}
                    >
                        <img
                            src={highlighted.image}
                            alt={highlighted.title}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
                        />
                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        {/* Content */}
                        <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
                            <div className="flex items-end justify-between">
                                <div>
                                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-full mb-2">
                                        {highlighted.badgeText}
                                    </span>
                                    <h2 className="text-white text-2xl font-black tracking-tight leading-tight">{highlighted.title}</h2>
                                    <p className="text-white/70 text-xs mt-0.5">{highlighted.description}</p>
                                </div>
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-green shrink-0 group-hover:scale-110 transition-transform">
                                    <ArrowRight size={18} className="text-white" />
                                </div>
                            </div>
                        </div>
                        {/* Carousel dots */}
                        <div className="absolute top-4 right-4 flex gap-1">
                            {FEATURED.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setFeaturedIdx(i); }}
                                    className={`rounded-full transition-all duration-300 ${i === featuredIdx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`}
                                />
                            ))}
                        </div>
                        {/* Auto-rotate progress line */}
                        <div className="absolute bottom-0 left-0 h-0.5 bg-green-400/60" style={{ animation: 'progressFill 4s linear infinite', width: '100%' }} />
                    </div>
                </div>

                {/* ── Quick action grid with bounce on hover ─ */}
                <div className="animate-card-in delay-2">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-black text-ink tracking-tight">Servicios</h2>
                        <button className="flex items-center gap-1 text-xs text-green-600 font-semibold" onClick={onOpenOffers}>
                            Ver todos <ChevronRight size={13} />
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {QUICK_ACTIONS.map((qa, idx) => {
                            const colors = CATEGORY_COLORS[qa.color] || CATEGORY_COLORS.gray;
                            const cat = SERVICES.find(s => s.id === qa.id);
                            return (
                                <button
                                    key={qa.id}
                                    onClick={() => cat && onSelectService(cat)}
                                    className="card-hover flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-xs border border-black/5 group"
                                    style={{ animationDelay: `${0.05 * idx}s` }}
                                >
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                                        style={{ background: colors.bg, color: colors.text }}
                                    >
                                        <ServiceIcon icon={qa.icon} size={20} />
                                    </div>
                                    <span className="text-[9px] font-semibold text-ink-secondary text-center leading-tight">{qa.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Info widget row ─────────────────────── */}
                <div className="grid grid-cols-2 gap-3 animate-card-in delay-3">
                    {/* Escrow info card with mini sparkline */}
                    <div className="bg-ink rounded-3xl p-5 flex flex-col justify-between overflow-hidden relative" style={{ minHeight: 160 }}>
                        {/* Decorative morph blob */}
                        <div className="absolute w-32 h-32 bg-green-500/10 rounded-full morph-blob -top-6 -right-6" />
                        <div className="relative z-10">
                            <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center mb-3 animate-glow-pulse">
                                <Star size={16} className="text-white" />
                            </div>
                            <p className="text-white text-sm font-black leading-tight">Pago<br />seguro ESCROW</p>
                            <p className="text-white/40 text-[10px] mt-1">Paga solo al finalizar</p>
                            <MiniSparkline />
                        </div>
                    </div>

                    {/* Offer card */}
                    <div
                        className="card-hover bg-white rounded-3xl overflow-hidden relative cursor-pointer border border-black/5"
                        style={{ minHeight: 160 }}
                        onClick={onOpenOffers}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1581578731117-104529d3d3bd?q=80&w=400"
                            alt="Oferta"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <span className="inline-block text-[8px] font-black text-green-400 uppercase tracking-widest mb-1">Oferta del mes</span>
                            <p className="text-white text-sm font-black leading-tight">20% off Limpieza</p>
                        </div>
                    </div>
                </div>

                {/* ── All services list ────────────────────── */}
                <div className="animate-card-in delay-4">
                    <h2 className="text-sm font-black text-ink tracking-tight mb-3">Todos los servicios</h2>
                    <div className="bg-white rounded-3xl border border-black/5 shadow-xs overflow-hidden">
                        {SERVICES.map((service, idx) => {
                            const colors = CATEGORY_COLORS[service.theme] || CATEGORY_COLORS.gray;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => onSelectService(service)}
                                    className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-canvas transition-colors group ${idx < SERVICES.length - 1 ? 'border-b border-black/5' : ''
                                        }`}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                                        style={{ background: colors.bg, color: colors.text }}
                                    >
                                        <ServiceIcon icon={service.icon} size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-ink">{service.name}</p>
                                        <p className="text-xs text-ink-muted">{service.description}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-ink-muted group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceGrid;
