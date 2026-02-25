import React from 'react';
import { MOCK_PROVIDERS } from '../constants';
import { Provider, ServiceCategory } from '../types';
import { ArrowLeft, Star, MapPin, Search, Filter, Heart, ChevronRight } from 'lucide-react';

interface ProviderListProps {
    category: ServiceCategory;
    onBack: () => void;
    onSelectProvider: (provider: Provider) => void;
    selectedZone: string | null;
}

const ProviderList: React.FC<ProviderListProps> = ({ category, onBack, onSelectProvider, selectedZone }) => {

    const providers = MOCK_PROVIDERS.filter(p =>
        p.categoryId === category.id &&
        (!selectedZone || selectedZone === "Ubicación Actual (Detectada)" || p.zone === selectedZone)
    );

    return (
        <div className="h-full overflow-y-auto no-scrollbar pb-36 bg-canvas relative animate-fade-in">
            {/* Header */}
            <div className="pt-14 px-5 pb-5">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center text-ink hover:bg-black/5 transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center text-ink-secondary hover:bg-black/5 transition-colors">
                        <Filter size={17} />
                    </button>
                </div>

                <div className="mb-5">
                    <p className="text-xs text-green-600 font-bold uppercase tracking-widest mb-1">Explorar</p>
                    <h1 className="text-3xl font-black text-ink leading-tight">
                        Expertos en<br />
                        <span className="text-green-600">{category.name}</span>
                    </h1>
                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl border border-black/5 shadow-xs flex items-center gap-3 px-4 py-3.5">
                    <Search size={17} className="text-ink-muted shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o servicio..."
                        className="bg-transparent flex-1 outline-none text-sm text-ink placeholder:text-ink-muted"
                    />
                </div>
            </div>

            {/* Provider List */}
            <div className="px-5 space-y-3">
                <div className="flex justify-between items-end mb-1">
                    <h3 className="text-sm font-black text-ink">Resultados</h3>
                    <span className="text-xs font-semibold text-ink-muted">{providers.length} Expertos</span>
                </div>

                {providers.length > 0 ? (
                    providers.map((provider, idx) => (
                        <div
                            key={provider.id}
                            onClick={() => onSelectProvider(provider)}
                            className="card-hover bg-white rounded-3xl p-5 border border-black/5 shadow-xs animate-card-in cursor-pointer"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <div className="flex gap-4">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-canvas border border-black/5 flex items-center justify-center">
                                    <img
                                        src={provider.avatarUrl}
                                        alt={provider.name}
                                        className="w-full h-full object-contain p-1.5"
                                    />
                                    {provider.mendlyReady && (
                                        <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <h2 className="text-base font-bold text-ink mb-0.5">{provider.specialty}</h2>
                                    <p className="text-sm text-ink-secondary mb-2">{provider.name}</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                                            <Star size={11} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-xs font-bold text-ink">{provider.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-ink-muted text-xs">
                                            <MapPin size={11} />
                                            <span>{provider.distance || '2.5 km'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between items-end">
                                    <button className="w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-ink-muted hover:text-red-400 hover:bg-red-50 transition-colors">
                                        <Heart size={14} />
                                    </button>
                                    <div className="text-right">
                                        <span className="block text-[9px] text-ink-muted uppercase tracking-wider">desde</span>
                                        <span className="block text-base font-black text-green-600">${provider.pricePerHour}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p className="font-bold text-ink-muted text-base">No se encontraron resultados</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProviderList;
