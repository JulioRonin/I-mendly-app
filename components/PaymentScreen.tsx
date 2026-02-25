import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';

interface PaymentScreenProps {
    onBack: () => void;
    onConfirm: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onBack, onConfirm }) => {
    const [method, setMethod] = useState('Credit Card');

    const methods = [
        { name: 'Credit Card', icon: CreditCard },
        { name: 'Apple Pay', icon: Smartphone },
    ];

    return (
        <div className="h-full bg-canvas flex flex-col overflow-y-auto no-scrollbar pb-36 animate-fade-in">
            {/* Header */}
            <div className="bg-white px-5 pt-14 pb-5 border-b border-black/5 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 bg-canvas rounded-xl border border-black/5 flex items-center justify-center text-ink hover:bg-black/5 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-black text-ink">Checkout</h2>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Payment Methods */}
                <div>
                    <h3 className="text-xs font-black text-ink-muted uppercase tracking-widest mb-3">Método de Pago</h3>
                    <div className="space-y-3">
                        {methods.map((m) => {
                            const isSelected = method === m.name;
                            const Icon = m.icon;
                            return (
                                <button
                                    key={m.name}
                                    onClick={() => setMethod(m.name)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${isSelected
                                            ? 'border-green-500 bg-green-50 shadow-green'
                                            : 'border-black/5 bg-white hover:border-black/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-green-500 text-white' : 'bg-canvas text-ink-secondary'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <span className={`font-bold text-sm ${isSelected ? 'text-ink' : 'text-ink-secondary'}`}>{m.name}</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-green-500 bg-green-500' : 'border-black/20'}`}>
                                        {isSelected && <CheckCircle size={12} className="text-white" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Card visualization */}
                {method === 'Credit Card' && (
                    <div className="animate-card-in">
                        <div className="rounded-3xl p-7 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/20 blur-[60px] rounded-full -mr-10 -mt-10" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <CreditCard size={26} className="opacity-70" />
                                    <span className="text-lg font-bold tracking-widest italic opacity-40">VISA</span>
                                </div>
                                <p className="font-mono text-xl tracking-widest mb-8">**** **** **** 4291</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Titular</p>
                                        <p className="font-bold tracking-wide">JULIO C.</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Expira</p>
                                        <p className="font-bold tracking-wide">12/28</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary */}
                <div className="bg-white rounded-3xl border border-black/5 p-5">
                    <h3 className="text-xs font-black text-ink-muted uppercase tracking-widest mb-4">Resumen</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-ink-secondary">Subtotal</span>
                            <span className="text-sm font-semibold text-ink">$2,200</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-ink-secondary">Comisión Mendly</span>
                            <span className="text-sm font-semibold text-ink">$99</span>
                        </div>
                        <div className="h-px bg-canvas" />
                        <div className="flex justify-between items-center pt-1">
                            <span className="font-bold text-ink">Total</span>
                            <span className="text-2xl font-black text-ink">$2,299</span>
                        </div>
                    </div>
                </div>

                {/* ESCROW info */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
                    <ShieldCheck size={18} className="text-green-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-green-800">Pago seguro con ESCROW</p>
                        <p className="text-xs text-green-600 mt-0.5">Tu dinero se libera solo cuando apruebes el trabajo completado.</p>
                    </div>
                </div>
            </div>

            {/* Fixed footer */}
            <div className="fixed bottom-0 inset-x-0 p-5 bg-gradient-to-t from-canvas via-canvas/90 to-transparent z-40">
                <button
                    onClick={onConfirm}
                    className="btn-primary w-full py-5 text-sm font-bold tracking-wide"
                >
                    Confirmar y pagar $2,299
                </button>
            </div>
        </div>
    );
};

export default PaymentScreen;
