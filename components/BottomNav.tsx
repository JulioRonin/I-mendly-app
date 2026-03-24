import React from 'react';
import { AppView } from '../types';

interface Props {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  role?: 'client' | 'provider';
}

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#8B5CF6' : 'none'} stroke={active ? '#8B5CF6' : 'rgba(255,255,255,0.35)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"/>
  </svg>
);
const ClipboardIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : 'rgba(255,255,255,0.35)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="2"/>
    <path d="M9 12h6M9 16h4"/>
  </svg>
);
const TagIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : 'rgba(255,255,255,0.35)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const UserIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : 'rgba(255,255,255,0.35)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const DollarIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#8B5CF6' : 'rgba(255,255,255,0.35)'} strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const StarIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#8B5CF6' : 'none'} stroke={active ? '#8B5CF6' : 'rgba(255,255,255,0.35)'} strokeWidth="2" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const clientTabs = [
  { view: AppView.CLIENT_HOME,     Icon: HomeIcon,      label: 'Inicio'   },
  { view: AppView.ORDERS,          Icon: ClipboardIcon, label: 'Pedidos'  },
  { view: AppView.OFFERS,          Icon: TagIcon,       label: 'Ofertas'  },
  { view: AppView.CLIENT_PROFILE,  Icon: UserIcon,      label: 'Perfil'   },
];

const providerTabs = [
  { view: AppView.PROVIDER_DASHBOARD, Icon: HomeIcon,      label: 'Inicio'    },
  { view: AppView.ORDERS,             Icon: ClipboardIcon, label: 'Servicios' },
  { view: AppView.PROVIDER_EARNINGS,  Icon: DollarIcon,    label: 'Ganancias' },
  { view: AppView.PROVIDER_REVIEWS,   Icon: StarIcon,      label: 'Reseñas'   },
];

export default function BottomNav({ currentView, onNavigate, role = 'client' }: Props) {
  const tabs = role === 'provider' ? providerTabs : clientTabs;

  return (
    <div
      className="flex items-center"
      style={{
        background: 'rgba(10,10,10,0.95)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map(({ view, Icon, label }) => {
        const isActive = currentView === view;
        return (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className="flex-1 flex flex-col items-center justify-center py-3.5 gap-1 transition-all duration-200"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Icon active={isActive} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 10,
              fontWeight: isActive ? 700 : 500,
              letterSpacing: '-0.01em',
              color: isActive ? '#8B5CF6' : 'rgba(255,255,255,0.3)',
              transition: 'color 0.2s ease',
            }}>
              {label}
            </span>
            {isActive && (
              <div style={{
                width: 4, height: 4, borderRadius: '50%',
                background: '#8B5CF6',
                marginTop: 1,
                boxShadow: '0 0 6px rgba(139,92,246,0.8)',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
