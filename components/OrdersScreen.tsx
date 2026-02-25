import React, { useState, useEffect } from 'react';
import {
    Package, Clock, CheckCircle, ChevronRight, ArrowLeft,
    MessageSquare, ShieldCheck, MapPin,
    DollarSign, Calendar, Send, ArrowUpRight, TrendingUp
} from 'lucide-react';
import { Order } from '../types';

interface OrdersScreenProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    onUpdateOrder: (orderId: string, updatedOrder: Order) => void;
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
    'En espera de aprobación': { bg: '#FFF8E1', text: '#D97706' },
    'Aprobada': { bg: '#EBF4FF', text: '#2563EB' },
    'Esperando Escrow': { bg: '#FFF4E5', text: '#D97706' },
    'En progreso': { bg: '#E8FBF1', text: '#059669' },
    'Por liberar': { bg: '#F5F0FF', text: '#7C3AED' },
    'Finalizado': { bg: '#F3F4F6', text: '#6B7280' },
};

const OrdersScreen: React.FC<OrdersScreenProps> = ({ orders, onUpdateOrder }) => {
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');

    const selectedOrder = orders.find(o => o.id === selectedOrderId);

    const handleNextPhase = () => {
        if (!selectedOrder) return;
        const nextPhaseIdx = selectedOrder.currentPhase + 1;
        if (nextPhaseIdx >= selectedOrder.phases.length) return;
        const updatedPhases = [...selectedOrder.phases];
        updatedPhases[selectedOrder.currentPhase] = { ...updatedPhases[selectedOrder.currentPhase], status: 'completed', date: new Date().toLocaleDateString() };
        updatedPhases[nextPhaseIdx] = { ...updatedPhases[nextPhaseIdx], status: 'current' };
        const statusMap: Record<number, string> = { 1: 'Aprobada', 2: 'Esperando Escrow', 3: 'En progreso', 4: 'Por liberar', 5: 'Finalizado' };
        const sysMsg: Record<number, string> = {
            1: '¡Orden aprobada!', 2: 'Visita realizada. Aprueba el costo.',
            3: 'Fondos en Escrow. Trabajo iniciado.', 4: 'Trabajo terminado. Verifica y libera.', 5: '¡Pago liberado!'
        };
        onUpdateOrder(selectedOrder.id, {
            ...selectedOrder,
            status: statusMap[nextPhaseIdx] || selectedOrder.status,
            currentPhase: nextPhaseIdx,
            phases: updatedPhases,
            messages: [...selectedOrder.messages, { id: Date.now().toString(), sender: 'system', text: sysMsg[nextPhaseIdx] || '', timestamp: new Date().toLocaleTimeString() }]
        });
    };

    // ─── DETAIL VIEW ───────────────────────────────────────────────────
    if (selectedOrderId && selectedOrder) {
        const st = STATUS_STYLES[selectedOrder.status] || { bg: '#F3F4F6', text: '#6B7280' };
        const progress = ((selectedOrder.currentPhase + 1) / selectedOrder.phases.length) * 100;

        return (
            <div className="h-full flex flex-col bg-canvas animate-fade-in overflow-hidden">
                {/* Header */}
                <div className="bg-white px-5 pt-14 pb-5 border-b border-black/5 shrink-0">
                    <div className="flex items-center gap-3 mb-5">
                        <button
                            onClick={() => setSelectedOrderId(null)}
                            className="w-10 h-10 bg-canvas rounded-xl flex items-center justify-center border border-black/5 hover:bg-black/5 transition-colors"
                        >
                            <ArrowLeft size={18} className="text-ink" />
                        </button>
                        <span className="text-xs font-mono text-ink-muted">{selectedOrder.id}</span>
                        <span className="ml-auto text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full" style={{ background: st.bg, color: st.text }}>
                            {selectedOrder.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={selectedOrder.providerAvatar} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                        <div>
                            <h2 className="text-xl font-black text-ink">{selectedOrder.serviceName}</h2>
                            <p className="text-sm text-ink-secondary">{selectedOrder.providerName}</p>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-ink-muted mb-1.5">
                            <span>Progreso</span>
                            <span>{selectedOrder.currentPhase + 1}/{selectedOrder.phases.length}</span>
                        </div>
                        <div className="h-1.5 bg-canvas rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full progress-animated"
                                style={{ '--progress-target': `${progress}%`, width: `${progress}%` } as React.CSSProperties}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-4">
                    {/* ESCROW Action */}
                    {selectedOrder.currentPhase < selectedOrder.phases.length - 1 && (
                        <div className="bg-ink rounded-3xl p-5 animate-card-in">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                                    <ShieldCheck size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Siguiente paso</p>
                                    <p className="text-white/60 text-xs mt-0.5">
                                        {selectedOrder.currentPhase === 2 ? 'Autoriza el Escrow para iniciar el trabajo.' : 'Avanza a la siguiente fase del proceso.'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleNextPhase}
                                className="w-full bg-green-500 text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                            >
                                {selectedOrder.currentPhase === 0 ? 'Aprobar orden' :
                                    selectedOrder.currentPhase === 1 ? 'Confirmar visita' :
                                        selectedOrder.currentPhase === 2 ? 'Autorizar ESCROW' :
                                            selectedOrder.currentPhase === 3 ? 'Marcar terminado' : 'Liberar pago'}
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="bg-white rounded-3xl border border-black/5 p-5">
                        <p className="text-xs font-black text-ink-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Clock size={12} /> Progreso
                        </p>
                        <div className="space-y-3">
                            {selectedOrder.phases.map((phase, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${phase.status === 'completed' ? 'bg-green-500 border-green-500' :
                                            phase.status === 'current' ? 'border-green-500 bg-white' :
                                                'border-ink-muted bg-white'}`}>
                                            {phase.status === 'completed' && <CheckCircle size={10} className="text-white" />}
                                            {phase.status === 'current' && <span className="w-2 h-2 rounded-full bg-green-500" />}
                                        </div>
                                        {idx < selectedOrder.phases.length - 1 && (
                                            <div className={`w-px h-6 mt-1 ${phase.status === 'completed' ? 'bg-green-200' : 'bg-ink-faint'}`} />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-1">
                                        <div className="flex justify-between">
                                            <p className={`text-sm font-semibold ${phase.status === 'pending' ? 'text-ink-muted' : 'text-ink'}`}>{phase.label}</p>
                                            {phase.date && <span className="text-xs text-ink-muted">{phase.date}</span>}
                                        </div>
                                        <p className="text-xs text-ink-muted">{phase.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-2xl border border-black/5 p-4">
                            <Calendar size={15} className="text-green-500 mb-2" />
                            <p className="text-[9px] text-ink-muted uppercase tracking-widest mb-0.5">Fecha</p>
                            <p className="text-sm font-bold text-ink">{selectedOrder.date}</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-black/5 p-4">
                            <DollarSign size={15} className="text-green-500 mb-2" />
                            <p className="text-[9px] text-ink-muted uppercase tracking-widest mb-0.5">Total</p>
                            <p className="text-sm font-bold text-green-600">${selectedOrder.price}</p>
                        </div>
                        <div className="col-span-2 bg-white rounded-2xl border border-black/5 p-4">
                            <MapPin size={15} className="text-green-500 mb-2" />
                            <p className="text-[9px] text-ink-muted uppercase tracking-widest mb-0.5">Ubicación</p>
                            <p className="text-sm font-bold text-ink">{selectedOrder.location}</p>
                        </div>
                    </div>

                    {/* Chat */}
                    <div className="bg-white rounded-3xl border border-black/5 p-5">
                        <p className="text-xs font-black text-ink-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                            <MessageSquare size={12} /> Mensajes
                        </p>
                        <div className="space-y-2 max-h-44 overflow-y-auto no-scrollbar mb-4">
                            {selectedOrder.messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-ink text-white font-medium' :
                                        msg.sender === 'system' ? 'bg-green-50 text-green-700 border border-green-100 font-medium' :
                                            'bg-canvas text-ink border border-black/5'
                                        }`}>
                                        {msg.text}
                                        <span className="block text-[9px] mt-1 opacity-50">{msg.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="input-field flex-1 py-3 text-sm"
                            />
                            <button className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-green">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── LIST VIEW ─────────────────────────────────────────────────────
    return (
        <div className="h-full flex flex-col bg-canvas animate-fade-in overflow-hidden relative">
            {/* Background blob */}
            <div className="absolute w-56 h-56 bg-green-200/10 rounded-full morph-blob animate-drift pointer-events-none" style={{ top: '-5%', right: '-10%', filter: 'blur(50px)' }} />

            <div className="px-5 pt-14 pb-5 shrink-0 relative z-10">
                <h1 className="text-3xl font-black text-ink mb-1">Pedidos</h1>
                <p className="text-sm text-ink-secondary">{orders.length} órdenes</p>

                {/* ── Spending Ring Chart ────────────────── */}
                <div className="flex items-center gap-5 bg-white rounded-3xl border border-black/5 shadow-xs p-5 mt-4 animate-card-in">
                    <div className="relative w-20 h-20 shrink-0">
                        <svg viewBox="0 0 90 90" className="w-full h-full ring-chart -rotate-90">
                            <circle cx="45" cy="45" r="38" className="ring-bg" />
                            <circle
                                cx="45" cy="45" r="38"
                                className="ring-fill"
                                stroke="#10C96D"
                                style={{ '--ring-target': '80' } as React.CSSProperties}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-black text-ink">67%</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-[9px] text-ink-muted font-black uppercase tracking-widest mb-0.5">Gasto Mensual</p>
                        <p className="text-2xl font-black text-ink animate-spin-up">$4,200</p>
                        <div className="flex items-center gap-1 mt-1">
                            <TrendingUp size={12} className="text-green-500" />
                            <span className="text-xs text-green-600 font-bold">+12% vs. mes pasado</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-36 space-y-3">
                {orders.map((order, idx) => {
                    const st = STATUS_STYLES[order.status] || { bg: '#F3F4F6', text: '#6B7280' };
                    const progress = ((order.currentPhase + 1) / order.phases.length) * 100;
                    return (
                        <div
                            key={order.id}
                            onClick={() => setSelectedOrderId(order.id)}
                            className="card-hover bg-white rounded-3xl border border-black/5 p-5 animate-card-in"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img src={order.providerAvatar} alt="" className="w-12 h-12 rounded-2xl object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h3 className="font-bold text-ink text-sm truncate">{order.serviceName}</h3>
                                        <ChevronRight size={16} className="text-ink-muted shrink-0 ml-2" />
                                    </div>
                                    <p className="text-xs text-ink-secondary">{order.providerName}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${order.status === 'En progreso' ? 'animate-glow-pulse' : ''}`} style={{ background: st.bg, color: st.text }}>
                                    {order.status}
                                </span>
                                <span className="text-sm font-bold text-green-600">${order.price}</span>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs text-ink-muted mb-1">
                                    <span>{order.date}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1 bg-canvas rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full progress-animated" style={{ '--progress-target': `${progress}%`, width: `${progress}%` } as React.CSSProperties} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrdersScreen;
