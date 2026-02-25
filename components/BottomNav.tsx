import React from 'react';
import { Home, FileText, ShieldCheck, Calendar, User } from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
    currentView: AppView;
    onNavigate: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
    const isActive = (view: AppView) =>
        currentView === view || (view === AppView.SERVICES && currentView === AppView.PROVIDER_LIST);

    const navItems = [
        { id: AppView.SERVICES, icon: Home, tip: 'Inicio' },
        { id: AppView.ORDERS, icon: FileText, tip: 'Pedidos' },
        { id: AppView.ADMIN, icon: ShieldCheck, tip: 'Admin' },
        { id: AppView.CALENDAR, icon: Calendar, tip: 'Agenda' },
        { id: AppView.PROFILE, icon: User, tip: 'Perfil' },
    ];

    return (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
            <div
                className="bg-white rounded-full shadow-float border border-black/5 px-5 py-3 flex items-center gap-2 pointer-events-auto"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            >
                {navItems.map((item) => {
                    const active = isActive(item.id);
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`relative flex items-center justify-center transition-all duration-300 ${active ? 'w-12 h-12' : 'w-11 h-11'
                                }`}
                            title={item.tip}
                        >
                            {/* Active pill background */}
                            <span
                                className={`absolute inset-0 rounded-full transition-all duration-300 ${active ? 'bg-ink scale-100' : 'scale-0 bg-ink'
                                    }`}
                            />
                            <Icon
                                size={active ? 19 : 20}
                                strokeWidth={active ? 2.5 : 1.8}
                                className={`relative z-10 transition-colors duration-300 ${active ? 'text-white' : 'text-ink-secondary hover:text-ink'
                                    }`}
                            />
                            {/* Active green dot */}
                            {active && (
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
