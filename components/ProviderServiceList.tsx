import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { Provider, SubService } from '../types';

interface ProviderServiceListProps {
    provider: Provider;
    onBack: () => void;
    onSelectService: (service: SubService) => void;
}

const ProviderServiceList: React.FC<ProviderServiceListProps> = ({ provider, onBack, onSelectService }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="h-full bg-canvas overflow-y-auto no-scrollbar relative animate-fade-in pb-36">

            {/* Header */}
            <div className="pt-14 px-5 pb-5">
                <button
                    onClick={onBack}
                    className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center text-ink hover:bg-black/5 transition-colors mb-5"
                >
                    <ArrowLeft size={18} />
                </button>

                <h1 className="text-3xl font-black text-ink leading-tight mb-1">
                    Elige tu<br />
                    <span className="text-green-600">Servicio</span>
                </h1>
                <p className="text-sm text-ink-secondary">
                    Servicios disponibles de <span className="font-bold text-ink">{provider.name}</span>
                </p>
            </div>

            {/* Service List */}
            <div className="px-5 space-y-3">
                {provider.services?.map((service, index) => {
                    const isSelected = selectedId === service.id;
                    return (
                        <div
                            key={service.id || index}
                            onClick={() => setSelectedId(service.id || null)}
                            className={`card-hover bg-white rounded-3xl p-5 border-2 transition-all duration-300 cursor-pointer animate-card-in ${isSelected ? 'border-green-500 shadow-green' : 'border-black/5 hover:border-black/10'
                                }`}
                            style={{ animationDelay: `${index * 0.04}s` }}
                        >
                            <div className="flex items-center gap-4">
                                {/* Image */}
                                <div className="w-18 h-18 rounded-2xl bg-canvas overflow-hidden shrink-0 border border-black/5" style={{ width: 72, height: 72 }}>
                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                    <h3 className={`text-sm font-bold mb-0.5 ${isSelected ? 'text-green-700' : 'text-ink'}`}>{service.name}</h3>
                                    <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed mb-1.5">{service.description}</p>
                                    <div className="flex items-baseline gap-1">
                                        {service.priceLabel && <span className="text-[10px] text-ink-muted">{service.priceLabel}</span>}
                                        <span className="font-black text-ink text-base">${service.price}</span>
                                    </div>
                                    {service.priceNote && (
                                        <p className="text-[10px] text-green-600 mt-1 font-medium leading-tight bg-green-50 p-1.5 rounded-lg">
                                            {service.priceNote}
                                        </p>
                                    )}
                                </div>

                                {/* Selection Indicator */}
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${isSelected ? 'bg-green-500 text-white' : 'bg-canvas text-ink-muted border border-black/10'
                                    }`}>
                                    {isSelected ? <CheckCircle2 size={15} /> : <div className="w-2.5 h-2.5 rounded-full bg-black/10" />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom CTA */}
            {selectedId && (
                <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-canvas via-canvas/90 to-transparent z-40 animate-slide-up">
                    <button
                        onClick={() => {
                            const s = provider.services?.find(serv => serv.id === selectedId);
                            if (s) onSelectService(s);
                        }}
                        className="btn-primary w-full py-5 text-sm font-bold tracking-wide flex items-center justify-center gap-2"
                    >
                        <span>Continuar</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProviderServiceList;
