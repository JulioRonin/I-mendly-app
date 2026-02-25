import React, { useState } from 'react';
import {
    Plus, Search, Edit2, Trash2, Camera, MapPin,
    ChevronRight, Save, X, LayoutGrid, List,
    Settings2, DollarSign, Layers, Info
} from 'lucide-react';
import { Provider, ServiceVariable, SubService } from '../types';
import {
    MOCK_PROVIDERS, ZONES, SERVICES,
    SERVICES_WOODWORK, SERVICES_ELECTRICAL, SERVICES_CONSTRUCTION,
    SERVICES_FASHION, SERVICES_INTERIOR, SERVICES_INDUSTRIAL,
    SERVICES_PLUMBING, SERVICES_CLEANING, SERVICES_ARCHITECTURE,
    SERVICES_ROOFING, SERVICES_FLOORING, SERVICES_STONEWORKS,
    SERVICES_ELECTRONIC, SERVICES_GARDEN, SERVICES_PET,
    SERVICES_PEST, SERVICES_LOCKSMITH, SERVICES_PRINTING,
    SERVICES_ANCELES
} from '../constants';

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [providers, setProviders] = useState(MOCK_PROVIDERS);
    const [isEditing, setIsEditing] = useState(false);
    const [isLinkingService, setIsLinkingService] = useState(false);
    const [activeTab, setActiveTab] = useState<'basic' | 'services' | 'portfolio'>('basic');
    const [currentProvider, setCurrentProvider] = useState<Partial<Provider>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [newOptionNames, setNewOptionNames] = useState<Record<string, string>>({});

    // New Service Creation State
    const [isCreatingService, setIsCreatingService] = useState(false);
    const [newService, setNewService] = useState<Partial<SubService>>({
        name: '',
        description: '',
        price: 0,
        image: 'https://images.unsplash.com/photo-1581578731522-9b7d7b89753f?auto=format&fit=crop&q=80&w=400',
        color: 'purple'
    });

    // Collect all global services for the picker
    const ALL_GLOBAL_SERVICES = [
        ...SERVICES_WOODWORK, ...SERVICES_ELECTRICAL, ...SERVICES_CONSTRUCTION,
        ...SERVICES_FASHION, ...SERVICES_INTERIOR, ...SERVICES_INDUSTRIAL,
        ...SERVICES_PLUMBING, ...SERVICES_CLEANING, ...SERVICES_ARCHITECTURE,
        ...SERVICES_ROOFING, ...SERVICES_FLOORING, ...SERVICES_STONEWORKS,
        ...SERVICES_ELECTRONIC, ...SERVICES_GARDEN, ...SERVICES_PET,
        ...SERVICES_PEST, ...SERVICES_LOCKSMITH, ...SERVICES_PRINTING,
        ...SERVICES_ANCELES
    ];

    const handleEdit = (provider: Provider) => {
        setCurrentProvider({ ...provider, services: provider.services ? [...provider.services] : [] });
        setIsEditing(true);
        setActiveTab('basic');
    };

    const handleSave = () => {
        if (currentProvider.id) {
            setProviders(providers.map(p => p.id === currentProvider.id ? (currentProvider as Provider) : p));
        } else {
            const newProvider: Provider = {
                ...(currentProvider as Provider),
                id: `PROV-NEW-${Date.now()}`,
                rating: 5.0,
                reviews: 0,
                mendlyReady: true,
                distance: "0 km",
                coordinates: { lat: 0, lng: 0 }
            };
            setProviders([newProvider, ...providers]);
        }
        setIsEditing(false);
    };

    const updateServicePrice = (serviceId: string, price: number) => {
        if (!currentProvider.services) return;
        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services.map(s => s.id === serviceId ? { ...s, price } : s)
        });
    };

    const linkGlobalService = (service: SubService) => {
        const alreadyHas = currentProvider.services?.some(s => s.id === service.id);
        if (alreadyHas) return;

        setCurrentProvider({
            ...currentProvider,
            services: [...(currentProvider.services || []), { ...service }]
        });
        setIsLinkingService(false);
    };

    const handleCreateService = () => {
        if (!newService.name || !newService.price) return;

        const createdService: SubService = {
            id: `service-custom-${Date.now()}`,
            name: newService.name,
            description: newService.description || '',
            price: newService.price,
            image: newService.image || 'https://images.unsplash.com/photo-1581578731522-9b7d7b89753f?auto=format&fit=crop&q=80&w=400',
            color: newService.color || 'purple',
            variables: []
        };

        setCurrentProvider({
            ...currentProvider,
            services: [...(currentProvider.services || []), createdService]
        });

        setIsCreatingService(false);
        setNewService({
            name: '',
            description: '',
            price: 0,
            image: 'https://images.unsplash.com/photo-1581578731522-9b7d7b89753f?auto=format&fit=crop&q=80&w=400',
            color: 'purple'
        });
    };

    const removeService = (serviceId: string) => {
        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services?.filter(s => s.id !== serviceId) || []
        });
    };

    const addVariable = (serviceId: string) => {
        if (!currentProvider.services) return;
        const newVar: ServiceVariable = {
            id: `var-${Date.now()}`,
            name: 'Nueva Variable',
            options: ['Estándar'],
            priceImpact: { 'Estándar': 0 }
        };
        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services.map(s =>
                s.id === serviceId ? { ...s, variables: [...(s.variables || []), newVar] } : s
            )
        });
    };

    const updateVariableName = (serviceId: string, varId: string, name: string) => {
        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services?.map(s =>
                s.id === serviceId ? {
                    ...s,
                    variables: s.variables?.map(v => v.id === varId ? { ...v, name } : v)
                } : s
            )
        });
    };

    const deleteVariable = (serviceId: string, varId: string) => {
        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services?.map(s =>
                s.id === serviceId ? {
                    ...s,
                    variables: s.variables?.filter(v => v.id !== varId)
                } : s
            )
        });
    };

    const addOptionToVariable = (serviceId: string, varId: string) => {
        const optionName = newOptionNames[varId]?.trim();
        if (!optionName) return;

        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services?.map(s =>
                s.id === serviceId ? {
                    ...s,
                    variables: s.variables?.map(v => {
                        if (v.id === varId) {
                            if (v.options.includes(optionName)) return v;
                            return {
                                ...v,
                                options: [...v.options, optionName],
                                priceImpact: { ...v.priceImpact, [optionName]: 0 }
                            };
                        }
                        return v;
                    })
                } : s
            )
        });
        setNewOptionNames({ ...newOptionNames, [varId]: '' });
    };

    const removeOptionFromVariable = (serviceId: string, varId: string, optionName: string) => {
        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services?.map(s =>
                s.id === serviceId ? {
                    ...s,
                    variables: s.variables?.map(v => {
                        if (v.id === varId) {
                            const newImpact = { ...v.priceImpact };
                            delete newImpact[optionName];
                            return {
                                ...v,
                                options: v.options.filter(o => o !== optionName),
                                priceImpact: newImpact
                            };
                        }
                        return v;
                    })
                } : s
            )
        });
    };

    const updateImpactValue = (serviceId: string, varId: string, optionName: string, impact: number) => {
        setCurrentProvider({
            ...currentProvider,
            services: currentProvider.services?.map(s =>
                s.id === serviceId ? {
                    ...s,
                    variables: s.variables?.map(v => v.id === varId ? {
                        ...v,
                        priceImpact: { ...v.priceImpact, [optionName]: impact }
                    } : v)
                } : s
            )
        });
    };

    const filteredProviders = providers.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full bg-gray-50 overflow-y-auto no-scrollbar pb-20 font-sans">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Administrador de Proveedores</h1>
                </div>
                <button
                    onClick={() => { setCurrentProvider({ services: [] }); setIsEditing(true); setActiveTab('basic'); }}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-sm hover:bg-green-500Dark transition-colors"
                >
                    <Plus size={18} />
                    Nuevo Proveedor
                </button>
            </div>

            <div className="p-6">
                {/* Search */}
                <div className="mb-6 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o especialidad..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-100 transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Provider List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProviders.map(provider => (
                        <div key={provider.id} className="bg-white rounded-3xl p-6 shadow-xs hover:shadow-card transition-all border border-gray-100 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                                        <img src={provider.avatarUrl} alt={provider.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{provider.name}</h3>
                                        <p className="text-xs text-gray-500 font-medium">{provider.specialty}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(provider)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-2 flex-wrap mb-4">
                                <div className="bg-gray-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-gray-100 text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                                    <MapPin size={12} className="text-green-600" />
                                    {provider.zone}
                                </div>
                                <div className="bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-100 text-[10px] font-bold text-green-600 uppercase tracking-tight">
                                    <Layers size={12} />
                                    {provider.services?.length || 0} Servicios
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">${provider.pricePerHour}<span className="text-xs text-gray-400 font-normal">/hr</span></span>
                                <button onClick={() => handleEdit(provider)} className="text-green-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                    Gestionar servicios <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit/Create Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-card max-h-[90vh] flex flex-col animate-slide-up">
                        <div className="p-8 border-b flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">
                                    {currentProvider.id ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                                </h2>
                                <p className="text-sm text-gray-400 font-medium">{currentProvider.name || 'Sin nombre'}</p>
                            </div>
                            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="px-8 pt-4 flex gap-8 border-b shrink-0">
                            {[
                                { id: 'basic', label: 'Info Básica', icon: Info },
                                { id: 'services', label: 'Servicios y Variables', icon: Settings2 },
                                { id: 'portfolio', label: 'Portafolio', icon: Camera }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all relative ${activeTab === tab.id ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="p-8 overflow-y-auto no-scrollbar flex-1 bg-gray-50/30">
                            {activeTab === 'basic' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Nombre</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3.5 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-medium"
                                                value={currentProvider.name || ''}
                                                onChange={e => setCurrentProvider({ ...currentProvider, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Especialidad</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3.5 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-medium"
                                                value={currentProvider.specialty || ''}
                                                onChange={e => setCurrentProvider({ ...currentProvider, specialty: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Zona Principal</label>
                                            <select
                                                className="w-full px-4 py-3.5 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-medium"
                                                value={currentProvider.zone || ''}
                                                onChange={e => setCurrentProvider({ ...currentProvider, zone: e.target.value })}
                                            >
                                                <option value="">Seleccionar zona</option>
                                                {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Precio Base ($/hr)</label>
                                            <input
                                                type="number"
                                                className="w-full px-4 py-3.5 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-medium"
                                                value={currentProvider.pricePerHour || ''}
                                                onChange={e => setCurrentProvider({ ...currentProvider, pricePerHour: parseFloat(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Avatar URL</label>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                                                {currentProvider.avatarUrl ? <img src={currentProvider.avatarUrl} className="w-full h-full object-cover" /> : <Camera size={24} className="text-gray-300" />}
                                            </div>
                                            <input
                                                type="text"
                                                className="flex-1 px-4 py-3.5 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-medium"
                                                value={currentProvider.avatarUrl || ''}
                                                onChange={e => setCurrentProvider({ ...currentProvider, avatarUrl: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'services' && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900">Cartera de Servicios</h3>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setIsCreatingService(true)}
                                                className="text-green-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:text-green-600Dark transition-all"
                                            >
                                                <Plus size={14} /> Crear Nuevo
                                            </button>
                                            <button
                                                onClick={() => setIsLinkingService(true)}
                                                className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:text-gray-600 transition-all"
                                            >
                                                <Layers size={14} /> Vincular Global
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {currentProvider.services?.map(service => (
                                            <div key={service.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden">
                                                            <img src={service.image} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{service.name}</h4>
                                                            <p className="text-xs text-gray-400 font-medium">{service.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                                                            <DollarSign size={16} className="text-green-600" />
                                                            <input
                                                                type="number"
                                                                className="w-20 bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-900 p-0"
                                                                value={service.price}
                                                                onChange={(e) => updateServicePrice(service.id, parseFloat(e.target.value))}
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={() => removeService(service.id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                            title="Eliminar servicio"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Variables Section */}
                                                <div className="pt-4 border-t border-gray-50">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Variables y Opciones</h5>
                                                        <button
                                                            onClick={() => addVariable(service.id)}
                                                            className="text-green-600 text-[10px] font-black uppercase tracking-wider hover:text-green-700"
                                                        >
                                                            + Añadir Variable
                                                        </button>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {service.variables?.map(variable => (
                                                            <div key={variable.id} className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                                                                <div className="flex justify-between items-center mb-4">
                                                                    <div className="flex-1 mr-4">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Nombre (ej. Número de plantas)"
                                                                            className="w-full bg-white border-gray-100 rounded-xl text-xs font-bold py-2 px-3 focus:ring-green-100"
                                                                            value={variable.name}
                                                                            onChange={(e) => updateVariableName(service.id, variable.id, e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        onClick={() => deleteVariable(service.id, variable.id)}
                                                                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <div className="flex gap-2 items-center mb-2">
                                                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Opciones:</span>
                                                                        <div className="flex gap-1 flex-wrap">
                                                                            {variable.options.map(opt => (
                                                                                <span key={opt} className="bg-white border border-gray-100 px-2 py-0.5 rounded-lg text-[10px] font-bold text-gray-600 flex items-center gap-1">
                                                                                    {opt}
                                                                                    <button
                                                                                        onClick={() => removeOptionFromVariable(service.id, variable.id, opt)}
                                                                                        className="hover:text-red-500 transition-colors"
                                                                                    >
                                                                                        <X size={10} />
                                                                                    </button>
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Nueva opción..."
                                                                            className="flex-1 bg-white border-gray-100 rounded-xl text-[10px] py-1.5 px-3 focus:ring-green-50"
                                                                            value={newOptionNames[variable.id] || ''}
                                                                            onChange={(e) => setNewOptionNames({ ...newOptionNames, [variable.id]: e.target.value })}
                                                                            onKeyDown={(e) => e.key === 'Enter' && addOptionToVariable(service.id, variable.id)}
                                                                        />
                                                                        <button
                                                                            onClick={() => addOptionToVariable(service.id, variable.id)}
                                                                            className="p-1.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                                                                        >
                                                                            <Plus size={14} />
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Impacto en Precio ($)</p>
                                                                    {variable.options.map(opt => (
                                                                        <div key={opt} className="flex items-center justify-between text-xs font-medium bg-white/50 p-2 rounded-xl">
                                                                            <span className="text-gray-500">{opt}</span>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-gray-300">+</span>
                                                                                <input
                                                                                    type="number"
                                                                                    className="w-16 bg-white border border-gray-100 rounded-lg p-1 text-center font-bold text-green-600 focus:ring-green-50"
                                                                                    value={variable.priceImpact[opt] || 0}
                                                                                    onChange={(e) => updateImpactValue(service.id, variable.id, opt, parseFloat(e.target.value))}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {(!service.variables || service.variables.length === 0) && (
                                                            <p className="text-center py-4 text-xs text-gray-400 italic">No hay variables configuradas para este servicio.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'portfolio' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900">Fotos del Portafolio</h3>
                                        <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                                            <Camera size={16} /> Subir Fotos
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {currentProvider.portfolio?.map((img, i) => (
                                            <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group border border-gray-100">
                                                <img src={img} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button className="p-2 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-green-500 hover:text-green-600 transition-all bg-white hover:bg-green-50">
                                            <Plus size={32} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Añadir URL</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t shrink-0 flex gap-4 bg-white rounded-b-[3rem]">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-3xl font-bold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-4 bg-[#111827] text-white rounded-3xl font-bold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Create New Service Modal */}
            {isCreatingService && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-card flex flex-col animate-slide-up overflow-hidden">
                        <div className="p-8 border-b flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Crear Servicio Nuevo</h2>
                                <p className="text-xs text-gray-400 font-medium">Define los detalles del servicio personalizado</p>
                            </div>
                            <button onClick={() => setIsCreatingService(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Nombre del Servicio</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Limpieza Profunda"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-medium"
                                    value={newService.name}
                                    onChange={e => setNewService({ ...newService, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Descripción</label>
                                <textarea
                                    placeholder="Describe brevemente el servicio..."
                                    className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-medium h-24 resize-none"
                                    value={newService.description}
                                    onChange={e => setNewService({ ...newService, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Precio Inicial ($)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-sm font-bold"
                                    value={newService.price || ''}
                                    onChange={e => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">URL de Imagen (opcional)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-100 transition-all text-xs font-medium"
                                    value={newService.image}
                                    onChange={e => setNewService({ ...newService, image: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 flex gap-4">
                            <button
                                onClick={() => setIsCreatingService(false)}
                                className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateService}
                                disabled={!newService.name || !newService.price}
                                className="flex-2 px-8 py-3 bg-green-500 text-white rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                Crear Servicio
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Service Picker Modal */}
            {isLinkingService && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-card max-h-[80vh] flex flex-col animate-slide-up">
                        <div className="p-8 border-b flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Vincular Servicio Global</h2>
                                <p className="text-sm text-gray-400 font-medium">Selecciona un servicio para añadir al catálogo del proveedor</p>
                            </div>
                            <button onClick={() => setIsLinkingService(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto no-scrollbar flex-1 bg-gray-50/30">
                            <div className="grid grid-cols-1 gap-4">
                                {ALL_GLOBAL_SERVICES.map(service => {
                                    const isAlreadyLinked = currentProvider.services?.some(s => s.id === service.id);
                                    return (
                                        <button
                                            key={service.id}
                                            onClick={() => !isAlreadyLinked && linkGlobalService(service)}
                                            className={`flex items-center gap-4 p-4 rounded-3xl border transition-all text-left ${isAlreadyLinked
                                                ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                                                : 'bg-white border-gray-100 hover:border-green-500 hover:shadow-card'
                                                }`}
                                        >
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                                <img src={service.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">{service.name}</h4>
                                                <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-sm font-bold text-gray-900">${service.price}</div>
                                                {isAlreadyLinked ? (
                                                    <span className="text-[10px] font-black text-green-600 uppercase tracking-tight">Vinculado</span>
                                                ) : (
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Click para Vincular</span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;


