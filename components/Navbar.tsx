import React from 'react';
import { Home, Grid, Map, Calendar, User } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: AppView.SERVICES, icon: <Home size={22} />, label: 'Home' },
    { view: AppView.CALENDAR, icon: <Calendar size={22} />, label: 'Calendar' },
    { view: AppView.CHAT, icon: <div className="w-11 h-11 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-green transform -translate-y-4 hover:scale-110 transition-transform"><Grid size={20} /></div>, label: '', isAction: true },
    { view: AppView.MAP, icon: <Map size={22} />, label: 'Pro' },
    { view: AppView.PROFILE, icon: <User size={22} />, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 pb-6 pt-4 px-4 pointer-events-none z-50">
      <div className="bg-white/90 backdrop-blur-xl border border-black/5 rounded-full shadow-float mx-auto max-w-sm pointer-events-auto h-16 flex justify-between items-center px-5">
        {navItems.map((item, idx) => {
          const isActive = currentView === item.view;

          if (item.isAction) {
            return (
              <button key={idx} onClick={() => onChangeView(item.view)} className="outline-none">
                {item.icon}
              </button>
            )
          }

          return (
            <button
              key={idx}
              onClick={() => onChangeView(item.view)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 outline-none ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink-secondary'
                }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {item.icon}
              </div>
              {isActive && <div className="w-1 h-1 bg-green-500 rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
