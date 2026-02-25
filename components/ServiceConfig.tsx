import React, { useState } from 'react';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { ServiceCategory, ServiceItem } from '../types';

interface ServiceConfigProps {
    service: ServiceCategory;
    onBack: () => void;
    onNext: () => void;
}

const ServiceConfig: React.FC<ServiceConfigProps> = ({ service, onBack, onNext }) => {
    const [items, setItems] = useState<ServiceItem[]>(service.items || []);
    const [activeTab, setActiveTab] = useState('Repair');

    const updateCount = (id: string, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, count: Math.max(0, item.count + delta) };
            }
            return item;
        }));
    };

    const total = items.reduce((acc, item) => acc + (item.price * item.count), 0);

    return (
        <div className="h-full bg-canvas flex flex-col animate-fade-in">
            <div className="p-5 pb-2">
                <div className="flex items-center mb-5">
                    <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-ink hover:bg-black/5 transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <h2 className="flex-1 text-center font-black text-base text-ink">{service.name}</h2>
                    <div className="w-10" />
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-white p-1 rounded-2xl border border-black/5 mb-6">
                    {['Cleaning', 'Repair', 'Laundry'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab
                                    ? 'bg-ink text-white shadow-sm'
                                    : 'text-ink-muted hover:text-ink'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* List of Items */}
                <div className="space-y-4">
                    <h3 className="font-black text-sm text-ink">{activeTab}</h3>

                    {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-black/5 shadow-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center p-2">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-4 h-4 bg-green-200 rounded-full" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-ink">{item.name}</h4>
                                    <p className="text-green-600 font-bold text-xs">${item.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <button
                                    onClick={() => updateCount(item.id, -1)}
                                    className="w-8 h-8 rounded-xl bg-canvas flex items-center justify-center text-ink-muted hover:bg-black/5 transition-colors"
                                >
                                    <Minus size={13} />
                                </button>
                                <span className="font-black w-4 text-center text-ink text-sm">{item.count}</span>
                                <button
                                    onClick={() => updateCount(item.id, 1)}
                                    className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
                                >
                                    <Plus size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sub Categories */}
            <div className="mt-4 px-5 space-y-3">
                {['Plumbing', 'Furnished'].map(cat => (
                    <div key={cat} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-black/5">
                        <h3 className="font-bold text-sm text-ink">{cat}</h3>
                        <button className="w-7 h-7 bg-canvas rounded-xl flex items-center justify-center text-ink-muted"><Minus size={12} /></button>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-5 bg-white border-t border-black/5">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-ink-secondary text-sm">Total</span>
                    <span className="text-2xl font-black text-ink">${total}</span>
                </div>
                <button
                    onClick={onNext}
                    className="btn-primary w-full py-4 text-sm font-bold tracking-wide"
                >
                    Siguiente Paso
                </button>
            </div>
        </div>
    );
};

export default ServiceConfig;
