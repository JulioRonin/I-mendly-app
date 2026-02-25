import React from 'react';
import { ArrowLeft, Tag, Clock, CheckCircle2 } from 'lucide-react';

interface OffersScreenProps {
    onBack: () => void;
    onRedeem: () => void;
}

const OffersScreen: React.FC<OffersScreenProps> = ({ onBack, onRedeem }) => {
    return (
        <div className="h-full bg-canvas flex flex-col animate-fade-in relative">
            {/* Header Image */}
            <div className="h-1/3 relative">
                <img
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000"
                    alt="Special Offer"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-canvas" />
                <button
                    onClick={onBack}
                    className="absolute top-6 left-5 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-ink hover:bg-white transition-colors border border-white/50"
                >
                    <ArrowLeft size={18} />
                </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 bg-white rounded-t-3xl -mt-8 p-6 relative z-10 border border-black/5 overflow-y-auto no-scrollbar">

                {/* Badge & Title */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Tag size={10} />
                        Oferta Especial
                    </span>
                    <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Clock size={10} />
                        Expira en 24h
                    </span>
                </div>

                <h1 className="text-2xl font-black text-ink mb-1.5">
                    30% de Descuento
                </h1>
                <p className="text-ink-secondary text-sm mb-6 leading-relaxed">
                    En todos los servicios de limpieza profunda y organización.
                </p>

                {/* Details List */}
                <div className="space-y-4 mb-8">
                    <h3 className="font-black text-ink text-xs uppercase tracking-widest">Lo que incluye</h3>
                    <ul className="space-y-3">
                        {[
                            "Limpieza profunda de cocina y baños",
                            "Desinfección de superficies de alto contacto",
                            "Aspirado y lavado de alfombras",
                            "Organización básica de espacios comunes"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2.5">
                                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                                <span className="text-ink-secondary text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Terms */}
                <div className="bg-canvas p-5 rounded-2xl mb-24">
                    <h4 className="font-black text-ink text-[10px] uppercase tracking-widest mb-1.5">Términos y condiciones</h4>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                        Válido solo para nuevos usuarios en su primera reserva. No acumulable con otras promociones. Sujeto a disponibilidad de proveedores en tu zona.
                    </p>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent z-50">
                <button
                    onClick={onRedeem}
                    className="btn-primary w-full py-4 text-sm font-bold tracking-wide"
                >
                    Reclamar Oferta
                </button>
            </div>
        </div>
    );
};

export default OffersScreen;
