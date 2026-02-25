import React from 'react';
import { User, Settings, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, ShieldCheck, Star, Package } from 'lucide-react';

interface ProfileScreenProps {
    onOpenAdmin?: () => void;
}

/* ── Animated SVG Ring ───────────────────────── */
const AnimatedRing: React.FC<{ value: number; max: number; color: string; size?: number }> = ({
    value, max, color, size = 52
}) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const target = circumference - (value / max) * circumference;

    return (
        <svg width={size} height={size} viewBox="0 0 50 50" className="-rotate-90">
            <circle cx="25" cy="25" r={radius} fill="none" stroke="#F3F3F2" strokeWidth="4" />
            <circle
                cx="25" cy="25" r={radius}
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={target}
                style={{ animation: `ringFill 1.5s cubic-bezier(0.22, 1, 0.36, 1) both` }}
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from={circumference}
                    to={target}
                    dur="1.5s"
                    fill="freeze"
                    calcMode="spline"
                    keySplines="0.22 1 0.36 1"
                />
            </circle>
        </svg>
    );
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenAdmin }) => {
    const menuItems = [
        { icon: User, label: 'Editar Perfil', action: null },
        { icon: CreditCard, label: 'Métodos de Pago', action: null },
        { icon: Bell, label: 'Notificaciones', action: null },
        { icon: Settings, label: 'Configuración', action: null },
        { icon: HelpCircle, label: 'Ayuda y Soporte', action: null },
        { icon: ShieldCheck, label: 'Admin Dashboard', action: onOpenAdmin },
    ];

    const stats = [
        { icon: Package, label: 'Pedidos', value: '12', max: 20, bg: '#E8FBF1', color: '#10C96D', ringColor: '#10C96D' },
        { icon: Star, label: 'Rating', value: '4.9', max: 5, bg: '#FFF8E1', color: '#D97706', ringColor: '#D97706' },
        { icon: CreditCard, label: 'Ahorros', value: '$420', max: 500, bg: '#F5F0FF', color: '#7C3AED', ringColor: '#7C3AED' },
    ];

    return (
        <div className="h-full overflow-y-auto no-scrollbar bg-canvas pb-36 animate-fade-in relative">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-64 h-64 bg-green-200/10 rounded-full morph-blob animate-drift" style={{ top: '-5%', right: '-15%', filter: 'blur(50px)' }} />
                <div className="absolute w-40 h-40 bg-emerald-200/8 rounded-full animate-drift-reverse" style={{ bottom: '10%', left: '-8%', filter: 'blur(40px)' }} />
            </div>

            <div className="px-5 pt-14 relative z-10">
                <h1 className="text-3xl font-black text-ink mb-6">Mi Perfil</h1>

                {/* Profile card with avatar glow */}
                <div className="bg-ink rounded-3xl p-6 mb-4 animate-card-in relative overflow-hidden">
                    {/* Decorative morph blob */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full morph-blob -mr-10 -mt-10" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="relative">
                            <div className="animate-glow-pulse rounded-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                                    alt="Profile"
                                    className="w-20 h-20 rounded-2xl object-cover"
                                />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-ink animate-pulse-dot" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white">Courtney Henry</h2>
                            <p className="text-white/50 text-sm mt-0.5">courtney@example.com</p>
                            <span className="inline-block mt-2 bg-green-500/20 text-green-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full btn-shimmer">Miembro Gold</span>
                        </div>
                    </div>
                </div>

                {/* Stats with ring charts */}
                <div className="grid grid-cols-3 gap-3 mb-4 animate-card-in delay-1">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-black/5 p-4 text-center shadow-xs flex flex-col items-center">
                            <div className="relative mb-1">
                                <AnimatedRing
                                    value={parseFloat(s.value.replace('$', ''))}
                                    max={s.max}
                                    color={s.ringColor}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                                        <s.icon size={13} />
                                    </div>
                                </div>
                            </div>
                            <p className="text-base font-black text-ink animate-spin-up" style={{ animationDelay: `${i * 0.15}s` }}>{s.value}</p>
                            <p className="text-[9px] text-ink-muted uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Menu */}
                <div className="bg-white rounded-3xl border border-black/5 shadow-xs overflow-hidden animate-card-in delay-2">
                    {menuItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => item.action && item.action()}
                            className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-canvas transition-colors group text-left ${i < menuItems.length - 1 ? 'border-b border-black/5' : ''}`}
                        >
                            <div className="w-9 h-9 rounded-xl bg-ink-faint flex items-center justify-center text-ink-secondary group-hover:bg-green-50 group-hover:text-green-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                <item.icon size={16} />
                            </div>
                            <span className="flex-1 font-semibold text-sm text-ink">{item.label}</span>
                            <ChevronRight size={15} className="text-ink-muted group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                    ))}
                </div>

                {/* Logout */}
                <button className="w-full flex items-center gap-4 px-5 py-4 mt-3 bg-red-50 border border-red-100 rounded-2xl text-red-500 font-semibold text-sm hover:bg-red-100 transition-colors animate-card-in delay-3 group">
                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <LogOut size={16} />
                    </div>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;
