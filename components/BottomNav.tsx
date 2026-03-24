import React from 'react';
import { AppView } from '../types';

interface Props {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  role?: 'client' | 'provider';
}

/* ── SVG ICON COMPONENTS ── */
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke={active ? 'white' : '#9A9AAF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"/>
  </svg>
);
const SearchIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#9A9AAF'} strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const BagIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#9A9AAF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const UserIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#9A9AAF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const DollarIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#9A9AAF'} strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const StarIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke={active ? 'white' : '#9A9AAF'} strokeWidth="2" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const clientTabs = [
  { view: AppView.CLIENT_HOME,    Icon: HomeIcon,   label: 'Inicio'  },
  { view: AppView.ORDERS,         Icon: SearchIcon, label: 'Pedidos' },
  { view: AppView.OFFERS,         Icon: BagIcon,    label: 'Ofertas' },
  { view: AppView.CLIENT_PROFILE, Icon: UserIcon,   label: 'Perfil'  },
];

const providerTabs = [
  { view: AppView.PROVIDER_DASHBOARD, Icon: HomeIcon,   label: 'Inicio'    },
  { view: AppView.ORDERS,             Icon: SearchIcon,  label: 'Servicios' },
  { view: AppView.PROVIDER_EARNINGS,  Icon: DollarIcon, label: 'Ganancias' },
  { view: AppView.PROVIDER_REVIEWS,   Icon: StarIcon,   label: 'Reseñas'   },
];

export default function BottomNav({ currentView, onNavigate, role = 'client' }: Props) {
  const tabs = role === 'provider' ? providerTabs : clientTabs;

  return (
    <div className="floating-nav">
      {tabs.map(({ view, Icon, label }) => {
        const isActive = currentView === view;
        return (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className="flex flex-col items-center justify-center gap-0.5 transition-all duration-300"
            style={{
              width: 56, height: 56,
              borderRadius: 9999,
              background: isActive ? '#FF6B35' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              boxShadow: isActive ? '0 4px 16px rgba(255,107,53,0.35)' : 'none',
              transform: isActive ? 'scale(1)' : 'scale(1)',
            }}
          >
            <Icon active={isActive} />
            {!isActive && (
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                fontWeight: 600,
                color: '#9A9AAF',
                letterSpacing: '-0.01em',
              }}>
                {label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
