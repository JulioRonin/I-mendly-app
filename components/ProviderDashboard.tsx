import React, { useState } from 'react';
import {
    DollarSign, Star, Package, CheckCircle2, Clock, Plus,
    ChevronRight, Bell, LogOut, ArrowUpRight, MoreHorizontal, Zap, TrendingUp
} from 'lucide-react';

interface KPICardProps {
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: React.ReactNode;
    bg: string;
    color: string;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, trend, trendUp, icon, bg, color }) => (
    <div className="card-hover bg-white rounded-3xl border border-black/5 p-5 animate-card-in">
        <div className="flex justify-between items-start mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg, color }}>
                {icon}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-full flex items-center gap-1 ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                <ArrowUpRight size={9} className={trendUp ? '' : 'rotate-90'} />
                {trend}
            </span>
        </div>
        <p className="text-xs text-ink-muted mb-1">{label}</p>
        <h3 className="text-2xl font-black text-ink">{value}</h3>
    </div>
);

const ProviderDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'services'>('dashboard');
    const [isAddingService, setIsAddingService] = useState(false);

    const kpis: KPICardProps[] = [
        { label: 'Ingresos', value: '$12,450', trend: '+12.5%', trendUp: true, icon: <DollarSign size={18} />, bg: '#E8FBF1', color: '#10C96D' },
        { label: 'Rating', value: '4.9', trend: '+0.2', trendUp: true, icon: <Star size={18} />, bg: '#FFF8E1', color: '#D97706' },
        { label: 'Activas', value: '8', trend: '-2', trendUp: false, icon: <Package size={18} />, bg: '#F5F0FF', color: '#7C3AED' },
        { label: 'Éxito', value: '98%', trend: '+1%', trendUp: true, icon: <CheckCircle2 size={18} />, bg: '#EBF4FF', color: '#2563EB' },
    ];

    const services = [
        { id: '1', name: 'Limpieza Profunda', price: 800, status: 'Activo' },
        { id: '2', name: 'Limpieza Express', price: 400, status: 'Activo' },
        { id: '3', name: 'Desinfección', price: 1200, status: 'Revisión' },
    ];

    const recentOrders = [
        { id: 'ORD-001', client: 'Julio R.', service: 'Limpieza Profunda', date: 'Mañana, 2pm', price: 800, status: 'Escrow' },
        { id: 'ORD-002', client: 'María C.', service: 'Limpieza Express', date: 'Hoy, 5pm', price: 400, status: 'En Camino' },
    ];

    const barData = [60, 80, 45, 95, 70, 100, 55, 88, 72, 65, 90, 85];
    const months = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

    return (
        <div className="h-full bg-canvas flex flex-col overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-white px-5 pt-14 pb-4 border-b border-black/5 shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-ink rounded-2xl flex items-center justify-center">
                            <Zap size={18} className="text-green-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-ink">Provider Hub</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="green-dot" style={{ width: 6, height: 6 }} />
                                <p className="text-[10px] text-ink-secondary font-mono">Modo Profesional</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 bg-canvas rounded-xl border border-black/5 flex items-center justify-center text-ink-secondary hover:bg-black/5 transition-colors">
                            <Bell size={17} />
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-10 h-10 bg-canvas rounded-xl border border-black/5 flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={17} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mt-4 bg-canvas rounded-xl p-1">
                    {(['dashboard', 'orders', 'services'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 rounded-lg text-[11px] font-bold capitalize transition-all ${activeTab === tab ? 'bg-white shadow-xs text-ink' : 'text-ink-muted'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-36 space-y-4">
                {activeTab === 'dashboard' && (
                    <>
                        {/* KPI Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {kpis.map((kpi, i) => (
                                <KPICard key={i} {...kpi} />
                            ))}
                        </div>

                        {/* Revenue chart */}
                        <div className="bg-white rounded-3xl border border-black/5 p-5">
                            <div className="flex justify-between items-center mb-5">
                                <div>
                                    <p className="text-xs text-ink-muted mb-0.5 flex items-center gap-1.5"><TrendingUp size={12} className="text-green-500" /> Ingresos</p>
                                    <p className="text-2xl font-black text-ink">$12,450</p>
                                </div>
                                <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                            </div>
                            <div className="flex items-end gap-1.5 h-20">
                                {barData.map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className="w-full rounded-t-md transition-all hover:opacity-100"
                                            style={{
                                                height: `${h}%`,
                                                background: i === 11 ? '#10C96D' : `rgba(16,201,109,${0.2 + (h / 100) * 0.35})`,
                                                opacity: i === 11 ? 1 : 0.75
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2">
                                {months.map((m, i) => (
                                    <span key={i} className="text-[8px] text-ink-muted flex-1 text-center">{m}</span>
                                ))}
                            </div>
                        </div>

                        {/* Recent orders */}
                        <div className="bg-white rounded-3xl border border-black/5 p-5">
                            <div className="flex justify-between mb-4">
                                <p className="text-xs font-black text-ink-muted uppercase tracking-widest flex items-center gap-1.5"><Clock size={11} /> Recientes</p>
                                <button onClick={() => setActiveTab('orders')} className="text-xs font-semibold text-green-600 flex items-center gap-1">Ver todas <ChevronRight size={12} /></button>
                            </div>
                            <div className="space-y-3">
                                {recentOrders.map(o => (
                                    <div key={o.id} className="flex items-center gap-3 p-3 bg-canvas rounded-2xl hover:bg-black/5 transition-colors cursor-pointer">
                                        <div className="w-9 h-9 bg-ink rounded-xl flex items-center justify-center text-white font-black text-sm">{o.client[0]}</div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-ink">{o.service}</p>
                                            <p className="text-xs text-ink-muted">{o.client} · {o.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-green-600">${o.price}</p>
                                            <span className="text-[8px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">{o.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'services' && (
                    <>
                        <div className="flex items-center justify-between mb-1">
                            <h2 className="text-2xl font-black text-ink">Servicios</h2>
                            <button
                                onClick={() => setIsAddingService(true)}
                                className="btn-primary flex items-center gap-2 px-4 py-2.5 text-xs"
                            >
                                <Plus size={14} /> Nueva
                            </button>
                        </div>
                        <div className="bg-white rounded-3xl border border-black/5 overflow-hidden">
                            {services.map((s, idx) => (
                                <div key={s.id} className={`flex items-center gap-4 px-5 py-4 hover:bg-canvas transition-colors ${idx < services.length - 1 ? 'border-b border-black/5' : ''}`}>
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${s.status === 'Activo' ? 'bg-green-500' : 'bg-yellow-400'}`} />
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-ink">{s.name}</p>
                                        <p className="text-xs text-ink-muted">{s.status} · ${s.price}</p>
                                    </div>
                                    <MoreHorizontal size={16} className="text-ink-muted" />
                                </div>
                            ))}
                        </div>
                        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4">
                            <p className="text-xs text-yellow-700 font-medium">1 servicio en revisión por el staff de I Mendly.</p>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <>
                        <h2 className="text-2xl font-black text-ink mb-1">Órdenes</h2>
                        <div className="space-y-3">
                            {recentOrders.map(o => (
                                <div key={o.id} className="card-hover bg-white rounded-3xl border border-black/5 p-5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-ink rounded-2xl flex items-center justify-center text-xl font-black text-white">{o.client[0]}</div>
                                        <div className="flex-1">
                                            <p className="text-[9px] text-ink-muted font-mono">{o.id}</p>
                                            <p className="font-bold text-sm text-ink">{o.service}</p>
                                            <p className="text-xs text-ink-muted">{o.client}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-green-600">${o.price}</p>
                                            <span className="text-[8px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">{o.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-3 border-t border-black/5">
                                        <Clock size={12} className="text-ink-muted" />
                                        <span className="text-xs text-ink-muted">{o.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Add Service Modal */}
            {isAddingService && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-end animate-fade-in">
                    <div className="bg-white w-full rounded-t-[2rem] p-7 animate-slide-up shadow-float">
                        <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mb-7" />
                        <h2 className="text-2xl font-black text-ink mb-1">Nuevo Servicio</h2>
                        <p className="text-sm text-ink-muted mb-6">Tu solicitud será revisada por el equipo.</p>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-ink-secondary mb-1.5 uppercase tracking-wider">Nombre</label>
                                <input type="text" placeholder="Ej. Instalación Solar" className="input-field w-full" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-ink-secondary mb-1.5 uppercase tracking-wider">Precio estimado</label>
                                <input type="number" placeholder="$0.00" className="input-field w-full text-xl font-bold" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setIsAddingService(false)} className="btn-ghost flex-1 py-4 text-sm font-bold">Cancelar</button>
                            <button onClick={() => setIsAddingService(false)} className="btn-primary flex-1 py-4 text-sm font-bold">Enviar solicitud</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProviderDashboard;
